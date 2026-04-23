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

    // Reprise après déconnexion — envoie les messages manqués
    if (!socket.recovered) {
      const serverOffset = socket.handshake.auth.serverOffset || 0;
      const missed = await prisma.message.findMany({
        where: { id: { gt: serverOffset } },
        orderBy: { createdAt: 'asc' },
      });
      missed.forEach((msg) => {
        socket.emit('chat message', msg.content, msg.id);
      });
    }

    socket.on('chat message', async (msg, clientOffset, callback) => {
      try {
        const newMessage = await prisma.message.create({
          data: {
            senderId: msg.senderId,
            receiverId: msg.receiverId,
            content: msg.content,
            clientOffset: clientOffset,
          },
        });
        io.emit('chat message', newMessage.content, newMessage.id);
        callback(); // confirme la réception au client
      } catch (e) {
        if (e.code === 'P2002') {
          // Prisma : violation de contrainte unique = message déjà reçu
          callback(); // on confirme quand même pour que le client arrête de réessayer
        }
        // autre erreur = on ne rappelle pas callback, le client va réessayer
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