import React from 'react';
import { useChess } from '../../context/ChessContext';
import {
  LayoutDashboard,
  Target,
  AlertTriangle,
  Flame,
  Brain,
  History,
  Eye,
  Clock,
  Zap,
  Crown,
  BookOpen,
  GitBranch,
  Users,
  Bookmark,
  Settings,
  Sparkles,
} from 'lucide-react';

export const Sidebar = () => {
  const { activeTab, setActiveTab, setIsTwinModalOpen } = useChess();

  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'how-to-beat', label: 'How to Beat', icon: Target, badge: 'Key' },
    { id: 'weaknesses', label: 'Weaknesses', icon: AlertTriangle },
    { id: 'strengths', label: 'Strengths', icon: Flame },
    { id: 'psychology', label: 'Psychology', icon: Brain },
    { id: 'recent-games', label: 'Recent Games', icon: History },
    { id: 'game-review', label: 'Game Review', icon: Eye },
    { id: 'time-management', label: 'Time Management', icon: Clock },
    { id: 'traps', label: 'Traps & Tactics', icon: Zap },
    { id: 'endgames', label: 'Endgames', icon: Crown },
    { id: 'openings', label: 'Openings', icon: BookOpen },
    { id: 'repertoire', label: 'Repertoire', icon: GitBranch },
    { id: 'compare', label: 'Compare', icon: Users },
    { id: 'saved-players', label: 'Saved Players', icon: Bookmark },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-[#0a0f1d] border-r border-slate-800/80 min-h-[calc(100vh-65px)] p-4 flex flex-col justify-between hidden lg:flex shrink-0">
      <div className="space-y-1">
        <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider px-3 mb-2">
          Scouting Intelligence
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all group ${
                isActive
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/80'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-slate-300'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 font-bold border border-blue-500/30">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Upgrade / Pro CTA Box matching mockup */}
      <div className="mt-6 p-4 rounded-2xl bg-gradient-to-b from-blue-950/40 to-slate-900 border border-blue-500/20 relative overflow-hidden">
        <div className="flex items-center gap-2 text-blue-400 mb-2">
          <Sparkles className="w-4 h-4" />
          <span className="text-xs font-bold text-slate-200">Upgrade to Pro</span>
        </div>
        <p className="text-[11px] text-slate-400 leading-relaxed mb-3">
          Unlock deep analysis, AI Twin bot sparring, and advanced FIDE dossiers.
        </p>
        <button 
          onClick={() => setIsTwinModalOpen(true)}
          className="w-full py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md shadow-blue-600/30 transition-all hover:scale-[1.02]"
        >
          Spar with AI Twin
        </button>
      </div>
    </aside>
  );
};