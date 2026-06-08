import { Router } from 'express'
import {
  sendFriendRequest,
  respondToFriendRequest,
  getFriends,
  getPendingRequests,
  removeFriend,
} from '../controllers/friendController.ts'
import { authenticateToken } from '../middleware/auth.ts'
import { validateBody, validateParams } from '../middleware/validation.ts'
import { z } from 'zod'

const router = Router()

router.use(authenticateToken)

const friendIdSchema = z.object({ friendId: z.string().uuid() })
const respondSchema = z.object({ status: z.enum(['accepted', 'rejected']) })
const friendshipIdParamSchema = z.object({ friendshipId: z.string().uuid() })

router.get('/', getFriends)
router.get('/requests', getPendingRequests)
router.post('/request', validateBody(friendIdSchema), sendFriendRequest)
router.put(
  '/:friendshipId/respond',
  validateParams(friendshipIdParamSchema),
  validateBody(respondSchema),
  respondToFriendRequest
)
router.delete('/:friendshipId', validateParams(friendshipIdParamSchema), removeFriend)

export default router
