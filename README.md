
# 樱花开放预测系统
- 应用名称: SakuraTime 
- 描述: "用于樱花花期预测系统的图片数据采集"
- 网站URL: https://[kemomi.com](https://github.com/kemomi/SakuraTime) 

# 项目结构
sakuratime/
├── public/                  # 静态资源
│   ├── css/
│   │   └── style.css       # 自定义样式
│   ├── js/
│   │   ├── map.js          # 地图交互逻辑
│   │   └── chart.js        # 开花预测仪表盘
│   ├── images/             # 樱花图标/图章素材
│   └── index.html          # 主界面
├── server/                 # Node.js后端
│   ├── models/
│   │   ├── location.js     # 景点数据模型
│   │   └── user.js         # 用户签到模型
│   ├── routes/
│   │   └── api.js         # RESTful接口
│   └── app.js             # 服务入口
├── README.md              # 项目文档
└── package.json           # 依赖配置

## 功能特性
- 🌸 实时开花预测仪表盘（基于LSTM气象模型[1,4](@ref)）
- 📍 地理围栏通知（HTML5 Geolocation API）
- 🖍️ 数字图章签到系统（IndexedDB存储）
- 🗺️ Leaflet地图集成全国景点

## 技术栈
| 模块       | 技术方案                  |
|------------|---------------------------|
| 前端       | Leaflet + Chart.js        |
| 后端       | Node.js + Express         |
| 数据存储   | MongoDB（地理空间查询）    |
| 预测模型   | Python LSTM + 气象学模型[2,5](@ref) |


## 快速启动
```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 训练预测模型（需要Python环境）
python train_model.py
```

## 数据来源
- 气象厅历史开放数据
- 各都道府县樱花观测点数据

# 开发流程
## 一 ​数据准备阶段​(2d)
使用Python脚本爬取历史樱花开放数据 (SakuraTime\python\Sakura.py)
1. 官方气象数据源（SakuraTime\python\JMA.py）
2. ​社交媒体图片元数据（SakuraTime\python\flickr.py）
### 建立MongoDB地理空间索引
## 二 数据清洗关键步骤
1. ​空间过滤（SakuraTime\python\geopandas.py）
2. 时间序列处理（SakuraTime\python\pandas.py）
## 三 数据验证方案
1. ​计算机视觉验证，集成Google Cloud Vision API进行图像内容验证(python\Vision.py)
2. 人工抽样验证，构建验证数据集
(python\validation.py)
## 四、数据存储方案
1. 时序数据库设计（python\InfluxDB.py）
使用InfluxDB存储时空数据
## 五、自动化运维
1. ​Scrapy分布式爬虫（python\Scrapy.py）

# 系统初始化配置
1.环境准备

```bash
npm install express mongoose chart.js leaflet  # 安装核心依赖
python -m pip install pandas requests flickrapi  # 数据爬取工具
```

2.数据源配置（server\data_crawler.py）
使用Flickr API获取樱花图片元数据
# ​核心功能开发​（5d）
tip：请优先实现地理定位通知系统


## 1. 开花预测仪表盘
 操作流程：导入气象数据到MongoDB：
```bash
mongoimport --db sakura --collection forecasts --type json --file weather_data.json
```

### 前端调用预测API：
```javascript
// public/js/chart.js
```
#### 技术要点：
~使用三角移动平均算法处理时间序列数据
~集成Chart.js实现动态曲线图

## 2. 优先实现地理定位通知系统
### 地理围栏通知 配置方法：
```javascript
// public/js/geofence.js
```

#### 
结合错峰路线算法，当检测到周边景点拥挤时自动扩大监控半径
使用IndexedDB缓存景点坐标数据减少网络请求
开发预测模型接口（结合传统气象学模型和LSTM神经网络）

## 3. 签到系统
实现步骤：
1. 用户定位成功后调用签到接口：public\js\stamp.js

2. 图章数据存储结构（像素处理技术）：public\js\json

# ​测试优化阶段​
## 数据可视化增强
1. ​时空热力图生成
使用Leaflet插件呈现开花进程：public/js/map.js
#数据建模参考网页1的时空分析方法

2. ​移动端适配方案
在CSS中增加媒体查询：public/css/style.css 


# 部署与维护
1. ​持续数据更新 设置cron定时任务（每日02:00更新）：
```bash
0 2 * * * /usr/bin/python3 /app/server/data_crawler.py >> /var/log/sakura_crawler.log
```
2. ​性能优化

 使用WebP格式压缩图章图片（参考网页3的图片处理方法）
 对GeoJSON数据启用MongoDB 2dsphere索引：
```javascript
db.locations.createIndex({ coordinates: "2dsphere" })
```
# 扩展功能开发
1. ​错峰游览建议
  集成网页2的路线规划算法：（server/utils/route_planner.py）

2. ​AR赏花导航
 基于Three.js的实现框架：（public/js/ar.js）


# 快速启动命令
```bash
npm run dev  # 启动开发服务器
python server/data_crawler.py  # 手动执行数据爬取
mongo < init_db.js  # 初始化数据库结构
```
## 优化地图渲染性能（WebGL加速）
该方案结合了地理空间计算、时序数据预测和渐进式Web应用技术，能够满足樱花观赏的全周期管理需求。开发过程中请注意处理好用户隐私数据（地理位置信息）的存储和传输安全。
完整代码与配置示例可参考GitHub仓库（https://github.com/kemomi/SakuraTime）。请在正式环境中配置Nginx反向代理和Redis缓存以提升性能。

