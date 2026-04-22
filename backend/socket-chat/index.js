const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');
const { PrismaClient } = require('../generated/prisma_client');

const prisma = new PrismaClient();

async function main() {
  const app = express();
  const server = createServer(app);
  const io = new Server(server, {
    connectionStateRecovery: {}
  });

  app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'));
  });

  io.on('connection', async (socket) => {
    console.log('user connected');

    // Historique des messages au moment de la connexion
    const messages = await prisma.message.findMany({
      orderBy: { createdAt: 'asc' },
    });
    socket.emit('history', messages);

    socket.on('chat message', async (msg) => {
      try {
        const newMessage = await prisma.message.create({
          data: {
            senderId: msg.senderId,
            receiverId: msg.receiverId,
            content: msg.content,
          },
        });
        io.emit('chat message', newMessage);
      } catch (e) {
        console.error('Erreur lors de la sauvegarde du message :', e);
      }
    });

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });

  server.listen(3001, () => {
    console.log('server running at http://localhost:3001');
  });
}

main();