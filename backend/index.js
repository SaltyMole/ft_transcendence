require('dotenv').config();
const cors = require('cors');
const path = require('path');
const express = require("express");
const bodyParser = require('body-parser');
const { createServer } = require('node:http');
const { Server } = require('socket.io');
const { PrismaClient } = require("./generated/prisma_client/client");
const { PrismaPg } = require("@prisma/adapter-pg");
const userRoutes = require('./routes/user');
const uploadRoutes = require('./routes/upload');
const { initSockets } = require('./sockets');

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const app = express();
const server = createServer(app);  // ← on enveloppe app dans un serveur HTTP
const io = new Server(server, {
  connectionStateRecovery: {},
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST']
  }
});

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

const prisma = new PrismaClient({ adapter });

app.use(express.json());
app.use(bodyParser.json());
app.use('/api/auth', userRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/upload', uploadRoutes);

app.get("/", async (req, res) => {
  const userCount = await prisma.user.count();
  res.json(
    userCount == 0
      ? "No users have been added yet."
      : "Some users have been added to the database.",
  );
});

initSockets(io);  // ← initialise tous les événements Socket.io

app.get('/chat', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/index.html'));
});

const PORT = 3000;
server.listen(PORT, () => {  // ← server.listen et non app.listen
  console.log(`Server is running on http://localhost:${PORT}`);
});