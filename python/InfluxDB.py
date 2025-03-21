'''
Author: kemomi zjm18702566651@163.com
Date: 2025-03-21 11:07:20
LastEditors: kemomi zjm18702566651@163.com
LastEditTime: 2025-03-21 11:07:29
FilePath: \SakuraTime\python\InfluxDB.py
Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
'''
# 时序数据库（InfluxDB）
# 使用InfluxDB存储樱花开花数据，记录每日的开花状态
# 参考研究中的InfluxDB数据库设计
# 安装InfluxDB Python库：pip install influxdb

from influxdb import InfluxDBClient

client = InfluxDBClient(host='localhost', port=8086)
client.create_database('sakura_phenology')

json_body = [{
    "measurement": "bloom_status",
    "tags": {"prefecture": "Tokyo"},
    "time": "2023-03-25T00:00:00Z",
    "fields": {
        "flowering_rate": 0.85,
        "full_bloom": True
    }
}]
client.write_points(json_body)