# ♞ Chess Insights

> **Analyze. Understand. Outplay.**  
> *Turn raw game archives into actionable opponent scouting reports and behavioral insights.*


## 🏆 Overview

**Chess Insights** is an automated pre-match intelligence and opponent scouting platform designed for competitive chess players.

Traditional chess platforms are excellent for analyzing individual games after they are played. However, preparing for an opponent often requires reviewing many games and identifying recurring patterns manually.

Chess Insights addresses this problem through **multi-game behavioral intelligence**. The platform collects a player's public game history from **Chess.com** and **Lichess**, processes PGN data, identifies tactical and time-management patterns, analyzes opening preferences, and generates an actionable scouting report.

The platform provides a **0–100 Stalker Exploitability Score** along with a personalized **"How to Beat Them"** preparation checklist.

---

## 🎯 Project Goals

Chess Insights is designed to help players:

- Analyze an opponent's historical games.
- Identify recurring tactical and positional weaknesses.
- Understand opening preferences and repertoire depth.
- Detect performance changes under time pressure.
- Identify win/loss streak patterns.
- Generate actionable preparation strategies.
- Practice against an AI representation of an opponent's playing style.
- Compare two players using a common set of metrics.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| Frontend | React, Vite, Tailwind CSS |
| Backend | Node.js, Express |
| Database | MongoDB, Mongoose |
| Chess Engine | Stockfish.wasm |
| Data Sources | Chess.com, Lichess |
| Testing | Jest |

---

## 👥 Team

**Team NullPointer**  
*Galgotias College of Engineering & Technology*

- **Prabhav Agarwal** — Team Lead
- **Ayush Singh**
- **Sraddha Mishra**
- **Shoaib Khan**

---

## ⚡ Intelligence Pipeline

The application follows a five-stage analysis pipeline:

### 1. Search
Search for a player using their username across supported chess platforms.

### 2. Fetch
Retrieve public player profiles, ratings, and available game archives.

### 3. Parse
Process PGN records and extract relevant game information, including:

- Move sequences
- SAN notation
- ECO opening codes
- Clock information
- Accuracy data
- Game results

### 4. Analyze
Analyze the collected games to identify:

- Win/loss rates by color
- Opening performance
- Tactical patterns
- Blunder tendencies
- Time-pressure performance
- Endgame conversion patterns
- Win/loss streaks
- Behavioral tendencies
- Composite exploitability score

### 5. Insights
Present the analysis through an interactive dashboard containing:

- Player statistics
- Stalker Score
- Opening repertoire
- Time-management analysis
- Tactical patterns
- Psychological profile
- Interactive game review
- AI Twin sparring
- Player comparison

---

## 🏗️ System Architecture & OOP Design

The backend follows a modular **Object-Oriented Programming (OOP)** architecture.

### Core Classes

#### `Player`
**Location:** `server/src/core/Player.js`

Base player entity containing common player information such as:

- Username
- Avatar
- Country
- Ratings
- Statistics

It also provides the common interface used by platform-specific player classes.

#### `ChessComPlayer`
**Location:** `server/src/core/ChessComPlayer.js`

Handles:

- Chess.com API requests
- Monthly game archives
- Player information
- PGN formatting

#### `LichessPlayer`
**Location:** `server/src/core/LichessPlayer.js`

Handles:

- Lichess game exports
- NDJSON game streams
- Evaluation information
- Clock metadata
- PGN formatting

#### `Analyzer`
**Location:** `server/src/core/Analyzer.js`

The primary analytics engine responsible for:

- Opening analysis
- Time-pressure analysis
- Endgame analysis
- Tactical weakness detection
- Behavioral analysis
- Stalker Score generation
- AI Twin generation

#### `Database`
**Location:** `server/src/core/Database.js`

Provides the persistence layer between the application and MongoDB/Mongoose models, with an in-memory fallback.

#### `AppService`
**Location:** `server/src/core/AppService.js`

Coordinates:

- Data ingestion
- Analysis workflows
- Player comparisons
- Application-level services

---

## 🌟 Features

