import { Router } from 'express'
import {
  createGame,
  joinGame,
  getGame,
  sendDrawing,
  getGameDrawings,
  getGameStory,
  saveGameStory,
  saveGameOutcome,
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

const gameCodeParamSchema = z.object({ gameCode: z.string().length(8) })
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

const saveOutcomeSchema = z.object({
  story: z.string().min(1, 'Story is required'),
  winnerUserId: z.string().min(1, 'Winner user id is required'),
})

// Unauthenticated internal routes (backend-to-backend)
router.post('/internal/:gameId/story', validateParams(gameIdParamSchema), validateBody(saveStorySchema), saveGameStory)
router.post('/internal/:gameId/outcome', validateParams(gameIdParamSchema), validateBody(saveOutcomeSchema), saveGameOutcome)

// Authenticated routes
router.use(authenticateToken)

router.get('/', listGames)
router.post('/', createGame)
router.get('/:gameCode', validateParams(gameCodeParamSchema), getGame)
router.post('/:gameCode/drawings', validateParams(gameCodeParamSchema), sendDrawing)
router.get('/:gameCode/drawings', validateParams(gameCodeParamSchema), getGameDrawings)
router.get('/:gameCode/story',  validateParams(gameCodeParamSchema), getGameStory)
router.get('/:gameCode/winner', validateParams(gameCodeParamSchema), getWinner)
router.get('/:gameCode/:playerId', validateParams(gameCodeParamSchema), getPlayer)
router.get('/check/:gameCode/:playerId', validateParams(gameCodeParamSchema), checkIsPlayerInGame)
router.post('/:gameCode/join', validateParams(gameCodeParamSchema), joinGame)
router.post('/removePlayer/:gameCode/:playerId', validateParams(gameCodeParamSchema), removePlayer)
router.put(
  '/:gameCode/status',
  validateParams(gameCodeParamSchema),
  validateBody(updateStatusSchema),
  updateGameStatus
)
router.put(
  '/:gameCode/score',
  validateParams(gameCodeParamSchema),
  validateBody(updateScoreSchema),
  updateScore
)

const sendGameMessageSchema = z.object({
  content: z.string().min(1, 'Message cannot be empty').max(2000),
})

router.post(
  '/:gameCode/messages',
  validateParams(gameCodeParamSchema),
  validateBody(sendGameMessageSchema),
  sendGameMessage
)
router.get('/:gameCode/messages', validateParams(gameCodeParamSchema), getGameMessages)

export default router
