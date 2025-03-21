'''
Author: kemomi zjm18702566651@163.com
Date: 2025-03-21 11:05:12
LastEditors: kemomi zjm18702566651@163.com
LastEditTime: 2025-03-21 13:12:31
FilePath: \SakuraTime\python\geopandas.py
Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
'''
# 空间数据处理（GeoPandas）
# 使用GeoPandas进行空间数据处理，筛选出日本行政区划内的照片数据

import geopandas as gpd
from shapely.geometry import Point

# 加载日本行政区划数据
japan = gpd.read_file('japan_prefectures.shp')

# 转换照片坐标为几何对象
geometry = [Point(float(p['longitude']), float(p['latitude'])) 
            for p in photos]
gdf = gpd.GeoDataFrame(photos, geometry=geometry)

# 空间交集筛选
valid_photos = gpd.sjoin(gdf, japan, op='within')