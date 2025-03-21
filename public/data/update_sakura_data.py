'''
Author: kemomi zjm18702566651@163.com
Date: 2025-03-21 12:36:31
LastEditors: kemomi zjm18702566651@163.com
LastEditTime: 2025-03-21 12:36:38
FilePath: \SakuraTime\public\data\update_sakura_data.py
Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
'''
# 使用Python脚本动态更新数据（示例）
import requests
from datetime import datetime

def update_sakura_data():
    api_url = "https://api.flower-season.com/v3/sakura"
    params = {
        "key": "YOUR_API_KEY",
        "model": "multi-source"
    }
    response = requests.get(api_url, params=params)
    
    if response.status_code == 200:
        with open('sakura.json', 'w', encoding='utf-8') as f:
            data = response.json()
            data['metadata']['lastUpdate'] = datetime.now().isoformat()
            json.dump(data, f, ensure_ascii=False, indent=2)