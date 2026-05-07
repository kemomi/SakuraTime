# 🌸 Sakura-Time

> A **real-time cherry blossom forecasting system** built with React and Node.js — similar to Japan's "Sakura Zensen" (Cherry Blossom Front). Features offline map downloads, bloom probability forecasting, meteorological data integration, and historical record analysis.

---

## ✨ Features

### 🗾 Interactive Map
- **Leaflet-based interactive map** with light/dark street map and satellite imagery toggle
- **Custom cherry blossom markers** that change color in real-time based on bloom status (Not yet → Budding → Blooming → Full bloom → Falling)
- **Click-to-fly navigation** with popup summary cards for each location
- **GPS geolocation** — jump to your current position with one tap

### 📦 Offline Support (PWA)
- **Offline map tile caching**: Tap "Download" on the map page, select a zoom level, and download tiles for the current viewport
- **Bulk regional downloads**: Select and download any of 9 regions (Hokkaido, Kanto, Kinki, etc.) from the Offline tab
- **Service Worker**: Automatically caches map tiles for smooth browsing even without network access
- **Cache management**: View downloaded regions and sizes, with one-tap deletion
- **Storage usage visualization**

### 🌊 Sakura Front
- **Nationwide bloom status overview** with real-time counts of full bloom / blooming / about to bloom locations
- **Regional card grid** displaying bloom progress bars and weather information
- **Tap to navigate** directly to map details

### 🔬 Bloom Forecasting Algorithm
- Based on the **DTS (Dormancy Temperature Sum) model**, replicating academic research by Aono & Kazui (2008)
- Integrates **chilling accumulation** (Chilling Requirement ~1400h) and **forcing accumulation** (Forcing Requirement ~400GDD)
- Latitude and altitude corrections supported
- Outputs **30-day daily bloom probabilities** with **confidence scores**

### 📊 Data Visualization
- **30-day bloom probability bar chart** (Chart.js)
- **Historical bloom date line chart** (past 10 years of records)
- **Real-time weather panel**: temperature, humidity, wind speed, UV index

---

## 🏗 Architecture

```
sakura-time/
├── server/                  # Node.js + Express backend
│   ├── index.js             # Entry point, Express + Cron jobs
│   ├── routes/
│   │   ├── spots.js         # Cherry blossom spot CRUD + mock data
│   │   ├── forecast.js      # DTS bloom forecasting algorithm
│   │   ├── weather.js       # Weather data (OpenWeatherMap integration)
│   │   └── tiles.js         # Offline tile manifest generation
│   └── models/
│       └── Spot.js          # MongoDB Schema (with history & forecasts)
├── client/
│   └── public/
│       └── index.html       # Complete frontend single-page application
├── docker/
│   ├── Dockerfile.server    # Server image
│   └── nginx.conf           # Nginx reverse proxy + SPA fallback
├── docker-compose.yml       # One-click full-stack deployment
└── .env.example             # Environment variable template
```

### Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend Framework | Vanilla JS (replaceable with React) |
| Map | Leaflet.js 1.9 |
| Charts | Chart.js 4.4 |
| Backend | Node.js + Express |
| Database | MongoDB + Mongoose |
| Deployment | Docker + Docker Compose + Nginx |
| Offline | Service Worker + Cache API |
| Scheduled Tasks | node-cron |

---

## 🚀 Quick Start

### Option 1: Open Directly (No Server Required)

```bash
# Simply open the frontend file in your browser — uses built-in mock data
open client/public/index.html
```

> All 10 cherry blossom spots, forecast charts, and offline management work out of the box with no backend needed.

### Option 2: Local Development

```bash
# 1. Clone the project
git clone https://github.com/kemomi/SakuraTime.git
cd SakuraTime

# 2. Copy environment variables
cp .env.example .env

# 3. Install backend dependencies
npm install

# 4. Start the backend (port 3000)
npm run dev
# Visit http://localhost:3000 in your browser
```

### Option 3: Docker One-Click Deployment (Recommended for Production)

```bash
# Build and start all services (MongoDB + Server + Nginx)
docker-compose up -d

# View logs
docker-compose logs -f

# Stop
docker-compose down
```

Visit `http://localhost` to access the application.

---

## ⚙️ Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb://127.0.0.1:27017/sakura` |
| `PORT` | Server port | `3000` |
| `JWT_SECRET` | JWT signing secret | — |
| `OPENWEATHER_API_KEY` | OpenWeatherMap API Key | (Leave empty to use mock data) |
| `NODE_ENV` | Runtime environment | `development` |

---

## 📡 API Documentation

### Spots

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/spots` | Get all spots, supports `?region=Kanto&status=full_bloom&search=Ueno` |
| GET | `/api/spots/regions` | Get all regions |
| GET | `/api/spots/:id` | Get a single spot's details |
| GET | `/api/spots/:id/history` | Get historical bloom records |

### Forecast

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/forecast/front` | Get national sakura front data |
| GET | `/api/forecast/spot/:id` | Get 30-day probability forecast for a specific spot |
| POST | `/api/forecast/calculate` | Calculate bloom date prediction from coordinates (DTS model) |

### Weather

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/weather?lat=35.7&lng=139.7` | Get weather data for specified coordinates |

### Offline Tiles

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tiles/manifest?lat=35.7&lng=139.7&zoom=12&radius=10` | Generate tile download manifest |

---

## 🔭 Bloom Forecasting Model

This system uses the **DTS (Dormancy Temperature Sum) model**, based on the following academic research:

- Aono, Y. & Kazui, K. (2008). *Phenological data series of cherry tree flowering in Kyoto, Japan, and its application to reconstruction of springtime temperatures since the 9th century.* Int J Climatol.
- Doi, H. et al. (2020). *Climate change and sakura flowering dates.*

### Algorithm Steps

1. **Chilling Phase** (October → January): When daily mean temperature < 7.2°C, accumulate "chilling hours" until reaching 1400h to complete dormancy release.
2. **Forcing Phase** (after chilling requirement is met): When daily mean temperature > 4.7°C, accumulate GDD (Growing Degree Days) until reaching 400, outputting the **predicted first bloom date**.
3. **Full bloom date** = First bloom date + ~7 days.
4. **Confidence** is calculated from latitude, altitude, and chilling accumulation completion.

---

## 🛠 Extension Guide

### Integrating Real Weather Data

```js
// server/services/weatherService.js
const axios = require('axios');

async function getWeather(lat, lng) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric&lang=ja`;
  const { data } = await axios.get(url);
  return {
    temp: data.main.temp,
    humidity: data.main.humidity,
    ...
  };
}
```

### Integrating Satellite Remote Sensing Data (NDVI)

Use NASA MODIS or Sentinel-2 data to calculate vegetation indices, improving full bloom date prediction accuracy.

### Adding User Reports

Add records with `source: 'user'` to `historicalRecords` in the Spot model to support crowdsourced data.

---

## 📜 License

MIT License © 2026 Sakura-Time Contributors

---

*"Hana wa sakuragi, hito wa bushi"* — Of all flowers, the cherry; of all men, the samurai. Cherish every moment the blossoms bloom. 🌸
