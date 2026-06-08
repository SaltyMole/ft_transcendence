import type { Request, Response } from 'express'
import { isDev } from '../../env.ts'
import { db } from '../db/connection.ts'
import { users } from '../db/schema.ts'
import { eq } from 'drizzle-orm'
import { generateTotpSecret, generateOtpauthUrl, generateQrCode, verifyTotpCode } from '../utils/totp.ts'
import { generateToken, verifyTempToken } from '../utils/jwt.ts'
import type { AuthenticatedRequest } from '../middleware/auth.ts'

// POST /auth/2fa/setup
// Generates a TOTP secret + QR code. The secret is stored but 2FA stays disabled
// until the user confirms with a valid code via /auth/2fa/enable.
export const setup2FA = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const [user] = await db.select().from(users).where(eq(users.id, req.user!.id))
    if (!user) return res.status(404).json({ error: 'User not found' })
    if (user.twoFactorEnabled) return res.status(400).json({ error: '2FA is already enabled' })

    const secret = generateTotpSecret()
    const otpauthUrl = generateOtpauthUrl(user.email, secret)
    const qrCode = await generateQrCode(otpauthUrl)

    await db.update(users).set({ twoFactorSecret: secret }).where(eq(users.id, user.id))

    res.json({ secret, qrCode, otpauthUrl })
  } catch (error) {
    console.error('2FA setup error:', error)
    res.status(500).json({ error: '2FA setup failed' })
  }
}

// POST /auth/2fa/enable  { code }
// Verifies the TOTP code and activates 2FA.
export const enable2FA = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { code } = req.body
    const [user] = await db.select().from(users).where(eq(users.id, req.user!.id))
    if (!user) return res.status(404).json({ error: 'User not found' })
    if (user.twoFactorEnabled) return res.status(400).json({ error: '2FA is already enabled' })
    if (!user.twoFactorSecret) return res.status(400).json({ error: 'Run /auth/2fa/setup first' })

    if (!verifyTotpCode(code, user.twoFactorSecret)) {
      return res.status(400).json({ error: 'Invalid verification code' })
    }

    await db.update(users).set({ twoFactorEnabled: true }).where(eq(users.id, user.id))
    res.json({ message: '2FA enabled successfully' })
  } catch (error) {
    console.error('2FA enable error:', error)
    res.status(500).json({ error: 'Failed to enable 2FA' })
  }
}

// POST /auth/2fa/disable  { code }
// Verifies the TOTP code and deactivates 2FA, removing the stored secret.
export const disable2FA = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { code } = req.body
    const [user] = await db.select().from(users).where(eq(users.id, req.user!.id))
    if (!user) return res.status(404).json({ error: 'User not found' })
    if (!user.twoFactorEnabled) return res.status(400).json({ error: '2FA is not enabled' })

    if (!verifyTotpCode(code, user.twoFactorSecret!)) {
      return res.status(400).json({ error: 'Invalid verification code' })
    }

    await db
      .update(users)
      .set({ twoFactorEnabled: false, twoFactorSecret: null })
      .where(eq(users.id, user.id))
    res.json({ message: '2FA disabled successfully' })
  } catch (error) {
    console.error('2FA disable error:', error)
    res.status(500).json({ error: 'Failed to disable 2FA' })
  }
}

// POST /auth/2fa/verify-login  { code }
// Second step of login: validates the temp token cookie + TOTP code, sets the full JWT cookie.
export const verifyLogin2FA = async (req: Request, res: Response) => {
  try {
    const { code } = req.body
    const tempToken = req.cookies?.tempToken

    if (!tempToken) {
      return res.status(401).json({ error: 'Missing temp token' })
    }

    const { id: userId } = await verifyTempToken(tempToken)

    const [user] = await db.select().from(users).where(eq(users.id, userId))
    if (!user || !user.twoFactorEnabled || !user.twoFactorSecret) {
      return res.status(400).json({ error: 'Invalid request' })
    }

    if (!verifyTotpCode(code, user.twoFactorSecret)) {
      return res.status(401).json({ error: 'Invalid verification code' })
    }

    const token = await generateToken({
      id: user.id,
      email: user.email,
      username: user.username,
    })

    res.clearCookie('tempToken')
    res.cookie('token', token, {
      httpOnly: true,
      secure: !isDev(),
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    })

    res.json({
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    })
  } catch (error) {
    console.error('2FA verify login error:', error)
    res.status(401).json({ error: 'Invalid or expired token' })
  }
}