### 1. 🎯 Stalker / Matrix Exploitability Score

Chess Insights generates a **0–100 exploitability score** based on five weighted metrics:

| Metric | Weight |
|---|---:|
| Time Trouble Index | 25% |
| Critical Mistakes & Blunder Rate | 25% |
| Endgame Handling Vulnerability | 20% |
| Win Streak Resilience & Tilt | 15% |
| Opening Accuracy & Repertoire Depth | 15% |

The score provides a quick overview of how vulnerable an opponent may be to specific game situations.

---

### 2. 🛡️ "How to Beat Them" Checklist

The platform converts analytical results into practical preparation advice.

#### Weakness Analysis

Examples of analyzed weaknesses include:

- Endgame performance
- Time pressure below one minute
- Defensive mistakes
- Tactical blunders
- Specific opening positions

#### Strength Analysis

The system can also identify areas where an opponent performs strongly, such as:

- Middle-game performance
- Attacking play
- Opening preparation
- Endgame conversion

#### White and Black Strategies

Dedicated strategy sections provide preparation recommendations depending on whether the user will play:

- **White**
- **Black**

---

### 3. 🤖 AI Twin Sparring Arena

The AI Twin allows users to practice against a simulated version of an opponent's playing style.

The system uses analyzed characteristics such as:

- Opening repertoire
- Tactical aggression
- Blunder tendencies
- Playing patterns

Users can play an interactive chess game directly in the browser.

---

### 4. ⏱️ Time Management & Scramble Analysis

Games are analyzed across four time-pressure categories:

- `< 1 min`
- `1–5 min`
- `5–15 min`
- `> 15 min`

The system identifies significant changes in performance during time scrambles and highlights potential time-management weaknesses.

---

### 5. ♟️ Opening Repertoire & Board Heatmap

The dashboard provides:

- Opening repertoire analysis
- Games played by opening
- Win-rate percentages
- Performance differences
- Board-square control visualization
- 8×8 heatmap representation

---

### 6. 🔍 Interactive Game Review

Users can review individual games using an interactive chessboard.

Features include:

- Click/drag moves
- Move navigation
- First/previous/next/last controls
- Auto-play
- Evaluation curve
- Centipawn-based evaluation
- Automated move annotations

Move annotations include:

- **Best Move**
- **Inaccuracy**
- **Mistake**
- **Blunder**

---

### 7. 👥 Player Comparison

The comparison interface allows two players to be analyzed side-by-side.

Metrics include:

- Ratings
- Stalker Scores
- Time discipline
- Tactical tendencies
- Psychological/aggression profiles
- Overall performance patterns

---

## 📁 Project Structure

### Root

- `package.json` — Root npm workspace configuration
- `README.md` — Project documentation
- `.env.example` — Root environment variables template

### `server/` — Backend

- `package.json`
- `.env.example`
- `src/`
  - `config/`
    - `db.js` — MongoDB connection and in-memory fallback
  - `models/`
    - `Player.js` — Player profile schema
    - `Game.js` — Game record schema
    - `Analysis.js` — Analysis report schema
  - `core/`
    - `Player.js` — Base Player class
    - `ChessComPlayer.js` — Chess.com integration
    - `LichessPlayer.js` — Lichess integration
    - `Analyzer.js` — Core analytics engine
    - `Database.js` — Database repository layer
    - `AppService.js` — Application pipeline coordinator
  - `controllers/`
    - `playerController.js`
    - `analysisController.js`
    - `gamesController.js`
    - `compareController.js`
  - `routes/`
    - `apiRoutes.js` — Express API routes
  - `services/`
    - `sampleDataService.js` — Sample data service
  - `utils/`
    - `chessEco.js` — Opening data and counter-strategies
    - `tacticalPatterns.js` — Tactical pattern detection
  - `server.js` — Express server entry point
- `tests/`
  - `analyzer.test.js` — Analytics test suite

### `client/` — Frontend

