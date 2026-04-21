const { PrismaClient } = require('../generated/prisma_client');
const { PrismaPg } = require('@prisma/adapter-pg');
const fs = require('fs');

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

exports.uploadAvatar = async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({ error: 'Aucun fichier envoyé' });

    const avatarUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;

    await prisma.user.update({
      where: { id: req.auth.userId },
      data: { avatarUrl },
    });

    res.status(200).json({ message: 'Avatar mis à jour !', avatarUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};