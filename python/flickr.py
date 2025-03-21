'''
Author: kemomi zjm18702566651@163.com
Date: 2025-03-21 11:04:07
LastEditors: kemomi zjm18702566651@163.com
LastEditTime: 2025-03-21 13:09:02
FilePath: \SakuraTime\python\flickr.py
Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
'''
# 社交媒体图片元数据获取（Flickr API）
# 参考莫纳什大学研究方案，使用Flickr API获取地理标记图片
# 使用Python脚本动态更新数据（示例）

import flickrapi

# 初始化API（需申请key）
flickr = flickrapi.FlickrAPI(api_key, api_secret, format='parsed-json')

# 设置搜索参数
params = {
    'text': 'cherry blossom',
    'bbox': '129.173,31.186,145.859,46.178',  # 日本全境坐标范围
    'min_upload_date': '2008-01-01',
    'max_upload_date': '2018-12-31',
    'extras': 'geo,date_upload,url_c'
}

# 分页获取数据
photos = flickr.photos.search(**params)