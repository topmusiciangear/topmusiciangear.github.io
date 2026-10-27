import json
data=json.load(open('data/products.json',encoding='utf-8'))
for p in data:
    if p.get('id')==1055:
        print(json.dumps(p,ensure_ascii=False,indent=2))
        break
