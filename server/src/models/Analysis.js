const mongoose = require('mongoose');

const AnalysisSchema = new mongoose.Schema({
  username: { type: String, required: true, index: true },
  platform: { type: String, required: true, enum: ['chesscom', 'lichess', 'fide'], index: true },
  stalkerScore: { type: Number, default: 50 }, // 0 to 100 predictability score
  stalkerVerdict: { type: String, default: 'Balanced' },
  scoreBreakdown: {
    timeTrouble: { type: Number, default: 50 },
    winStreak: { type: Number, default: 50 },
    criticalMistakes: { type: Number, default: 50 },
    openingAccuracy: { type: Number, default: 50 },
    endgameHandling: { type: Number, default: 50 },
  },
  howToBeat: {
    summary: { type: String, default: '' },
    weaknesses: [{
      title: { type: String },
      description: { type: String },
      stat: { type: String },
      severity: { type: String, enum: ['high', 'medium', 'low'] },
    }],
    strengths: [{
      title: { type: String },
      description: { type: String },
      stat: { type: String },
    }],
    prepWhite: [{ type: String }],
    prepBlack: [{ type: String }],
    checklist: [{ type: String }],
  },
  timeManagement: {
    brackets: [{
      range: { type: String }, // '< 1 min', '1-5 min', '5-15 min', '> 15 min'
      percentage: { type: Number },
      winRate: { type: Number },
      gamesCount: { type: Number },
    }],
    scrambleLossRate: { type: Number, default: 0 },
    averageMoveTime: { type: Number, default: 0 },
  },
  repertoire: [{
    opening: { type: String },
    eco: { type: String },
    games: { type: Number },
    winRate: { type: Number },
    performanceDelta: { type: Number },
    recommendedCounter: { type: String },
    color: { type: String, enum: ['white', 'black'] },
  }],
  boardHeatmap: { type: Object, default: {} }, // 64 squares frequency scores
  traps: {
    used: [{ name: { type: String }, winRate: { type: Number }, count: { type: Number } }],
    fallenInto: [{ name: { type: String }, lossRate: { type: Number }, count: { type: Number } }],
  },
  endgameStats: {
    winningConversion: { type: Number, default: 68 },
    drawingRate: { type: Number, default: 21 },
    losingFromEqual: { type: Number, default: 11 },
  },
  psychology: {
    aggressiveness: { type: Number, default: 70 },
    timeDiscipline: { type: Number, default: 60 },
    endgameResilience: { type: Number, default: 55 },
    tacticalVision: { type: Number, default: 65 },
    repertoireDepth: { type: Number, default: 50 },
  },
  frequentRivals: [{
    username: { type: String },
    avatar: { type: String },
    games: { type: Number },
    playerWins: { type: Number },
    rivalWins: { type: Number },
    draws: { type: Number },
    winRate: { type: Number },
  }],
  headToHeadOverall: {
    wins: { type: Number, default: 0 },
    losses: { type: Number, default: 0 },
    draws: { type: Number, default: 0 },
    winRate: { type: Number, default: 50 },
  },
  aiTwinConfig: {
    styleName: { type: String, default: 'Aggressive Tactician' },
    aggression: { type: Number, default: 75 },
    favoredOpenings: [{ type: String }],
    timePressureBlunderRisk: { type: Number, default: 45 },
    roundsPlayedAgainst: { type: Number, default: 1431 },
  },
  analyzedGamesCount: { type: Number, default: 0 },
  lastAnalyzedAt: { type: Date, default: Date.now },
}, { timestamps: true });

AnalysisSchema.index({ username: 1, platform: 1 });

module.exports = mongoose.models.Analysis || mongoose.model('Analysis', AnalysisSchema);