- `package.json`
- `vite.config.js`
- `index.html`
- `tailwind.config.js`
- `postcss.config.js`
- `src/`
  - `App.jsx` — Main application component
  - `main.jsx` — React entry point
  - `index.css` — Global styling
  - `api/`
    - `apiService.js` — REST API client
  - `context/`
    - `ChessContext.jsx` — Global application state
  - `utils/`
    - `chessHelpers.js` — Chess utility functions
  - `components/`
    - `layout/`
      - `Header.jsx`
      - `Sidebar.jsx`
      - `Footer.jsx`
    - `dashboard/`
      - `PlayerOverviewCard.jsx`
      - `StalkerScoreGauge.jsx`
      - `AiTwinCard.jsx`
      - `HowToBeatCard.jsx`
      - `FrequentRivalsCard.jsx`
      - `TimeManagementSection.jsx`
      - `TrapsAndTacticsSection.jsx`
      - `RepertoireHeatmap.jsx`
      - `PsychologicalRadar.jsx`
      - `RecentGamesTable.jsx`
    - `game-review/`
      - `InteractiveChessboard.jsx`
    - `twin-arena/`
      - `PlayTwinModal.jsx`
    - `compare/`
      - `ComparePlayersModal.jsx`

---

## 🚀 Getting Started

### Prerequisites

Make sure the following are installed:

- **Node.js:** v18 or later
- **npm:** v9 or later
- **MongoDB:** Optional

The original project was tested with:

- Node.js `v25.2.1`
- npm `v11.6.2`

> MongoDB is optional. If MongoDB is unavailable locally, the application can fall back to **Resilient In-Memory Mode**.

---

### 1. Clone the Repository

```bash
git clone https://github.com/nullpointer/chess-insights.git
cd chess-insights
```

---

### 2. Install Dependencies

Install dependencies across the root project, server, and client:

```bash
npm run install:all
```

---

### 3. Configure Environment Variables

Create a `.env` file inside the `server/` directory.

You can use `.env.example` as a template.

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/chess_insights
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

---

### 4. Start the Development Servers

Start both the backend and frontend:

```bash
npm run dev
```

The application will be available at:

- **Frontend:** `http://localhost:5173`
- **Backend:** `http://localhost:5000`

Open the frontend URL in your browser to use Chess Insights.

---

### 5. Run Tests

Run the backend test suite:

```bash
npm run test:server
```

---

## 📡 REST API

The backend provides REST endpoints for player discovery, game retrieval, behavioral analysis, saved reports, and player comparison.

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Health check and database status |
| `GET` | `/api/players/search?username=:u&platform=:p` | Search for a player profile |
| `GET` | `/api/analysis/:platform/:username` | Generate a behavioral analysis and Stalker Score |
| `GET` | `/api/analysis/saved` | Retrieve saved scouting analyses |
| `GET` | `/api/games/:platform/:username?limit=40` | Retrieve parsed games |
| `POST` | `/api/compare` | Compare two players |

---

## 🔄 Application Flow

```text
Player Username
      |
      v
Platform Search
      |
      v
Fetch Public Games
      |
      v
Parse PGN + Game Metadata
      |
      v
Analyze Openings, Tactics,
Time Pressure & Performance
      |
      v
Generate Stalker Score
      |
      v
Generate Preparation Insights
      |
      v
Interactive Dashboard
```

---

## 🧪 Testing

The project includes backend tests for the analytics engine.

Run:

```bash
npm run test:server
```

The primary test file is:

```text
server/tests/analyzer.test.js
```

---

## 📌 Important Notes

- The application analyzes publicly available chess game data.
- Analysis results depend on the quality and availability of the retrieved game data.
- MongoDB is optional when using the application's in-memory fallback.
- The AI Twin is a simulation based on observed game characteristics rather than an exact recreation of a human player.
- Stalker Scores are analytical indicators and should be interpreted as preparation aids rather than definitive predictions.

---

## 👨‍💻 Team NullPointer

Built by **Team NullPointer** at **Galgotias College of Engineering & Technology**.

**Prabhav Agarwal · Ayush Singh · Sraddha Mishra · Shoaib Khan**
