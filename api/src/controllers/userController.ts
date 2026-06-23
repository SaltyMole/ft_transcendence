import type { Response } from 'express'
import type { AuthenticatedRequest } from '../middleware/auth.ts'
import { db } from '../db/connection.ts'
import { users, gamePlayers, friendships } from '../db/schema.ts'
import { eq, and, or, count, sum } from 'drizzle-orm'
import bcrypt from 'bcrypt'
import { isUserOnline } from '../websocket.ts'

export const getMyProfile = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user!.id

    const [user] = await db
      .select({
        id: users.id,
        email: users.email,
        username: users.username,
        avatar: users.avatar,
        bio: users.bio,
        twoFactorEnabled: users.twoFactorEnabled,
        createdAt: users.createdAt,
        updatedAt: users.updatedAt,
      })
      .from(users)
      .where(eq(users.id, userId))

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    res.json({ user })
  } catch (error) {
    console.error('Get profile error:', error)
    res.status(500).json({ error: 'Failed to fetch profile' })
  }
}

export const getUserProfile = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const  userId = req.params.id as string

    const [user] = await db
      .select({
        id: users.id,
        username: users.username,
        bio: users.bio,
        avatar: users.avatar,
        createdAt: users.createdAt,
      })
      .from(users)
      .where(eq(users.id, userId))

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    res.json(user)
  } catch (error) {
    console.error('Get profile error:', error)
    res.status(500).json({ error: 'Failed to fetch profile' })
  }
}

export const updateProfile = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const userId = req.user!.id
    const { email, username } = req.body

    if (email) {
      const [existingUser] = await db.select().from(users).where(eq(users.email, email))
      if (existingUser && existingUser.id !== userId) {
        return res.status(400).json({
          error: 'Validation failed',
          details: [
            {
              field: 'email',
              message: 'Email already exists',
            },
          ],
        })
      }
    }

    if (username) {
    const [existingUser] = await db.select().from(users).where(eq(users.username, username))
    if (existingUser && existingUser.id !== userId) {
      return res.status(400).json({
        error: 'Validation failed',
        details: [
          {
            field: 'username',
            message: 'Username already exists',
          },
        ],
      })
    }
  }

    const [updatedUser] = await db
      .update(users)
      .set({
        email,
        username,
        updatedAt: new Date(),
      })
      .where(eq(users.id, userId))
      .returning({
        id: users.id,
        email: users.email,
        username: users.username,
        updatedAt: users.updatedAt,
      })

    res.json({
      message: 'Profile updated successfully',
      user: updatedUser,
    })
  } catch (error) {
    console.error('Update profile error:', error)
    res.status(500).json({ error: 'Failed to update profile' })
  }
}

export const updateAvatar = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user!.id
    const { avatar } = req.body

    const [updatedUser] = await db
      .update(users)
      .set({ avatar, updatedAt: new Date() })
      .where(eq(users.id, userId))
      .returning({ id: users.id, avatar: users.avatar })

    res.json({ message: 'Avatar updated successfully', user: updatedUser })
  } catch (error) {
    console.error('Update avatar error:', error)
    res.status(500).json({ error: 'Failed to update avatar' })
  }
}

export const getUserStats = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const  userId = req.params.id as string

    const [gameStats] = await db
      .select({
        totalGames: count(),
        totalScore: sum(gamePlayers.score),
      })
      .from(gamePlayers)
      .where(eq(gamePlayers.userId, userId))

    const [winStats] = await db
      .select({ wins: count() })
      .from(gamePlayers)
      .where(and(eq(gamePlayers.userId, userId), eq(gamePlayers.isWinner, true)))

    const [friendStats] = await db
      .select({ friendCount: count() })
      .from(friendships)
      .where(
        and(
          eq(friendships.status, 'accepted'),
          or(eq(friendships.userId, userId), eq(friendships.friendId, userId))
        )
      )

    const total = Number(gameStats.totalGames) || 0
    const wins = Number(winStats.wins) || 0
    const totalScore = Number(gameStats.totalScore) || 0

    res.json({
      stats: {
        gamesPlayed: total,
        wins,
        losses: total - wins,
        winRate: total > 0 ? Math.round((wins / total) * 100) : 0,
        totalScore,
        averageScore: total > 0 ? Math.round(totalScore / total) : 0,
        friendCount: Number(friendStats.friendCount) || 0,
      },
    })
  } catch (error) {
    console.error('Get user stats error:', error)
    res.status(500).json({ error: 'Failed to fetch stats' })
  }
}

export const changePassword = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const userId = req.user!.id
    const { currentPassword, newPassword } = req.body

    // Get current user with password
    const [user] = await db.select().from(users).where(eq(users.id, userId))

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    // Verify current password
    const isValidPassword = await bcrypt.compare(currentPassword, user.password)

    if (!isValidPassword) {
      return res.status(400).json({ error: 'Current password is incorrect' })
    }

    // Hash new password
    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || '12')
    const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds)

    // Update password
    await db
      .update(users)
      .set({
        password: hashedNewPassword,
        updatedAt: new Date(),
      })
      .where(eq(users.id, userId))

    res.json({
      message: 'Password changed successfully',
    })
  } catch (error) {
    console.error('Change password error:', error)
    res.status(500).json({ error: 'Failed to change password' })
  }
}

export const updateBio = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user!.id
    const { bio } = req.body
    const [updatedUser] = await db
      .update(users)
      .set({ bio, updatedAt: new Date() })
      .where(eq(users.id, userId))
      .returning({ id: users.id, bio: users.bio })

    res.json({ message: 'Bio updated successfully', user: updatedUser })
  } catch (error) {
    console.error('Update avatar error:', error)
    res.status(500).json({ error: 'Failed to update bio' })
  }
}

export const getUserOnlineStatus = (req: AuthenticatedRequest, res: Response) => {
  const userId = req.params.id as string
  res.json({ userId, online: isUserOnline(userId) })
}

export const deleteAccount = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user!.id
    await db.delete(users).where(eq(users.id, userId))
    res.clearCookie('token')
    res.json({ message: 'Account deleted successfully' })
  } catch (error) {
    console.error('Delete account error:', error)
    res.status(500).json({ error: 'Failed to delete account' })
  }
}
