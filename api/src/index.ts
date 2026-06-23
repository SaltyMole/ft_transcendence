import { env } from '../env.ts'
import https from 'node:https'
import fs from 'node:fs'
import path from 'node:path'
import app from './server.ts'
import { setupWebSocket } from './websocket.ts'

const certsDir = path.join(import.meta.dirname, '../certs')

const server = https.createServer(
  {
    key: fs.readFileSync(path.join(certsDir, 'key.pem')),
    cert: fs.readFileSync(path.join(certsDir, 'cert.pem')),
  },
  app
)

setupWebSocket(server)

server.listen(env.PORT, () => {
  console.log(`Server running on https://localhost:${env.PORT}`)
  console.log(`Environment: ${env.APP_STAGE}`)
  console.log(`WebSocket ready on wss://localhost:${env.PORT}`)
})
