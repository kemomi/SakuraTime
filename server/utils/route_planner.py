'''
Author: kemomi zjm18702566651@163.com
Date: 2025-03-21 11:37:39
LastEditors: kemomi zjm18702566651@163.com
LastEditTime: 2025-03-21 14:44:26
FilePath: \SakuraTime\server\utils\route_planner.py
Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
'''
# server/utils/route_planner.py ​错峰路线规划算法
def optimize_route(spots, max_crowd=500, max_distance=10):
    return sorted(
        [s for s in spots if s.crowd < max_crowd],
        key=lambda x: x.distance
    )[:5]