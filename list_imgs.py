import json
d=json.load(open('data/products.json',encoding='utf-8'))
ids={1069,379,1066,1068,1071,1070}
for p in d:
    if p.get('id') in ids:
        print(p['id'], p['img'])