/**
 * ECO (Encyclopaedia of Chess Openings) database & counter strategies
 */
const ECO_DATABASE = {
  'e4': { name: "King's Pawn Opening", eco: 'B00', counter: "Play Sicilian Defense (c5) or French Defense (e6)" },
  'e4 e5': { name: "Open Game", eco: 'C20', counter: "Opt for Italian Game or Ruy Lopez solid structures" },
  'e4 e5 Nf3 Nc6 Bc4': { name: "Italian Game", eco: 'C50', counter: "Consider Giuoco Pianissimo or Two Knights Defense" },
  'e4 e5 Nf3 Nc6 Bb5': { name: "Ruy Lopez (Spanish Opening)", eco: 'C60', counter: "Prepare Marshall Attack or Berlin Defense" },
  'e4 c5': { name: "Sicilian Defense", eco: 'B20', counter: "Attack with Open Sicilian (Nf3 & d4) or Closed Grand Prix (Nc3, f4)" },
  'e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6': { name: "Sicilian Najdorf", eco: 'B90', counter: "English Attack (Be3, f3, g4) to overload kingside" },
  'e4 c6': { name: "Caro-Kann Defense", eco: 'B10', counter: "Advance Variation (3. e5 Bf5) with space clamp on c-file" },
  'e4 e6': { name: "French Defense", eco: 'C00', counter: "Tarrasch (3. Nd2) or Winawer (3. Nc3 Bb4) attacking light squares" },
  'd4': { name: "Queen's Pawn Opening", eco: 'D00', counter: "Play King's Indian Defense (Nf6/g6) or Nimzo-Indian" },
  'd4 d5 c4': { name: "Queen's Gambit", eco: 'D06', counter: "Queen's Gambit Declined (e6) or Slav Defense (c6)" },
  'd4 Nf6 c4 g6': { name: "King's Indian Defense", eco: 'E60', counter: "Classical Mar del Plata or Bayonet Attack (b4)" },
  'd4 Nf6 c4 e6 Nc3 Bb4': { name: "Nimzo-Indian Defense", eco: 'E20', counter: "Rubinstein Variation (4. e3) or Capablanca (4. Qc2)" },
  'Nf3': { name: "Réti / Zukertort Opening", eco: 'A04', counter: "Grab central control with d5 & c5" },
  'c4': { name: "English Opening", eco: 'A10', counter: "Symmetrical English (c5) or Reversed Sicilian (e5)" },
  'g3': { name: "King's Fianchetto Opening", eco: 'A00', counter: "Take center with e5 and d5 immediately" },
  'b3': { name: "Nimzo-Larsen Attack", eco: 'A01', counter: "Establish central pawn duo with e5 and d5" },
  'f4': { name: "Bird's Opening", eco: 'A02', counter: "From's Gambit (1... e5) for aggressive initiative" },
};

const detectOpening = (movesSan = []) => {
  if (!movesSan || movesSan.length === 0) {
    return { name: "Unknown Opening", eco: "A00", counter: "Fight for central squares and develop minor pieces." };
  }

  const moves4 = movesSan.slice(0, 8).join(' ');
  const moves3 = movesSan.slice(0, 6).join(' ');
  const moves2 = movesSan.slice(0, 4).join(' ');
  const moves1 = movesSan.slice(0, 2).join(' ');
  const move0 = movesSan[0];

  if (ECO_DATABASE[moves4]) return ECO_DATABASE[moves4];
  if (ECO_DATABASE[moves3]) return ECO_DATABASE[moves3];
  if (ECO_DATABASE[moves2]) return ECO_DATABASE[moves2];
  if (ECO_DATABASE[moves1]) return ECO_DATABASE[moves1];
  if (ECO_DATABASE[move0]) return ECO_DATABASE[move0];

  // Default fallback heuristics
  if (move0 === 'e4') return { name: "King's Pawn Game", eco: 'B00', counter: "Play Sicilian (c5) to disrupt center" };
  if (move0 === 'd4') return { name: "Queen's Pawn Game", eco: 'D00', counter: "Challenge center with d5 or Nf6 King's Indian" };
  if (move0 === 'Nf3') return { name: "Zukertort Opening", eco: 'A04', counter: "Build solid d5/Nf6 setup" };
  if (move0 === 'c4') return { name: "English Opening", eco: 'A10', counter: "Meet with 1... e5 or c5" };

  return { name: "Custom / Rare Line", eco: "A00", counter: "Focus on classical development and king safety." };
};

module.exports = {
  ECO_DATABASE,
  detectOpening,
};