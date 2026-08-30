/**
 * Sample dataset generator ensuring instant, rich data matching Slide 8
 */
const getDemoPlayer = (username = 'prabhavagarwal1234', platform = 'chesscom') => {
  const u = username.toLowerCase();

  if (u === 'prabhavagarwal1234') {
    return {
      username: 'prabhavagarwal1234',
      platform: 'chesscom',
      name: 'Prabhav Agarwal',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      country: 'India',
      countryCode: 'in',
      title: 'CM',
      joinedDate: new Date('2013-01-16'),
      lastOnline: new Date(),
      verified: true,
      ratings: {
        bullet: 1391,
        blitz: 1620,
        rapid: 2105,
        classical: 1987,
        puzzle: 782,
        peak: 3048,
      },
      stats: {
        totalGames: 77,
        wins: 75,
        losses: 68,
        draws: 0,
        winRate: 53.8,
        bestStreak: 75,
      },
    };
  }

  if (u === 'hikaru') {
    return {
      username: 'hikaru',
      platform: 'chesscom',
      name: 'Hikaru Nakamura',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80',
      country: 'United States',
      countryCode: 'us',
      title: 'GM',
      joinedDate: new Date('2014-04-01'),
      lastOnline: new Date(),
      verified: true,
      ratings: {
        bullet: 3340,
        blitz: 3260,
        rapid: 2880,
        classical: 2802,
        puzzle: 3450,
        peak: 3410,
      },
      stats: {
        totalGames: 48200,
        wins: 34500,
        losses: 8200,
        draws: 5500,
        winRate: 71.6,
        bestStreak: 45,
      },
    };
  }

  if (u === 'magnuscarlsen') {
    return {
      username: 'magnuscarlsen',
      platform: 'chesscom',
      name: 'Magnus Carlsen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      country: 'Norway',
      countryCode: 'no',
      title: 'GM',
      joinedDate: new Date('2013-05-12'),
      lastOnline: new Date(),
      verified: true,
      ratings: {
        bullet: 3290,
        blitz: 3280,
        rapid: 2910,
        classical: 2835,
        puzzle: 3500,
        peak: 3420,
      },
      stats: {
        totalGames: 32000,
        wins: 23100,
        losses: 4100,
        draws: 4800,
        winRate: 72.2,
        bestStreak: 56,
      },
    };
  }

  // Generic fallback
  return {
    username: u,
    platform,
    name: username.charAt(0).toUpperCase() + username.slice(1),
    avatar: 'https://images.unsplash.com/photo-1528819622765-d6bcf132f793?w=150&auto=format&fit=crop&q=80',
    country: 'International',
    countryCode: 'un',
    title: '',
    joinedDate: new Date('2020-03-15'),
    lastOnline: new Date(),
    verified: false,
    ratings: {
      bullet: 1450,
      blitz: 1620,
      rapid: 1780,
      classical: 1720,
      puzzle: 1950,
      peak: 1840,
    },
    stats: {
      totalGames: 240,
      wins: 130,
      losses: 95,
      draws: 15,
      winRate: 54.2,
      bestStreak: 8,
    },
  };
};

