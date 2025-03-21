'''
Author: kemomi zjm18702566651@163.com
Date: 2025-03-21 10:56:55
LastEditors: kemomi zjm18702566651@163.com
LastEditTime: 2025-03-21 11:02:41
FilePath: \SakuraTime\python\sakura.py
Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
'''
# 官方气象数据源 数据爬取（requests + BeautifulSoup）
# 使用requests库爬取日本气象厅（JMA）历史数据，重点获取以下字段
# 东京地区历史数据
# 平均开花日
# 平均全开日
import requests
from bs4 import BeautifulSoup

url = "https://www.jma.go.jp/jma/en/History/2023/sakura.html"
response = requests.get(url, headers={'User-Agent': 'Mozilla/5.0'})
soup = BeautifulSoup(response.text, 'lxml')

# 解析表格数据
data_table = soup.select('table.history-data')[0]
rows = [[td.text.strip() for td in tr.find_all('td')] 
        for tr in data_table.find_all('tr')]