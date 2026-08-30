import React, { useState, useEffect } from 'react';
import { useChess } from '../../context/ChessContext';
import { Chess } from 'chess.js';
import { PIECE_SVGS } from '../../utils/chessHelpers';
import { X, Bot, RefreshCw, Flag, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export const PlayTwinModal = () => {
  const { isTwinModalOpen, setIsTwinModalOpen, currentUsername } = useChess();

  const [game, setGame] = useState(new Chess());
  const [board, setBoard] = useState([]);
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [possibleMoves, setPossibleMoves] = useState([]);
  const [gameStatus, setGameStatus] = useState('In Progress');
  const [botThought, setBotThought] = useState('Ready to spar! Make your opening move.');
  const [playerColor, setPlayerColor] = useState('white');
  const [isBotThinking, setIsBotThinking] = useState(false);

  useEffect(() => {
    if (isTwinModalOpen) {
      resetGame();
    }
  }, [isTwinModalOpen]);

  const resetGame = () => {
    const newGame = new Chess();
    setGame(newGame);
    setBoard(newGame.board());
    setSelectedSquare(null);
    setPossibleMoves([]);
    setGameStatus('In Progress');
    setBotThought('I will test you using @' + currentUsername + '\'s aggressive attacking lines.');
  };

  const handleSquareClick = (rIdx, cIdx) => {
    if (game.isGameOver() || isBotThinking) return;

    const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];
    const sq = files[cIdx] + ranks[rIdx];

    if (selectedSquare === sq) {
      setSelectedSquare(null);
      setPossibleMoves([]);
      return;
    }

    if (selectedSquare && possibleMoves.includes(sq)) {
      try {
        const move = game.move({
          from: selectedSquare,
          to: sq,
          promotion: 'q',
        });
        if (move) {
          setBoard(game.board());
          setSelectedSquare(null);
          setPossibleMoves([]);

          if (game.isGameOver()) {
            handleGameOver();
            return;
          }

          triggerBotMove();
          return;
        }
      } catch (e) {}
    }

    const piece = game.get(sq);
    if (piece && ((playerColor === 'white' && piece.color === 'w') || (playerColor === 'black' && piece.color === 'b'))) {
      setSelectedSquare(sq);
      const legalMoves = game.moves({ square: sq, verbose: true }).map((m) => m.to);
      setPossibleMoves(legalMoves);
    } else {
      setSelectedSquare(null);
      setPossibleMoves([]);
    }
  };

  const triggerBotMove = () => {
    setIsBotThinking(true);
    setBotThought('Analyzing tactical patterns & calculating attacking sacrifices...');

    setTimeout(() => {
      const legalMoves = game.moves({ verbose: true });
      if (!legalMoves.length) {
        handleGameOver();
        setIsBotThinking(false);
        return;
      }

      const aggressiveMoves = legalMoves.filter((m) => m.captured || m.san.includes('+'));
      const chosenMove = aggressiveMoves.length > 0
        ? aggressiveMoves[Math.floor(Math.random() * aggressiveMoves.length)]
        : legalMoves[Math.floor(Math.random() * legalMoves.length)];

      game.move(chosenMove);
      setBoard(game.board());
      setIsBotThinking(false);

      if (chosenMove.captured) {
        setBotThought('Aggressive capture with ' + chosenMove.san + '! Testing your defensive patience.');
      } else if (chosenMove.san.includes('+')) {
        setBotThought('Check with ' + chosenMove.san + '! Forcing your king out of safety.');
      } else {
        setBotThought('Solid development: ' + chosenMove.san + '. Preparing a kingside breakthrough.');
      }

      if (game.isGameOver()) {
        handleGameOver();
      }
    }, 800);
  };

  const handleGameOver = () => {
    if (game.isCheckmate()) {
      const winner = game.turn() === 'b' ? 'White' : 'Black';
      setGameStatus('Checkmate! ' + winner + ' Wins!');
      if ((winner === 'White' && playerColor === 'white') || (winner === 'Black' && playerColor === 'black')) {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        setBotThought('Incredible victory! You successfully exploited @' + currentUsername + '\'s tactical holes.');
      } else {
        setBotThought('Defeat! The AI Twin capitalized on the middle game attack.');
      }
    } else if (game.isDraw()) {
      setGameStatus('Draw!');
      setBotThought('Stalemate / Draw agreed.');
    }
  };

  if (!isTwinModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#0b1222] border border-slate-800 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 text-slate-100 shadow-2xl relative">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/30">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                Sparring Arena vs <span className="text-blue-400">@{currentUsername}'s AI Twin</span>
              </h3>
              <p className="text-xs text-slate-400">Personality: The Berserker (Aggression 82/100, Blunder under 1m)</p>
            </div>
          </div>
          <button onClick={() => setIsTwinModalOpen(false)} className="p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white border border-slate-800 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-6 items-center">
          <div className="md:col-span-7 flex flex-col items-center">
            <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 shadow-2xl">
              <div className="w-72 h-72 sm:w-80 sm:h-80 grid grid-cols-8 grid-rows-8 border border-slate-700/60 rounded-lg overflow-hidden select-none">
                {board.map((row, rIdx) =>
                  row.map((piece, cIdx) => {
                    const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
                    const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];
                    const sq = files[cIdx] + ranks[rIdx];
                    const isDark = (rIdx + cIdx) % 2 === 1;
                    const isSelected = selectedSquare === sq;
                    const isTarget = possibleMoves.includes(sq);
                    let pieceSvgKey = null;
                    if (piece) { pieceSvgKey = piece.color === 'w' ? piece.type.toUpperCase() : piece.type; }
                    return (
                      <div key={sq} onClick={() => handleSquareClick(rIdx, cIdx)} className={'relative flex items-center justify-center cursor-pointer ' + (isDark ? 'bg-[#8ca2ad]' : 'bg-[#dee3e6]') + (isSelected ? ' !bg-amber-400/80 ring-2 ring-amber-500' : '')}>
                        {isTarget && <div className="absolute w-3.5 h-3.5 rounded-full bg-slate-900/40 z-20 pointer-events-none"></div>}
                        {piece && pieceSvgKey && PIECE_SVGS[pieceSvgKey] && <img src={PIECE_SVGS[pieceSvgKey]} alt={pieceSvgKey} className="w-4/5 h-4/5 object-contain z-10 drop-shadow pointer-events-none" />}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
          <div className="md:col-span-5 space-y-4">
            <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Arena Match Status</span>
              <span className="text-base font-black text-blue-400 font-mono block">{gameStatus}</span>
              <div className="flex items-center gap-2 mt-2 text-xs text-slate-300">
                <span className={'w-2 h-2 rounded-full ' + (game.turn() === 'w' ? 'bg-blue-400 animate-ping' : 'bg-amber-400')}></span>
                <span>Turn: <strong>{game.turn() === 'w' ? 'White (You)' : 'Black (AI Twin)'}</strong></span>
              </div>
            </div>
            <div className="bg-gradient-to-b from-blue-950/30 to-slate-900 p-4 rounded-2xl border border-blue-500/30 space-y-2">
              <div className="flex items-center gap-2 text-blue-400 text-xs font-bold">
                <Sparkles className="w-4 h-4" />
                <span>AI Twin Thought Stream</span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed italic">"{botThought}"</p>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button onClick={resetGame} className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-colors">
                <RefreshCw className="w-4 h-4" /> Rematch / Reset
              </button>
              <button onClick={() => { setGameStatus('Resigned'); setBotThought('Resignation received. Better luck next time!'); }} className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 text-xs font-bold border border-rose-500/30 transition-colors">
                <Flag className="w-4 h-4" /> Resign
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
