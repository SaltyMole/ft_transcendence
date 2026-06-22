import { Router } from 'express'
import {
  createGame,
  joinGame,
  getGame,
  sendDrawing,
  getGameDrawings,
  getGameStory,
  saveGameStory,
  listGames,
  updateGameStatus,
  updateScore,
  sendGameMessage,
  getGameMessages,
  getWinner,
  getPlayer,
  checkIsPlayerInGame,
  removePlayer,
} from '../controllers/gameController.ts'
import { authenticateToken } from '../middleware/auth.ts'
import { validateBody, validateParams } from '../middleware/validation.ts'
import { z } from 'zod'

const router = Router()

const gameIdParamSchema = z.object({ gameId: z.string().length(8) })

const updateStatusSchema = z.object({
  status: z.enum(['in_progress', 'finished']),
})

const updateScoreSchema = z.object({
  score: z.number().int().min(0),
})

const saveStorySchema = z.object({
  story: z.string().min(1, 'Story is required'),
})

router.post('/internal/:gameId/story', validateParams(gameIdParamSchema), validateBody(saveStorySchema), saveGameStory)

router.use(authenticateToken)

router.get('/', listGames)
router.post('/', createGame)
router.get('/:gameId', validateParams(gameIdParamSchema), getGame)
router.post('/:gameId/drawings', authenticateToken, validateParams(gameIdParamSchema), sendDrawing)
router.get('/:gameId/drawings', authenticateToken, validateParams(gameIdParamSchema), getGameDrawings)
router.get('/:gameId/story', authenticateToken, validateParams(gameIdParamSchema), getGameStory)
router.get('/:gameId/winner', validateParams(gameIdParamSchema), getWinner)
router.get('/:gameId/:playerId', validateParams(gameIdParamSchema), getPlayer)
router.get('/check/:gameId/:playerId', validateParams(gameIdParamSchema), checkIsPlayerInGame)
router.post('/:gameId/join', validateParams(gameIdParamSchema), joinGame)
router.post('/removePlayer/:gameId/:playerId', authenticateToken, validateParams(gameIdParamSchema), removePlayer)
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
