import type { Response } from 'express'
import type { AuthenticatedRequest } from '../middleware/auth.ts'
import { db } from '../db/connection.ts'
import { privateMessages, friendships } from '../db/schema.ts'
import { eq, and, or } from 'drizzle-orm'

const areFriends = async (userId: string, otherId: string): Promise<boolean> => {
  const [friendship] = await db
    .select()
    .from(friendships)
    .where(
      and(
        eq(friendships.status, 'accepted'),
        or(
          and(eq(friendships.userId, userId), eq(friendships.friendId, otherId)),
          and(eq(friendships.userId, otherId), eq(friendships.friendId, userId))
        )
      )
    )
  return !!friendship
}

export const sendMessage = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const senderId = req.user!.id
    const { receiverId, content } = req.body

    if (senderId === receiverId) {
      return res.status(400).json({ error: 'Cannot send a message to yourself' })
    }

    if (!(await areFriends(senderId, receiverId))) {
      return res.status(403).json({ error: 'You can only message friends' })
    }

    const [message] = await db
      .insert(privateMessages)
      .values({ senderId, receiverId, content })
      .returning()

    res.status(201).json({ message })
  } catch (error) {
    console.error('Send message error:', error)
    res.status(500).json({ error: 'Failed to send message' })
  }
}

export const getConversation = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user!.id
    const friendId = req.params.friendId as string

    if (!(await areFriends(userId, friendId))) {
      return res.status(403).json({ error: 'You can only view conversations with friends' })
    }

    const conversation = await db
      .select()
      .from(privateMessages)
      .where(
        or(
          and(eq(privateMessages.senderId, userId), eq(privateMessages.receiverId, friendId)),
          and(eq(privateMessages.senderId, friendId), eq(privateMessages.receiverId, userId))
        )
      )
      .orderBy(privateMessages.createdAt)

    res.json({ messages: conversation })
  } catch (error) {
    console.error('Get conversation error:', error)
    res.status(500).json({ error: 'Failed to fetch conversation' })
  }
}
