# ♞ Chess Insights (Chess Stalker)

> **ANALYZE. UNDERSTAND. OUTPLAY.**  
> *Transforming raw game archives into actionable opponent scouting reports and behavioral intelligence.*

[![Build with Bharat 2.0](https://img.shields.io/badge/Hackathon-Build_With_Bharat_2.0-blue?style=for-the-badge&logo=trophy)](https://github.com)
[![MERN Stack](https://img.shields.io/badge/Stack-MERN-green?style=for-the-badge&logo=mongodb)](https://github.com)
[![Engine](https://img.shields.io/badge/Engine-Stockfish.wasm-orange?style=for-the-badge)](https://stockfishchess.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-purple?style=for-the-badge)](https://opensource.org/licenses/MIT)

---

## 🏆 Project Overview

**Chess Insights** is an automated pre-match intelligence and opponent scouting platform designed for competitive chess players. While standard chess platforms excel at analyzing isolated post-game moves, pre-match preparation is currently fragmented across hundreds of past matches.

Chess Insights bridges this gap by shifting the paradigm from *isolated post-game analysis* to **multi-game behavioral intelligence**. It autonomously ingests a player's public match history (from **Chess.com** and **Lichess**), parses PGN records, detects psychological and tactical vulnerabilities under time pressure, generates a 0–100 **Stalker Exploitability Score**, and builds an interactive **"How to Beat Them"** preparation checklist.

---

## 👥 Team NullPointer (Galgotias College of Engineering & Technology)
- **Prabhav Agarwal** (Team Lead)
- **Ayush Singh**
- **Sraddha Mishra**
- **Shoaib Khan**

---

## ⚡ Automated Intelligence Pipeline

```
┌─────────────┐      ┌─────────────┐      ┌─────────────┐      ┌─────────────┐      ┌─────────────┐
│  01 SEARCH  │ ───> │  02 FETCH   │ ───> │  03 PARSE   │ ───> │ 04 ANALYZE  │ ───> │ 05 INSIGHTS │
│ Input user  │      │ Public APIs │      │ PGN, Clocks │      │ Stats Engine│      │ Dashboard   │
└─────────────┘      └─────────────┘      └─────────────┘      └─────────────┘      └─────────────┘
```

1. **Search**: Search any username across Chess.com, Lichess, or sample Grandmasters.
2. **Fetch**: Asynchronously fetch live profile ratings and game archives.
3. **Parse**: Extract move SAN trees, ECO opening codes, clock times, accuracy ratings, and result details.
4. **Analyze**: Calculate win/loss rates by color, detect tactical traps, quantify time pressure collapses (<1 min), track win/loss tilt streaks, and compute the composite **Stalker Matrix Score**.
5. **Insights**: Render a dark-themed analytics dashboard featuring an interactive chessboard, AI Twin sparring bot, and side-by-side player comparisons.

---

## 🏗️ System Architecture & Class-Oriented OOP Design

The backend is architected following a modular Object-Oriented Programming (OOP) pattern:

```
                      ┌──────────────────────┐
                      │     Class Player     │
                      ├──────────────────────┤
                      │ - username           │
                      │ - platform           │
                      │ - ratings            │
                      │ - stats              │
                      │ + fetchProfile()     │
                      │ + getStats()         │
                      └──────────┬───────────┘
                                 │
                 ┌───────────────┴───────────────┐
                 ▼                               ▼
    ┌─────────────────────────┐    ┌─────────────────────────┐
    │  Class ChessComPlayer   │    │   Class LichessPlayer   │
    ├─────────────────────────┤    ├─────────────────────────┤
    │ + fetchArchives()       │    │ + exportGames()         │
    │ + formatGames()         │    │ + formatGames()         │
    └─────────────────────────┘    └─────────────────────────┘
                 │                               │
                 └───────────────┬───────────────┘
                                 ▼
                      ┌──────────────────────┐
                      │    Class Analyzer    │
                      ├──────────────────────┤
                      │ - player             │
                      │ - games[]            │
                      │ + analyzeOpenings()  │
                      │ + analyzeTime()      │
                      │ + analyzeWeaknesses()│
                      │ + generateMatrixScore│
                      │ + generateAiTwin()   │
                      └──────────┬───────────┘
                                 │
                                 ▼
                      ┌──────────────────────┐
                      │    Class Database    │
                      ├──────────────────────┤
                      │ - playerCollection   │
                      │ - gameCollection     │
                      │ - analysisCollection │
                      └──────────────────────┘
```

### Core OOP Classes:
- **`Player`** (`server/src/core/Player.js`): Base abstract entity defining attributes (username, avatar, country, ratings, stats) and polymorphic interface.
- **`ChessComPlayer`** (`server/src/core/ChessComPlayer.js`): Subclass handling Chess.com REST API queries, monthly archive batches, and PGN formatting.
- **`LichessPlayer`** (`server/src/core/LichessPlayer.js`): Subclass consuming Lichess NDJSON streams, evaluations, and clock metadata.
- **`Analyzer`** (`server/src/core/Analyzer.js`): Behavioral intelligence engine analyzing openings, time brackets, endgame conversions, tactical blunder tendencies, and Stalker Scores.
- **`Database`** (`server/src/core/Database.js`): OOP persistence layer bridging Mongoose models (`Player`, `Game`, `Analysis`) with an automated high-speed in-memory cache fallback.
- **`AppService`** (`server/src/core/AppService.js`): High-level coordinator managing ingestion pipelines and head-to-head comparisons.

---

## 🌟 Key Features

### 1. 🎯 Stalker / Matrix Exploitability Score (0–100)
A predictive gauge assessing how easily an opponent can be exploited based on 5 weighted metrics:
- **Time Trouble Index** (weight: 25%)
- **Critical Mistakes & Blunder Rate** (weight: 25%)
- **Endgame Handling Vulnerability** (weight: 20%)
- **Win Streak Resilience & Tilt** (weight: 15%)
- **Opening Accuracy & Repertoire Depth** (weight: 15%)

### 2. 🛡️ "How to Beat Them" Actionable Checklist
- **Weaknesses Breakdown**: Quantified loss rates in specific positions (e.g. *Endgame Queen vs Rook: 53.3% Lost*, *Time Pressure <1 min: 52.4% Lost*, *Defensive Mistakes: 43.8% Lost*).
- **Strengths Breakdown**: Quantified win rates (e.g. *Middle Game: 80% Won*, *Attacking Play: 62.5% Won*).
- **Dedicated Strategy Tabs**: Concrete tactical checklists for playing as **White** or **Black**.

### 3. 🤖 Sparring Arena vs Opponent's AI Twin
- Play an interactive chess match in the browser against an AI bot configured with the opponent's exact opening repertoire, tactical aggression level, and blunder probabilities.
- Real-time bot thought stream showing simulated psychological evaluations.

### 4. ⏱️ Time Management & Scramble Analysis
- Granular breakdown across 4 clock pressure brackets: `< 1 min`, `1–5 min`, `5–15 min`, and `> 15 min`.
- Flags sudden win-rate drops in time scrambles.

### 5. ♟️ Opening Repertoire & 8x8 Board Heatmap
- Visualizes board square control density on an 8x8 matrix.
- Interactive repertoire table with games played, win rate percentage, and performance delta against player average (+18, +12, -5, etc.).

### 6. 🔍 Interactive Game Review
- Playable 8x8 chessboard with SVG piece graphics, click/drag moves, and move navigation controls (⏮ First, ◀ Prev, ▶ Next, ⏭ Last, Auto-Play).
- Advantage evaluation curve with centipawn accuracy.
- Automated move annotations (Mistake, Blunder, Inaccuracy, Best Move).

### 7. 👥 Dual Player Scout Comparison
- Compare two players head-to-head across ratings, Stalker scores, time discipline, and psychological aggression profiles.

---

## 📁 Repository Structure

```
chess-insights/
├── package.json                   # Root npm workspace orchestration
├── README.md                      # Comprehensive project documentation
├── .env.example                   # Root environment variables template
├── server/                        # Node.js & Express REST API
│   ├── package.json
│   ├── .env.example
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js              # MongoDB Mongoose connection + In-memory fallback
│   │   ├── models/
│   │   │   ├── Player.js          # Player profile schema
│   │   │   ├── Game.js            # Match record schema
│   │   │   └── Analysis.js        # Intelligence report schema
│   │   ├── core/
│   │   │   ├── Player.js          # OOP Base Player Class
│   │   │   ├── ChessComPlayer.js  # Chess.com Subclass
│   │   │   ├── LichessPlayer.js   # Lichess Subclass
│   │   │   ├── Analyzer.js        # Core Analytics Engine
│   │   │   ├── Database.js        # DB Repository Layer
│   │   │   └── AppService.js      # Pipeline Orchestrator
│   │   ├── controllers/
│   │   │   ├── playerController.js
│   │   │   ├── analysisController.js
│   │   │   ├── gamesController.js
│   │   │   └── compareController.js
│   │   ├── routes/
│   │   │   └── apiRoutes.js       # Express Router
│   │   ├── services/
│   │   │   └── sampleDataService.js
│   │   ├── utils/
│   │   │   ├── chessEco.js        # Opening ECO database & counter strategies
│   │   │   └── tacticalPatterns.js# Trap detectors & tactical blunders
│   │   └── server.js              # Express app bootstrap
│   └── tests/
│       └── analyzer.test.js       # Unit & analytics test suite
└── client/                        # React + Vite + Tailwind CSS Frontend
    ├── package.json
    ├── vite.config.js
    ├── index.html
    ├── tailwind.config.js
    ├── postcss.config.js
    └── src/
        ├── App.jsx                # Main SPA Coordinator
        ├── main.jsx               # React DOM Entry
        ├── index.css              # Dark theme CSS & neon radial styling
        ├── api/
        │   └── apiService.js      # REST API client
        ├── context/
        │   └── ChessContext.jsx   # Global State Provider
        ├── utils/
        │   └── chessHelpers.js    # FEN parsers & piece graphics
        └── components/
            ├── layout/
            │   ├── Header.jsx     # Platform switcher, omni-search, theme toggle
            │   ├── Sidebar.jsx    # Navigation links & upgrade badge
            │   └── Footer.jsx     # Hackathon footer & community links
            ├── dashboard/
            │   ├── PlayerOverviewCard.jsx
            │   ├── StalkerScoreGauge.jsx
            │   ├── AiTwinCard.jsx
            │   ├── HowToBeatCard.jsx
            │   ├── FrequentRivalsCard.jsx
            │   ├── TimeManagementSection.jsx
            │   ├── TrapsAndTacticsSection.jsx
            │   ├── RepertoireHeatmap.jsx
            │   ├── PsychologicalRadar.jsx
            │   └── RecentGamesTable.jsx
            ├── game-review/
            │   └── InteractiveChessboard.jsx # Playable board with eval curve
            ├── twin-arena/
            │   └── PlayTwinModal.jsx         # Live match vs AI Twin
            └── compare/
                └── ComparePlayersModal.jsx   # Side-by-side scout
```

---

## 🚀 Quickstart & Setup Guide

### Prerequisites
- **Node.js**: v18+ (Tested on v25.2.1)
- **npm**: v9+ (Tested on v11.6.2)
- **MongoDB** *(Optional)*: If MongoDB is not running locally, the system automatically runs in **Resilient In-Memory Mode** without crashing.

### 1. Clone & Install Dependencies
```bash
# Clone the repository
git clone https://github.com/nullpointer/chess-insights.git
cd chess-insights

# Install dependencies across root, server, and client
npm run install:all
```

### 2. Configure Environment Variables
Create `.env` in `server/` (or copy from `.env.example`):
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/chess_insights
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

### 3. Run Development Servers
```bash
# Concurrently launch Express Backend (Port 5000) and Vite Frontend (Port 5173)
npm run dev
```

Visit **`http://localhost:5173`** in your browser!

### 4. Run Automated Tests
```bash
npm run test:server
```

---

## 📡 REST API Documentation

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Health check & database connection status |
| `GET` | `/api/players/search?username=:u&platform=:p` | Live search for player profile across platforms |
| `GET` | `/api/analysis/:platform/:username` | Generate full behavioral report & Stalker Score |
| `GET` | `/api/analysis/saved` | Retrieve cached scouting analyses from MongoDB |
| `GET` | `/api/games/:platform/:username?limit=40` | Retrieve parsed game records for a player |
| `POST` | `/api/compare` | Compare two players side-by-side |

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).#   N u l l - P o i n t e r  
 