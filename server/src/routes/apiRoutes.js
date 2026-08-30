const express = require('express');
const router = express.Router();

const playerController = require('../controllers/playerController');
const analysisController = require('../controllers/analysisController');
const gamesController = require('../controllers/gamesController');
const compareController = require('../controllers/compareController');

// Health Check
router.get('/health', playerController.getHealth);

// Player Routes
router.get('/players/search', playerController.searchPlayer);

// Analysis Routes
router.get('/analysis/saved', analysisController.getSavedAnalyses);
router.get('/analysis/:platform/:username', analysisController.getAnalysis);

// Games Routes
router.get('/games/:platform/:username', gamesController.getPlayerGames);

// Comparison Routes
router.post('/compare', compareController.comparePlayers);

module.exports = router;