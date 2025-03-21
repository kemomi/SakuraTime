#使用Flickr API获取樱花图片元数据
# server/data_crawler.py
import flickrapi
from datetime import datetime

api_key = 'your_api_key_here'
api_secret = 'your_api_secret_here'

flickr = flickrapi.FlickrAPI(api_key, api_secret)
photos = flickr.photos.search(
    text='cherry blossom',
    bbox='129.173,31.186,145.859,46.178',  # 日本全境坐标
    min_taken_date=datetime(2008,1,1),
    max_taken_date=datetime(2024,12,31),
    extras='geo,date_taken,url_c'
)