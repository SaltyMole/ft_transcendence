import http from 'http';
import { WebSocket, WebSocketServer } from 'ws';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);





// EXPRESS
const app = express();
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/express_backend', (req, res) => {
	res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});






// WEBSOCKEY
// const http = require("http");
// const { WebSocketServer, WebSocket } = require("ws");

// 1. Create ONE HTTP server
const server = http.createServer((req, res) => {
res.writeHead(200, { "Content-Type": "text/plain" });
res.end("Chat server running");
});

// 2. Attach WebSocket to that same HTTP server (single port)
const wss = new WebSocketServer({ server });

// 3. Room registry: { gameID: Set<ws> }
const rooms = {};

// 4. Broadcast only to clients in the same room
function broadcastToRoom(gameID, data, senderWs = null) {
const room = rooms[gameID];
if (!room) return;

const payload = JSON.stringify(data);
room.forEach((client) => {
	const isOpen = client.readyState === WebSocket.OPEN;
	const isNotSender = client !== senderWs; // set to null to include sender
	if (isOpen && isNotSender) {
	client.send(payload);
	}
});
}

wss.on("connection", (ws) => {
console.log("Client connected");
ws.currentRoom = null; // track which room this socket is in
ws.username = null;

ws.on("message", (raw) => {
	let msg;

	// 5. Always parse JSON — reject malformed messages
	try {
	msg = JSON.parse(raw);
	} catch {
	ws.send(JSON.stringify({ type: "error", text: "Invalid JSON" }));
	return;
	}

	// 6. Route by message type
	switch (msg.type) {

	case "join": {
		const { gameID, username } = msg;

		// Leave previous room if switching
		if (ws.currentRoom && rooms[ws.currentRoom]) {
		rooms[ws.currentRoom].delete(ws);
		broadcastToRoom(ws.currentRoom, {
			type: "system",
			text: `${ws.username} left the room`,
			gameID: ws.currentRoom,
		});
		}

		// Join new room
		if (!rooms[gameID]) rooms[gameID] = new Set();
		rooms[gameID].add(ws);
		ws.currentRoom = gameID;
		ws.username = username;

		// Confirm join to the joiner
		ws.send(JSON.stringify({ type: "joined", gameID, username }));

		console.log(`${username} joined room: ${gameID}`);
		break;
	}

	case "chat": {
		if (!ws.currentRoom) {
		ws.send(JSON.stringify({ type: "error", text: "Join a room first" }));
		return;
		}

		const payload = {
		type: "chat",
		gameID: ws.currentRoom,
		from: ws.username,
		text: msg.text,
		timestamp: new Date().toISOString(),
		};

		// Send to others in room
		broadcastToRoom(ws.currentRoom, payload, ws);

		// Echo back to sender (so their own message appears)
		ws.send(JSON.stringify({ ...payload, self: true }));
		break;
	}

	default:
		ws.send(JSON.stringify({ type: "error", text: `Unknown type: ${msg.type}` }));
	}
});

ws.on("close", () => {
	if (ws.currentRoom && rooms[ws.currentRoom])
		rooms[ws.currentRoom].delete(ws);

	console.log(`${ws.username ?? "Client"} disconnected`);
});
});

// 7. Single port for both HTTP and WS
const PORT = 8080;
server.listen(PORT, () => {
console.log(`Server running on http://localhost:${PORT}`);
console.log(`WebSocket ready on ws://localhost:${PORT}`);
});








// MULTER
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.post('/api/save-image', upload.single('file'), (req, res) => {
  res.json({ success: true, path: req.file.path });
});







// JSON
import fs from 'fs';

app.use(express.json());

// Create game route
app.post('/gameroute/create', (req, res) => {
  const { id } = req.body;
  const data = JSON.parse(fs.readFileSync('src/game/bdd.json', 'utf-8'));

  data.push({ id, state: "matchmaking", players: [], drawings: [], environment: "", story: "", winner: "" });

  fs.writeFileSync('src/game/bdd.json', JSON.stringify(data, null, 2));
  res.json({ success: true, id });
});

// Add player route
app.post('/gameroute/addplayer', (req, res) => {
  const { id, name, picture } = req.body;
  const data = JSON.parse(fs.readFileSync('src/game/bdd.json', 'utf-8'));

  const game = data.find(game => game.id === id);
  if (!game) {
    return res.status(404).json({ success: false, error: `Game ${id} not found` });
  }

  game.players.push({ name, picture});

  fs.writeFileSync('src/game/bdd.json', JSON.stringify(data, null, 2));
  res.json({ success: true, id });
});

// Remove player route
app.post('/gameroute/removeplayer', (req, res) => {
  const { id, name, picture } = req.body;
  const data = JSON.parse(fs.readFileSync('src/game/bdd.json', 'utf-8'));

  const game = data.find(game => game.id === id);
  if (!game) {
    return res.status(404).json({ success: false, error: `Game ${id} not found` });
  }

  game.players = game.players.filter(player => player.name !== name);

  fs.writeFileSync('src/game/bdd.json', JSON.stringify(data, null, 2));
  res.json({ success: true, id });
});

// Add drawing route
app.post('/gameroute/adddrawing', (req, res) => {
  const { id, player, drawing } = req.body;
  const data = JSON.parse(fs.readFileSync('src/game/bdd.json', 'utf-8'));

  const game = data.find(game => game.id === id);
  if (!game) {
    return res.status(404).json({ success: false, error: `Game ${id} not found` });
  }

  game.drawings.push({ player, drawing});

  fs.writeFileSync('src/game/bdd.json', JSON.stringify(data, null, 2));
  res.json({ success: true, id });
});

// Remove drawing route
app.post('/gameroute/removedrawing', (req, res) => {
  const { id, name } = req.body;
  const data = JSON.parse(fs.readFileSync('src/game/bdd.json', 'utf-8'));

  const game = data.find(game => game.id === id);
  if (!game) {
    return res.status(404).json({ success: false, error: `Game ${id} not found` });
  }

  game.drawings = game.drawings.filter(drawing => drawing.player !== name);

  fs.writeFileSync('src/game/bdd.json', JSON.stringify(data, null, 2));
  res.json({ success: true, id });
});

// Change state route
app.post('/gameroute/changestate', (req, res) => {
  const { id, state } = req.body;
  const data = JSON.parse(fs.readFileSync('src/game/bdd.json', 'utf-8'));

  const game = data.find(game => game.id === id);
  if (!game) {
    return res.status(404).json({ success: false, error: `Game ${id} not found` });
  }

  game.state = state;

  fs.writeFileSync('src/game/bdd.json', JSON.stringify(data, null, 2));
  res.json({ success: true, id });
});