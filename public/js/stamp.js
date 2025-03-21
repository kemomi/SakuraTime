/*
 * @Author: kemomi zjm18702566651@163.com
 * @Date: 2025-03-21 10:46:43
 * @LastEditors: kemomi zjm18702566651@163.com
 * @LastEditTime: 2025-03-21 11:32:48
 * @FilePath: \SakuraTime\public\js\stamp.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// public/js/stamp.js 签到图章系统（IndexedDB + Canvas）
class StampSystem {
    constructor(dbName = 'sakura-stamps') {
      this.db = null;
      this.initializeDB(dbName);
    }
  
    initializeDB(name) {
      const request = indexedDB.open(name, 1);
      
      request.onupgradeneeded = e => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains('stamps')) {
          db.createObjectStore('stamps', { keyPath: 'id' });
        }
      };
  
      request.onsuccess = e => this.db = e.target.result;
    }
  
    async addStamp(spotId) {
      const stamp = {
        id: spotId,
        date: new Date().toISOString(),
        coordinates: await this.getCurrentPosition()
      };
  
      const tx = this.db.transaction('stamps', 'readwrite');
      tx.objectStore('stamps').add(stamp);
      return tx.complete;
    }
  
    getCurrentPosition() {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          pos => resolve([pos.coords.latitude, pos.coords.longitude]),
          reject
        );
      });
    }
  
    generateStampCanvas(spotName) {
      const canvas = document.createElement('canvas');
      canvas.width = 200;
      canvas.height = 200;
      
      const ctx = canvas.getContext('2d');
      // 绘制图章底纹
      ctx.beginPath();
      ctx.arc(100, 100, 95, 0, Math.PI * 2);
      ctx.fillStyle = '#fff3f8';
      ctx.fill();
      
      // 添加文字
      ctx.font = '24px Microsoft YaHei';
      ctx.fillStyle = '#e60073';
      ctx.textAlign = 'center';
      ctx.fillText(spotName, 100, 110);
      
      // 添加樱花图标
      const img = new Image();
      img.src = 'images/sakura-stamp.png';
      img.onload = () => ctx.drawImage(img, 70, 40, 60, 60);
      
      return canvas;
    }
  }

// 用户定位成功后调用签到接口public/js/stamp.js
stampSystem.addStamp(spotId).then(() => {
    const canvas = stampSystem.generateStampCanvas(spotName);
    document.getElementById('stamp-wall').appendChild(canvas);
  });
