import type { Server } from 'node:https'
import { WebSocket, WebSocketServer } from 'ws'
import { verifyToken } from './utils/jwt.ts'
import { db } from './db/connection.ts'
import { privateMessages, friendships } from './db/schema.ts'
import { eq, and, or } from 'drizzle-orm'

type GameSocket = WebSocket & {
  currentRoom: string | null
  username: string | null
  userId: string | null
}

const rooms: Record<string, Set<WebSocket>> = {}

// Map userId → set of connected sockets (a user can have multiple tabs)
const connectedUsers = new Map<string, Set<GameSocket>>()

function registerUser(ws: GameSocket, userId: string) {
  if (!connectedUsers.has(userId)) connectedUsers.set(userId, new Set())
  connectedUsers.get(userId)!.add(ws)
}

function unregisterUser(ws: GameSocket) {
  if (!ws.userId) return
  const sockets = connectedUsers.get(ws.userId)
  if (!sockets) return
  sockets.delete(ws)
  if (sockets.size === 0) connectedUsers.delete(ws.userId)
}

function sendToUser(userId: string, data: object) {
  const sockets = connectedUsers.get(userId)
  if (!sockets) return
  const payload = JSON.stringify(data)
  sockets.forEach((s) => {
    if (s.readyState === WebSocket.OPEN) s.send(payload)
  })
}

async function areFriends(userId: string, otherId: string): Promise<boolean> {
  const [friendship] = await db
    .select()
    .from(friendships)
    .where(
      and(
        eq(friendships.status, 'accepted'),
        or(
          and(eq(friendships.userId, userId), eq(friendships.friendId, otherId)),
          and(eq(friendships.userId, otherId), eq(friendships.friendId, userId))
        )
      )
    )
  return !!friendship
}

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
    ws.userId = null

    ws.on('message', (raw) => {
      let msg: {
        type: string
        gameID?: string
        username?: string
        text?: string
        token?: string
        receiverId?: string
        content?: string
      }

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

        case 'dm_auth': {
          const { token } = msg
          if (!token) {
            ws.send(JSON.stringify({ type: 'error', text: 'token is required for dm_auth' }))
            return
          }
          verifyToken(token)
            .then((user) => {
              ws.userId = user.id
              ws.username = user.username
              registerUser(ws, user.id)
              ws.send(JSON.stringify({ type: 'dm_ready', userId: user.id, username: user.username }))
              console.log(`${user.username} authenticated for DMs`)
            })
            .catch(() => {
              ws.send(JSON.stringify({ type: 'error', text: 'Invalid or expired token' }))
            })
          break
        }

        case 'dm_send': {
          if (!ws.userId) {
            ws.send(JSON.stringify({ type: 'error', text: 'Authenticate with dm_auth first' }))
            return
          }
          const { receiverId, content } = msg
          if (!receiverId || !content) {
            ws.send(JSON.stringify({ type: 'error', text: 'receiverId and content are required' }))
            return
          }
          if (receiverId === ws.userId) {
            ws.send(JSON.stringify({ type: 'error', text: 'Cannot send a message to yourself' }))
            return
          }
          areFriends(ws.userId, receiverId)
            .then(async (friends) => {
              if (!friends) {
                ws.send(JSON.stringify({ type: 'error', text: 'You can only message friends' }))
                return
              }
              const [saved] = await db
                .insert(privateMessages)
                .values({ senderId: ws.userId!, receiverId, content })
                .returning()

              const outgoing = {
                type: 'dm_message',
                id: saved.id,
                senderId: saved.senderId,
                from: ws.username,
                content: saved.content,
                createdAt: saved.createdAt.toISOString(),
              }
              sendToUser(receiverId, outgoing)
              ws.send(JSON.stringify({ ...outgoing, self: true, type: 'dm_sent' }))
            })
            .catch((err) => {
              console.error('dm_send error:', err)
              ws.send(JSON.stringify({ type: 'error', text: 'Failed to send message' }))
            })
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
      unregisterUser(ws)
      console.log(`${ws.username ?? 'Client'} disconnected`)
    })
  })
}
