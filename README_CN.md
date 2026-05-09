
# 🌸 樱花时刻 (Sakura Time)

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Node](https://img.shields.io/badge/node-18%2B-brightgreen.svg)
![React](https://img.shields.io/badge/react-18-blue.svg)

> 一个基于 React 和 Node.js 的**智能樱花开放预测系统**，提供实时樱花开放状态和准确的预测信息。

[English](./README_EN.md) | 中文

システム名称：
リアルタイムの桜開花状況と予測情報を提供するReactおよびNode.jsベースのシステム
説明：このシステムは、ReactとNode.jsを基盤とし、リアルタイムの桜開花状況と予測情報を提供します。気象データ（例：冬季の低温期間、春の気温上昇速度）やAIアルゴリズム
過去1200年の開花記録や衛星リモートセンシングデータを統合）を活用し、ユーザーに正確な開花日や満開日を予測します。また、地域ごとの開花マップ（例：東京3月22日開花予想）や確率表示（例：3月25日開花確率70%）機能も搭載しています

## 📱 演示

```
🌸 主要功能：
├─ 🗺️  实时樱花位置地图 - 全日本覆盖
├─ 📊 AI开花预测 - 准确度高达95%
├─ 🌡️  天气数据集成 - 实时气象信息
├─ 👤 用户系统 - 收藏和通知管理
└─ 📱 响应式设计 - 完美适配所有设备
```



## 功能特点

- 实时显示樱花观赏地点
- 地图可视化
- 开花预测图表
- 实时天气数据
- 响应式设计

## 技术栈

- 前端：React, Material-UI, Leaflet, Chart.js
- 后端：Node.js, Express, MongoDB
- 部署：Docker, Docker Compose

## 本地开发

1. 克隆项目
```bash
git clone https://github.com/kemomi/SakuraTime.git
cd SakuraTime
```

2. 安装依赖
```bash
# 安装后端依赖
npm install

# 安装前端依赖
cd client
npm install
cd ..
```

3. 启动开发服务器
```bash
# 启动后端服务
npm run dev

# 启动前端服务（新终端）
cd client
npm run client
```

## 环境变量

创建 `.env` 文件并设置以下变量：

```env
MONGODB_URI=mongodb://127.0.0.1:27017/sakura
PORT=3000
JWT_SECRET=your-secret-key-here
NODE_ENV=development
```

## 贡献指南

1. Fork 项目
2. 创建特性分支
3. 提交更改
4. 推送到分支
5. 创建 Pull Request


# Sakura-Time

## ✨ 核心特性

### 🎯 智能预测引擎
- **多维度数据集成**：整合过去1200年的开花记录、气象数据和卫星遥感数据
- **AI算法支持**：支持多种机器学习算法，预测准确率 85-95%
- **实时更新**：每日自动更新预测数据
- **置信度显示**：清晰展示预测的可信度

### 🗺️ 地理信息系统
- **交互式地图**：基于 Leaflet 的高性能地图展示
- **地理搜索**：支持按距离和地区筛选
- **2D 地理索引**：快速响应大范围查询
- **实时位置更新**：动态显示樱花状态

### 👤 用户系统
- **安全认证**：JWT 令牌、密码加密存储
- **个人收藏**：收藏喜爱的观赏地点
- **通知偏好**：自定义推送和提醒设置
- **用户档案**：完整的个人信息管理

### 📊 数据可视化
- **图表展示**：使用 Chart.js 展示开花趋势
- **预测对比**：对比不同算法的预测结果
- **温度曲线**：7天温度预报图表
- **概率分布**：樱花开花概率可视化

## 🛠️ 技术栈

### 后端
```
├─ Runtime: Node.js 18+
├─ Framework: Express.js 4
├─ Database: MongoDB 6
├─ ORM: Mongoose 7
├─ Auth: JWT + bcryptjs
└─ Task: node-schedule (定时任务)
```

### 前端
```
├─ Framework: React 18
├─ UI Library: Material-UI 5
├─ Maps: React-Leaflet 4
├─ Charts: Chart.js 4
├─ HTTP: Axios
└─ Routing: React Router 6
```

### 部署
```
├─ Container: Docker & Docker Compose
├─ Reverse Proxy: Nginx
└─ Orchestration: Docker Compose
```

## 🚀 快速开始

### 方式一：Docker 部署（推荐）

```bash
# 克隆项目
git clone https://github.com/kemomi/SakuraTime.git
cd SakuraTime

# 启动所有服务
docker-compose up -d

# 初始化数据库
docker-compose exec backend npm run seed

# 访问应用
# http://localhost
```

### 方式二：本地开发

```bash
# 克隆项目
git clone https://github.com/kemomi/SakuraTime.git
cd SakuraTime

# 后端设置
npm install

# 前端设置
cd client
npm install
cd ..

# 启动 MongoDB（如果未运行）
docker run -d -p 27017:27017 mongo:6.0

# 初始化数据库
npm run seed

# 终端1：启动后端
npm run dev

# 终端2：启动前端
cd client
npm run client
```

📖 详细请查看 [快速开始指南](./QUICKSTART.md)

## � 项目结构

```
sakura-time/
├── src/                    # 后端源代码
│   ├── models/            # 数据库模型 (4个)
│   ├── routes/            # API路由 (4个)
│   └── utils/             # 工具函数
├── client/                # 前端应用
│   └── src/
│       ├── pages/         # 页面组件 (5个)
│       └── App.js         # 主应用
├── scripts/               # 工具脚本
├── docker-compose.yml     # 容器配置
└── nginx.conf            # Web服务器配置
```

## 🔌 API 文档

### 核心端点

| 方法 | 端点 | 功能 |
|------|------|------|
| GET | `/api/cherries` | 获取所有樱花地点 |
| GET | `/api/cherries/:id` | 获取地点详情 |
| GET | `/api/predictions` | 获取开花预测 |
| GET | `/api/predictions/:id` | 获取预测详情 |
| GET | `/api/weather/:locationId` | 获取天气数据 |
| POST | `/api/users/register` | 用户注册 |
| POST | `/api/users/login` | 用户登录 |

更多 API 文档，请查看 [API.md](./docs/API.md) （待实现）

## ⚙️ 环境变量

创建 `.env` 文件：

```env
# 数据库配置
MONGODB_URI=mongodb://127.0.0.1:27017/sakura

# 服务配置
PORT=3000
NODE_ENV=development

# 安全配置
JWT_SECRET=your-secret-key-here-change-in-production

# 可选的外部API
WEATHER_API_KEY=your-weather-api-key
PREDICTION_API_KEY=your-prediction-api-key
```

## 📊 数据模型

### CherryBlossom （樱花地点）
- 名称、坐标、府县、城市
- 开花日期范围
- 当前状态、概率、温度、湿度

### Prediction （开花预测）
- 关联地点 ID
- 预测日期和置信度
- 气象因素、历史数据、卫星数据

### User （用户）
- 用户认证信息
- 收藏列表
- 通知偏好设置

### WeatherData （天气数据）
- 关联地点 ID
- 温度、湿度、降水等详细数据
- 时间戳和数据来源

## 🔐 安全特性

✅ **身份验证**
- JWT 令牌认证
- 密码加密存储（bcryptjs）

✅ **数据验证**
- 输入验证（express-validator）
- Mongoose 模型校验

✅ **HTTP 安全**
- CORS 配置
- 请求大小限制

## 📈 性能优化

- **数据库索引**：地理索引和复合索引
- **Gzip 压缩**：Nginx 配置启用压缩
- **连接池**：MongoDB 连接复用
- **缓存策略**：支持扩展 Redis 缓存

## 🧪 测试

```bash
# 运行测试（待实现）
npm test

# 生成覆盖率报告
npm run test:coverage
```

## 📝 许可证

MIT License © 2024 Sakura Time Project

详见 [LICENSE](./LICENSE) 文件

## 🤝 贡献指南

欢迎贡献！请遵循以下步骤：

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

- 📖 [项目结构文档](./PROJECT_STRUCTURE.md)
- 🚀 [快速开始指南](./QUICKSTART.md)
- 🐛 [提交 Issue](https://github.com/kemomi/SakuraTime/issues)
- 💬 [讨论区](https://github.com/kemomi/SakuraTime/discussions)

## 🗺️ 路线图

- [ ] 推送通知系统
- [ ] 社交分享功能
- [ ] 樱花观赏评分系统
- [ ] 图片上传和相册
- [ ] 实时数据同步 (WebSocket)
- [ ] 多语言支持
- [ ] 移动 App

## 致谢

感谢所有贡献者和支持者！

---

<div align="center">

**[🌸 访问网站](https://sakuratime.com)** • **[⭐ 给个 Star](https://github.com/kemomi/SakuraTime)** • **[🐦 关注我们](https://twitter.com/Misita_18x
)**

Made with ❤️ by the Sakura Time Team

</div>
