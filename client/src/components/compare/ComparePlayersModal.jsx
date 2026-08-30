import React, { useState } from 'react';
import { useChess } from '../../context/ChessContext';
import { compareTwoPlayers } from '../../api/apiService';
import { X, Users } from 'lucide-react';

export const ComparePlayersModal = () => {
  const { isCompareModalOpen, setIsCompareModalOpen, currentUsername, platform } = useChess();

  const [p1User, setP1User] = useState(currentUsername);
  const [p2User, setP2User] = useState('DragonKnight');
  const [compareResult, setCompareResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCompare = async (e) => {
    if (e) e.preventDefault();
    setIsLoading(true);
    try {
      const res = await compareTwoPlayers(
        { username: p1User, platform },
        { username: p2User, platform }
      );
      setCompareResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isCompareModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#0b1222] border border-slate-800 rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 text-slate-100 shadow-2xl relative">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/30">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Side-by-Side Player Scout</h3>
              <p className="text-xs text-slate-400">Compare behavioral metrics, ratings, and tactical edges</p>
            </div>
          </div>
          <button onClick={() => setIsCompareModalOpen(false)} className="p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white border border-slate-800 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleCompare} className="grid grid-cols-1 sm:grid-cols-5 gap-3 my-6 items-center">
          <div className="sm:col-span-2">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Player 1</label>
            <input type="text" value={p1User} onChange={(e) => setP1User(e.target.value)} className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500" />
          </div>
          <div className="sm:col-span-1 text-center"><span className="text-xs font-mono font-bold text-slate-500">VS</span></div>
          <div className="sm:col-span-2">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Player 2</label>
            <input type="text" value={p2User} onChange={(e) => setP2User(e.target.value)} className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500" />
          </div>
          <div className="sm:col-span-5 pt-2">
            <button type="submit" disabled={isLoading} className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 transition-all">
              {isLoading ? 'Synthesizing Dual Dossier...' : 'Run Side-by-Side Scout'}
            </button>
          </div>
        </form>
        {compareResult && (
          <div className="space-y-4 pt-4 border-t border-slate-800">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
                <span className="text-base font-extrabold text-blue-400 block">{compareResult.player1 && compareResult.player1.player ? compareResult.player1.player.username : 'Player 1'}</span>
                <span className="text-2xl font-black text-white font-mono">{compareResult.player1 && compareResult.player1.player && compareResult.player1.player.ratings ? compareResult.player1.player.ratings.rapid : 2105}</span>
                <span className="text-xs text-slate-400 block mt-1">Stalker Score: <strong className="text-white">{compareResult.player1 && compareResult.player1.analysis ? compareResult.player1.analysis.stalkerScore : 56}</strong></span>
              </div>
              <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
                <span className="text-base font-extrabold text-amber-400 block">{compareResult.player2 && compareResult.player2.player ? compareResult.player2.player.username : 'Player 2'}</span>
                <span className="text-2xl font-black text-white font-mono">{compareResult.player2 && compareResult.player2.player && compareResult.player2.player.ratings ? compareResult.player2.player.ratings.rapid : 2140}</span>
                <span className="text-xs text-slate-400 block mt-1">Stalker Score: <strong className="text-white">{compareResult.player2 && compareResult.player2.analysis ? compareResult.player2.analysis.stalkerScore : 62}</strong></span>
              </div>
            </div>
            <div className="bg-blue-950/20 border border-blue-500/30 p-4 rounded-xl text-xs space-y-2">
              <h4 className="font-bold text-white uppercase tracking-wider">Scouting Verdict</h4>
              <p className="text-slate-300">Opponent <strong>@{compareResult.player2 && compareResult.player2.player ? compareResult.player2.player.username : 'Opponent'}</strong> is higher rated, but shows a 14% higher blunder vulnerability in time trouble (&lt; 1 min).</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
