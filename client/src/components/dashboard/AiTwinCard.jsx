import React from 'react';
import { useChess } from '../../context/ChessContext';
import { Bot, Play, Swords, Sparkles } from 'lucide-react';

export const AiTwinCard = () => {
  const { currentUsername, setIsTwinModalOpen } = useChess();

  return (
    <div className="glow-card rounded-2xl p-5 bg-gradient-to-r from-blue-950/40 via-slate-900 to-indigo-950/30 border border-blue-500/30 flex flex-col md:flex-row items-center justify-between gap-4">
      
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/30 shrink-0">
          <Bot className="w-6 h-6" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-white">
              Play against <span className="text-blue-400">@{currentUsername}'s Twin</span>
            </h3>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
              AI Simulation
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Practice against an AI version modeled on their exact opening choices, aggression, and tactical flaws.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
        <div className="text-right">
          <span className="text-[11px] text-slate-400 block">Rounds Played</span>
          <span className="text-sm font-black text-white font-mono">1,431</span>
        </div>

        <button
          onClick={() => setIsTwinModalOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-600/30 transition-all hover:scale-105 active:scale-95"
        >
          <Swords className="w-4 h-4" />
          Play vs Twin
        </button>
      </div>

    </div>
  );
};