require('dotenv').config();
const cors = require('cors');
const path = require('path');
const express = require("express");
const bodyParser = require('body-parser') 
const { PrismaClient } = require("./generated/prisma_client/client"); 
const { PrismaPg } = require("@prisma/adapter-pg");

const userRoutes = require('./routes/user');
const uploadRoutes = require('./routes/upload');
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL, 
}); 
const app = express(); 
app.use(cors({
  origin: 'http://localhost:5173', // port par défaut de Vite/React
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
const prisma = new PrismaClient({
  adapter, 
}); 
app.use(express.json()); 
app.use(bodyParser.json());
app.use('/api/auth', userRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/upload', uploadRoutes);

// Get all users
app.get("/", async (req, res) => {
  const userCount = await prisma.user.count(); 
  res.json(
    userCount == 0
      ? "No users have been added yet."
      : "Some users have been added to the database.", 
  ); 
}); 
const PORT = 3000; 
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`); 
}); 