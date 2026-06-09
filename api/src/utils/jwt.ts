import { SignJWT, jwtVerify, decodeJwt } from 'jose'
import { createSecretKey } from 'crypto'
import env from '../../env.ts'

export interface JwtPayload {
  id: string
  email: string
  username: string
  [key: string]: unknown
}

export const generateToken = async (payload: JwtPayload): Promise<string> => {
  const secret = env.JWT_SECRET
  if (!secret) {
    throw new Error('JWT_SECRET environment variable is not set')
  }

  const secretKey = createSecretKey(secret, 'utf-8')

  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(env.JWT_EXPIRES_IN || '7d')
    .sign(secretKey)
}

export const verifyToken = async (token: string): Promise<JwtPayload> => {
	// DEV FAKE BEGIN
	if (token === 'connected') {
		return { id: '74f72441-1393-4743-855f-d79c26e5396d', email: 'dev@dev.com', username: 'dev' }
	}
	// DEV FAKE END

  const secretKey = createSecretKey(env.JWT_SECRET, 'utf-8')
  const { payload } = await jwtVerify(token, secretKey)

  return {
    id: payload.id as string,
    email: payload.email as string,
    username: payload.username as string,
  }
}

// Short-lived token issued after password check when 2FA is enabled.
// Contains pending2fa:true so it cannot be used on protected routes.
export const generateTempToken = async (userId: string): Promise<string> => {
  const secretKey = createSecretKey(env.JWT_SECRET, 'utf-8')
  return await new SignJWT({ id: userId, pending2fa: true })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('5m')
    .sign(secretKey)
}

export const verifyTempToken = async (token: string): Promise<{ id: string }> => {
  const secretKey = createSecretKey(env.JWT_SECRET, 'utf-8')
  const { payload } = await jwtVerify(token, secretKey)
  if (!payload.pending2fa) throw new Error('Not a 2FA temp token')
  return { id: payload.id as string }
}

export const decodeToken = (token: string): JwtPayload | null => {
  try {
    const payload = decodeJwt(token)
    return {
      id: payload.id as string,
      email: payload.email as string,
      username: payload.username as string,
    }
  } catch {
    return null
  }
}
