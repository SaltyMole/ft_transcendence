import type { Server } from 'http'
import { WebSocket, WebSocketServer } from 'ws'

type GameSocket = WebSocket & { currentRoom: string | null; username: string | null }

const rooms: Record<string, Set<WebSocket>> = {}

function broadcastToRoom(gameID: string, data: object, senderWs: WebSocket | null = null) {
  const room = rooms[gameID]
  if (!room) return

  const payload = JSON.stringify(data)
  room.forEach((client) => {
    if (client.readyState === WebSocket.OPEN && client !== senderWs) {
      client.send(payload)
    }
  })
}

export function setupWebSocket(server: Server) {
  const wss = new WebSocketServer({ server })

  wss.on('connection', (rawWs) => {
    console.log('Client connected')
    const ws = rawWs as GameSocket
    ws.currentRoom = null
    ws.username = null

    ws.on('message', (raw) => {
      let msg: { type: string; gameID?: string; username?: string; text?: string }

      try {
        msg = JSON.parse(raw.toString())
      } catch {
        ws.send(JSON.stringify({ type: 'error', text: 'Invalid JSON' }))
        return
      }

      switch (msg.type) {
        case 'join': {
          const { gameID, username } = msg

          if (!gameID || !username) {
            ws.send(JSON.stringify({ type: 'error', text: 'gameID and username are required' }))
            return
          }

          if (ws.currentRoom && rooms[ws.currentRoom]) {
            rooms[ws.currentRoom].delete(ws)
            broadcastToRoom(ws.currentRoom, {
              type: 'system',
              text: `${ws.username} left the room`,
              gameID: ws.currentRoom,
            })
          }

          if (!rooms[gameID]) rooms[gameID] = new Set()
          rooms[gameID].add(ws)
          ws.currentRoom = gameID
          ws.username = username

          ws.send(JSON.stringify({ type: 'joined', gameID, username }))
          console.log(`${username} joined room: ${gameID}`)
          break
        }

        case 'chat': {
          if (!ws.currentRoom) {
            ws.send(JSON.stringify({ type: 'error', text: 'Join a room first' }))
            return
          }

          const payload = {
            type: 'chat',
            gameID: ws.currentRoom,
            from: ws.username,
            text: msg.text,
            timestamp: new Date().toISOString(),
          }

          broadcastToRoom(ws.currentRoom, payload, ws)
          ws.send(JSON.stringify({ ...payload, self: true }))
          break
        }

        default:
          ws.send(JSON.stringify({ type: 'error', text: `Unknown type: ${msg.type}` }))
      }
    })

    ws.on('close', () => {
      if (ws.currentRoom && rooms[ws.currentRoom]) {
        rooms[ws.currentRoom].delete(ws)
      }
      console.log(`${ws.username ?? 'Client'} disconnected`)
    })
  })
}
