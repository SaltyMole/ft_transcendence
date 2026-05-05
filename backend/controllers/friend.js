const { PrismaClient } = require('../generated/prisma_client');
const { PrismaPg } = require('@prisma/adapter-pg');

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

// Envoyer une demande d'ami
exports.sendRequest = async (req, res) => {
  const senderId = req.user.userId;
  const { receiverId } = req.body;

  if (senderId === receiverId)
    return res.status(400).json({ error: 'Tu ne peux pas t\'ajouter toi-même' });

  const existing = await prisma.friendship.findFirst({
    where: {
      OR: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId }
      ]
    }
  });
  if (existing)
    return res.status(409).json({ error: 'Demande déjà existante' });

  const friendship = await prisma.friendship.create({
    data: { senderId, receiverId, status: 'pending' }
  });
  res.status(201).json(friendship);
};

// Accepter une demande d'ami
exports.acceptRequest = async (req, res) => {
  const userId = req.user.userId;
  const { id } = req.params;

  const friendship = await prisma.friendship.findUnique({
    where: { id: parseInt(id) }
  });
  if (!friendship || friendship.receiverId !== userId)
    return res.status(403).json({ error: 'Non autorisé' });

  const updated = await prisma.friendship.update({
    where: { id: parseInt(id) },
    data: { status: 'accepted' }
  });
  res.json(updated);
};

// Liste des amis
exports.getFriends = async (req, res) => {
  const userId = req.user.userId;

  const friendships = await prisma.friendship.findMany({
    where: {
      status: 'accepted',
      OR: [
        { senderId: userId },
        { receiverId: userId }
      ]
    },
    include: {
      sender: { select: { id: true, username: true, avatarUrl: true } },
      receiver: { select: { id: true, username: true, avatarUrl: true } }
    }
  });

  // Retourner l'ami (pas soi-même)
  const friends = friendships.map(f =>
    f.senderId === userId ? f.receiver : f.sender
  );
  res.json(friends);
};

// Demandes reçues en attente
exports.getPendingRequests = async (req, res) => {
  const userId = req.user.userId;

  const requests = await prisma.friendship.findMany({
    where: { receiverId: userId, status: 'pending' },
    include: {
      sender: { select: { id: true, username: true, avatarUrl: true } }
    }
  });
  res.json(requests);
};