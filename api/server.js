import http from 'http';
import { WebSocket, WebSocketServer } from 'ws';
import multer from 'multer';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import fs from 'fs';

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
app.use(express.json());

// Helper function to get game by ID
function getGameById(id) {
  const data = JSON.parse(fs.readFileSync('bdd.json', 'utf-8'));
  return data.find(game => game.id === id);
}

// Helper function to load all games
function loadAllGames() {
  return JSON.parse(fs.readFileSync('bdd.json', 'utf-8'));
}

// Helper function to save all games
function saveAllGames(data) {
  fs.writeFileSync('bdd.json', JSON.stringify(data, null, 2));
}

// Get game info route
app.get('/gameroute/game/:id', (req, res) => {
  const game = getGameById(req.params.id);
  if (!game) {
    return res.status(404).json({ success: false, error: `Game ${req.params.id} not found` });
  }
  res.json({ success: true, game });
});

// Create game route
app.post('/gameroute/create', (req, res) => {
  const { id } = req.body;
  const data = loadAllGames();

  data.push({ id, state: "matchmaking", players: [], drawings: [], environment: "", story: "", winner: "" });

  saveAllGames(data);
  res.json({ success: true, id });
});

// Add player route
app.post('/gameroute/addplayer', (req, res) => {
  const { id, name, picture } = req.body;
  const data = loadAllGames();

  const game = data.find(g => g.id === id);
  if (!game) {
    return res.status(404).json({ success: false, error: `Game ${id} not found` });
  }

  game.players.push({ name, picture});

  saveAllGames(data);
  res.json({ success: true, id });
});

// Remove player route
app.post('/gameroute/removeplayer', (req, res) => {
  const { id, name, picture } = req.body;
  const data = loadAllGames();

  const game = data.find(g => g.id === id);
  if (!game) {
    return res.status(404).json({ success: false, error: `Game ${id} not found` });
  }

  game.players = game.players.filter(player => player.name !== name);

  saveAllGames(data);
  res.json({ success: true, id });
});

// Add drawing route
app.post('/gameroute/adddrawing', (req, res) => {
  const { id, player, drawing } = req.body;
  const data = loadAllGames();

  const game = data.find(g => g.id === id);
  if (!game) {
    return res.status(404).json({ success: false, error: `Game ${id} not found` });
  }

  game.drawings.push({ player, drawing});

  saveAllGames(data);
  res.json({ success: true, id });
});

// Remove drawing route
app.post('/gameroute/removedrawing', (req, res) => {
  const { id, name } = req.body;
  const data = loadAllGames();

  const game = data.find(g => g.id === id);
  if (!game) {
    return res.status(404).json({ success: false, error: `Game ${id} not found` });
  }

  game.drawings = game.drawings.filter(drawing => drawing.player !== name);

  saveAllGames(data);
  res.json({ success: true, id });
});

// Get a drawing
app.get('/gameroute/getdrawingfile', (req, res) => {
  const { id, name } = req.query;

  const game = getGameById(id);
  if (!game) {
    return res.status(404).json({ success: false, error: `Game ${id} not found` });
  }

  const drawing = game.drawings.find(d => d.player === name);
  if (!drawing) {
    return res.status(404).json({ success: false, error: `No drawing found for ${name}` });
  }

  const filename = path.basename(drawing.drawing);
  const filePath = path.join(__dirname, 'uploads', filename);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ success: false, error: `File not found: ${filename}` });
  }

  const fileData = fs.readFileSync(filePath);
  const base64 = fileData.toString('base64');
  res.json({ success: true, image: base64, mimeType: 'image/png' });
});

// Change state route
app.post('/gameroute/changestate', (req, res) => {
  const { id, state } = req.body;
  const data = loadAllGames();

  const game = data.find(g => g.id === id);
  if (!game) {
    return res.status(404).json({ success: false, error: `Game ${id} not found` });
  }

  game.state = state;

  saveAllGames(data);
  res.json({ success: true, id });
});
