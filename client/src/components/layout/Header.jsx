import React, { useState } from 'react';
import { useChess } from '../../context/ChessContext';
import { Search, Sun, Moon, Users, ArrowRight, ShieldCheck, Bookmark, Sparkles } from 'lucide-react';

export const Header = () => {
  const {
    currentUsername,
    platform,
    setPlatform,
    loadPlayerData,
    theme,
    toggleTheme,
    setIsCompareModalOpen,
    savedAnalyses,
    setActiveTab,
    setIsTwinModalOpen,
  } = useChess();

  const [inputVal, setInputVal] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const samplePlayers = [
    { username: 'prabhavagarwal1234', title: 'CM', name: 'Prabhav Agarwal', rating: '2105' },
    { username: 'hikaru', title: 'GM', name: 'Hikaru Nakamura', rating: '3340' },
    { username: 'magnuscarlsen', title: 'GM', name: 'Magnus Carlsen', rating: '3290' },
    { username: 'GothamChess', title: 'IM', name: 'Levy Rozman', rating: '2350' },
    { username: 'nihalsarin2004', title: 'GM', name: 'Nihal Sarin', rating: '3120' },
  ];

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    if (inputVal.trim()) {
      loadPlayerData(inputVal.trim(), platform);
      setShowSuggestions(false);
    }
  };

  const handleSelectSample = (username) => {
    setInputVal(username);
    loadPlayerData(username, platform);
    setShowSuggestions(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0a0f1d]/90 backdrop-blur-md border-b border-slate-800/80 px-4 lg:px-8 py-3">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Brand / Logo */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
          <div 
            onClick={() => setActiveTab('overview')} 
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform text-white">
              <span className="text-xl">♞</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-extrabold tracking-tight text-white group-hover:text-blue-400 transition-colors">
                  Chess<span className="text-blue-500">Insights</span>
                </span>
                <span className="text-[10px] uppercase font-bold bg-blue-500/20 text-blue-400 px-1.5 py-0.5 rounded border border-blue-500/30">
                  v2.0
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium hidden sm:block">ANALYZE. UNDERSTAND. OUTPLAY.</p>
            </div>
          </div>

          {/* Mobile Theme Toggle */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-blue-400" />}
            </button>
          </div>
        </div>

        {/* Platform Selector & Omni-Search */}
        <div className="flex items-center gap-2 w-full md:max-w-xl relative">
          {/* Platform Pills */}
          <div className="flex bg-slate-900/90 p-1 rounded-xl border border-slate-800 text-xs font-medium shrink-0">
            <button
              onClick={() => { setPlatform('chesscom'); loadPlayerData(currentUsername, 'chesscom'); }}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                platform === 'chesscom'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>♟</span> Chess.com
            </button>
            <button
              onClick={() => { setPlatform('lichess'); loadPlayerData(currentUsername, 'lichess'); }}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                platform === 'lichess'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>♘</span> Lichess
            </button>
          </div>

          {/* Search Box */}
          <form onSubmit={handleSearch} className="flex-1 relative">
            <div className="relative flex items-center">
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onFocus={() => setShowSuggestions(true)}
                placeholder="Search opponent username..."
                className="w-full bg-slate-900/90 text-sm text-slate-100 placeholder-slate-500 pl-9 pr-10 py-2 rounded-xl border border-slate-800 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              />
              <Search className="w-4 h-4 text-slate-500 absolute left-3 pointer-events-none" />
              <button
                type="submit"
                className="absolute right-1.5 bg-blue-600 hover:bg-blue-500 text-white p-1.5 rounded-lg transition-colors"
                title="Search"
              >
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Quick Suggestion Dropdown */}
            {showSuggestions && (
              <div 
                className="absolute left-0 right-0 top-full mt-2 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                onMouseLeave={() => setShowSuggestions(false)}
              >
                <div className="text-[11px] font-semibold text-slate-400 px-3 py-1 uppercase tracking-wider">
                  Sample Players & Opponents
                </div>
                {samplePlayers.map((p) => (
                  <div
                    key={p.username}
                    onClick={() => handleSelectSample(p.username)}
                    className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-slate-800/80 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      {p.title && (
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">
                          {p.title}
                        </span>
                      )}
                      <span className="text-sm font-medium text-slate-200">{p.name}</span>
                      <span className="text-xs text-slate-500">(@{p.username})</span>
                    </div>
                    <span className="text-xs font-mono text-blue-400 font-bold">{p.rating}</span>
                  </div>
                ))}
              </div>
            )}
          </form>
        </div>

        {/* Action Controls */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => setIsCompareModalOpen(true)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-xs font-semibold text-slate-200 hover:text-white transition-all shadow-sm"
          >
            <Users className="w-4 h-4 text-blue-400" />
            Compare
          </button>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
            title="Toggle Theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-blue-400" />}
          </button>

          <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
            <div className="w-8 h-8 rounded-full bg-blue-600/30 border border-blue-500/40 flex items-center justify-center text-blue-400 text-xs font-bold">
              GM
            </div>
            <div className="text-left">
              <p className="text-xs font-medium text-slate-200 leading-tight">Pro Scout</p>
              <p className="text-[10px] text-emerald-400 font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> Online
              </p>
            </div>
          </div>
        </div>

      </div>
    </header>
  );
};