import json
d=json.load(open('data/guides.json', encoding='utf-8'))
g=next(x for x in d if x['id']=='best-digital-pianos')
secs=g['sections']
for i,s in enumerate(secs):
    h=s.get('heading')
    print(f"{i}: {h} -> {s.get('products')}")
