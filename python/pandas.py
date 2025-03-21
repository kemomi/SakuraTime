'''
Author: kemomi zjm18702566651@163.com
Date: 2025-03-21 11:05:59
LastEditors: kemomi zjm18702566651@163.com
LastEditTime: 2025-03-21 11:06:07
FilePath: \SakuraTime\python\pandas.py
Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
'''
# 时间序列数据处理（Pandas）
# 使用Pandas进行时间序列数据处理，对每日照片数量进行权重平滑处理，参考研究中的7日三角移动平均法

import pandas as pd

# 生成日级时间序列
ts = pd.date_range(start='2008-01-01', end='2018-12-31', freq='D')
df = pd.DataFrame(index=ts, columns=['photo_count'])

# 应用权重平滑（网页1方法实现）
weights = [0.25, 0.5, 0.75, 1.0, 0.75, 0.5, 0.25]
smoothed = df.rolling(window=7, win_type='triang', 
                    center=True).sum(weights=weights)