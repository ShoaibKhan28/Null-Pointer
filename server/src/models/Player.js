const mongoose = require('mongoose');

const PlayerSchema = new mongoose.Schema({
  username: { type: String, required: true, index: true },
  platform: { type: String, required: true, enum: ['chesscom', 'lichess', 'fide'], index: true },
  name: { type: String, default: '' },
  avatar: { type: String, default: '' },
  country: { type: String, default: 'International' },
  countryCode: { type: String, default: 'un' },
  title: { type: String, default: '' },
  joinedDate: { type: Date, default: Date.now },
  lastOnline: { type: Date, default: Date.now },
  verified: { type: Boolean, default: false },
  ratings: {
    bullet: { type: Number, default: 1200 },
    blitz: { type: Number, default: 1500 },
    rapid: { type: Number, default: 1600 },
    classical: { type: Number, default: 1600 },
    puzzle: { type: Number, default: 1800 },
    peak: { type: Number, default: 1650 },
  },
  stats: {
    totalGames: { type: Number, default: 0 },
    wins: { type: Number, default: 0 },
    losses: { type: Number, default: 0 },
    draws: { type: Number, default: 0 },
    winRate: { type: Number, default: 50.0 },
    bestStreak: { type: Number, default: 0 },
  },
  rawData: { type: Object, default: {} },
  lastFetchedAt: { type: Date, default: Date.now },
}, { timestamps: true });

PlayerSchema.index({ username: 1, platform: 1 }, { unique: true });

module.exports = mongoose.models.Player || mongoose.model('Player', PlayerSchema);