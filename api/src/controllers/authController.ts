import type { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import { generateToken, generateTempToken } from '../utils/jwt.ts'
import { db } from '../db/connection.ts'
import { users } from '../db/schema.ts'
import { eq, or } from 'drizzle-orm'
import { isDev } from '../../env.ts'
import { comparePasswords, hashPassword } from '../utils/password.ts'


export const register = async (req: Request, res: Response) => {
  try {
    const { email, username, password } = req.body

    // Check if email or username already exists
    const [existingUser] = await db
      .select()
      .from(users)
      .where(
        or(
          eq(users.email, email.toLowerCase()),
          eq(users.username, username)
        )
      )

    if (existingUser) {
      if (existingUser.email === email.toLowerCase()) {
        return res.status(400).json({ error: 'Email already exists' })
      }
      if (existingUser.username === username) {
        return res.status(400).json({ error: 'Username already exists' })
      }
    }

    // Hash password
    const hashedPassword = await hashPassword(req.body.password)

    // Create user
    const [newUser] = await db
      .insert(users)
      .values({
        email: email.toLowerCase(),
        username,
        password: hashedPassword,
      })
      .returning({
        id: users.id,
        email: users.email,
        username: users.username,
        createdAt: users.createdAt,
      })

    // Generate JWT
    const token = await generateToken({
      id: newUser.id,
      email: newUser.email,
      username: newUser.username,
    })

    res.cookie('token', token, {
      httpOnly: true,
      secure: !isDev(),
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    })

    res.status(201).json({
      message: 'User created successfully',
      user: newUser,
    })
  } catch (error) {
    console.error('Registration error:', error)
    res.status(500).json({ error: 'Failed to create user' })
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    // Find user
    const [user] = await db.select().from(users).where(eq(users.email, email.toLowerCase()))

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    // Verify password
    const isValidatedPassword = await comparePasswords(password, user.password)

    if (!isValidatedPassword) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    const cookieOptions = {
      httpOnly: true,
      secure: !isDev(),
      sameSite: 'strict' as const,
    }

    // If 2FA is enabled, issue a short-lived temp token instead of the full JWT
    if (user.twoFactorEnabled) {
      const tempToken = await generateTempToken(user.id)
      res.cookie('tempToken', tempToken, { ...cookieOptions, maxAge: 5 * 60 * 1000 }) // 5 min
      return res.status(200).json({ requiresTwoFactor: true })
    }

    // Generate JWT
    const token = await generateToken({
      id: user.id,
      email: user.email,
      username: user.username,
    })

    res.cookie('token', token, { ...cookieOptions, maxAge: 7 * 24 * 60 * 60 * 1000 }) // 7 days

    res.json({
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
      },
    })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ error: 'Failed to login' })
  }
}

export const logout = (_req: Request, res: Response) => {
  res.clearCookie('token')
  res.json({ message: 'Logged out successfully' })
}

export const googleAuth = async (req: Request, res: Response) => {
  try {
    const { email, username, googleId } = req.body

    // 1. Check if user exists by email
    let [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, email.toLowerCase()))

    if (!user) {
      // 2. Create user if doesn't exist
      // Using googleId as a base for password, hashed of course
      const hashedPassword = await hashPassword(googleId)
      
      const [newUser] = await db
        .insert(users)
        .values({
          email: email.toLowerCase(),
          username: username || email.split('@')[0],
          password: hashedPassword,
        })
        .returning()
      
      user = newUser
    }

    // 3. Login user (similar to regular login but without password check)
    const cookieOptions = {
      httpOnly: true,
      secure: !isDev(),
      sameSite: 'strict' as const,
    }

    if (user.twoFactorEnabled) {
      const tempToken = await generateTempToken(user.id)
      res.cookie('tempToken', tempToken, { ...cookieOptions, maxAge: 5 * 60 * 1000 })
      return res.status(200).json({ requiresTwoFactor: true })
    }

    const token = await generateToken({
      id: user.id,
      email: user.email,
      username: user.username,
    })

    res.cookie('token', token, { ...cookieOptions, maxAge: 7 * 24 * 60 * 60 * 1000 })

    res.json({
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
      },
    })
  } catch (error) {
    console.error('Google auth error:', error)
    res.status(500).json({ error: 'Failed to authenticate with Google' })
  }
}
