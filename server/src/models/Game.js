const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
  gameId: { type: String, required: true, index: true },
  platform: { type: String, required: true, enum: ['chesscom', 'lichess', 'fide'] },
  url: { type: String, default: '' },
  playerUsername: { type: String, required: true, index: true },
  playerColor: { type: String, enum: ['white', 'black'], required: true },
  playerRating: { type: Number, default: 1500 },
  opponentUsername: { type: String, required: true, index: true },
  opponentRating: { type: Number, default: 1500 },
  result: { type: String, enum: ['win', 'loss', 'draw'], required: true },
  resultDetail: { type: String, default: 'normal' }, // checkmate, timeout, resignation, agreement
  timeControl: { type: String, default: '600' },
  timeClass: { type: String, enum: ['bullet', 'blitz', 'rapid', 'daily', 'classical'], default: 'rapid' },
  eco: { type: String, default: 'A00' },
  openingName: { type: String, default: 'Unknown Opening' },
  movesCount: { type: Number, default: 0 },
  movesSan: [{ type: String }],
  pgn: { type: String, default: '' },
  accuracy: {
    player: { type: Number, default: 75.0 },
    opponent: { type: Number, default: 72.0 },
  },
  timeSpentCategory: { type: String, enum: ['<1min', '1-5min', '5-15min', '>15min'], default: '5-15min' },
  playedAt: { type: Date, default: Date.now },
  evalGraph: [{ type: Number }], // Centipawn evaluations per move
}, { timestamps: true });

GameSchema.index({ playerUsername: 1, platform: 1, playedAt: -1 });

module.exports = mongoose.models.Game || mongoose.model('Game', GameSchema);