import React from 'react';
import { useChess } from '../../context/ChessContext';
import { GitBranch, ChevronRight } from 'lucide-react';

export const RepertoireHeatmap = () => {
  const { analysisData } = useChess();

  const repertoire = analysisData?.repertoire || [
    { opening: '1. e4 (King\'s Pawn Game)', eco: 'B00', games: 323, winRate: 56, performanceDelta: +18 },
    { opening: '1. d4 (Queen\'s Pawn Game)', eco: 'D00', games: 198, winRate: 54, performanceDelta: +12 },
    { opening: '1. Nf3 (Zukertort / Réti Opening)', eco: 'A04', games: 87, winRate: 60, performanceDelta: +22 },
    { opening: '1. c4 (English Opening)', eco: 'A10', games: 62, winRate: 45, performanceDelta: -5 },
    { opening: '1. g3 (King\'s Fianchetto)', eco: 'A00', games: 41, winRate: 50, performanceDelta: 0 },
    { opening: '1. b3 (Nimzo-Larsen Attack)', eco: 'A01', games: 38, winRate: 47, performanceDelta: -3 },
  ];

  // 8x8 Board Heatmap generator matching mockup
  const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const ranks = [8, 7, 6, 5, 4, 3, 2, 1];

  const getHeatmapColor = (file, rank) => {
    // High intensity center squares
    if (['e4', 'd4', 'e5', 'd5', 'c4', 'f4', 'f3', 'c3'].includes(`${file}${rank}`)) {
      return 'bg-blue-500/80 text-white';
    }
    if (['c5', 'f6', 'c6', 'g3', 'b3', 'e3', 'd3'].includes(`${file}${rank}`)) {
      return 'bg-blue-600/40 text-blue-200';
    }
    const isDark = (files.indexOf(file) + rank) % 2 === 0;
    return isDark ? 'bg-slate-800/40 text-slate-600' : 'bg-slate-900/60 text-slate-600';
  };

  return (
    <div className="glow-card rounded-2xl p-5 md:p-6 text-slate-100 space-y-5">
      
      <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <GitBranch className="w-4 h-4 text-blue-400" />
          <h3 className="text-base font-bold text-white">Repertoire</h3>
        </div>
        <span className="text-xs text-slate-400">Explore their opening choices & win rates</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        
        {/* 8x8 Board Heatmap */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 shadow-xl inline-block">
            <div className="grid grid-cols-8 gap-0.5 w-60 h-60 sm:w-64 sm:h-64 border border-slate-700/50 rounded-lg overflow-hidden">
              {ranks.map((r) =>
                files.map((f) => {
                  const sq = `${f}${r}`;
                  const colorClass = getHeatmapColor(f, r);
                  return (
                    <div
                      key={sq}
                      className={`flex items-center justify-center text-[9px] font-mono font-semibold select-none transition-colors ${colorClass}`}
                      title={`Square ${sq}`}
                    >
                      {['e4', 'd4', 'Nf3', 'c4'].includes(sq) ? '●' : ''}
                    </div>
                  );
                })
              )}
            </div>
            <div className="flex justify-between px-2 pt-1 text-[10px] font-mono text-slate-500">
              {files.map((f) => <span key={f}>{f}</span>)}
            </div>
          </div>
          <span className="text-[11px] text-slate-400 mt-2 font-medium">Board square activity & control density</span>
        </div>

        {/* Opening List Table */}
        <div className="lg:col-span-7 space-y-3">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-slate-500 border-b border-slate-800/80 text-[11px] uppercase">
                  <th className="pb-2 font-semibold">Opening</th>
                  <th className="pb-2 font-semibold text-center">Games</th>
                  <th className="pb-2 font-semibold text-center">Win %</th>
                  <th className="pb-2 font-semibold text-right">Performance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {repertoire.map((op, idx) => (
                  <tr key={idx} className="hover:bg-slate-900/40 transition-colors">
                    <td className="py-2.5 font-medium text-slate-200">
                      <span className="text-slate-500 font-mono mr-1.5">{idx + 1}.</span>
                      {op.opening}
                    </td>
                    <td className="py-2.5 text-center font-mono text-slate-400">{op.games}</td>
                    <td className="py-2.5 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-12 bg-slate-800 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-blue-500 h-full rounded-full" style={{ width: `${op.winRate}%` }}></div>
                        </div>
                        <span className="font-mono font-bold text-slate-300">{op.winRate}%</span>
                      </div>
                    </td>
                    <td className="py-2.5 text-right font-mono font-bold">
                      <span className={op.performanceDelta >= 0 ? 'text-emerald-400' : 'text-rose-400'}>
                        {op.performanceDelta >= 0 ? `+${op.performanceDelta}` : op.performanceDelta}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button className="w-full py-2 text-center text-xs font-semibold text-blue-400 hover:text-blue-300 bg-slate-900/80 rounded-xl border border-slate-800 transition-colors">
            View full repertoire
          </button>
        </div>

      </div>

    </div>
  );
};