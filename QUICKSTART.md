# 🚀 快速开始指南 / Quick Start Guide
几分钟内启动 Sakura-Time。
本指南涵盖全部部署方式——从零配置到生产环境。
Get Sakura-Time up and running in minutes. This guide covers all deployment methods — from zero-config to production.
---
## 前置要求 / Prerequisites
| 方式 / Method | 你需要 / What You Need |
|---------------|----------------------|
| **方式一** — 纯静态 / Static Only | 现代浏览器（Chrome、Firefox、Safari、Edge）/ A modern browser |
| **方式二** — 本地开发 / Local Dev | Node.js ≥ 18, npm ≥ 9 |
| **方式三** — Docker 部署 / Docker | Docker ≥ 24, Docker Compose ≥ 2.20 |
| **方式四** — GitHub Pages | GitHub 账号 / A GitHub account |
---
## 方式一：直接打开（无需服务器）/ Option 1: Open Directly (No Server)
最快的方式——**零安装**：前端内置了全部 10 个观樱地点的模拟数据。
The fastest way — **zero installation**. The frontend includes built-in mock data for all 10 cherry blossom spots.
```bash
# 克隆仓库 / Clone the repo
git clone https://github.com/kemomi/SakuraTime.git
cd SakuraTime
# 用默认浏览器打开 / Open in your default browser
open client/public/index.html
# Linux 系统 / On Linux:
# xdg-open client/public/index.html
# Windows 系统 / On Windows:
# start client/public/index.html
```
> ✅ **可用功能 / What works**: 交互式地图、地点卡片、开花预测、图表、离线管理面板
> / Interactive map, spot cards, bloom forecasts, charts, offline management panel.
>
> ⚠️ **不可用功能 / What doesn't**: 实时天气 API、数据库持久化、定时任务更新——均自动回退为模拟数据
> / Live weather API calls, database persistence, cron job updates. All fall back to mock data automatically.
---
## 方式二：本地开发 / Option 2: Local Development
本地运行完整技术栈（Express + MongoDB），适合开发调试。
Run the full stack (Express + MongoDB) locally for development.
### 第一步 — 克隆与安装 / Step 1 — Clone & Install
```bash
git clone https://github.com/kemomi/SakuraTime.git
cd SakuraTime
# 安装服务端依赖 / Install server dependencies
npm install
```
### 第二步 — 配置数据库 / Step 2 — Set Up Database
**使用 Docker（推荐）/ With Docker (recommended):**
```bash
# 仅启动 MongoDB / Start MongoDB only
docker run -d \
  --name sakura-mongo \
  -p 27017:27017 \
  -v sakura-data:/data/db \
  mongo:7.0
```
**不使用 Docker — 本地安装 MongoDB / Without Docker — install MongoDB locally:**
- **macOS**: `brew install mongodb-community && brew services start mongodb-community`
- **Ubuntu/Debian**: `sudo apt install mongodb-org && sudo systemctl start mongod`
- **Windows**: 从 [mongodb.com](https://www.mongodb.com/try/download/community) 下载安装
### 第三步 — 配置环境变量 / Step 3 — Configure Environment
```bash
# 复制模板 / Copy the template
cp .env.example .env
```
编辑 `.env` 文件 / Edit `.env` with your settings:
```env
# 必填 / Required
MONGODB_URI=mongodb://127.0.0.1:27017/sakura
PORT=3000
NODE_ENV=development
# 可选 — 留空则使用模拟天气数据 / Optional — leave empty to use mock weather data
OPENWEATHER_API_KEY=
# 可选 — 用户认证功能需要 / Optional — needed for user auth features
JWT_SECRET=change-this-to-a-random-string
```
### 第四步 — 启动服务 / Step 4 — Start the Server
```bash
npm run dev
```
看到以下输出即表示成功 / You should see:
```
🌸 Sakura-Time server running on port 3000
✅ MongoDB connected
⏰ Cron jobs scheduled
```
### 第五步 — 打开浏览器 / Step 5 — Open in Browser
```
http://localhost:3000
```
### 开发技巧 / Development Tips
| 任务 / Task | 操作 / How |
|-------------|-----------|
| 修改前端并刷新 / Hot-reload frontend | 编辑 `client/public/` 中的文件后刷新页面 |
| 测试 API 是否正常 / Test API | 访问 `http://localhost:3000/api/health` |
| 查看所有地点（JSON）/ View all spots | 访问 `http://localhost:3000/api/spots` |
| 按地区筛选 / Filter by region | `http://localhost:3000/api/spots?region=Kanto` |
| 搜索地点 / Search spots | `http://localhost:3000/api/spots?search=Ueno` |
| 查看前线数据 / View front data | `http://localhost:3000/api/forecast/front` |
| 检查数据库连接 / Check DB | 控制台查找 `✅ MongoDB connected` |
> 💡 **没有 MongoDB？** 服务端会自动回退为模拟数据。你会看到 `⚠️ MongoDB not available, running in mock mode`——一切照常运行。
> / **No MongoDB?** The server automatically falls back to mock data. Everything still works.
---
## 方式三：Docker 一键部署 / Option 3: Docker One-Click Deployment
**推荐用于预发布和生产环境**。一条命令启动 MongoDB、Node.js 服务端和 Nginx 反向代理。
**Recommended for staging and production**. Spins up MongoDB, Node.js server, and Nginx reverse proxy with a single command.
### 第一步 — 克隆与配置 / Step 1 — Clone & Configure
```bash
git clone https://github.com/kemomi/SakuraTime.git
cd SakuraTime
# 可选：设置密钥 / Optional: set your secrets
cp .env.example .env
# 编辑 .env 填入生产环境值 / Edit .env with production values
```
### 第二步 — 启动 / Step 2 — Launch
```bash
docker-compose up -d
```
这将启动三个容器 / This starts three containers:
| 容器 / Container | 镜像 / Image | 端口 / Port | 用途 / Purpose |
|-----------------|-------------|-----------|---------------|
| `sakura-mongo` | mongo:7.0 | 27017 | 数据库 / Database |
| `sakura-server` | (自行构建 / built) | 3000 | Express API 服务端 |
| `sakura-nginx` | nginx:alpine | 80, 443 | 反向代理 + 静态文件 / Reverse proxy + static files |
### 第三步 — 验证 / Step 3 — Verify
```bash
# 查看所有容器状态 / Check all containers are running
docker-compose ps
# 查看日志 / View logs
docker-compose logs -f
# 测试健康检查接口 / Test health endpoint
curl http://localhost/api/health
```
### 第四步 — 访问 / Step 4 — Access
```
http://localhost
```
### 常用 Docker 命令 / Common Docker Commands
```bash
# 停止所有服务 / Stop everything
docker-compose down
# 停止并删除数据卷（清空数据库）/ Stop and remove volumes (wipes database)
docker-compose down -v
# 代码修改后重新构建 / Rebuild after code changes
docker-compose up -d --build
# 查看特定服务日志 / View logs for a specific service
docker-compose logs -f server
docker-compose logs -f nginx
# 进入服务端容器 / Shell into the server container
docker-compose exec server sh
```
### 生产环境检查清单 / Production Checklist
- [ ] 将 `.env` 中的 `JWT_SECRET` 改为强随机字符串 / Change `JWT_SECRET` to a strong random string
- [ ] 设置 `NODE_ENV=production` / Set `NODE_ENV=production`
- [ ] 填入 `OPENWEATHER_API_KEY` 以获取实时天气 / Add your API key for live weather data
- [ ] 将 SSL 证书放入 `docker/` 并更新 `nginx.conf` / Place SSL certificates and update Nginx config
- [ ] 配置防火墙——仅暴露 80 和 443 端口 / Set up firewall — only expose ports 80 and 443
- [ ] 确认重启策略（compose 文件中已配置 `restart: unless-stopped`）/ Verify restart policy
---
## 方式四：部署到 GitHub Pages / Option 4: Deploy to GitHub Pages
如果只需要前端（不需要后端 API），可以免费部署到 GitHub Pages。
If you only need the frontend (no backend API), deploy to GitHub Pages for free.
### 第一步 — 推送到 GitHub / Step 1 — Push to GitHub
```bash
git init
git add .
git commit -m "🌸 Initial commit"
git remote add origin https://github.com/你的用户名/SakuraTime.git
git branch -M main
git push -u origin main
```
### 第二步 — 启用 Pages / Step 2 — Enable Pages
1. 进入 **Settings → Pages**
2. 在 **Source** 下选择 `Deploy from a branch`
3. 选择 `main` 分支，文件夹选 `/ (root)`
4. 点击 **Save**
### 第三步 — 访问 / Step 3 — Access
```
https://你的用户名.github.io/SakuraTime/
```
> ⚠️ 确保 `index.html` 中所有 CDN 链接使用 `https://`（而非 `//`），避免混合内容被浏览器拦截。
> / Make sure all CDN links in `index.html` use `https://` (not `//`) to avoid mixed content blocking.
---
## 常见问题排查 / Troubleshooting
### MongoDB 连接失败 / MongoDB connection fails
```
⚠️ MongoDB not available, running in mock mode
```
**这不是错误**——应用使用模拟数据可以正常运行。如需修复连接：
**This is not an error** — the app works fine with mock data. To fix the connection:
```bash
# 检查 MongoDB 是否在运行 / Check if MongoDB is running
docker ps | grep mongo
# 或者 / or
mongosh --eval "db.runCommand({ ping: 1 })"
# 检查 .env 中的连接字符串 / Check your MONGODB_URI in .env
cat .env | grep MONGO
```
### 端口 3000 被占用 / Port 3000 already in use
```bash
# 查找占用端口的进程 / Find what's using port 3000
lsof -i :3000
# 结束进程 / Kill it
kill -9 <PID>
# 或使用其他端口 / Or use a different port
PORT=8080 npm run dev
```
### Docker 构建失败 / Docker build fails
```bash
# 清理 Docker 缓存并重新构建 / Clean Docker cache and rebuild
docker-compose down
docker system prune -f
docker-compose up -d --build
```
### 地图瓦片不加载 / Map tiles not loading
- 检查网络连接（瓦片从 CDN 加载）/ Check internet connection (tiles load from CDN)
- 打开浏览器 DevTools → Network 标签，查找 `*.tile.openstreetmap.org` 的失败请求
- 如果出现混合内容错误，确保页面通过 HTTPS 访问 / If mixed content errors, ensure page is served over HTTPS
### Service Worker 未注册 / Service Worker not registering
- Service Worker 要求 **HTTPS**（`localhost` 除外）/ Service Workers require **HTTPS** (except on `localhost`)
- SW 文件路径必须在根目录或一级子目录下 / The SW file path must be at root or one level deep
- 打开 DevTools → Application → Service Workers 查看状态 / Open DevTools to check status
---
## 下一步 / Next Steps
启动成功后，你可以：
After getting Sakura-Time running:
- 📖 阅读完整 [README](./README_CN.md) 了解功能详情 / Read the full README for feature details
- 📡 查看 [API 文档](./README_EN.md#-api-documentation) 了解所有接口 / Check the API Documentation for all endpoints
- 🔭 了解 [DTS 预测模型](./README_EN.md#-bloom-forecasting-model) / Learn about the DTS Forecasting Model
- 🛠 探索 [扩展指南](./README_EN.md#-extension-guide) 进行自定义 / Explore the Extension Guide for customization
---
*遇到问题？请提交 [GitHub Issue](https://github.com/kemomi/SakuraTime/issues)，我们很乐意帮忙！🌸*
*Having issues? Open a GitHub Issue — we're happy to help! 🌸*
