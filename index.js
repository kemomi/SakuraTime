require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const mongoose = require('mongoose');
const cron = require('node-cron');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// ── Middleware ──────────────────────────────────────────────────────────────
app.use(helmet({ contentSecurityPolicy: false }));
app.use(compression());
app.use(cors({ origin: process.env.CLIENT_ORIGIN || '*' }));
app.use(express.json());

// ── Static (production) ─────────────────────────────────────────────────────
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// ── Routes ──────────────────────────────────────────────────────────────────
app.use('/api/spots',       require('./routes/spots'));
app.use('/api/forecast',    require('./routes/forecast'));
app.use('/api/weather',     require('./routes/weather'));
app.use('/api/tiles',       require('./routes/tiles'));
app.use('/api/auth',        require('./routes/auth'));

// Health check
app.get('/api/health', (_req, res) => res.json({ status: 'ok', time: new Date() }));

// SPA fallback
if (process.env.NODE_ENV === 'production') {
  app.get('*', (_req, res) =>
    res.sendFile(path.join(__dirname, '../client/build/index.html'))
  );
}

// ── Database ────────────────────────────────────────────────────────────────
const MONGO_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/sakura';
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    startCronJobs();
  })
  .catch(err => {
    console.warn('⚠️  MongoDB not available, running in mock mode:', err.message);
    startCronJobs();
  });

// ── Cron Jobs ───────────────────────────────────────────────────────────────
function startCronJobs() {
  // Update weather data every hour
  cron.schedule('0 * * * *', async () => {
    console.log('🌸 Running hourly weather update...');
    try {
      const weatherService = require('./services/weatherService');
      await weatherService.updateAllSpots();
    } catch (e) {
      console.error('Weather update failed:', e.message);
    }
  });

  // Recalculate forecasts every 6 hours
  cron.schedule('0 */6 * * *', async () => {
    console.log('🌸 Recalculating bloom forecasts...');
    try {
      const forecastService = require('./services/forecastService');
      await forecastService.recalculateAll();
    } catch (e) {
      console.error('Forecast recalculation failed:', e.message);
    }
  });

  console.log('⏰ Cron jobs scheduled');
}

app.listen(PORT, () => console.log(`🌸 Sakura-Time server running on port ${PORT}`));
module.exports = app;
