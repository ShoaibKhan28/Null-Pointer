import React from 'react';
import { useChess } from '../../context/ChessContext';
import { History, Eye, Play } from 'lucide-react';

export const RecentGamesTable = () => {
  const { gamesList, setSelectedGame, setActiveTab, currentUsername } = useChess();

  const recentGames = gamesList.slice(0, 5);

  const recentFormPills = [
    'W', 'W', 'L', 'W', 'D', 'W', 'W', 'W', 'W', 'W',
    'W', 'W', 'W', 'D', 'W', 'W', 'L', 'D', 'W', 'W'
  ];

  const handleInspectGame = (game) => {
    setSelectedGame(game);
    setActiveTab('game-review');
  };

  return (
    <div className="glow-card rounded-2xl p-5 md:p-6 text-slate-100 space-y-5">
      
      <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <History className="w-4 h-4 text-blue-400" />
          <h3 className="text-base font-bold text-white">Recent Games</h3>
        </div>
        <span className="text-xs text-slate-400">Last matches played across pools</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Games Table */}
        <div className="lg:col-span-7 space-y-3">
          <div className="divide-y divide-slate-800/60">
            {recentGames.map((g, idx) => (
              <div
                key={g.gameId || idx}
                onClick={() => handleInspectGame(g)}
                className="py-3 flex items-center justify-between hover:bg-slate-900/60 px-3 rounded-xl cursor-pointer transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-500 font-mono">vs</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-200 group-hover:text-blue-400 transition-colors">
                      {g.opponentUsername}
                    </span>
                    <span className="text-[11px] text-slate-500 font-mono">({g.opponentRating})</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                    g.result === 'win'
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                      : (g.result === 'loss' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30' : 'bg-amber-500/10 text-amber-400 border border-amber-500/30')
                  }`}>
                    {g.result === 'win' ? 'Win' : (g.result === 'loss' ? 'Loss' : 'Draw')}
                  </span>

                  <span className="text-xs font-mono text-slate-400">
                    {g.result === 'win' ? '1 - 0' : (g.result === 'loss' ? '0 - 1' : '½ - ½')}
                  </span>

                  <span className="text-[11px] text-slate-500 hidden sm:block">
                    {idx === 0 ? '2 days ago' : (idx === 1 ? '4 days ago' : (idx === 2 ? '6 days ago' : '1 week ago'))}
                  </span>

                  <button className="p-1.5 rounded-lg bg-slate-800 text-slate-400 group-hover:text-white group-hover:bg-blue-600 transition-colors">
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button 
            onClick={() => setActiveTab('recent-games')}
            className="w-full py-2 text-center text-xs font-semibold text-blue-400 hover:text-blue-300 bg-slate-900/80 rounded-xl border border-slate-800 transition-colors"
          >
            View all games archive
          </button>
        </div>

        {/* Recent Form (Last 20 Games) */}
        <div className="lg:col-span-5 bg-slate-900/60 p-4 rounded-2xl border border-slate-800 space-y-4">
          <div>
            <span className="text-xs font-bold text-white uppercase tracking-wider block mb-1">
              Recent Form <span className="text-slate-500 text-[11px] font-normal">(Last 20 games)</span>
            </span>
            <div className="flex flex-wrap gap-1 mt-2">
              {recentFormPills.map((res, idx) => (
                <span
                  key={idx}
                  className={`w-5 h-5 rounded flex items-center justify-center text-[10px] font-mono font-black ${
                    res === 'W'
                      ? 'bg-emerald-600 text-white'
                      : (res === 'L' ? 'bg-rose-600 text-white' : 'bg-amber-600 text-white')
                  }`}
                >
                  {res}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center pt-2 border-t border-slate-800">
            <div className="bg-emerald-950/20 border border-emerald-500/20 p-2 rounded-xl">
              <span className="text-base font-black text-emerald-400 font-mono">11</span>
              <span className="text-[10px] text-slate-400 block font-semibold">Wins (55%)</span>
            </div>
            <div className="bg-rose-950/20 border border-rose-500/20 p-2 rounded-xl">
              <span className="text-base font-black text-rose-400 font-mono">6</span>
              <span className="text-[10px] text-slate-400 block font-semibold">Losses (30%)</span>
            </div>
            <div className="bg-amber-950/20 border border-amber-500/20 p-2 rounded-xl">
              <span className="text-base font-black text-amber-400 font-mono">3</span>
              <span className="text-[10px] text-slate-400 block font-semibold">Draws (15%)</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};