const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api';

export const fetchPlayerProfile = async (username, platform = 'chesscom') => {
  try {
    const res = await fetch(`${API_BASE}/players/search?username=${encodeURIComponent(username)}&platform=${platform}`);
    if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error('API Error [fetchPlayerProfile]:', error);
    throw error;
  }
};

export const fetchPlayerAnalysis = async (username, platform = 'chesscom') => {
  try {
    const res = await fetch(`${API_BASE}/analysis/${platform}/${encodeURIComponent(username)}`);
    if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error('API Error [fetchPlayerAnalysis]:', error);
    throw error;
  }
};

export const fetchSavedAnalyses = async () => {
  try {
    const res = await fetch(`${API_BASE}/analysis/saved`);
    if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error('API Error [fetchSavedAnalyses]:', error);
    return [];
  }
};

export const fetchPlayerGames = async (username, platform = 'chesscom', limit = 40) => {
  try {
    const res = await fetch(`${API_BASE}/games/${platform}/${encodeURIComponent(username)}?limit=${limit}`);
    if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error('API Error [fetchPlayerGames]:', error);
    return [];
  }
};

export const compareTwoPlayers = async (player1, player2) => {
  try {
    const res = await fetch(`${API_BASE}/compare`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ player1, player2 }),
    });
    if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error('API Error [compareTwoPlayers]:', error);
    throw error;
  }
};