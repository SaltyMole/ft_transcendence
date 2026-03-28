import { useRef, useState, useEffect } from 'react'
import { Layer, Line, Rect, Stage } from 'react-konva'
import type { Stage as KonvaStage } from 'konva/lib/Stage'
import { io, Socket } from 'socket.io-client'
import './App.css'

type DrawLine = {
  color: string
  points: number[]
}
const BACKEND_BASE_URL = `http://${window.location.hostname}:3000`

function App() {
  const [color, setColor] = useState('#d400ff')
  const [status, setStatus] = useState('')
  const [lines, setLines] = useState<DrawLine[]>([])
  const [isDrawing, setIsDrawing] = useState(false)
  const stageRef = useRef<KonvaStage | null>(null)
  const socketRef = useRef<Socket | null>(null)

  // Connect once when the component mounts.
  useEffect(() => {
    const socket = io(BACKEND_BASE_URL, {
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5,
    })

    socketRef.current = socket

    socket.on('connect', () => {
      setStatus('Connected to server')
    })

    socket.on('load', (initialLines: DrawLine[]) => {
      setLines(initialLines)
    })

    socket.on('draw', (payload: { index: number; line: DrawLine }) => {
      setLines((previous) => {
        const next = [...previous]
        if (payload.index >= 0 && payload.index < next.length) {
          next[payload.index] = payload.line
        } else {
          next.push(payload.line)
        }
        return next
      })
    })

    socket.on('clear', () => {
      setLines([])
    })

    socket.on('disconnect', () => {
      setStatus('Disconnected from server')
    })

    return () => {
      socket.disconnect()
    }
  }, [])

  const getPointerPosition = () => {
    const stage = stageRef.current
    if (!stage) {
      return null
    }

    return stage.getPointerPosition()
  }

  const handlePointerDown = () => {
    const pointer = getPointerPosition()
    if (!pointer) {
      return
    }

    setIsDrawing(true)
    setLines((previous) => {
      return [...previous, { color, points: [pointer.x, pointer.y] }]
    })
  }

  const handlePointerMove = () => {
    if (!isDrawing) {
      return
    }

    const pointer = getPointerPosition()
    if (!pointer) {
      return
    }

    setLines((previous) => {
      if (previous.length === 0) {
        return previous
      }

      const next = [...previous]
      const lastIndex = next.length - 1
      const last = next[lastIndex]

      next[lastIndex] = {
        ...last,
        points: [...last.points, pointer.x, pointer.y],
      }

      // Broadcast while drawing so everyone sees updates live.
      socketRef.current?.emit('draw-update', {
        index: lastIndex,
        line: next[lastIndex],
      })

      return next
    })
  }

  const handlePointerUp = () => {
    if (isDrawing && lines.length > 0) {
      const lastIndex = lines.length - 1
      const lastLine = lines[lastIndex]
      socketRef.current?.emit('draw-finish', {
        index: lastIndex,
        line: lastLine,
      })
    }
    setIsDrawing(false)
  }

  const saveImage = async () => {
    if (!stageRef.current) {
      return
    }

    setStatus('Saving...')

    try {
      const imageDataUrl = stageRef.current.toDataURL({ pixelRatio: 1 })

      const response = await fetch(`${BACKEND_BASE_URL}/images`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageDataUrl }),
      })

      const data = await response.json()
      if (!response.ok || !data.ok) {
        throw new Error(data.message || 'Failed to save image')
      }

      setStatus(`Image created: ${data.relativePath}`)
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error'
      setStatus(`Failed: ${message}`)
    }
  }

  const handleClear = () => {
    setLines([])
    socketRef.current?.emit('clear')
  }

  return (
    <main className="page">
      <h1>En Sah ==!</h1>

      <label className="row">
        Color:
        <input
          type="color"
          value={color}
          onChange={(event) => setColor(event.target.value)}
        />
      </label>

      <div className="row">
        <button
          type="button"
          onClick={handleClear}
          aria-label="Clear"
          title="Clear"
        >
          Clear
        </button>
      </div>

      <div className="canvas">
        <Stage
          width={400}
          height={300}
          ref={stageRef}
          onMouseDown={handlePointerDown}
          onMouseMove={handlePointerMove}
          onMouseUp={handlePointerUp}
          onMouseLeave={handlePointerUp}
          onTouchStart={handlePointerDown}
          onTouchMove={handlePointerMove}
          onTouchEnd={handlePointerUp}
        >
          <Layer>
            <Rect x={0} y={0} width={400} height={300} fill="#ffffff" />
            {lines.map((line, index) => (
              <Line
                key={index}
                points={line.points}
                stroke={line.color}
                strokeWidth={4}
                lineCap="round"
                lineJoin="round"
                tension={0.5}
              />
            ))}
          </Layer>
        </Stage>
      </div>

      <button type="button" onClick={saveImage}>
        Save image to backend
      </button>

      {status && <p className="status">{status}</p>}
    </main>
  )
}

export default App
