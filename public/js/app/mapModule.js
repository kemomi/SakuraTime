/*
 * @Author: kemomi zjm18702566651@163.com
 * @Date: 2025-03-21 12:19:20
 * @LastEditors: kemomi zjm18702566651@163.com
 * @LastEditTime: 2025-03-21 12:31:00
 * @FilePath: \SakuraTime\public\js\app\mapModule.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 地图初始化与交互逻辑
export function initMap(containerId) {
    const map = L.map(containerId, {
        center: [35.8617, 104.1954],
        zoom: 4,
        gestureHandling: true
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    // 响应式调整
    window.addEventListener('resize', () => map.invalidateSize());
    return map;
}

// 动态更新标记点
export function updateMapMarkers(data) {
    data.forEach(flower => {
        L.marker([flower.lat, flower.lng])
            .bindPopup(`
                <h3>${flower.location}</h3>
                <p>预计花期：${flower.period}</p>
                <button class="btn-favorite" data-id="${flower.id}">收藏</button>
            `)
            .addTo(map);
    });
}