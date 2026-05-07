# 🌸 樱花时令 Sakura-Time

> 一个基于 React 和 Node.js 的**实时樱花开放预测系统**，类似"樱花最前线"——支持离线地图下载、开花概率预测、气象数据整合与历史记录分析。
##  **智能樱花开放预测系统**
提供实时樱花开放状态和准确的预测信息 [❀点击访问❀](https://kemomi.github.io/SakuraTime)

[English](./README_EN.md) | [中文](./README_CN.md) | [日本語](./README_JP.md)
---

## ✨ 功能特点

### 🗾 实时地图
- **交互式 Leaflet 地图**，支持亮/暗色街道图与卫星图切换
- **自定义樱花标记**，颜色随开放状态实时变化（未开花→花芽→开花→满开→散樱）
- **点击地点卡片**即飞行定位，弹窗显示摘要信息
- **GPS 定位**，一键跳转到当前位置

### 📦 离线支持（PWA）
- **地图瓦片离线缓存**：在地图页面点击「下载」，选择缩放级别后下载当前视口区域
- **按大区批量下载**：在「离线」页面选择北海道、关东、近畿等9个区域分别下载
- **Service Worker**：自动缓存地图瓦片，无网络时仍可流畅浏览已缓存区域
- **缓存管理**：查看已下载区域、大小，支持一键删除
- **存储用量可视化**

### 🌊 樱花前线
- **全国开放状态总览**，实时统计满开/开花中/即将开放数量
- **地区卡片网格**，显示开花率进度条与气象信息
- **点击跳转**至地图详情

### 🔬 开花预测算法
- 基于 **DTS（Dormancy Temperature Sum）模型**，复现 Aono & Kazui (2008) 等学术研究
- 整合**冷积温**（Chilling Requirement ~1400h）和**热积温**（Forcing Requirement ~400GDD）
- 支持纬度与海拔修正
- 输出**30天逐日开花概率**与**置信度**

### 📊 数据可视化
- **30天开花概率柱状图**（Chart.js）
- **历年开花日折线图**（近10年记录）
- **实时气象面板**：气温、湿度、风速、紫外线

---

## 🏗 技术架构

```
sakura-time/
├── server/                    # Node.js + Express 后端
│   ├── index.js               # 服务入口，Express + Cron jobs
│   ├── routes/
│   │   ├── spots.js           # 观樱地点 CRUD + 模拟数据
│   │   ├── forecast.js        # DTS 开花预测算法
│   │   ├── weather.js         # 气象数据（接入 OpenWeatherMap）
│   │   └── tiles.js           # 离线瓦片 manifest 生成
│   └── models/
│       └── Spot.js            # MongoDB Schema（含历史记录、预测）
├── client/
│   └── public/
│       └── index.html         # 完整前端单页应用
├── docker/
│   ├── Dockerfile.server      # 服务器镜像
│   └── nginx.conf             # Nginx 反代 + SPA fallback
├── docker-compose.yml         # 一键启动全栈
└── .env.example               # 环境变量模板
```

### 技术栈

| 层级 | 技术 |
|------|------|
| 前端框架 | 原生 JS（可替换为 React）|
| 地图 | Leaflet.js 1.9 |
| 图表 | Chart.js 4.4 |
| 后端 | Node.js + Express |
| 数据库 | MongoDB + Mongoose |
| 部署 | Docker + Docker Compose + Nginx |
| 离线 | Service Worker + Cache API |
| 定时任务 | node-cron |

---

## 🚀 快速启动

### 方式一：直接打开（无需服务器）

```bash
# 直接用浏览器打开前端文件，使用内置模拟数据
open client/public/index.html
```

> 所有10个观樱地点、预测图表、离线管理均可使用，无需任何后端。

### 方式二：本地开发

```bash
# 1. 克隆项目
git clone https://github.com/kemomi/SakuraTime.git
cd SakuraTime

# 2. 复制环境变量
cp .env.example .env

# 3. 安装后端依赖
npm install

# 4. 启动后端（端口 3000）
npm run dev

# 浏览器访问 http://localhost:3000
```

### 方式三：Docker 一键部署（推荐生产）

```bash
# 构建并启动所有服务（MongoDB + Server + Nginx）
docker-compose up -d

# 查看日志
docker-compose logs -f

# 停止
docker-compose down
```

访问 `http://localhost` 即可。

---

## ⚙️ 环境变量

| 变量 | 说明 | 默认值 |
|------|------|--------|
| `MONGODB_URI` | MongoDB 连接字符串 | `mongodb://127.0.0.1:27017/sakura` |
| `PORT` | 服务器端口 | `3000` |
| `JWT_SECRET` | JWT 签名密钥 | — |
| `OPENWEATHER_API_KEY` | OpenWeatherMap API Key | （留空使用模拟数据）|
| `NODE_ENV` | 运行环境 | `development` |

---

## 📡 API 文档

### 地点

| Method | Endpoint | 说明 |
|--------|----------|------|
| GET | `/api/spots` | 获取所有地点，支持 `?region=Kanto&status=full_bloom&search=上野` |
| GET | `/api/spots/regions` | 获取所有地区列表 |
| GET | `/api/spots/:id` | 获取单个地点详情 |
| GET | `/api/spots/:id/history` | 获取历年开花记录 |

### 预测

| Method | Endpoint | 说明 |
|--------|----------|------|
| GET | `/api/forecast/front` | 获取全国樱花前线数据 |
| GET | `/api/forecast/spot/:id` | 获取指定地点30天概率预测 |
| POST | `/api/forecast/calculate` | 根据坐标计算开花日预测（DTS模型）|

### 气象

| Method | Endpoint | 说明 |
|--------|----------|------|
| GET | `/api/weather?lat=35.7&lng=139.7` | 获取指定坐标气象数据 |

### 离线瓦片

| Method | Endpoint | 说明 |
|--------|----------|------|
| GET | `/api/tiles/manifest?lat=35.7&lng=139.7&zoom=12&radius=10` | 生成瓦片下载清单 |

---

## 🔭 开花预测模型说明

本系统使用 **DTS（Dormancy Temperature Sum）模型**，基于以下学术研究：

- Aono, Y. & Kazui, K. (2008). *Phenological data series of cherry tree flowering in Kyoto, Japan, and its application to reconstruction of springtime temperatures since the 9th century.* Int J Climatol.
- Doi, H. et al. (2020). *Climate change and sakura flowering dates.*

### 算法步骤

1. **冷积温阶段**（10月→翌年1月）：当日均温 < 7.2°C 时，累计「冷小时」直至达 1400h，完成休眠解除。
2. **热积温阶段**（冷积温满足后）：当日均温 > 4.7°C 时，累计 GDD（Growing Degree Days）直至达 400，输出**开花日预测**。
3. **满开日** = 开花日 + ~7天。
4. **置信度**由纬度、海拔、冷积温完成度综合计算。

---

## 🛠 扩展指南

### 接入真实气象数据

```js
// server/services/weatherService.js
const axios = require('axios');
async function getWeather(lat, lng) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric&lang=ja`;
  const { data } = await axios.get(url);
  return { temp: data.main.temp, humidity: data.main.humidity, ... };
}
```

### 接入卫星遥感数据（NDVI）

使用 NASA MODIS 或 Sentinel-2 数据计算植被指数，以改进满开日预测精度。

### 添加用户上报

在 `Spot` model 中的 `historicalRecords` 添加 `source: 'user'` 的记录，支持众包数据。

---

## 📜 许可证

MIT License © 2026 Sakura-Time Contributors

---

*「花は桜木、人は武士」— 赏花赏心，珍惜每一个花开的瞬间。🌸*
