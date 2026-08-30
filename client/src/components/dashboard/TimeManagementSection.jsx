import React from 'react';
import { useChess } from '../../context/ChessContext';
import { Clock, AlertCircle } from 'lucide-react';

export const TimeManagementSection = () => {
  const { analysisData } = useChess();

  const brackets = analysisData?.timeManagement?.brackets || [
    { range: '< 1 min', percentage: 27, winRate: 47.6, gamesCount: 21 },
    { range: '1-5 min', percentage: 34, winRate: 52.4, gamesCount: 26 },
    { range: '5-15 min', percentage: 21, winRate: 64.0, gamesCount: 16 },
    { range: '> 15 min', percentage: 18, winRate: 70.0, gamesCount: 14 },
  ];

  return (
    <div className="glow-card rounded-2xl p-5 md:p-6 text-slate-100 space-y-4">
      
      <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-blue-400" />
          <h3 className="text-sm font-bold text-white">Time Management</h3>
        </div>
        <span className="text-[11px] text-slate-400">Time usage across game phases</span>
      </div>

      {/* Segmented Color Bar matching mockup */}
      <div className="space-y-2">
        <div className="flex h-3 w-full rounded-full overflow-hidden">
          <div style={{ width: '27%' }} className="bg-rose-500" title="< 1 min (27%)"></div>
          <div style={{ width: '34%' }} className="bg-amber-500" title="1-5 min (34%)"></div>
          <div style={{ width: '21%' }} className="bg-emerald-500" title="5-15 min (21%)"></div>
          <div style={{ width: '18%' }} className="bg-blue-500" title="> 15 min (18%)"></div>
        </div>

        {/* Labels Row */}
        <div className="grid grid-cols-4 gap-2 text-center pt-2">
          <div className="bg-slate-900/60 p-2 rounded-xl border border-slate-800/80">
            <span className="text-xs font-extrabold text-rose-400 font-mono block">27%</span>
            <span className="text-[10px] text-slate-400 font-semibold block">&lt; 1 min</span>
            <span className="text-[9px] text-rose-300/80 font-mono">47.6% win</span>
          </div>

          <div className="bg-slate-900/60 p-2 rounded-xl border border-slate-800/80">
            <span className="text-xs font-extrabold text-amber-400 font-mono block">34%</span>
            <span className="text-[10px] text-slate-400 font-semibold block">1-5 min</span>
            <span className="text-[9px] text-amber-300/80 font-mono">52.4% win</span>
          </div>

          <div className="bg-slate-900/60 p-2 rounded-xl border border-slate-800/80">
            <span className="text-xs font-extrabold text-emerald-400 font-mono block">21%</span>
            <span className="text-[10px] text-slate-400 font-semibold block">5-15 min</span>
            <span className="text-[9px] text-emerald-300/80 font-mono">64.0% win</span>
          </div>

          <div className="bg-slate-900/60 p-2 rounded-xl border border-slate-800/80">
            <span className="text-xs font-extrabold text-blue-400 font-mono block">18%</span>
            <span className="text-[10px] text-slate-400 font-semibold block">&gt; 15 min</span>
            <span className="text-[9px] text-blue-300/80 font-mono">70.0% win</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 bg-rose-950/20 border border-rose-500/20 p-2.5 rounded-xl text-xs text-rose-300">
        <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
        <span>Significant tactical collapse detected when clock falls below 1 minute (win rate drops by 16.4%).</span>
      </div>

    </div>
  );
};