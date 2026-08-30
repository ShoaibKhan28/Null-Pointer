import React from 'react';
import { useChess } from '../../context/ChessContext';
import { Brain } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

export const PsychologicalRadar = () => {
  const { analysisData } = useChess();

  const psych = analysisData?.psychology || {
    aggressiveness: 78,
    timeDiscipline: 58,
    endgameResilience: 46,
    tacticalVision: 72,
    repertoireDepth: 62,
  };

  const data = [
    { subject: 'Aggression', value: psych.aggressiveness, fullMark: 100 },
    { subject: 'Time Discipline', value: psych.timeDiscipline, fullMark: 100 },
    { subject: 'Endgame Resilience', value: psych.endgameResilience, fullMark: 100 },
    { subject: 'Tactical Vision', value: psych.tacticalVision, fullMark: 100 },
    { subject: 'Repertoire Depth', value: psych.repertoireDepth, fullMark: 100 },
  ];

  return (
    <div className="glow-card rounded-2xl p-5 md:p-6 text-slate-100 flex flex-col justify-between">
      
      <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <Brain className="w-4 h-4 text-purple-400" />
          <h3 className="text-sm font-bold text-white">Psychological Matrix</h3>
        </div>
        <span className="text-[11px] text-slate-500">Opponent behavioral tendencies</span>
      </div>

      <div className="h-60 w-full my-2">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
            <PolarGrid stroke="#334155" strokeDasharray="3 3" />
            <PolarAngleAxis dataKey="subject" stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 11 }} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#475569" tick={false} />
            <Radar
              name="Player Profile"
              dataKey="value"
              stroke="#3b82f6"
              fill="#3b82f6"
              fillOpacity={0.4}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <div className="text-[11px] text-slate-400 text-center bg-slate-900/60 p-2 rounded-xl border border-slate-800">
        Archetype: <strong className="text-blue-400">The Berserker</strong> • High tactical aggression, vulnerable in quiet positional endgames.
      </div>

    </div>
  );
};