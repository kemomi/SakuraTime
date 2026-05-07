const express = require('express');
const router = express.Router();

// ── Mock Data (used when MongoDB is unavailable) ────────────────────────────
const MOCK_SPOTS = [
  {
    _id: 'spot001', name: 'Ueno Park', nameJa: '上野公園', nameCn: '上野公园',
    region: 'Kanto', prefecture: 'Tokyo', country: 'Japan',
    coordinates: { lat: 35.7156, lng: 139.7719 }, altitude: 10, treeCount: 800,
    mainVariety: 'Somei Yoshino',
    description: '东京最著名的赏樱地点之一，拥有约800棵染井吉野樱，每年吸引数百万游客。',
    currentStatus: 'full_bloom', bloomPercent: 90,
    weather: { temp: 14, humidity: 62, condition: '晴れ', icon: '☀️' },
    forecast: {
      firstBloomDate: '2026-03-22', fullBloomDate: '2026-03-30', confidence: 0.87,
      dailyProb: generateDailyProb('2026-03-18', 0.9)
    },
    historicalAvgFirst: '03-24', historicalAvgFull: '04-01',
    rating: 4.8, popularity: 9800, tags: ['公园', '夜樱', '人气']
  },
  {
    _id: 'spot002', name: 'Maruyama Park', nameJa: '円山公園', nameCn: '圆山公园',
    region: 'Kinki', prefecture: 'Kyoto', country: 'Japan',
    coordinates: { lat: 35.0036, lng: 135.7800 }, altitude: 60, treeCount: 680,
    mainVariety: 'Shidare Zakura',
    description: '京都最知名的赏樱胜地，中央的垂枝樱树是京都的象征，夜间灯光照明更是绝美。',
    currentStatus: 'blooming', bloomPercent: 65,
    weather: { temp: 12, humidity: 68, condition: '曇り', icon: '⛅' },
    forecast: {
      firstBloomDate: '2026-03-25', fullBloomDate: '2026-04-02', confidence: 0.82,
      dailyProb: generateDailyProb('2026-03-21', 0.82)
    },
    historicalAvgFirst: '03-26', historicalAvgFull: '04-03',
    rating: 4.9, popularity: 8700, tags: ['垂枝樱', '夜樱', '世界遗产附近']
  },
  {
    _id: 'spot003', name: 'Hirosaki Castle', nameJa: '弘前城', nameCn: '弘前城',
    region: 'Tohoku', prefecture: 'Aomori', country: 'Japan',
    coordinates: { lat: 40.6065, lng: 140.4640 }, altitude: 25, treeCount: 2600,
    mainVariety: 'Somei Yoshino',
    description: '日本最著名的赏樱胜地之一，约2600棵樱树环绕古老城堡，花瓣落入护城河的景象举世无双。',
    currentStatus: 'opening', bloomPercent: 20,
    weather: { temp: 8, humidity: 72, condition: '小雨', icon: '🌧️' },
    forecast: {
      firstBloomDate: '2026-04-18', fullBloomDate: '2026-04-25', confidence: 0.79,
      dailyProb: generateDailyProb('2026-04-14', 0.79)
    },
    historicalAvgFirst: '04-20', historicalAvgFull: '04-27',
    rating: 4.9, popularity: 7200, tags: ['城堡', '花筏', '历史']
  },
  {
    _id: 'spot004', name: 'Yoshino Mountain', nameJa: '吉野山', nameCn: '吉野山',
    region: 'Kinki', prefecture: 'Nara', country: 'Japan',
    coordinates: { lat: 34.3707, lng: 135.8570 }, altitude: 350, treeCount: 30000,
    mainVariety: 'Yamazakura',
    description: '日本第一赏樱名所，约30000棵山樱分布于山坡之上，自古即是日本人心中的圣地。',
    currentStatus: 'budding', bloomPercent: 5,
    weather: { temp: 7, humidity: 65, condition: '晴れ', icon: '☀️' },
    forecast: {
      firstBloomDate: '2026-04-05', fullBloomDate: '2026-04-12', confidence: 0.75,
      dailyProb: generateDailyProb('2026-04-01', 0.75)
    },
    historicalAvgFirst: '04-06', historicalAvgFull: '04-13',
    rating: 4.8, popularity: 6500, tags: ['世界遗产', '山樱', '自然']
  },
  {
    _id: 'spot005', name: 'Shinjuku Gyoen', nameJa: '新宿御苑', nameCn: '新宿御苑',
    region: 'Kanto', prefecture: 'Tokyo', country: 'Japan',
    coordinates: { lat: 35.6852, lng: 139.7100 }, altitude: 38, treeCount: 1500,
    mainVariety: 'Mixed',
    description: '东京最大的国家花园，种植了65种、约1500棵樱树，花期从2月到5月横跨数月。',
    currentStatus: 'full_bloom', bloomPercent: 85,
    weather: { temp: 15, humidity: 58, condition: '晴れ', icon: '☀️' },
    forecast: {
      firstBloomDate: '2026-03-20', fullBloomDate: '2026-03-28', confidence: 0.91,
      dailyProb: generateDailyProb('2026-03-16', 0.91)
    },
    historicalAvgFirst: '03-22', historicalAvgFull: '03-30',
    rating: 4.7, popularity: 8900, tags: ['国家公园', '多品种', '赏花野餐']
  },
  {
    _id: 'spot006', name: 'Hakodate Park', nameJa: '函館公園', nameCn: '函馆公园',
    region: 'Hokkaido', prefecture: 'Hokkaido', country: 'Japan',
    coordinates: { lat: 41.7590, lng: 140.7265 }, altitude: 15, treeCount: 250,
    mainVariety: 'Somei Yoshino',
    description: '北海道南部的赏樱名所，春季较晚，5月初前后迎来满开，气候独特别具风情。',
    currentStatus: 'not_yet', bloomPercent: 0,
    weather: { temp: 3, humidity: 80, condition: '雪', icon: '❄️' },
    forecast: {
      firstBloomDate: '2026-05-01', fullBloomDate: '2026-05-07', confidence: 0.70,
      dailyProb: generateDailyProb('2026-04-27', 0.70)
    },
    historicalAvgFirst: '05-02', historicalAvgFull: '05-08',
    rating: 4.4, popularity: 3800, tags: ['北海道', '晚开花', '函馆']
  },
  {
    _id: 'spot007', name: 'Philosopher\'s Path', nameJa: '哲学の道', nameCn: '哲学之道',
    region: 'Kinki', prefecture: 'Kyoto', country: 'Japan',
    coordinates: { lat: 35.0270, lng: 135.7950 }, altitude: 55, treeCount: 450,
    mainVariety: 'Somei Yoshino',
    description: '京都的樱花隧道，沿着运河两岸种满染井吉野樱，步行于花瓣飘落中如入仙境。',
    currentStatus: 'falling', bloomPercent: 30,
    weather: { temp: 16, humidity: 60, condition: '晴れ', icon: '☀️' },
    forecast: {
      firstBloomDate: '2026-03-23', fullBloomDate: '2026-03-31', confidence: 0.85,
      dailyProb: generateDailyProb('2026-03-19', 0.85)
    },
    historicalAvgFirst: '03-25', historicalAvgFull: '04-01',
    rating: 4.8, popularity: 7600, tags: ['步道', '运河', '散步']
  },
  {
    _id: 'spot008', name: 'Sumida Park', nameJa: '隅田公園', nameCn: '隅田公园',
    region: 'Kanto', prefecture: 'Tokyo', country: 'Japan',
    coordinates: { lat: 35.7100, lng: 139.8020 }, altitude: 5, treeCount: 640,
    mainVariety: 'Somei Yoshino',
    description: '隅田川沿岸的赏樱名所，约640棵樱树与东京晴空塔相映成趣，夜樱配合灯光尤为壮观。',
    currentStatus: 'full_bloom', bloomPercent: 95,
    weather: { temp: 14, humidity: 64, condition: '晴れ', icon: '☀️' },
    forecast: {
      firstBloomDate: '2026-03-21', fullBloomDate: '2026-03-29', confidence: 0.89,
      dailyProb: generateDailyProb('2026-03-17', 0.89)
    },
    historicalAvgFirst: '03-23', historicalAvgFull: '03-31',
    rating: 4.6, popularity: 7100, tags: ['夜樱', '晴空塔', '隅田川']
  },
  {
    _id: 'spot009', name: 'Matsumoto Castle', nameJa: '松本城', nameCn: '松本城',
    region: 'Chubu', prefecture: 'Nagano', country: 'Japan',
    coordinates: { lat: 36.2382, lng: 137.9716 }, altitude: 592, treeCount: 200,
    mainVariety: 'Somei Yoshino',
    description: '日本现存最古老的五重天守城堡，黑色城壁与粉色樱花形成强烈对比，背后常有积雪的北阿尔卑斯山脉。',
    currentStatus: 'opening', bloomPercent: 35,
    weather: { temp: 9, humidity: 70, condition: '曇り', icon: '⛅' },
    forecast: {
      firstBloomDate: '2026-04-10', fullBloomDate: '2026-04-17', confidence: 0.77,
      dailyProb: generateDailyProb('2026-04-06', 0.77)
    },
    historicalAvgFirst: '04-12', historicalAvgFull: '04-19',
    rating: 4.8, popularity: 5900, tags: ['城堡', '国宝', '山脉背景']
  },
  {
    _id: 'spot010', name: 'Kenroku-en Garden', nameJa: '兼六園', nameCn: '兼六园',
    region: 'Chubu', prefecture: 'Ishikawa', country: 'Japan',
    coordinates: { lat: 36.5617, lng: 136.6614 }, altitude: 60, treeCount: 420,
    mainVariety: 'Mixed',
    description: '日本三大名园之一，种有约420棵多种樱树，传统日式庭园与华丽樱花相映成趣。',
    currentStatus: 'blooming', bloomPercent: 55,
    weather: { temp: 11, humidity: 66, condition: '晴れ', icon: '☀️' },
    forecast: {
      firstBloomDate: '2026-03-28', fullBloomDate: '2026-04-04', confidence: 0.83,
      dailyProb: generateDailyProb('2026-03-24', 0.83)
    },
    historicalAvgFirst: '03-30', historicalAvgFull: '04-06',
    rating: 4.7, popularity: 5400, tags: ['名园', '日式庭园', '金泽']
  }
];

