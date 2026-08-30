import React, { useState, useEffect } from 'react';
import { useChess } from '../../context/ChessContext';
import { Chess } from 'chess.js';
import { PIECE_SVGS } from '../../utils/chessHelpers';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Play,
  Pause,
  Settings,
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, Tooltip } from 'recharts';

export const InteractiveChessboard = () => {
  const { selectedGame, currentUsername } = useChess();

  const [gameInstance, setGameInstance] = useState(new Chess());
  const [board, setBoard] = useState([]);
  const [moveHistory, setMoveHistory] = useState([]);
  const [currentMoveIndex, setCurrentMoveIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [possibleMoves, setPossibleMoves] = useState([]);
  const [activeTab, setActiveTab] = useState('analysis');

  const defaultMoves = [
    'e4', 'e5', 'Nf3', 'Nc6', 'Bc4', 'Bc5', 'c3', 'Nf6', 'd4', 'exd4',
    'cxd4', 'Bb4+', 'Bd2', 'Bxd2+', 'Nbxd2', 'd5', 'exd5', 'Nxd5', 'Qb3', 'Nce7',
    'O-O', 'O-O', 'Rfe1', 'c6', 'a4', 'Qb6', 'Qa3', 'Be6', 'a5', 'Qc7',
    'Ne4', 'Rad8', 'Nc5', 'Bg4', 'Ne5', 'Bf5', 'Qb3', 'b6', 'axb6', 'axb6',
    'Na6', 'Qd6'
  ];

  useEffect(() => {
    const chess = new Chess();
    const moves = selectedGame && selectedGame.movesSan && selectedGame.movesSan.length ? selectedGame.movesSan : defaultMoves;

    setMoveHistory(moves);
    setGameInstance(chess);
    setBoard(chess.board());
    setCurrentMoveIndex(moves.length - 1);

    const simChess = new Chess();
    moves.forEach((m) => {
      try { simChess.move(m); } catch (e) {}
    });
    setGameInstance(simChess);
    setBoard(simChess.board());
  }, [selectedGame]);

  const goToMove = (targetIndex) => {
    const chess = new Chess();
    const moves = moveHistory;
    const clampedIndex = Math.max(-1, Math.min(targetIndex, moves.length - 1));

    for (let i = 0; i <= clampedIndex; i++) {
      try { chess.move(moves[i]); } catch (e) {}
    }

    setGameInstance(chess);
    setBoard(chess.board());
    setCurrentMoveIndex(clampedIndex);
    setSelectedSquare(null);
    setPossibleMoves([]);
  };

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentMoveIndex((prev) => {
          if (prev < moveHistory.length - 1) {
            goToMove(prev + 1);
            return prev + 1;
          } else {
            setIsPlaying(false);
            return prev;
          }
        });
      }, 900);
    }
    return () => clearInterval(interval);
  }, [isPlaying, moveHistory]);

  const handleSquareClick = (rowIndex, colIndex) => {
    const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];
    const square = files[colIndex] + ranks[rowIndex];

    if (selectedSquare === square) {
      setSelectedSquare(null);
      setPossibleMoves([]);
      return;
    }

    if (selectedSquare && possibleMoves.includes(square)) {
      try {
        const move = gameInstance.move({
          from: selectedSquare,
          to: square,
          promotion: 'q',
        });
        if (move) {
          setBoard(gameInstance.board());
          setMoveHistory((prev) => [...prev.slice(0, currentMoveIndex + 1), move.san]);
          setCurrentMoveIndex((prev) => prev + 1);
          setSelectedSquare(null);
          setPossibleMoves([]);
          return;
        }
      } catch (e) {}
    }

    const piece = gameInstance.get(square);
    if (piece) {
      setSelectedSquare(square);
      const legalMoves = gameInstance.moves({ square, verbose: true }).map((m) => m.to);
      setPossibleMoves(legalMoves);
    } else {
      setSelectedSquare(null);
      setPossibleMoves([]);
    }
  };

  const evalData = [
    { move: '1', eval: 0.2 }, { move: '5', eval: 0.4 }, { move: '10', eval: 0.8 },
    { move: '15', eval: 1.2 }, { move: '20', eval: 2.4 }, { move: '23', eval: 3.5 },
    { move: '30', eval: 4.8 }, { move: '35', eval: 5.6 }
  ];

  return (
    <div className="glow-card rounded-2xl p-5 md:p-6 text-slate-100 space-y-6">
      
      {/* Game Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center font-bold text-xs">
              ♔
            </div>
            <div>
              <span className="text-xs font-bold text-white block">
                {selectedGame ? selectedGame.playerUsername : currentUsername}
              </span>
              <span className="text-[10px] text-slate-400 font-mono">
                {selectedGame ? selectedGame.playerRating : 2105}
              </span>
            </div>
          </div>

          <div className="px-3 py-1 bg-slate-900 rounded-lg border border-slate-800 text-center">
            <span className="text-xs font-black text-white font-mono block">
              {selectedGame && selectedGame.result === 'win' ? '1 - 0' : (selectedGame && selectedGame.result === 'loss' ? '0 - 1' : '1 - 0')}
            </span>
            <span className="text-[9px] text-slate-500 font-medium uppercase">
              {selectedGame ? selectedGame.timeClass : 'Rapid'} • May 15, 2026
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center font-bold text-xs">
              ♚
            </div>
            <div>
              <span className="text-xs font-bold text-white block">
                {selectedGame ? selectedGame.opponentUsername : 'KnightRider99'}
              </span>
              <span className="text-[10px] text-slate-400 font-mono">
                {selectedGame ? selectedGame.opponentRating : 1910}
              </span>
            </div>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="flex bg-slate-900/90 p-1 rounded-xl border border-slate-800 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('analysis')}
            className={'px-3 py-1 rounded-lg transition-colors ' + (activeTab === 'analysis' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white')}
          >
            Analysis
          </button>
          <button
            onClick={() => setActiveTab('review')}
            className={'px-3 py-1 rounded-lg transition-colors ' + (activeTab === 'review' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white')}
          >
            Review
          </button>
          <button
            onClick={() => setActiveTab('openings')}
            className={'px-3 py-1 rounded-lg transition-colors ' + (activeTab === 'openings' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white')}
          >
            Openings
          </button>
        </div>
      </div>

      {/* Main Board & Review Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left: 8x8 Interactive Chessboard */}
        <div className="lg:col-span-6 flex flex-col items-center">
          <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 shadow-2xl">
            
            {/* Board Container */}
            <div className="w-72 h-72 sm:w-96 sm:h-96 grid grid-cols-8 grid-rows-8 border-2 border-slate-700/60 rounded-lg overflow-hidden select-none">
              {board.map((row, rIdx) =>
                row.map((piece, cIdx) => {
                  const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
                  const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];
                  const sq = files[cIdx] + ranks[rIdx];
                  const isDark = (rIdx + cIdx) % 2 === 1;
                  const isSelected = selectedSquare === sq;
                  const isTarget = possibleMoves.includes(sq);

                  let pieceSvgKey = null;
                  if (piece) {
                    pieceSvgKey = piece.color === 'w' ? piece.type.toUpperCase() : piece.type;
                  }

                  return (
                    <div
                      key={sq}
                      onClick={() => handleSquareClick(rIdx, cIdx)}
                      className={'relative flex items-center justify-center cursor-pointer transition-all ' +
                        (isDark ? 'bg-[#8ca2ad] ' : 'bg-[#dee3e6] ') +
                        (isSelected ? '!bg-amber-400/80 ring-2 ring-amber-500' : '')
                      }
                    >
                      {isTarget && (
                        <div className="absolute w-3.5 h-3.5 rounded-full bg-slate-900/40 z-20 pointer-events-none"></div>
                      )}

                      {piece && pieceSvgKey && PIECE_SVGS[pieceSvgKey] && (
                        <img
                          src={PIECE_SVGS[pieceSvgKey]}
                          alt={pieceSvgKey}
                          className="w-4/5 h-4/5 object-contain z-10 drop-shadow-md pointer-events-none"
                        />
                      )}
                    </div>
                  );
                })
              )}
            </div>

            {/* Navigation Controls Bar */}
            <div className="flex items-center justify-between mt-3 px-2">
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => goToMove(-1)}
                  className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800"
                  title="First Move"
                >
                  <ChevronsLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => goToMove(currentMoveIndex - 1)}
                  className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800"
                  title="Previous Move"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/30"
                  title={isPlaying ? 'Pause' : 'Auto Play'}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => goToMove(currentMoveIndex + 1)}
                  className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800"
                  title="Next Move"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => goToMove(moveHistory.length - 1)}
                  className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800"
                  title="Last Move"
                >
                  <ChevronsRight className="w-4 h-4" />
                </button>
              </div>

              <span className="text-xs font-mono font-bold text-slate-400">
                {currentMoveIndex + 1} / {moveHistory.length}
              </span>

              <button className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800">
                <Settings className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

        {/* Right: Accuracy & Evaluation Panel */}
        <div className="lg:col-span-6 space-y-4">
          
          {/* Accuracy Scores */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
              <span className="text-[11px] text-slate-400 block uppercase font-semibold">White Accuracy</span>
              <span className="text-2xl font-black text-blue-400 font-mono">
                {selectedGame && selectedGame.accuracy ? selectedGame.accuracy.player : 82.1}
              </span>
            </div>
            <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
              <span className="text-[11px] text-slate-400 block uppercase font-semibold">Black Accuracy</span>
              <span className="text-2xl font-black text-slate-300 font-mono">
                {selectedGame && selectedGame.accuracy ? selectedGame.accuracy.opponent : 65.4}
              </span>
            </div>
          </div>

          {/* Centipawn Curve */}
          <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
            <span className="text-[11px] text-slate-400 font-semibold block mb-2">Advantage Evaluation Curve</span>
            <div className="h-24 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={evalData}>
                  <Area type="monotone" dataKey="eval" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.2} />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', fontSize: '11px' }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Move Annotation Callout */}
          <div className="bg-amber-950/30 border border-amber-500/30 p-4 rounded-xl space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
              <span className="text-xs font-bold text-amber-300">23... Qd7 is a mistake</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              You missed an opportunity to improve your position and hold the kingside pin.
            </p>
            <div className="flex items-center justify-between text-xs font-mono pt-1">
              <span className="text-slate-400">Played: <strong className="text-rose-400">23... Qd7 (-1.24)</strong></span>
              <span className="text-slate-400">Best: <strong className="text-emerald-400">23... Qh6 (-0.31)</strong></span>
            </div>
          </div>

          {/* Move History Table */}
          <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 max-h-40 overflow-y-auto">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">Move List</span>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs font-mono">
              {Array.from({ length: Math.ceil(moveHistory.length / 2) }).map((_, i) => {
                const whiteMove = moveHistory[i * 2];
                const blackMove = moveHistory[i * 2 + 1];
                const isWhiteActive = currentMoveIndex === i * 2;
                const isBlackActive = currentMoveIndex === i * 2 + 1;

                return (
                  <div key={i} className="flex items-center justify-between py-0.5 border-b border-slate-800/40">
                    <span className="text-slate-500 w-6">{i + 1}.</span>
                    <span
                      onClick={() => goToMove(i * 2)}
                      className={'cursor-pointer px-1.5 py-0.5 rounded transition-colors ' +
                        (isWhiteActive ? 'bg-blue-600 text-white font-bold' : 'text-slate-300 hover:text-blue-400')
                      }
                    >
                      {whiteMove}
                    </span>
                    {blackMove && (
                      <span
                        onClick={() => goToMove(i * 2 + 1)}
                        className={'cursor-pointer px-1.5 py-0.5 rounded transition-colors ' +
                          (isBlackActive ? 'bg-blue-600 text-white font-bold' : 'text-slate-300 hover:text-blue-400')
                        }
                      >
                        {blackMove}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
