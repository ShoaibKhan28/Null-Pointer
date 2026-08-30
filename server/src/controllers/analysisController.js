const appService = require('../core/AppService');

exports.getAnalysis = async (req, res) => {
  try {
    const { platform, username } = req.params;
    if (!username) {
      return res.status(400).json({ success: false, message: 'Username is required' });
    }

    const result = await appService.analyzePlayer(username, platform || 'chesscom');
    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error('[analysisController.getAnalysis]', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.getSavedAnalyses = async (req, res) => {
  try {
    const list = await appService.getSavedAnalyses();
    return res.status(200).json({ success: true, data: list });
  } catch (error) {
    console.error('[analysisController.getSavedAnalyses]', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};