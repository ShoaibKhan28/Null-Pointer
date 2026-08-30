import React from 'react';
import { useChess } from '../../context/ChessContext';
import { Target, HelpCircle } from 'lucide-react';

export const StalkerScoreGauge = () => {
  const { analysisData } = useChess();

  const score = analysisData?.stalkerScore ?? 56;
  const breakdown = analysisData?.scoreBreakdown || {
    timeTrouble: 66,
    winStreak: 60,
    criticalMistakes: 58,
    openingAccuracy: 55,
    endgameHandling: 50,
  };

  // SVG circular gauge calculation
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="glow-card rounded-2xl p-5 md:p-6 text-slate-100 flex flex-col justify-between">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <Target className="w-4 h-4 text-blue-400" />
          <h3 className="text-sm font-bold text-slate-200">Stalker Score</h3>
        </div>
        <button className="text-[11px] text-blue-400 hover:text-blue-300 flex items-center gap-1">
          What is this? <HelpCircle className="w-3 h-3" />
        </button>
      </div>

      {/* Main Score & Explanatory Text */}
      <div className="flex items-center gap-5 my-4">
        {/* Circular Gauge */}
        <div className="relative w-24 h-24 flex items-center justify-center shrink-0">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r={radius}
              className="text-slate-800"
              strokeWidth="8"
              stroke="currentColor"
              fill="transparent"
            />
            {/* Progress circle */}
            <circle
              cx="50"
              cy="50"
              r={radius}
              className="text-blue-500 transition-all duration-1000 ease-out"
              strokeWidth="8"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
            />
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className="text-2xl font-black text-white">{score}</span>
            <span className="text-[9px] font-bold text-slate-400 uppercase">/100</span>
          </div>
        </div>

        {/* Verdict text */}
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
            Moderate Exploitability
          </span>
          <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
            Your opponent has average consistency. They struggle under time pressure and in equal endgames.
          </p>
        </div>
      </div>

      {/* Exploitability Factor Bars */}
      <div className="space-y-2.5 pt-2">
        <div className="space-y-1">
          <div className="flex justify-between text-[11px] font-semibold text-slate-400">
            <span>Time Trouble</span>
            <span className="text-blue-400 font-mono">{breakdown.timeTrouble}</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div className="bg-blue-500 h-full rounded-full" style={{ width: `${breakdown.timeTrouble}%` }}></div>
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex justify-between text-[11px] font-semibold text-slate-400">
            <span>Win Streak Momentum</span>
            <span className="text-blue-400 font-mono">{breakdown.winStreak}</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div className="bg-blue-500 h-full rounded-full" style={{ width: `${breakdown.winStreak}%` }}></div>
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex justify-between text-[11px] font-semibold text-slate-400">
            <span>Critical Mistakes Rate</span>
            <span className="text-blue-400 font-mono">{breakdown.criticalMistakes}</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div className="bg-blue-500 h-full rounded-full" style={{ width: `${breakdown.criticalMistakes}%` }}></div>
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex justify-between text-[11px] font-semibold text-slate-400">
            <span>Opening Accuracy</span>
            <span className="text-blue-400 font-mono">{breakdown.openingAccuracy}</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div className="bg-blue-500 h-full rounded-full" style={{ width: `${breakdown.openingAccuracy}%` }}></div>
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex justify-between text-[11px] font-semibold text-slate-400">
            <span>Endgame Handling</span>
            <span className="text-blue-400 font-mono">{breakdown.endgameHandling}</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div className="bg-blue-500 h-full rounded-full" style={{ width: `${breakdown.endgameHandling}%` }}></div>
          </div>
        </div>
      </div>

    </div>
  );
};