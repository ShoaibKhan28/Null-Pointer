import React from 'react';
import { useChess } from './context/ChessContext';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { Footer } from './components/layout/Footer';
import { PlayerOverviewCard } from './components/dashboard/PlayerOverviewCard';
import { StalkerScoreGauge } from './components/dashboard/StalkerScoreGauge';
import { AiTwinCard } from './components/dashboard/AiTwinCard';
import { HowToBeatCard } from './components/dashboard/HowToBeatCard';
import { FrequentRivalsCard } from './components/dashboard/FrequentRivalsCard';
import { TimeManagementSection } from './components/dashboard/TimeManagementSection';
import { TrapsAndTacticsSection } from './components/dashboard/TrapsAndTacticsSection';
import { RepertoireHeatmap } from './components/dashboard/RepertoireHeatmap';
import { PsychologicalRadar } from './components/dashboard/PsychologicalRadar';
import { RecentGamesTable } from './components/dashboard/RecentGamesTable';
import { InteractiveChessboard } from './components/game-review/InteractiveChessboard';
import { PlayTwinModal } from './components/twin-arena/PlayTwinModal';
import { ComparePlayersModal } from './components/compare/ComparePlayersModal';
import { Loader2 } from 'lucide-react';

export const App = () => {
  const { loading, activeTab } = useChess();

  return (
    <div className="min-h-screen bg-[#080c16] text-slate-100 flex flex-col font-sans">
      <Header />
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar />
        <main className="flex-1 p-4 lg:p-8 space-y-6 overflow-hidden">
          {loading ? (
            <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
              <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
              <p className="text-sm font-semibold text-slate-400">Fetching game archives & synthesizing opponent intelligence...</p>
            </div>
          ) : (
            <>
              {activeTab === 'overview' && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <div className="lg:col-span-8"><PlayerOverviewCard /></div>
                    <div className="lg:col-span-4"><StalkerScoreGauge /></div>
                  </div>
                  <AiTwinCard />
                  <HowToBeatCard />
                  <FrequentRivalsCard />
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <div className="lg:col-span-7"><TimeManagementSection /></div>
                    <div className="lg:col-span-5"><PsychologicalRadar /></div>
                  </div>
                  <TrapsAndTacticsSection />
                  <RepertoireHeatmap />
                  <InteractiveChessboard />
                  <RecentGamesTable />
                </div>
              )}
              {activeTab === 'how-to-beat' && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <HowToBeatCard />
                  <StalkerScoreGauge />
                  <TimeManagementSection />
                </div>
              )}
              {activeTab === 'weaknesses' && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <HowToBeatCard />
                  <TrapsAndTacticsSection />
                  <TimeManagementSection />
                </div>
              )}
              {activeTab === 'strengths' && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <HowToBeatCard />
                  <PsychologicalRadar />
                </div>
              )}
              {activeTab === 'psychology' && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <PsychologicalRadar />
                  <StalkerScoreGauge />
                </div>
              )}
              {activeTab === 'time-management' && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <TimeManagementSection />
                </div>
              )}
              {activeTab === 'traps' && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <TrapsAndTacticsSection />
                </div>
              )}
              {activeTab === 'endgames' && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <TrapsAndTacticsSection />
                </div>
              )}
              {activeTab === 'openings' && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <RepertoireHeatmap />
                </div>
              )}
              {activeTab === 'repertoire' && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <RepertoireHeatmap />
                </div>
              )}
              {activeTab === 'game-review' && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <InteractiveChessboard />
                  <RecentGamesTable />
                </div>
              )}
              {activeTab === 'recent-games' && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <RecentGamesTable />
                  <InteractiveChessboard />
                </div>
              )}
              {activeTab === 'compare' && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <FrequentRivalsCard />
                </div>
              )}
              {activeTab === 'saved-players' && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <div className="glow-card p-6 rounded-2xl">
                    <h3 className="text-base font-bold text-white mb-2">Saved Opponent Dossiers</h3>
                    <p className="text-xs text-slate-400 mb-4">Cached scouting reports saved in MongoDB.</p>
                    <FrequentRivalsCard />
                  </div>
                </div>
              )}
              {activeTab === 'settings' && (
                <div className="glow-card p-6 rounded-2xl space-y-4">
                  <h3 className="text-base font-bold text-white">Settings & Preferences</h3>
                  <p className="text-xs text-slate-400">Configure Stockfish depth, default platform, and API keys.</p>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between items-center p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <span>Default Platform</span>
                      <span className="font-bold text-blue-400">Chess.com</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <span>Stockfish Evaluation Depth</span>
                      <span className="font-bold text-blue-400">18 ply</span>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </main>
      </div>
      <PlayTwinModal />
      <ComparePlayersModal />
      <Footer />
    </div>
  );
};
