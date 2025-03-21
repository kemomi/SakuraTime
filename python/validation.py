'''
Author: kemomi zjm18702566651@163.com
Date: 2025-03-21 11:06:47
LastEditors: kemomi zjm18702566651@163.com
LastEditTime: 2025-03-21 11:06:54
FilePath: \SakuraTime\python\random.py
Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
'''
#人工抽样验证构建验证数据集
# 随机抽样（random）
import random

sample_size = int(len(photos) * 0.05)  # 5%抽样率
validation_set = random.sample(photos, sample_size)

# 导出验证用缩略图
for idx, photo in enumerate(validation_set):
    img_data = requests.get(photo['url_c']).content
    with open(f'validate/{idx}.jpg', 'wb') as f:
        f.write(img_data)