function generateDailyProb(startDateStr, peakProb) {
  const result = [];
  const start = new Date(startDateStr);
  for (let i = 0; i < 20; i++) {
    const d = new Date(start);
    d.setDate(d.getDate() + i);
    let prob, bloomPct;
    if (i < 5) { prob = peakProb * (i / 5) * 0.4; bloomPct = prob * 30; }
    else if (i < 8) { prob = peakProb * (0.4 + (i - 5) / 3 * 0.6); bloomPct = prob * 100; }
    else if (i < 12) { prob = peakProb * (1 - (i - 8) / 10); bloomPct = Math.max(0, 100 - (i - 8) * 15); }
    else { prob = 0; bloomPct = 0; }
    result.push({ date: d.toISOString().split('T')[0], probability: +prob.toFixed(2), bloomPercent: +bloomPct.toFixed(0) });
  }
  return result;
}

// ── Helpers ─────────────────────────────────────────────────────────────────
let Spot;
function getModel() {
  if (!Spot) {
    try { Spot = require('../models/Spot'); } catch (_) {}
  }
  return Spot;
}

async function getSpots(filter = {}) {
  const Model = getModel();
  if (Model) {
    try { return await Model.find({ isActive: true, ...filter }).lean(); } catch (_) {}
  }
  return MOCK_SPOTS;
}

