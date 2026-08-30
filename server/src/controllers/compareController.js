const appService = require('../core/AppService');

exports.comparePlayers = async (req, res) => {
  try {
    const { player1, player2 } = req.body;
    if (!player1?.username || !player2?.username) {
      return res.status(400).json({ success: false, message: 'Both player1 and player2 usernames are required' });
    }

    const comparisonResult = await appService.comparePlayers(player1, player2);
    return res.status(200).json({ success: true, data: comparisonResult });
  } catch (error) {
    console.error('[compareController.comparePlayers]', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};