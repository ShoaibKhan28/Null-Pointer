import React from 'react';
import { useChess } from '../../context/ChessContext';
import { ShieldCheck, Calendar, Clock, Trophy, Flame, TrendingUp, Award } from 'lucide-react';

export const PlayerOverviewCard = () => {
  const { playerData, analysisData } = useChess();

  if (!playerData) return null;

  const {
    username,
    name,
    avatar,
    title,
    country,
    countryCode,
    joinedDate,
    ratings = {},
    stats = {},
  } = playerData;

  const formattedJoinDate = joinedDate
    ? new Date(joinedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : 'Jan 16, 2013';

  const flagEmoji = countryCode === 'in' ? '🇮🇳' : (countryCode === 'us' ? '🇺🇸' : (countryCode === 'no' ? '🇳🇴' : '🌍'));

  return (
    <div className="glow-card rounded-2xl p-5 md:p-6 text-slate-100 relative overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
        
        {/* Profile Info */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'}
              alt={username}
              className="w-16 h-16 md:w-20 md:h-20 rounded-2xl object-cover border-2 border-blue-500/40 shadow-xl"
            />
            <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-slate-900 shadow" title="Active"></span>
          </div>

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-xl md:text-2xl font-black tracking-tight text-white">{username}</h2>
              {title && (
                <span className="text-[11px] font-black px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-400 border border-amber-500/40">
                  {title}
                </span>
              )}
              <span className="inline-flex items-center text-blue-400" title="Verified Player">
                <ShieldCheck className="w-4 h-4" />
              </span>
            </div>

            <div className="flex items-center gap-3 text-xs text-slate-400 mt-1 flex-wrap">
              <span className="flex items-center gap-1 font-medium text-slate-300">
                <span>{flagEmoji}</span> {country || 'India'}
              </span>
              <span className="text-slate-600">•</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-500" /> Joined {formattedJoinDate}
              </span>
              <span className="text-slate-600">•</span>
              <span className="flex items-center gap-1 text-emerald-400">
                <Clock className="w-3.5 h-3.5" /> Last online 2 hours ago
              </span>
            </div>

            {/* Lifetime stats ribbon */}
            <div className="flex items-center gap-4 mt-3 text-xs font-semibold">
              <div>
                <span className="text-slate-200 font-bold text-sm">{stats.totalGames || 77}</span>
                <span className="text-slate-400 text-[11px] block">Games</span>
              </div>
              <div className="border-l border-slate-800 pl-3">
                <span className="text-emerald-400 font-bold text-sm">{stats.wins || 75}</span>
                <span className="text-slate-400 text-[11px] block">Wins ({stats.winRate || 48.1}%)</span>
              </div>
              <div className="border-l border-slate-800 pl-3">
                <span className="text-amber-400 font-bold text-sm">{stats.draws || 0}</span>
                <span className="text-slate-400 text-[11px] block">Draws (0%)</span>
              </div>
              <div className="border-l border-slate-800 pl-3">
                <span className="text-rose-400 font-bold text-sm">{stats.losses || 68}</span>
                <span className="text-slate-400 text-[11px] block">Losses (43.6%)</span>
              </div>
              <div className="border-l border-slate-800 pl-3">
                <span className="text-blue-400 font-bold text-sm">{stats.bestStreak || 75}</span>
                <span className="text-slate-400 text-[11px] block">Best Streak</span>
              </div>
            </div>
          </div>
        </div>

        {/* Primary Rating Display */}
        <div className="flex items-center gap-4 bg-slate-900/90 border border-slate-800 p-4 rounded-2xl shrink-0">
          <div className="text-right">
            <span className="text-[11px] font-bold text-blue-400 uppercase tracking-wider block">Rapid Rating</span>
            <div className="text-3xl md:text-4xl font-black text-white tracking-tight">
              {ratings.rapid || 2105}
            </div>
            <div className="flex items-center justify-end gap-2 text-[11px] text-slate-400 mt-1">
              <span>Peak: <strong className="text-slate-200">{ratings.peak || 3048}</strong></span>
              <span>•</span>
              <span className="text-emerald-400 font-bold">53.8% Form</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <Trophy className="w-6 h-6" />
          </div>
        </div>

      </div>

      {/* Ratings Grid Row */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-6 pt-5 border-t border-slate-800/80">
        <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800/60 text-center hover:border-slate-700 transition-colors">
          <span className="text-lg md:text-xl font-extrabold text-white block">{ratings.bullet || 1391}</span>
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">Bullet</span>
        </div>
        <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800/60 text-center hover:border-slate-700 transition-colors">
          <span className="text-lg md:text-xl font-extrabold text-white block">{ratings.blitz || 1620}</span>
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">Blitz</span>
        </div>
        <div className="bg-blue-600/10 p-3 rounded-xl border border-blue-500/30 text-center">
          <span className="text-lg md:text-xl font-extrabold text-blue-400 block">{ratings.rapid || 1897}</span>
          <span className="text-[11px] font-semibold text-blue-300 uppercase tracking-wide">Rapid</span>
        </div>
        <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800/60 text-center hover:border-slate-700 transition-colors">
          <span className="text-lg md:text-xl font-extrabold text-white block">{ratings.classical || 1987}</span>
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">Classical</span>
        </div>
        <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800/60 text-center hover:border-slate-700 transition-colors col-span-2 sm:col-span-1">
          <span className="text-lg md:text-xl font-extrabold text-white block">{ratings.puzzle || 782}</span>
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">Puzzle</span>
        </div>
      </div>

    </div>
  );
};