// ── Routes ───────────────────────────────────────────────────────────────────
router.get('/', async (req, res) => {
  try {
    const { region, status, search, limit = 50 } = req.query;
    let spots = await getSpots();
    if (region) spots = spots.filter(s => s.region === region);
    if (status) spots = spots.filter(s => s.currentStatus === status);
    if (search) {
      const q = search.toLowerCase();
      spots = spots.filter(s =>
        (s.name || '').toLowerCase().includes(q) ||
        (s.nameCn || '').toLowerCase().includes(q) ||
        (s.prefecture || '').toLowerCase().includes(q)
      );
    }
    res.json({ success: true, data: spots.slice(0, +limit), total: spots.length });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.get('/regions', async (_req, res) => {
  const spots = await getSpots();
  const regions = [...new Set(spots.map(s => s.region))];
  res.json({ success: true, data: regions });
});

router.get('/:id', async (req, res) => {
  try {
    const spots = await getSpots();
    const spot = spots.find(s => s._id === req.params.id || (s._id && s._id.toString() === req.params.id));
    if (!spot) return res.status(404).json({ success: false, error: 'Spot not found' });
    res.json({ success: true, data: spot });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.get('/:id/history', async (req, res) => {
  // Return simulated 30-year history
  const history = [];
  const now = new Date();
  for (let y = 0; y < 30; y++) {
    const year = now.getFullYear() - y;
    const baseDay = 80 + Math.floor(Math.random() * 15); // ~March 21–April 5
    const firstBloom = new Date(year, 2, baseDay);
    const fullBloom = new Date(year, 2, baseDay + 7 + Math.floor(Math.random() * 4));
    history.push({ year, firstBloomDate: firstBloom, fullBloomDate: fullBloom,
      daysFromAvg: Math.floor((Math.random() - 0.5) * 10) });
  }
  res.json({ success: true, data: history });
});

module.exports = router;
