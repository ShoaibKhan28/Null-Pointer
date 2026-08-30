const ChessComPlayer = require('./ChessComPlayer');
const LichessPlayer = require('./LichessPlayer');
const Analyzer = require('./Analyzer');
const Database = require('./Database');
const { getDemoPlayer, getDemoGames } = require('../services/sampleDataService');

/**
 * Class App / AppService (Slide 4)
 * Orchestrates player search, game ingestion, analysis, and caching
 */
class AppService {
  constructor() {
    this.db = Database;
  }

  async searchPlayer(username, platform = 'chesscom') {
    const cleanUsername = (username || '').trim().toLowerCase();
    const cleanPlatform = (platform || 'chesscom').toLowerCase();

    // 1. Check Database cache
    const cachedProfile = await this.db.getPlayer(cleanUsername, cleanPlatform);

    // 2. Instantiate OOP entity based on platform
    let playerEntity;
    if (cleanPlatform === 'lichess') {
      playerEntity = new LichessPlayer(cleanUsername);
    } else {
      playerEntity = new ChessComPlayer(cleanUsername);
    }

    // 3. Try live fetch
    let liveProfile = await playerEntity.fetchProfile();

    // 4. Fallback to demo profile if live API is unavailable
    if (!liveProfile) {
      if (cachedProfile) {
        liveProfile = cachedProfile;
      } else {
        liveProfile = getDemoPlayer(cleanUsername, cleanPlatform);
      }
    }

    // 5. Cache profile in MongoDB / Memory
    await this.db.savePlayer(liveProfile);

    return liveProfile;
  }

  async analyzePlayer(username, platform = 'chesscom') {
    const cleanUsername = (username || '').trim().toLowerCase();
    const cleanPlatform = (platform || 'chesscom').toLowerCase();

    // 1. Get or create Player
    const playerProfile = await this.searchPlayer(cleanUsername, cleanPlatform);

    // 2. Fetch Games
    let playerEntity = cleanPlatform === 'lichess' ? new LichessPlayer(cleanUsername) : new ChessComPlayer(cleanUsername);
    let games = await playerEntity.fetchGames(40);

    if (!games || games.length === 0) {
      // Check cached games or demo games
      const cachedGames = await this.db.getGames(cleanUsername, cleanPlatform, 40);
      if (cachedGames && cachedGames.length) {
        games = cachedGames;
      } else {
        games = getDemoGames(cleanUsername, cleanPlatform);
      }
    }

    // 3. Save Games to database
    await this.db.saveGames(games);

    // 4. Run Analyzer engine
    const analyzer = new Analyzer(playerProfile, games);
    const report = analyzer.generateFullReport();

    // 5. Cache analysis in database
    await this.db.saveAnalysis(report);

    return {
      player: playerProfile,
      games,
      analysis: report,
    };
  }

  async getSavedAnalyses() {
    return await this.db.getSavedAnalyses(20);
  }

  async comparePlayers(player1Query, player2Query) {
    const [p1, p2] = await Promise.all([
      this.analyzePlayer(player1Query.username, player1Query.platform || 'chesscom'),
      this.analyzePlayer(player2Query.username, player2Query.platform || 'chesscom'),
    ]);

    return {
      player1: p1,
      player2: p2,
      comparison: {
        higherRated: p1.player.ratings.rapid >= p2.player.ratings.rapid ? p1.player.username : p2.player.username,
        stalkerScoreDiff: p1.analysis.stalkerScore - p2.analysis.stalkerScore,
        moreAggressive: p1.analysis.psychology.aggressiveness >= p2.analysis.psychology.aggressiveness ? p1.player.username : p2.player.username,
        betterTimeDiscipline: p1.analysis.psychology.timeDiscipline >= p2.analysis.psychology.timeDiscipline ? p1.player.username : p2.player.username,
      }
    };
  }
}

module.exports = new AppService();