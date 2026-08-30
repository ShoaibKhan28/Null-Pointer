const mongoose = require('mongoose');

let isConnected = false;
let isInMemoryMode = false;

// In-memory fallback storage when MongoDB is not connected
const memoryStore = {
  players: new Map(),
  games: new Map(),
  analyses: new Map(),
};

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/chess_insights';
  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 2500,
    });
    isConnected = true;
    isInMemoryMode = false;
    console.log(`[Database] MongoDB Connected: ${conn.connection.host}/${conn.connection.name}`);
  } catch (error) {
    isConnected = false;
    isInMemoryMode = true;
    console.warn(`[Database] MongoDB connection failed (${error.message}). Running in Resilient In-Memory Mode.`);
  }
};

const getDBStatus = () => ({
  isConnected,
  isInMemoryMode,
  driver: isInMemoryMode ? 'In-Memory Cache (Standalone)' : 'MongoDB Mongoose Driver',
  stats: {
    players: memoryStore.players.size,
    games: memoryStore.games.size,
    analyses: memoryStore.analyses.size,
  }
});

module.exports = {
  connectDB,
  getDBStatus,
  memoryStore,
};