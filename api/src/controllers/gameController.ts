import type { Response } from 'express'
import type { AuthenticatedRequest } from '../middleware/auth.ts'
import { db } from '../db/connection.ts'
import { games, gamePlayers, gameMessages, users, weaponDrawings, gameStories } from '../db/schema.ts'
import { eq, and } from 'drizzle-orm'
import type { UUID } from 'crypto'

const isPlayerInGame = async (gameId: string, userId: string): Promise<boolean> => {
  const [player] = await db
    .select()
    .from(gamePlayers)
    .where(and(eq(gamePlayers.gameId, gameId), eq(gamePlayers.userId, userId)))
  return !!player
}

export const checkIsPlayerInGame = async (req: AuthenticatedRequest, res: Response) => {
	try {
		const gameCode = req.params.gameId as string
		const playerId = req.params.playerId as UUID

		const [game] = await db.select().from(games).where(eq(games.code, gameCode))

		if (!game) {
			return res.status(404).json({ error: 'Game not found' })
		}
		const gameId = game.id;

		const [existing] = await db
		.select()
		.from(gamePlayers)
		.where(and(eq(gamePlayers.gameId, gameId), eq(gamePlayers.userId, playerId)))

		if (existing) {
			return res.status(200).json({ isInGame: true })
		}
		return res.status(200).json({ isInGame: false })

	} catch (error) {
		console.error('CheckIsPlayerInGame game error:', error)
		res.status(500).json({ error: 'Failed to check if player in game' })
	}
}

export const createGame = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user!.id

    const code = Math.random().toString(36).substring(2, 10).toUpperCase()
	const [game] = await db.insert(games).values({ status: 'waiting', code, environment: "a city" }).returning()
    await db.insert(gamePlayers).values({ gameId: game.id, userId })

    res.status(200).json({ game })
  } catch (error) {
    console.error('Create game error:', error)
    res.status(500).json({ error: 'Failed to create game' })
  }
}

export const joinGame = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user!.id 
    const gameCode = req.params.gameId as string

    const [game] = await db.select().from(games).where(eq(games.code, gameCode))

    if (!game) {
      return res.status(404).json({ error: 'Game not found' })
    }
	const gameId = game.id;

    if (game.status !== 'waiting') {
      return res.status(400).json({ error: 'Game is not open for joining' })
    }

    const [existing] = await db
      .select()
      .from(gamePlayers)
      .where(and(eq(gamePlayers.gameId, gameId), eq(gamePlayers.userId, userId)))

    if (existing) {
      return res.status(400).json({ error: 'You are already in this game' })
    }

    await db.insert(gamePlayers).values({ gameId, userId })

    res.status(200).json({ message: 'Joined game successfully' })
  } catch (error) {
    console.error('Join game error:', error)
    res.status(500).json({ error: 'Failed to join game' })
  }
}

export const removePlayer = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user!.id 
    const gameCode = req.params.gameId as string
	const playerId = req.params.playerId as UUID

    const [game] = await db.select().from(games).where(eq(games.code, gameCode))

    if (!game) {
      return res.status(404).json({ error: 'Game not found' })
    }
	const gameId = game.id;

    const [existing] = await db
      .select()
      .from(gamePlayers)
      .where(and(eq(gamePlayers.gameId, gameId), eq(gamePlayers.userId, playerId)))
    if (!existing) {
      return res.status(400).json({ error: 'Player not in this game' })
    }

	// Delete his weapon
	await db.delete(weaponDrawings).where(
  		and(eq(weaponDrawings.gameId, gameId), eq(weaponDrawings.userId, playerId))
	)
	await db.delete(gamePlayers).where(
		and(eq(gamePlayers.gameId, gameId), eq(gamePlayers.userId, playerId))
	)

	// Delete the player
	await db.delete(gamePlayers).where(
		and(eq(gamePlayers.gameId, gameId), eq(gamePlayers.userId, playerId))
	)

    res.status(200).json({ message: 'Removed player successfully' })
  } catch (error) {
    console.error('Join game error:', error)
    res.status(500).json({ error: 'Failed to remove player' })
  }
}

export const getGame = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const gameCode = req.params.gameId as string

    const [game] = await db.select().from(games).where(eq(games.code, gameCode))

    if (!game) {
      return res.status(404).json({ error: 'Game not found' })
    }
	const gameId = game.id

    const players = await db
      .select({
        userId: users.id,
        username: users.username,
        avatar: users.avatar,
        score: gamePlayers.score,
        joinedAt: gamePlayers.joinedAt,
      })
      .from(gamePlayers)
      .innerJoin(users, eq(users.id, gamePlayers.userId))
      .where(eq(gamePlayers.gameId, gameId))

    res.json({ game, players })
  } catch (error) {
    console.error('Get game error:', error)
    res.status(500).json({ error: 'Failed to fetch game' })
  }
}

export const getPlayer = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const gameCode = req.params.gameId as string
		const playerId = req.params.playerId as UUID

    const [game] = await db.select().from(games).where(eq(games.code, gameCode))

    if (!game) {
      return res.status(404).json({ error: 'Game not found' })
    }
	  const gameId = game.id

    const [player] = await db
      .select({
        id: gamePlayers.id,
        gameId: gamePlayers.gameId,
        userId: gamePlayers.userId,
        score: gamePlayers.score,
        isWinner: gamePlayers.isWinner,
        joinedAt: gamePlayers.joinedAt,
        username: users.username,
        avatar: users.avatar,
      })
      .from(gamePlayers)
      .innerJoin(users, eq(gamePlayers.userId, users.id))
      .where(
        and(
          eq(gamePlayers.gameId, gameId),
          eq(gamePlayers.userId, playerId)
        )
      )

    res.json({ player })
  } catch (error) {
    console.error('Get game error:', error)
    res.status(500).json({ error: 'Failed to fetch game' })
  }
}

