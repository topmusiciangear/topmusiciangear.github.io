import json
data=json.load(open('data/products.json',encoding='utf-8'))
out=[]
for pr in data:
    if 'legendario monitor' in (pr.get('desc_es') or ''):
        out.append(f"{pr['id']} {pr['title']}")
        out.append(repr(pr['desc_es']))
open('temp/legend_out.txt','w',encoding='utf-8').write('\n'.join(out))