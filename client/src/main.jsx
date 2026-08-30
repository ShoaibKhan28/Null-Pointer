import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { ChessProvider } from './context/ChessContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChessProvider>
      <App />
    </ChessProvider>
  </React.StrictMode>
);
