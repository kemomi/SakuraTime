
// public/js/geofence.js 优先实现地理定位通知系统
const notifier = new GeoNotifier(500); // 500米触发范围
navigator.geolocation.getCurrentPosition(() => {
  notifier.startMonitoring(loadedSpots); // 加载的景点数据
});