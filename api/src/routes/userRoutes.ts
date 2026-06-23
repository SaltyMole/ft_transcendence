import { Router } from 'express'
import {
  getMyProfile,
  getUserProfile,
  getUserFriends,
  updateProfile,
  updateAvatar,
  changePassword,
  deleteAccount,
  getUserStats,
  getUserOnlineStatus,
  updateBio
} from '../controllers/userController.ts'
import { authenticateToken } from '../middleware/auth.ts'
import { validateBody, validateParams } from '../middleware/validation.ts'
import { z } from 'zod'

const router = Router()



router.use(authenticateToken)


const updateProfileSchema = z.object({
  email: z.email('Invalid email format').optional(),
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(50, 'Username too long')
    .optional(),
})

const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z
            .string()
            .min(8, 'Password must be at least 8 characters')
            .max(50, 'Password must be at max 50 characters')
            .refine((password) => /[A-Z]/.test(password), 'Password must have at least 1 uppercase')
            .refine((password) => /[a-z]/.test(password), 'Password must have at least 1 lowercase')
            .refine((password) => /[0-9]/.test(password), 'Password must have at least 1 digit')
            .refine((password) => /[!@#$%^&*]/.test(password), 'Password must have at least 1 special character'),
})


const updateAvatarSchema = z.object({
  avatar: z.string().min(1, 'Avatar cannot be empty'),
})

const userIdSchema = z.object({
  id: z.uuid() 
})

const updateBioSchema = z.object({
  bio : z.string().max(140, 'Bio must be at max 140 characters')
})

router.get('/:id/stats', validateParams(userIdSchema), getUserStats)
router.get('/:id/status', validateParams(userIdSchema), getUserOnlineStatus)
router.get('/profile', getMyProfile)
router.get('/:id/profile', validateParams(userIdSchema), getUserProfile)
router.get('/:id/friends', validateParams(userIdSchema), getUserFriends)
router.put('/profile', validateBody(updateProfileSchema), updateProfile)
router.put('/avatar', validateBody(updateAvatarSchema), updateAvatar)
router.put('/password', validateBody(changePasswordSchema), changePassword)
router.delete('/', deleteAccount)
router.put('/profile', validateBody(updateBioSchema), updateBio)

export default router