export const getGameDrawings = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const gameCode = req.params.gameId as string

    const [game] = await db.select().from(games).where(eq(games.code, gameCode))
    if (!game) return res.status(404).json({ error: 'Game not found' })

    const drawings = await db
      .select({
        id: weaponDrawings.id,
        userId: weaponDrawings.userId,
        username: users.username,
        drawingData: weaponDrawings.drawingData,
        aiGuessedWeapon: weaponDrawings.aiGuessedWeapon,
        submittedAt: weaponDrawings.submittedAt,
      })
      .from(weaponDrawings)
      .innerJoin(users, eq(weaponDrawings.userId, users.id))
      .where(eq(weaponDrawings.gameId, game.id))

    res.json({ drawings })
  } catch (error) {
    console.error('Get drawings error:', error)
    res.status(500).json({ error: 'Failed to fetch drawings' })
  }
}

export const getGameStory = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const gameCode = req.params.gameId as string

    const [game] = await db.select().from(games).where(eq(games.code, gameCode))
    if (!game) return res.status(404).json({ error: 'Game not found' })

    const [story] = await db
      .select()
      .from(gameStories)
      .where(eq(gameStories.gameId, game.id))

    if (!story)
		return res.status(304).json({ error: 'Story not found' })

    res.json({ story })
  } catch (error) {
    console.error('Get story error:', error)
    res.status(500).json({ error: 'Failed to fetch story' })
  }
}

export const listGames = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const waitingGames = await db.select().from(games).where(eq(games.status, 'waiting'))
    res.json({ games: waitingGames })
  } catch (error) {
    console.error('List games error:', error)
    res.status(500).json({ error: 'Failed to fetch games' })
  }
}

export const updateGameStatus = async (req: AuthenticatedRequest, res: Response) => {
	try {
		const gameCode = req.params.gameId as string
		const { status } = req.body

		const [updated] = await db
		.update(games)
		.set({
			status,
			...(status === 'finished' ? { finishedAt: new Date() } : {}),
		})
		.where(eq(games.code, gameCode))
		.returning()

		if (!updated) {
		return res.status(404).json({ error: 'Game not found' })
		}

		res.json({ game: updated })
	} catch (error) {
		console.error('Update game status error:', error)
		res.status(500).json({ error: 'Failed to update game status' })
	}
}

export const updateScore = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user!.id
    const gameId = req.params.gameId as string
    const { score } = req.body

    const [updated] = await db
      .update(gamePlayers)
      .set({ score })
      .where(and(eq(gamePlayers.gameId, gameId), eq(gamePlayers.userId, userId)))
      .returning()

    if (!updated) {
      return res.status(404).json({ error: 'Player not found in this game' })
    }

    res.json({ player: updated })
  } catch (error) {
    console.error('Update score error:', error)
    res.status(500).json({ error: 'Failed to update score' })
  }
}

export const sendGameMessage = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const senderId = req.user!.id
    const gameId = req.params.gameId as string
    const { content } = req.body

    if (!(await isPlayerInGame(gameId, senderId))) {
      return res.status(403).json({ error: 'You must be a player in this game to send messages' })
    }

    const [message] = await db
      .insert(gameMessages)
      .values({ gameId, senderId, content })
      .returning()

    res.status(201).json({ message })
  } catch (error) {
    console.error('Send game message error:', error)
    res.status(500).json({ error: 'Failed to send game message' })
  }
}

export const getGameMessages = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user!.id
    const gameId = req.params.gameId as string

    if (!(await isPlayerInGame(gameId, userId))) {
      return res.status(403).json({ error: 'You must be a player in this game to view messages' })
    }

    const [game] = await db.select().from(games).where(eq(games.id, gameId))
    if (!game) {
      return res.status(404).json({ error: 'Game not found' })
    }

    const chat = await db
      .select({
        id: gameMessages.id,
        content: gameMessages.content,
        createdAt: gameMessages.createdAt,
        sender: {
          id: users.id,
          username: users.username,
          avatar: users.avatar,
        },
      })
      .from(gameMessages)
      .innerJoin(users, eq(users.id, gameMessages.senderId))
      .where(eq(gameMessages.gameId, gameId))
      .orderBy(gameMessages.createdAt)

    res.json({ messages: chat })
  } catch (error) {
    console.error('Get game messages error:', error)
    res.status(500).json({ error: 'Failed to fetch game messages' })
  }
}

export const sendDrawing = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user!.id
    const gameCode = req.params.gameId as string
    const { drawingData } = req.body

    const [game] = await db.select().from(games).where(eq(games.code, gameCode))
    if (!game) return res.status(404).json({ error: 'Game not found' })

    const [drawing] = await db
      .insert(weaponDrawings)
      .values({ gameId: game.id, userId, drawingData })
      .returning()

    res.status(201).json({ drawing })
  } catch (error) {
    console.error('Submit drawing error:', error)
    res.status(500).json({ error: 'Failed to submit drawing' })
  }
}

export const getWinner = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const gameCode = req.params.gameId as string

      const [game] = await db.select().from(games).where(eq(games.code, gameCode))

      if (!game) {
        return res.status(404).json({ error: 'Game not found' })
      }
      const gameId = game.id;


      const [winner] = await db
        .select()
        .from(gamePlayers)
        .where(and(eq(gamePlayers.gameId, gameId), eq(gamePlayers.isWinner, true)))
      if (!winner) {
        return res.status(400).json({ error: 'No winner in game' })
      }

      res.json({ winner })
    } catch (error) {
      console.error('Join game error:', error)
      res.status(500).json({ error: 'Failed to get winner' })
    }
}