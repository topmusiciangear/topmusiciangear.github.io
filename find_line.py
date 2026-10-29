import json
data=json.load(open('data/products.json',encoding='utf-8'))
with open('data/products.json','r',encoding='utf-8') as f:
    text=f.read()
# find id 379
import re
m=re.search(r'"id": 379', text)
if m:
    start=max(0,m.start()-200)
    print(text[start:m.start()+200])
