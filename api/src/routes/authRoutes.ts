import { Router } from 'express'
import { register, login, logout } from '../controllers/authController.ts'
import { setup2FA, enable2FA, disable2FA, verifyLogin2FA } from '../controllers/twoFactorController.ts'
import { validateBody } from '../middleware/validation.ts'
import { authenticateToken } from '../middleware/auth.ts'
import { z } from 'zod'

const router = Router()

// Validation schemas
const registerSchema = z.object({
  email: z.email('Invalid email format'),
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(50, 'Username too long'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
})

const loginSchema = z.object({
  email: z.email('Invalid email format'),
  password: z.string().min(1, 'Password is required'),
})

const totpCodeSchema = z.object({
  code: z.string().length(6, 'TOTP code must be 6 digits').regex(/^\d+$/, 'TOTP code must be numeric'),
})

const verifyLoginSchema = z.object({
  code: z.string().length(6).regex(/^\d+$/),
})

// Auth routes
router.post('/register', validateBody(registerSchema), register)
router.post('/login', validateBody(loginSchema), login)
router.post('/logout', logout)

// 2FA routes
router.post('/2fa/setup', authenticateToken, setup2FA)
router.post('/2fa/enable', authenticateToken, validateBody(totpCodeSchema), enable2FA)
router.post('/2fa/disable', authenticateToken, validateBody(totpCodeSchema), disable2FA)
router.post('/2fa/verify-login', validateBody(verifyLoginSchema), verifyLogin2FA)

export default router
