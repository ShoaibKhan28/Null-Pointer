import React from 'react';
import { useChess } from '../../context/ChessContext';
import { Zap, AlertTriangle, Crown } from 'lucide-react';

export const TrapsAndTacticsSection = () => {
  const { analysisData } = useChess();

  const traps = analysisData?.traps || {
    used: [
      { name: 'Fried Liver Attack', count: 12 },
      { name: "Scholar's Mate", count: 8 },
      { name: 'Italian Game Trap', count: 10 },
    ],
    fallenInto: [
      { name: "Fool's Mate", count: 1 },
      { name: 'Hook Trap', count: 4 },
      { name: 'Queen Trap', count: 5 },
    ],
  };

  const endgameStats = analysisData?.endgameStats || {
    winningConversion: 68,
    drawingRate: 21,
    losingFromEqual: 11,
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      
      {/* Traps Used */}
      <div className="glow-card rounded-2xl p-5 text-slate-100">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-800/80">
          <Zap className="w-4 h-4 text-blue-400" />
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">Traps Used</h3>
        </div>
        <p className="text-[11px] text-slate-400 mt-2 mb-3">Most common traps they use:</p>
        <div className="flex flex-wrap gap-2">
          {traps.used.map((t, idx) => (
            <span key={idx} className="text-xs font-medium px-2.5 py-1 rounded-lg bg-blue-950/40 text-blue-300 border border-blue-500/30">
              {t.name}
            </span>
          ))}
        </div>
      </div>

      {/* Falls Into */}
      <div className="glow-card rounded-2xl p-5 text-slate-100">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-800/80">
          <AlertTriangle className="w-4 h-4 text-rose-400" />
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">Falls Into</h3>
        </div>
        <p className="text-[11px] text-slate-400 mt-2 mb-3">Traps they commonly fall for:</p>
        <div className="flex flex-wrap gap-2">
          {traps.fallenInto.map((t, idx) => (
            <span key={idx} className="text-xs font-medium px-2.5 py-1 rounded-lg bg-rose-950/40 text-rose-300 border border-rose-500/30">
              {t.name}
            </span>
          ))}
        </div>
      </div>

      {/* Endgame Statistics */}
      <div className="glow-card rounded-2xl p-5 text-slate-100">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-800/80">
          <Crown className="w-4 h-4 text-amber-400" />
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">Endgame Statistics</h3>
        </div>
        <p className="text-[11px] text-slate-400 mt-2 mb-3">Endgames win/draw/loss:</p>
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="bg-emerald-950/20 border border-emerald-500/20 p-2 rounded-lg">
            <span className="text-[10px] text-emerald-400 font-bold block uppercase">Winning</span>
            <span className="text-sm font-black text-emerald-300 font-mono">{endgameStats.winningConversion}%</span>
          </div>
          <div className="bg-blue-950/20 border border-blue-500/20 p-2 rounded-lg">
            <span className="text-[10px] text-blue-400 font-bold block uppercase">Drawing</span>
            <span className="text-sm font-black text-blue-300 font-mono">{endgameStats.drawingRate}%</span>
          </div>
          <div className="bg-rose-950/20 border border-rose-500/20 p-2 rounded-lg">
            <span className="text-[10px] text-rose-400 font-bold block uppercase">Losing</span>
            <span className="text-sm font-black text-rose-300 font-mono">{endgameStats.losingFromEqual}%</span>
          </div>
        </div>
      </div>

    </div>
  );
};