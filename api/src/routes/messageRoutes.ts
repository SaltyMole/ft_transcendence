import { Router } from 'express'
import { sendMessage, getConversation } from '../controllers/messageController.ts'
import { authenticateToken } from '../middleware/auth.ts'
import { validateBody, validateParams } from '../middleware/validation.ts'
import { z } from 'zod'

const router = Router()

router.use(authenticateToken)

const sendMessageSchema = z.object({
  receiverId: z.uuid(),
  content: z.string().min(1, 'Message cannot be empty').max(2000),
})

const friendIdParamSchema = z.object({ friendId: z.uuid() })

router.post('/', validateBody(sendMessageSchema), sendMessage)
router.get('/:friendId', validateParams(friendIdParamSchema), getConversation)

export default router
