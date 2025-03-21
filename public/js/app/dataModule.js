/*
 * @Author: kemomi zjm18702566651@163.com
 * @Date: 2025-03-21 12:19:28
 * @LastEditors: kemomi zjm18702566651@163.com
 * @LastEditTime: 2025-03-21 12:31:09
 * @FilePath: \SakuraTime\public\js\app\dataModule.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 数据加载与过滤
export async function loadData() {
    try {
        const response = await fetch('/api/flowerData.php?type=sakura');
        const data = await response.json();
        
        // 添加地理编码（示例数据）
        return data.map(item => ({
            ...item,
            lat: parseFloat(item.coordinates.split(',')[0]),
            lng: parseFloat(item.coordinates.split(',')[1])
        }));
    } catch (error) {
        console.error('数据加载失败:', error);
        return [];
    }
}

// 日期过滤器
export function filterByDate(data, date) {
    // 实现日期范围匹配逻辑
    return data.filter(item => 
        new Date(item.start_date) <= date && 
        new Date(item.end_date) >= date
    );
}