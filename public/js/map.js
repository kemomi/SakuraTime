// public/js/map.js 地理围栏通知（HTML5 Geolocation API）
class GeoNotifier {
    constructor(radius=500) {
      this.watchId = null;
      this.radius = radius; // 默认500米范围
    }
  
    startMonitoring(sakuraSpots) {
      this.watchId = navigator.geolocation.watchPosition(
        position => {
          const userPos = [position.coords.latitude, position.coords.longitude];
          sakuraSpots.forEach(spot => {
            const distance = this.calculateDistance(userPos, spot.coords);
            if (distance < this.radius) {
              this.showNotification(spot.name);
            }
          });
        },
        error => console.error(error),
        { enableHighAccuracy: true, timeout: 5000 }
      );
    }
  
    calculateDistance([lat1, lon1], [lat2, lon2]) {
      const R = 6371e3; // 地球半径(米)
      const φ1 = lat1 * Math.PI/180;
      const φ2 = lat2 * Math.PI/180;
      const Δφ = (lat2-lat1) * Math.PI/180;
      const Δλ = (lon2-lon1) * Math.PI/180;
      
      const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
                Math.cos(φ1) * Math.cos(φ2) *
                Math.sin(Δλ/2) * Math.sin(Δλ/2);
      return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    }
  
    showNotification(spotName) {
      if (!("Notification" in window)) return;
      
      if (Notification.permission === "granted") {
        new Notification(`🌸 ${spotName} 接近中！`, {
          icon: 'images/notification-icon.png'
        });
      }
    }
  }


// public/js/map.js 时空热力图生成 使用Leaflet插件呈现开花进程
L.heatLayer(spots.map(spot => [
    spot.lat, 
    spot.lng,
    spot.bloomLevel * 0.8 // 开花强度系数
  ]), {radius: 25}).addTo(map);