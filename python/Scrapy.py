'''
Author: kemomi zjm18702566651@163.com
Date: 2025-03-21 11:07:45
LastEditors: kemomi zjm18702566651@163.com
LastEditTime: 2025-03-21 14:02:18
FilePath: \SakuraTime\python\​Scrapy.py
Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
'''
# ​Scrapy分布式爬虫 构建可扩展的爬虫系统：
# 使用Scrapy框架构建一个分布式爬虫系统，爬取多个网站的樱花数据，存储到数据库中
import scrapy
from scrapy.crawler import CrawlerProcess

class SakuraSpider(scrapy.Spider):
    name = 'sakura_phenology'
    
    def start_requests(self):
        urls = [
            'https://www.tenki.jp/sakura/expectation/',
            'https://www.japan-guide.com/sakura/'
        ]
        for url in urls:
            yield scrapy.Request(url=url, callback=self.parse)

    def parse(self, response):
        # 解析页面逻辑
        pass

# 启动爬虫
process = CrawlerProcess(settings={
    'ITEM_PIPELINES': {
        'myproject.pipelines.SakuraDataPipeline': 300
    }
})
process.crawl(SakuraSpider)
process.start()