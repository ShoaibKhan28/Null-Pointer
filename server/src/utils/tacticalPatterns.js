/**
 * Tactical trap definitions and pattern detectors
 */
const KNOWN_TRAPS = [
  { name: 'Fried Liver Attack', moves: ['e4', 'e5', 'Nf3', 'Nc6', 'Bc4', 'Nf6', 'Ng5', 'd5', 'exd5', 'Nxd5'], type: 'tactical' },
  { name: "Scholar's Mate", moves: ['e4', 'e5', 'Qh5', 'Nc6', 'Bc4', 'Nf6', 'Qxf7#'], type: 'opening' },
  { name: 'Italian Trap (Legal Trap)', moves: ['e4', 'e5', 'Nf3', 'd6', 'Bc4', 'Bg4', 'Nc3', 'g6', 'Nxe5'], type: 'tactical' },
  { name: 'Stafford Gambit Trap', moves: ['e4', 'e5', 'Nf3', 'Nf6', 'Nxe5', 'Nc6', 'Nxc6', 'dxc6'], type: 'gambit' },
  { name: 'Queen Trap (Elephant Trap)', moves: ['d4', 'd5', 'c4', 'e6', 'Nc3', 'Nf6', 'Bg5', 'Nbd7'], type: 'tactical' },
  { name: 'Hook Trap', moves: ['h3', 'g4', 'h5'], type: 'endgame' },
  { name: "Fool's Mate", moves: ['f3', 'e5', 'g4', 'Qh4#'], type: 'opening' },
];

const detectTrapsInGame = (movesSan = [], playerColor = 'white', isWin = false) => {
  const result = { used: null, fallenInto: null };
  const movesStr = (movesSan || []).join(' ');

  for (const trap of KNOWN_TRAPS) {
    const patternStr = trap.moves.slice(0, 4).join(' ');
    if (movesStr.includes(patternStr)) {
      if (isWin) {
        result.used = trap.name;
      } else {
        result.fallenInto = trap.name;
      }
      break;
    }
  }

  return result;
};

module.exports = {
  KNOWN_TRAPS,
  detectTrapsInGame,
};