const PlayerModel = require('../models/Player');
const GameModel = require('../models/Game');
const AnalysisModel = require('../models/Analysis');
const { memoryStore, getDBStatus } = require('../config/db');

/**
 * Class Database (Slide 4)
 * OOP Repository bridging Mongoose collections and in-memory cache
 */
class Database {
  constructor() {
    this.playerCollection = PlayerModel;
    this.gameCollection = GameModel;
    this.analysisCollection = AnalysisModel;
  }

  async savePlayer(playerData) {
    try {
      const dbStatus = getDBStatus();
      if (dbStatus.isConnected) {
        return await this.playerCollection.findOneAndUpdate(
          { username: playerData.username.toLowerCase(), platform: playerData.platform },
          { $set: { ...playerData, lastFetchedAt: new Date() } },
          { upsert: true, new: true }
        );
      }
    } catch (err) {
      console.warn(`[Database] Mongo savePlayer error: ${err.message}`);
    }

    // Memory store fallback
    const key = `${playerData.platform}_${playerData.username.toLowerCase()}`;
    memoryStore.players.set(key, playerData);
    return playerData;
  }

  async getPlayer(username, platform = 'chesscom') {
    const u = username.toLowerCase();
    try {
      const dbStatus = getDBStatus();
      if (dbStatus.isConnected) {
        const found = await this.playerCollection.findOne({ username: u, platform });
        if (found) return found;
      }
    } catch (err) {
      console.warn(`[Database] Mongo getPlayer error: ${err.message}`);
    }

    const key = `${platform}_${u}`;
    return memoryStore.players.get(key) || null;
  }

  async saveGames(games = []) {
    if (!games || !games.length) return [];
    try {
      const dbStatus = getDBStatus();
      if (dbStatus.isConnected) {
        const ops = games.map(g => ({
          updateOne: {
            filter: { gameId: g.gameId },
            update: { $set: g },
            upsert: true,
          }
        }));
        await this.gameCollection.bulkWrite(ops);
        return games;
      }
    } catch (err) {
      console.warn(`[Database] Mongo saveGames error: ${err.message}`);
    }

    games.forEach(g => memoryStore.games.set(g.gameId, g));
    return games;
  }

  async getGames(username, platform = 'chesscom', limit = 50) {
    const u = username.toLowerCase();
    try {
      const dbStatus = getDBStatus();
      if (dbStatus.isConnected) {
        const games = await this.gameCollection.find({ playerUsername: u, platform }).sort({ playedAt: -1 }).limit(limit);
        if (games && games.length) return games;
      }
    } catch (err) {
      console.warn(`[Database] Mongo getGames error: ${err.message}`);
    }

    const filtered = Array.from(memoryStore.games.values())
      .filter(g => g.playerUsername.toLowerCase() === u && g.platform === platform)
      .slice(0, limit);
    return filtered;
  }

  async saveAnalysis(analysisData) {
    try {
      const dbStatus = getDBStatus();
      if (dbStatus.isConnected) {
        return await this.analysisCollection.findOneAndUpdate(
          { username: analysisData.username.toLowerCase(), platform: analysisData.platform },
          { $set: { ...analysisData, lastAnalyzedAt: new Date() } },
          { upsert: true, new: true }
        );
      }
    } catch (err) {
      console.warn(`[Database] Mongo saveAnalysis error: ${err.message}`);
    }

    const key = `${analysisData.platform}_${analysisData.username.toLowerCase()}`;
    memoryStore.analyses.set(key, analysisData);
    return analysisData;
  }

  async getAnalysis(username, platform = 'chesscom') {
    const u = username.toLowerCase();
    try {
      const dbStatus = getDBStatus();
      if (dbStatus.isConnected) {
        const doc = await this.analysisCollection.findOne({ username: u, platform });
        if (doc) return doc;
      }
    } catch (err) {
      console.warn(`[Database] Mongo getAnalysis error: ${err.message}`);
    }

    const key = `${platform}_${u}`;
    return memoryStore.analyses.get(key) || null;
  }

  async getSavedAnalyses(limit = 20) {
    try {
      const dbStatus = getDBStatus();
      if (dbStatus.isConnected) {
        const list = await this.analysisCollection.find().sort({ lastAnalyzedAt: -1 }).limit(limit);
        if (list && list.length) return list;
      }
    } catch (err) {
      console.warn(`[Database] Mongo getSavedAnalyses error: ${err.message}`);
    }

    return Array.from(memoryStore.analyses.values()).slice(0, limit);
  }
}

module.exports = new Database();