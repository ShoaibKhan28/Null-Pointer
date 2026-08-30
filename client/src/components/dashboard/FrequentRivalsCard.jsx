import React from 'react';
import { useChess } from '../../context/ChessContext';
import { Users, Swords, ChevronRight } from 'lucide-react';

export const FrequentRivalsCard = () => {
  const { analysisData, loadPlayerData, platform } = useChess();

  const rivals = analysisData?.frequentRivals || [
    { username: 'DragonKnight', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80', games: 128, winRate: 58 },
    { username: 'Samyak_08', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80', games: 112, winRate: 61 },
    { username: 'ChessRookie_21', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80', games: 97, winRate: 49 },
    { username: 'RoyalBishop', avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&auto=format&fit=crop&q=80', games: 85, winRate: 55 },
    { username: 'KnightRider99', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80', games: 74, winRate: 47 },
  ];

  const overall = analysisData?.headToHeadOverall || {
    wins: 12,
    losses: 6,
    draws: 3,
    winRate: 64,
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      
      {/* Frequent Rivals */}
      <div className="glow-card rounded-2xl p-5 text-slate-100 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-400" />
              <h3 className="text-sm font-bold text-white">Frequent Rivals</h3>
            </div>
            <span className="text-[11px] text-slate-500">They've played the most</span>
          </div>

          <div className="divide-y divide-slate-800/60 mt-2">
            {rivals.map((r, idx) => (
              <div 
                key={idx}
                onClick={() => loadPlayerData(r.username, platform)}
                className="py-2.5 flex items-center justify-between hover:bg-slate-900/40 px-2 rounded-lg cursor-pointer transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold text-slate-500 w-3">{idx + 1}</span>
                  <img src={r.avatar} alt={r.username} className="w-7 h-7 rounded-full object-cover border border-slate-700" />
                  <span className="text-xs font-semibold text-slate-200 group-hover:text-blue-400 transition-colors">
                    {r.username}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <span className="text-slate-400 font-mono text-[11px]">{r.games} games</span>
                  <span className={`font-mono font-bold ${r.winRate >= 50 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {r.winRate}%
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-slate-300" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <button className="w-full mt-3 py-2 text-center text-xs font-semibold text-blue-400 hover:text-blue-300 bg-slate-900/80 rounded-xl border border-slate-800 transition-colors">
          View all rivals
        </button>
      </div>

      {/* Head to Head Card */}
      <div className="glow-card rounded-2xl p-5 text-slate-100 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
            <div className="flex items-center gap-2">
              <Swords className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm font-bold text-white">Head to Head</h3>
            </div>
            <span className="text-[11px] text-slate-500">Your results against them</span>
          </div>

          <div className="flex items-center justify-around my-6">
            <div className="text-center">
              <span className="text-2xl font-black text-emerald-400 font-mono">{overall.wins}</span>
              <span className="text-[11px] font-semibold text-slate-400 block uppercase">Wins</span>
            </div>
            <div className="text-center">
              <span className="text-2xl font-black text-rose-400 font-mono">{overall.losses}</span>
              <span className="text-[11px] font-semibold text-slate-400 block uppercase">Losses</span>
            </div>
            <div className="text-center">
              <span className="text-2xl font-black text-amber-400 font-mono">{overall.draws}</span>
              <span className="text-[11px] font-semibold text-slate-400 block uppercase">Draws</span>
            </div>

            {/* Circular Win Rate Badge */}
            <div className="w-16 h-16 rounded-full bg-blue-600/20 border-2 border-blue-500 flex flex-col items-center justify-center shadow-lg shadow-blue-500/20">
              <span className="text-sm font-black text-white font-mono">{overall.winRate}%</span>
              <span className="text-[9px] font-bold text-blue-300 uppercase">Win Rate</span>
            </div>
          </div>
        </div>

        <button className="w-full mt-3 py-2 text-center text-xs font-semibold text-blue-400 hover:text-blue-300 bg-slate-900/80 rounded-xl border border-slate-800 transition-colors">
          View all head to head
        </button>
      </div>

    </div>
  );
};