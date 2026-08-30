const Database = require('../core/Database');
const { getDemoGames } = require('../services/sampleDataService');

exports.getPlayerGames = async (req, res) => {
  try {
    const { platform, username } = req.params;
    const limit = parseInt(req.query.limit) || 40;

    let games = await Database.getGames(username, platform, limit);
    if (!games || !games.length) {
      games = getDemoGames(username, platform);
    }

    return res.status(200).json({ success: true, count: games.length, data: games });
  } catch (error) {
    console.error('[gamesController.getPlayerGames]', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};