const appService = require('../core/AppService');
const { getDBStatus } = require('../config/db');

exports.searchPlayer = async (req, res) => {
  try {
    const { username, platform = 'chesscom' } = req.query;
    if (!username) {
      return res.status(400).json({ success: false, message: 'Username is required' });
    }

    const player = await appService.searchPlayer(username, platform);
    return res.status(200).json({ success: true, data: player });
  } catch (error) {
    console.error('[playerController.searchPlayer]', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.getHealth = async (req, res) => {
  return res.status(200).json({
    status: 'online',
    app: 'Chess Insights REST API',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    db: getDBStatus(),
  });
};