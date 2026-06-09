import { Router } from 'express'
import {
  getProfile,
  updateProfile,
  updateAvatar,
  changePassword,
  getUserStats,
} from '../controllers/userController.ts'
import { authenticateToken } from '../middleware/auth.ts'
import { validateBody } from '../middleware/validation.ts'
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
  firstName: z.string().max(50, 'First name too long').optional(),
  lastName: z.string().max(50, 'Last name too long').optional(),
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

router.get('/stats', getUserStats)
router.get('/profile', getProfile)
router.put('/profile', validateBody(updateProfileSchema), updateProfile)
router.put('/avatar', validateBody(updateAvatarSchema), updateAvatar)
router.put('/password', validateBody(changePasswordSchema), changePassword)

export default router
