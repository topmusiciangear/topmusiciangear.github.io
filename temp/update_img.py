import json
with open('data/products.json', encoding='utf-8') as f:
    p=json.load(f)
for x in p:
    if x.get('id')==1055:
        x['img']='img/products/x1s.webp'
        break
with open('data/products.json','w',encoding='utf-8') as f:
    json.dump(p,f,indent=2)
print('updated')
