import type { Response } from 'express'
import type { AuthenticatedRequest } from '../middleware/auth.ts'
import { db } from '../db/connection.ts'
import { friendships, users } from '../db/schema.ts'
import { eq, and, or, ilike, ne, inArray } from 'drizzle-orm'

export const searchUsersByUsername = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user!.id
    const username = (req.query.username as string | undefined)?.trim()

    if (!username || username.length < 2) {
      return res.json({ users: [] })
    }

    const foundUsers = await db
      .select({
        id: users.id,
        username: users.username,
        avatar: users.avatar,
      })
      .from(users)
      .where(and(ilike(users.username, `%${username}%`), ne(users.id, userId)))
      .limit(20)

    if (foundUsers.length === 0) {
      return res.json({ users: [] })
    }

    const candidateIds = foundUsers.map((user) => user.id)
    const existingFriendships = await db
      .select({
        id: friendships.id,
        userId: friendships.userId,
        friendId: friendships.friendId,
        status: friendships.status,
      })
      .from(friendships)
      .where(
        and(
          or(eq(friendships.userId, userId), eq(friendships.friendId, userId)),
          or(inArray(friendships.userId, candidateIds), inArray(friendships.friendId, candidateIds))
        )
      )

    const usersWithRelationship = foundUsers.map((user) => {
      const relationship = existingFriendships.find((friendship) => {
        const otherUserId = friendship.userId === userId ? friendship.friendId : friendship.userId
        return otherUserId === user.id
      })

      return {
        ...user,
        friendshipId: relationship?.id ?? null,
        status: relationship?.status ?? 'none',
        requestDirection: relationship
          ? relationship.userId === userId
            ? 'outgoing'
            : 'incoming'
          : null,
      }
    })

    res.json({ users: usersWithRelationship })
  } catch (error) {
    console.error('Search users error:', error)
    res.status(500).json({ error: 'Failed to search users' })
  }
}

export const sendFriendRequest = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user!.id
    const { friendId } = req.body

    if (userId === friendId) {
      return res.status(400).json({ error: 'Cannot send a friend request to yourself' })
    }

    const [friend] = await db.select({ id: users.id }).from(users).where(eq(users.id, friendId))
    if (!friend) {
      return res.status(404).json({ error: 'User not found' })
    }

    const [existing] = await db
      .select()
      .from(friendships)
      .where(
        or(
          and(eq(friendships.userId, userId), eq(friendships.friendId, friendId)),
          and(eq(friendships.userId, friendId), eq(friendships.friendId, userId))
        )
      )

    if (existing) {
      return res.status(400).json({ error: 'A friend request already exists between these users' })
    }

    const [friendship] = await db
      .insert(friendships)
      .values({ userId, friendId, status: 'pending' })
      .returning()

    res.status(201).json({ friendship })
  } catch (error) {
    console.error('Send friend request error:', error)
    res.status(500).json({ error: 'Failed to send friend request' })
  }
}

export const respondToFriendRequest = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user!.id
    const friendshipId = req.params.friendshipId as string
    const { status } = req.body

    const [friendship] = await db
      .select()
      .from(friendships)
      .where(and(eq(friendships.id, friendshipId), eq(friendships.friendId, userId)))

    if (!friendship) {
      return res.status(404).json({ error: 'Friend request not found' })
    }

    if (friendship.status !== 'pending') {
      return res.status(400).json({ error: 'This request has already been answered' })
    }

    const [updated] = await db
      .update(friendships)
      .set({ status })
      .where(eq(friendships.id, friendshipId))
      .returning()

    res.json({ friendship: updated })
  } catch (error) {
    console.error('Respond to friend request error:', error)
    res.status(500).json({ error: 'Failed to respond to friend request' })
  }
}

export const getFriends = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user!.id

    // Get friendships where user is either side and status is accepted
    const rows = await db
      .select({
        friendshipId: friendships.id,
        since: friendships.createdAt,
        id: users.id,
        username: users.username,
        avatar: users.avatar,
        // which side the current user is on
        initiatorId: friendships.userId,
      })
      .from(friendships)
      .innerJoin(users, or(
        and(eq(friendships.userId, userId), eq(users.id, friendships.friendId)),
        and(eq(friendships.friendId, userId), eq(users.id, friendships.userId))
      ))
      .where(
        and(
          eq(friendships.status, 'accepted'),
          or(eq(friendships.userId, userId), eq(friendships.friendId, userId))
        )
      )

    const friends = rows.map(({ initiatorId: _i, ...rest }) => rest)
    res.json({ friends })
  } catch (error) {
    console.error('Get friends error:', error)
    res.status(500).json({ error: 'Failed to fetch friends' })
  }
}

export const getPendingRequests = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user!.id

    const requests = await db
      .select({
        friendshipId: friendships.id,
        createdAt: friendships.createdAt,
        from: {
          id: users.id,
          username: users.username,
          avatar: users.avatar,
        },
      })
      .from(friendships)
      .innerJoin(users, eq(users.id, friendships.userId))
      .where(and(eq(friendships.friendId, userId), eq(friendships.status, 'pending')))

    res.json({ requests })
  } catch (error) {
    console.error('Get pending requests error:', error)
    res.status(500).json({ error: 'Failed to fetch friend requests' })
  }
}

export const removeFriend = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user!.id
    const friendshipId = req.params.friendshipId as string

    const [friendship] = await db
      .select()
      .from(friendships)
      .where(
        and(
          eq(friendships.id, friendshipId),
          or(eq(friendships.userId, userId), eq(friendships.friendId, userId))
        )
      )

    if (!friendship) {
      return res.status(404).json({ error: 'Friendship not found' })
    }

    await db.delete(friendships).where(eq(friendships.id, friendshipId))

    res.json({ message: 'Friend removed successfully' })
  } catch (error) {
    console.error('Remove friend error:', error)
    res.status(500).json({ error: 'Failed to remove friend' })
  }
}