# 问题与诊断
## 核心问题

 ​未闭合的引号/括号：JSON 要求所有字符串必须用双引号包裹
 ​注释符号残留：JSON 标准不支持 // 或 /* */ 注释
 ​尾随逗号：最后一个属性后出现逗号（如 "dependencies": { },）
 ​特殊字符干扰：文件可能包含隐藏的 BOM 头或控制字符

1. 验证 JSON 语法完整性
 ```bash
 npx jsonlint package.json --in-place
 ```
2. 检查常见语法陷阱
错误示例：
 ```json
 {'dependencies': {}}  // 单引号非法
```
修正为：
 ```json
 { "dependencies": {} }
```

删除注释内容：
```json
 { 
  // 这是非法注释
  "name": "app"
 }
```
 修正：完全删除注释行

3.  文件编码修正
 通过 Notepad++ 执行：

 菜单栏 → 编码 → 转为 `UTF-8` 无 BOM 格式
 保存后重新运行 `npm install`

4. 应急修复流程
 ### 备份原文件
 ```
 cp package.json package.json.bak
 ```
 ### 重建合法 JSON（需手动输入必要字段）
 ```
 echo {} > package.json
 npm init -y  # 生成最小合法结构
 ```
 ### 逐步恢复原内容（分段测试）
 ```
 nano package.json  # 每次添加2-3个字段后保存测试
 ```

5. NameError: name 'api_key' is not defined
 错误表明代码中未正确初始化 api_key 和 api_secret 变量。根据 Webpage 3 和 Webpage 6 的示例代码，正确的实现应通过配置文件引入密钥。
## 解决方案
新建 config.py 文件存储密钥（保护敏感信息）
 ```python
 # config.py
 API_KEY = "xxxxxxxxxxxxxxxx"  # 替换为你的 Flickr API Key
 API_SECRET = "xxxxxxxxxxxxxxxx"  # 替换为你的 Flickr API Secret
```
修改数据爬取脚本
 在 data_crawler.py 中导入配置：
 ```PYTHON
 from flickrapi import FlickrAPI
 import config  # 导入配置文件

 # 正确初始化 FlickrAPI [3,6](@ref)
 flickr = FlickrAPI(config.API_KEY, config.API_SECRET)
 ```
## 文件结构验证
确保项目目录结构符合以下要求:
SakuraTime/
├── server/
│   ├── data_crawler.py
│   └── config.py  # 与脚本同级目录
...

# 扩展建议
​环境变量替代方案​（增强安全性）：
 ```python
 import os
 flickr = FlickrAPI(os.environ["FLICKR_KEY"], os.environ["FLICKR_SECRET"])
```
​错误处理优化：
 ```python
 try:
    photos = flickr.walk(text="cherry blossom", extras="url_c")
 except flickrapi.FlickrError as e:
    print(f"API调用失败: {e}")

 ```

## 申请 Flickr API Key 和 Secret 的完整流程
一、申请步骤（非商业用途）
1. ​访问开发者门户
打开  `Flickr ` 应用创建页面，使用  Flickr  账号登录（无账号需先注册）

2. ​选择应用类型
点击  ```​Request an API Key ``` → 选择  `​Non-commercial use `​（非商业用途）

3. ​填写应用信息

 ```markdown
- 应用名称: SakuraTime (建议与项目相关)
- 描述: "用于樱花花期预测系统的图片数据采集"
- 网站URL:  (可填写临时地址)
- 权限: 勾选 "Read" 基础权限
 ```
4. ​提交审核
勾选用户协议 → 点击  ```​Submit ```​（审核通常即时通过）

二、获取凭证
成功后会显示：

 ```json
 API Key: xxxxxxxxxxxxxxxx
 Secret: xxxxxxxxxxxxxxxx
 ```
 请立即保存至安全位置，后续可在密钥管理页面查看

三、代码集成示例
Python 调用方式
 ```python
 import flickrapi
 # 从环境变量读取（推荐安全方式）
 api_key = os.environ.get("FLICKR_KEY")  
 api_secret = os.environ.get("FLICKR_SECRET")
 # 初始化API客户端
 flickr = flickrapi.FlickrAPI(api_key, api_secret, format='parsed-json')

 ```

四、安全注意事项
1. ​密钥保护
禁止将密钥明文存储在代码仓库，建议使用：

.env 文件（添加到 .gitignore）
 服务器环境变量
 AWS/Azure 密钥管理服务
 
2. ​使用限制

 免费版每日 3,600 次 API 调用限制
 禁止用于商业数据分析（需升级至付费计划）

五、常见问题排查
 |​现象	| ​解决方案|
 |------------|---------------------------|
 |密钥无效 |	检查密钥字符完整性（需32位HEX）|
 |403权限错误	| 确认申请时勾选了正确权限范围|
 |调用频率超限	 | 添加 time.sleep(1) 延迟请求|
注：商业用途需额外提交企业资质文件，审核周期约3-5个工作日 

