import type { Request, Response, NextFunction } from 'express'
import { verifyToken, type JwtPayload } from '../utils/jwt.ts'

export interface AuthenticatedRequest extends Request {
  user?: JwtPayload
  body: Record<string, any>
}

export const authenticateToken = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {

	// DEV FAKE BEGIN
    const token = req.cookies?.token
	// const token = req.cookies?.token ?? req.headers.authorization?.split(' ')[1]
	// DEV FAKE END

    if (!token) {
      return res.status(401).json({ error: 'Access token required' })
    }

    const payload = await verifyToken(token)
    req.user = payload
    next()
  } catch (err) {
    return res.status(403).json({ error: 'Invalid or expired token' })
  }
}
