import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchPlayerAnalysis, fetchSavedAnalyses } from '../api/apiService';

const ChessContext = createContext();

export const ChessProvider = ({ children }) => {
  const [currentUsername, setCurrentUsername] = useState('prabhavagarwal1234');
  const [platform, setPlatform] = useState('chesscom'); // 'chesscom', 'lichess', 'fide'
  const [playerData, setPlayerData] = useState(null);
  const [analysisData, setAnalysisData] = useState(null);
  const [gamesList, setGamesList] = useState([]);
  const [savedAnalyses, setSavedAnalyses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview'); // sidebar navigation
  const [selectedGame, setSelectedGame] = useState(null);
  const [isTwinModalOpen, setIsTwinModalOpen] = useState(false);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [theme, setTheme] = useState('dark');

  // Load Initial Player Data
  const loadPlayerData = async (username = currentUsername, targetPlatform = platform) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchPlayerAnalysis(username, targetPlatform);
      if (data) {
        setPlayerData(data.player);
        setAnalysisData(data.analysis);
        setGamesList(data.games || []);
        setCurrentUsername(data.player.username);
        setPlatform(data.player.platform);
        if (data.games && data.games.length > 0) {
          setSelectedGame(data.games[0]);
        }
      }
    } catch (err) {
      console.error('Failed to load player data:', err);
      setError('Could not fetch data for this player. Loading cached intelligence.');
    } finally {
      setLoading(false);
    }
  };

  // Load Saved Analyses list
  const loadSaved = async () => {
    try {
      const saved = await fetchSavedAnalyses();
      setSavedAnalyses(saved);
    } catch (e) {
      console.warn('Failed to load saved analyses:', e);
    }
  };

  useEffect(() => {
    loadPlayerData('prabhavagarwal1234', 'chesscom');
    loadSaved();
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <ChessContext.Provider
      value={{
        currentUsername,
        setCurrentUsername,
        platform,
        setPlatform,
        playerData,
        analysisData,
        gamesList,
        savedAnalyses,
        loading,
        error,
        activeTab,
        setActiveTab,
        selectedGame,
        setSelectedGame,
        isTwinModalOpen,
        setIsTwinModalOpen,
        isCompareModalOpen,
        setIsCompareModalOpen,
        theme,
        toggleTheme,
        loadPlayerData,
        loadSaved,
      }}
    >
      {children}
    </ChessContext.Provider>
  );
};

export const useChess = () => {
  const context = useContext(ChessContext);
  if (!context) {
    throw new Error('useChess must be used within a ChessProvider');
  }
  return context;
};