const getDemoGames = (username = 'prabhavagarwal1234', platform = 'chesscom') => {
  const pgnSample = `[Event "Live Chess"]
[Site "Chess.com"]
[Date "2026.05.15"]
[White "prabhavagarwal1234"]
[Black "KnightRider99"]
[Result "1-0"]
[ECO "C50"]
[Opening "Italian Game: Giuoco Piano"]
[WhiteElo "2105"]
[BlackElo "1910"]

1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 4. c3 Nf6 5. d4 exd4 6. cxd4 Bb4+ 7. Bd2 Bxd2+ 8. Nbxd2 d5 9. exd5 Nxd5 10. Qb3 Nce7 11. O-O O-O 12. Rfe1 c6 13. a4 Qb6 14. Qa3 Be6 15. a5 Qc7 16. Ne4 Rad8 17. Nc5 Bg4 18. Ne5 Bf5 19. Qb3 b6 20. axb6 axb6 21. Na6 Qd6 22. Rac1 Nf4 23. Bxf7+ Kh8 24. Bc4 b5 25. Bf1 Be6 26. Qg3 Qxd4 27. Nxc6 Nxc6 28. Rxc6 Bc8 29. Nc5 Qxb2 30. Rc7 Ng6 31. h4 Qd4 32. h5 Nf4 33. Re4 Qf6 34. Rxf4 1-0`;

  return [
    {
      gameId: 'demo_game_01',
      platform,
      url: 'https://chess.com/game/live/108923412',
      playerUsername: username,
      playerColor: 'white',
      playerRating: 2105,
      opponentUsername: 'KnightRider99',
      opponentRating: 1910,
      result: 'win',
      resultDetail: 'Resignation',
      timeControl: '10+0',
      timeClass: 'rapid',
      eco: 'C50',
      openingName: 'Italian Game',
      movesCount: 42,
      movesSan: [
        'e4', 'e5', 'Nf3', 'Nc6', 'Bc4', 'Bc5', 'c3', 'Nf6', 'd4', 'exd4', 'cxd4', 'Bb4+',
        'Bd2', 'Bxd2+', 'Nbxd2', 'd5', 'exd5', 'Nxd5', 'Qb3', 'Nce7', 'O-O', 'O-O',
        'Rfe1', 'c6', 'a4', 'Qb6', 'Qa3', 'Be6', 'a5', 'Qc7', 'Ne4', 'Rad8',
        'Nc5', 'Bg4', 'Ne5', 'Bf5', 'Qb3', 'b6', 'axb6', 'axb6', 'Na6', 'Qd6'
      ],
      pgn: pgnSample,
      accuracy: { player: 82.1, opponent: 65.4 },
      playedAt: new Date('2026-05-15T14:30:00Z'),
      evalGraph: [0.2, 0.3, 0.4, 0.2, 0.5, 0.4, 0.8, 0.7, 1.1, 0.9, 1.5, 1.4, 2.1, 1.8, 2.8, 3.4, 4.2],
    },
    {
      gameId: 'demo_game_02',
      platform,
      url: 'https://chess.com/game/live/108923413',
      playerUsername: username,
      playerColor: 'white',
      playerRating: 2102,
      opponentUsername: 'ChessRookie_21',
      opponentRating: 1890,
      result: 'win',
      resultDetail: 'Checkmate',
      timeControl: '10+0',
      timeClass: 'rapid',
      eco: 'B20',
      openingName: 'Sicilian Defense: Open',
      movesCount: 38,
      movesSan: ['e4', 'c5', 'Nf3', 'd6', 'd4', 'cxd4', 'Nxd4', 'Nf6', 'Nc3', 'a6', 'Be3', 'e5', 'Nb3', 'Be6', 'f3', 'Be7'],
      pgn: pgnSample,
      accuracy: { player: 88.4, opponent: 71.0 },
      playedAt: new Date('2026-05-13T18:10:00Z'),
    },
    {
      gameId: 'demo_game_03',
      platform,
      url: 'https://chess.com/game/live/108923414',
      playerUsername: username,
      playerColor: 'black',
      playerRating: 2095,
      opponentUsername: 'DragonKnight',
      opponentRating: 2140,
      result: 'loss',
      resultDetail: 'Timeout',
      timeControl: '5+0',
      timeClass: 'blitz',
      eco: 'D00',
      openingName: "Queen's Pawn Opening",
      movesCount: 51,
      movesSan: ['d4', 'Nf6', 'c4', 'g6', 'Nc3', 'Bg7', 'e4', 'd6', 'Nf3', 'O-O', 'Be2', 'e5'],
      pgn: pgnSample,
      accuracy: { player: 68.2, opponent: 79.5 },
      playedAt: new Date('2026-05-11T20:00:00Z'),
    },
    {
      gameId: 'demo_game_04',
      platform,
      url: 'https://chess.com/game/live/108923415',
      playerUsername: username,
      playerColor: 'white',
      playerRating: 2100,
      opponentUsername: 'Samyak_08',
      opponentRating: 2050,
      result: 'win',
      resultDetail: 'Resignation',
      timeControl: '10+0',
      timeClass: 'rapid',
      eco: 'C50',
      openingName: 'Italian Game',
      movesCount: 29,
      movesSan: ['e4', 'e5', 'Nf3', 'Nc6', 'Bc4', 'Bc5', 'O-O', 'Nf6', 'd3', 'd6'],
      pgn: pgnSample,
      accuracy: { player: 84.6, opponent: 62.1 },
      playedAt: new Date('2026-05-08T11:45:00Z'),
    },
    {
      gameId: 'demo_game_05',
      platform,
      url: 'https://chess.com/game/live/108923416',
      playerUsername: username,
      playerColor: 'black',
      playerRating: 2098,
      opponentUsername: 'RoyalBishop',
      opponentRating: 2075,
      result: 'draw',
      resultDetail: 'Agreement',
      timeControl: '10+0',
      timeClass: 'rapid',
      eco: 'E20',
      openingName: 'Nimzo-Indian Defense',
      movesCount: 45,
      movesSan: ['d4', 'Nf6', 'c4', 'e6', 'Nc3', 'Bb4', 'e3', 'O-O', 'Bd3', 'd5'],
      pgn: pgnSample,
      accuracy: { player: 80.0, opponent: 81.2 },
      playedAt: new Date('2026-05-05T09:30:00Z'),
    },
  ];
};

module.exports = {
  getDemoPlayer,
  getDemoGames,
};