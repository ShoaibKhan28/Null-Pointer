/**
 * Base Class Player
 * Represents an abstract chess player entity across online platforms
 */
class Player {
  constructor(username, platform = 'chesscom') {
    if (!username) {
      throw new Error('Player username must be specified');
    }
    this.username = username.toLowerCase().trim();
    this.platform = platform.toLowerCase();
    this.name = '';
    this.avatar = 'https://images.unsplash.com/photo-1528819622765-d6bcf132f793?w=150&auto=format&fit=crop&q=80';
    this.country = 'International';
    this.countryCode = 'un';
    this.title = '';
    this.joinedDate = new Date();
    this.lastOnline = new Date();
    this.verified = false;
    this.ratings = {
      bullet: 1200,
      blitz: 1500,
      rapid: 1600,
      classical: 1600,
      puzzle: 1800,
      peak: 1650,
    };
    this.stats = {
      totalGames: 0,
      wins: 0,
      losses: 0,
      draws: 0,
      winRate: 50.0,
      bestStreak: 0,
    };
    this.rawData = {};
  }

  // Base methods to be overridden by subclasses
  async fetchProfile() {
    throw new Error('fetchProfile() must be implemented by platform subclass');
  }

  async fetchGames(limit = 50) {
    throw new Error('fetchGames() must be implemented by platform subclass');
  }

  getStats() {
    return {
      username: this.username,
      platform: this.platform,
      ratings: this.ratings,
      stats: this.stats,
    };
  }

  getPerformance() {
    const total = this.stats.totalGames || 1;
    return {
      winPercentage: ((this.stats.wins / total) * 100).toFixed(1),
      lossPercentage: ((this.stats.losses / total) * 100).toFixed(1),
      drawPercentage: ((this.stats.draws / total) * 100).toFixed(1),
    };
  }

  toJSON() {
    return {
      username: this.username,
      platform: this.platform,
      name: this.name,
      avatar: this.avatar,
      country: this.country,
      countryCode: this.countryCode,
      title: this.title,
      joinedDate: this.joinedDate,
      lastOnline: this.lastOnline,
      verified: this.verified,
      ratings: this.ratings,
      stats: this.stats,
    };
  }
}

module.exports = Player;