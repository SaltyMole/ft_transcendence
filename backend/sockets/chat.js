const { PrismaClient } = require('../generated/prisma_client/client');
const { PrismaPg } = require('@prisma/adapter-pg');

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function registerChatEvents(io, socket) {
  // Reprise après déconnexion
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
      callback?.();
    } catch (e) {
      if (e.code === 'P2002') callback?.(); // message déjà reçu, on confirme quand même
    }
  });
}

module.exports = { registerChatEvents };