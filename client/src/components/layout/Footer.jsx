import React from 'react';
import { Trophy, Github, Twitter, MessageSquare, Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-[#070b14] border-t border-slate-800/80 mt-16 py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">
        
        {/* Brand info */}
        <div className="md:col-span-2 space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">♞</span>
            <span className="text-lg font-bold text-white">
              Chess<span className="text-blue-500">Insights</span>
            </span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
            Advanced chess behavioral analytics to understand an opponent's playing patterns, weaknesses, openings, and time management in one place.
          </p>
          <div className="flex items-center gap-2 pt-2 text-slate-500 text-xs">
            <span>Built for</span>
            <span className="text-blue-400 font-semibold flex items-center gap-1">
              <Trophy className="w-3.5 h-3.5 text-amber-400" /> Build With Bharat 2.0 Hackathon
            </span>
          </div>
          <div className="text-[11px] text-slate-500">
            Team NullPointer • Galgotias College of Engineering and Technology
          </div>
        </div>

        {/* Links Column 1 */}
        <div>
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">Product</h4>
          <ul className="space-y-2 text-xs text-slate-400">
            <li className="hover:text-blue-400 cursor-pointer">Overview</li>
            <li className="hover:text-blue-400 cursor-pointer">How to Beat</li>
            <li className="hover:text-blue-400 cursor-pointer">AI Twin Sparring</li>
            <li className="hover:text-blue-400 cursor-pointer">Repertoire Matrix</li>
          </ul>
        </div>

        {/* Links Column 2 */}
        <div>
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">Resources</h4>
          <ul className="space-y-2 text-xs text-slate-400">
            <li className="hover:text-blue-400 cursor-pointer">REST API Docs</li>
            <li className="hover:text-blue-400 cursor-pointer">ECO Code Reference</li>
            <li className="hover:text-blue-400 cursor-pointer">Stockfish Integration</li>
            <li className="hover:text-blue-400 cursor-pointer">System Architecture</li>
          </ul>
        </div>

        {/* Links Column 3 */}
        <div>
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">Community</h4>
          <div className="flex gap-3 text-slate-400 mb-3">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-slate-900 hover:text-white border border-slate-800">
              <Github className="w-4 h-4" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-slate-900 hover:text-white border border-slate-800">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="https://discord.com" target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-slate-900 hover:text-white border border-slate-800">
              <MessageSquare className="w-4 h-4" />
            </a>
          </div>
          <p className="text-[11px] text-slate-500">
            Data sourced via public Chess.com and Lichess APIs.
          </p>
        </div>

      </div>

      <div className="max-w-7xl mx-auto border-t border-slate-900 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
        <p>© 2026 Chess Insights (NullPointer). All rights reserved.</p>
        <p className="flex items-center gap-1">
          Made with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> for chess players worldwide
        </p>
      </div>
    </footer>
  );
};