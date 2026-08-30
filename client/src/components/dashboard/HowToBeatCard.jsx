import React, { useState } from 'react';
import { useChess } from '../../context/ChessContext';
import { ShieldAlert, Zap, CheckCircle2, ShieldCheck, ArrowRight, Lightbulb } from 'lucide-react';

export const HowToBeatCard = () => {
  const { analysisData } = useChess();
  const [activeSubTab, setActiveSubTab] = useState('summary'); // 'summary', 'white', 'black'

  const weaknesses = analysisData?.weaknesses || [
    { title: 'Endgame (Queen vs Rook)', description: 'Lost 8 of 15 games in this position due to passive king.', stat: '53.3% Lost' },
    { title: 'Time Pressure (< 1 min)', description: 'Lost 11 of 21 games in time trouble scrambles.', stat: '52.4% Lost' },
    { title: 'Defensive Mistakes', description: 'High error rate in passive defensive structures.', stat: '43.8% Lost' },
    { title: 'Blunder Prone in Rapid', description: 'Prone to tactical oversights in multi-piece trades.', stat: '43.3% Lost' },
  ];

  const strengths = analysisData?.strengths || [
    { title: 'Middle Game Attacks', description: 'Won 20 of 25 games in sharp piece activity setups.', stat: '80% Win' },
    { title: 'Attacking Play', description: 'Strong kingside attacking instincts and piece sacrifices.', stat: '62.5% Win' },
  ];

  const checklist = analysisData?.howToBeat?.checklist || [
    'Avoid time scrambles — take time in complex middle game',
    'Attack on the kingside — opponent is vulnerable to pawn storms',
    'Don\'t trade into equal endgames — opponent makes key endgame mistakes',
    'Keep sustained pressure in the middle game',
  ];

  return (
    <div className="glow-card rounded-2xl p-5 md:p-6 text-slate-100 space-y-5">
      
      {/* Header with Sub-Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold text-white">How to beat them</h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Complete guide to outplay. They lose 27% of their games in lost positions. Avoid early trades and attack their king.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex bg-slate-900/90 p-1 rounded-xl border border-slate-800 text-xs font-semibold shrink-0">
          <button
            onClick={() => setActiveSubTab('summary')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${activeSubTab === 'summary' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            Summary
          </button>
          <button
            onClick={() => setActiveSubTab('white')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${activeSubTab === 'white' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            White Prep
          </button>
          <button
            onClick={() => setActiveSubTab('black')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${activeSubTab === 'black' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            Black Prep
          </button>
        </div>
      </div>

      {activeSubTab === 'summary' && (
        <>
          {/* Weaknesses vs Strengths Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            
            {/* Weaknesses */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-rose-400 uppercase tracking-wider">
                <span className="flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4" /> Weaknesses
                </span>
                <span className="text-[11px] text-slate-500 font-normal">Areas they struggle in</span>
              </div>

              <div className="space-y-2">
                {weaknesses.map((w, idx) => (
                  <div key={idx} className="bg-rose-950/20 border border-rose-500/20 p-3 rounded-xl flex items-start justify-between gap-3">
                    <div>
                      <div className="text-xs font-bold text-rose-200">{w.title}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">{w.description}</div>
                    </div>
                    <span className="text-xs font-extrabold text-rose-400 shrink-0 font-mono bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/30">
                      {w.stat}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Strengths */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-emerald-400 uppercase tracking-wider">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" /> Strengths
                </span>
                <span className="text-[11px] text-slate-500 font-normal">Areas they excel in</span>
              </div>

              <div className="space-y-2">
                {strengths.map((s, idx) => (
                  <div key={idx} className="bg-emerald-950/20 border border-emerald-500/20 p-3 rounded-xl flex items-start justify-between gap-3">
                    <div>
                      <div className="text-xs font-bold text-emerald-200">{s.title}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">{s.description}</div>
                    </div>
                    <span className="text-xs font-extrabold text-emerald-400 shrink-0 font-mono bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                      {s.stat}
                    </span>
                  </div>
                ))}
              </div>

              {/* Play Game Checklist */}
              <div className="pt-2">
                <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-400" /> Play Game Checklist
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {checklist.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-[11px] text-slate-300 bg-slate-900/60 p-2 rounded-lg border border-slate-800">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </>
      )}

      {activeSubTab === 'white' && (
        <div className="space-y-3 bg-slate-900/50 p-4 rounded-xl border border-slate-800">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <span>♔</span> Playing as White against @{analysisData?.username}
          </h4>
          <ul className="space-y-2 text-xs text-slate-300">
            <li className="flex items-start gap-2">
              <ArrowRight className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <span><strong>Open with 1. d4 or 1. c4:</strong> Steer them away from sharp 1. e4 lines where their middle game tactical accuracy peaks at 80%.</span>
            </li>
            <li className="flex items-start gap-2">
              <ArrowRight className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <span><strong>Keep Queens on the Board:</strong> Their defensive error rate spikes to 43.8% under sustained multi-piece pressure.</span>
            </li>
            <li className="flex items-start gap-2">
              <ArrowRight className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <span><strong>Target the Kingside:</strong> Castling early and pushing pawns causes them to spend excessive clock time, triggering their 52.4% time trouble weakness.</span>
            </li>
          </ul>
        </div>
      )}

      {activeSubTab === 'black' && (
        <div className="space-y-3 bg-slate-900/50 p-4 rounded-xl border border-slate-800">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <span>♚</span> Playing as Black against @{analysisData?.username}
          </h4>
          <ul className="space-y-2 text-xs text-slate-300">
            <li className="flex items-start gap-2">
              <ArrowRight className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Answer 1. e4 with the Sicilian Defense (1... c5):</strong> Creates unbalanced counter-attacking chances on the queenside.</span>
            </li>
            <li className="flex items-start gap-2">
              <ArrowRight className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Pressure their d4/e4 central pawn levers:</strong> They struggle with passive piece defense and will make premature king concessions.</span>
            </li>
            <li className="flex items-start gap-2">
              <ArrowRight className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Transition into Equal Endgames:</strong> In equal Queen vs Rook or minor piece endgames, their conversion rate drops sharply to 46.7%.</span>
            </li>
          </ul>
        </div>
      )}

    </div>
  );
};