'''
Author: kemomi zjm18702566651@163.com
Date: 2025-03-21 11:06:26
LastEditors: kemomi zjm18702566651@163.com
LastEditTime: 2025-03-21 11:06:33
FilePath: \SakuraTime\python\Vision.py
Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
'''
# 图像识别（Google Cloud Vision API）
# 使用Google Cloud Vision API进行图像识别，判断照片是否包含樱花
# 参考莫纳什大学研究方案，使用Google Cloud Vision API进行图像识别
from google.cloud import vision

client = vision.ImageAnnotatorClient()

def is_sakura_image(url):
    image = vision.Image(source=vision.ImageSource(image_uri=url))
    response = client.label_detection(image=image)
    labels = [label.description.lower() for label in response.label_annotations]
    return 'cherry blossom' in labels and 'maple' not in labels