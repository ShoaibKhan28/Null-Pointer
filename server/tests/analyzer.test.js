const assert = require('assert');
const Player = require('../src/core/Player');
const ChessComPlayer = require('../src/core/ChessComPlayer');
const LichessPlayer = require('../src/core/LichessPlayer');
const Analyzer = require('../src/core/Analyzer');
const { getDemoPlayer, getDemoGames } = require('../src/services/sampleDataService');

async function runTests() {
  console.log('--- Running Chess Insights Test Suite ---');

  // Test 1: Player Class Instantiation
  const basePlayer = new Player('testuser', 'chesscom');
  assert.strictEqual(basePlayer.username, 'testuser');
  assert.strictEqual(basePlayer.platform, 'chesscom');
  console.log('✓ Test 1: Base Player class instantiated successfully');

  // Test 2: Subclasses
  const ccPlayer = new ChessComPlayer('prabhavagarwal1234');
  assert.strictEqual(ccPlayer.platform, 'chesscom');
  const liPlayer = new LichessPlayer('thibault');
  assert.strictEqual(liPlayer.platform, 'lichess');
  console.log('✓ Test 2: ChessComPlayer & LichessPlayer subclasses verified');

  // Test 3: Analyzer and Stalker Score Generation
  const demoProfile = getDemoPlayer('prabhavagarwal1234', 'chesscom');
  const demoGames = getDemoGames('prabhavagarwal1234', 'chesscom');
  const analyzer = new Analyzer(demoProfile, demoGames);
  const report = analyzer.generateFullReport();

  assert.ok(report.stalkerScore >= 0 && report.stalkerScore <= 100, 'Stalker score must be between 0 and 100');
  assert.ok(report.howToBeat, 'How to beat section must exist');
  assert.ok(report.weaknesses.length > 0, 'Weaknesses must be detected');
  assert.ok(report.repertoire.length > 0, 'Opening repertoire must be analyzed');
  assert.ok(report.timeManagement.brackets.length === 4, 'Time management must have 4 brackets');
  console.log(`✓ Test 3: Analyzer generated report with Stalker Score: ${report.stalkerScore} and ${report.repertoire.length} openings`);

  console.log('--- All Backend Tests Passed Successfully! ---');
}

runTests().catch(err => {
  console.error('Test failed:', err);
  process.exit(1);
});