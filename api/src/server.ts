import { env, isDev, isTestEnv } from '../env.ts'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/authRoutes.ts'
import userRoutes from './routes/userRoutes.ts'
import friendRoutes from './routes/friendRoutes.ts'
import messageRoutes from './routes/messageRoutes.ts'
import gameRoutes from './routes/gameRoutes.ts'
import morgan from 'morgan'
import { errorHandler, notFound } from './middleware/errorHandler.ts'

const app = express()

app.use(helmet())
app.use(
  cors({
    origin: env.CORS_ORIGIN,
    credentials: true,
  })
)

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(
  morgan('dev', {
    skip: () => isTestEnv(),
  })
)
// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    service: 'Habit Tracker API',
  })
})

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/friends', friendRoutes)
app.use('/api/messages', messageRoutes)
app.use('/api/games', gameRoutes)

// 404 handler
app.use(notFound)

// Global error handler
app.use(errorHandler)

export { app }

export default app
