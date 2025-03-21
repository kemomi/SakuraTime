/*
 * @Author: kemomi zjm18702566651@163.com
 * @Date: 2025-03-21 10:47:54
 * @LastEditors: kemomi zjm18702566651@163.com
 * @LastEditTime: 2025-03-21 10:48:28
 * @FilePath: \SakuraTime\server\routes\api.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// server/routes/api.js 后端API示例（Node.js + Express）
const express = require('express');
const router = express.Router();
const Location = require('../models/location');

// 获取景点预测数据
router.get('/forecast', async (req, res) => {
  try {
    const { lat, lng } = req.query;
    const locations = await Location.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(lng), parseFloat(lat)]
          },
          $maxDistance: 5000
        }
      }
    }).populate('bloomData');
    
    res.json(locations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 预测模型集成示例（Python子进程调用）
router.post('/predict', (req, res) => {
  const { temp, humidity, altitude } = req.body;
  const pythonProcess = spawn('python', ['bloom_model.py', temp, humidity, altitude]);
  
  let data = '';
  pythonProcess.stdout.on('data', chunk => data += chunk);
  pythonProcess.on('close', () => res.send(data));
});

module.exports = router;