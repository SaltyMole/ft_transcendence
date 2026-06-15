import { env } from '../env.ts'
import http from 'http'
import app from './server.ts'
import { setupWebSocket } from './websocket.ts'

const server = http.createServer(app)

setupWebSocket(server)

server.listen(env.PORT, () => {
  console.log(`Server running on port ${env.PORT}`)
  console.log(`Environment: ${env.APP_STAGE}`)
  console.log(`WebSocket ready on ws://localhost:${env.PORT}`)
})
