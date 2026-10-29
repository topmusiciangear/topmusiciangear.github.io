import json
data=json.load(open('data/products.json',encoding='utf-8'))
p=next(x for x in data if x['id']==379)
s=p['desc_es']
for i,ch in enumerate(s):
    if ord(ch)>127:
        print(i,ch,ord(ch))
        if i>200: break
