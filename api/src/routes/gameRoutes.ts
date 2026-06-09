import { Router } from 'express'
import {
  createGame,
  joinGame,
  getGame,
  listGames,
  updateGameStatus,
  updateScore,
  sendGameMessage,
  getGameMessages,
} from '../controllers/gameController.ts'
import { authenticateToken } from '../middleware/auth.ts'
import { validateBody, validateParams } from '../middleware/validation.ts'
import { z } from 'zod'

const router = Router()

router.use(authenticateToken)

const gameIdParamSchema = z.object({ gameId: z.string().length(8) })

const updateStatusSchema = z.object({
  status: z.enum(['in_progress', 'finished']),
})

const updateScoreSchema = z.object({
  score: z.number().int().min(0),
})

router.get('/', listGames)
router.post('/', createGame)
router.get('/:gameId', validateParams(gameIdParamSchema), getGame)
router.post('/:gameId/join', validateParams(gameIdParamSchema), joinGame)
router.put(
  '/:gameId/status',
  validateParams(gameIdParamSchema),
  validateBody(updateStatusSchema),
  updateGameStatus
)
router.put(
  '/:gameId/score',
  validateParams(gameIdParamSchema),
  validateBody(updateScoreSchema),
  updateScore
)

const sendGameMessageSchema = z.object({
  content: z.string().min(1, 'Message cannot be empty').max(2000),
})

router.post(
  '/:gameId/messages',
  validateParams(gameIdParamSchema),
  validateBody(sendGameMessageSchema),
  sendGameMessage
)
router.get('/:gameId/messages', validateParams(gameIdParamSchema), getGameMessages)

export default router
