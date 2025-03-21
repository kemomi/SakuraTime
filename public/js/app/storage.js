/*
 * @Author: kemomi zjm18702566651@163.com
 * @Date: 2025-03-21 12:19:36
 * @LastEditors: kemomi zjm18702566651@163.com
 * @LastEditTime: 2025-03-21 12:31:17
 * @FilePath: \SakuraTime\public\js\app\storage.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 本地存储管理
export function setupStorage() {
    if (!localStorage.getItem('favorites')) {
        localStorage.setItem('favorites', JSON.stringify([]));
    }
}

export function toggleFavorite(flowerId) {
    const favorites = JSON.parse(localStorage.getItem('favorites'));
    const index = favorites.indexOf(flowerId);
    
    if (index === -1) {
        favorites.push(flowerId);
    } else {
        favorites.splice(index, 1);
    }
    
    localStorage.setItem('favorites', JSON.stringify(favorites));
    return favorites;
}