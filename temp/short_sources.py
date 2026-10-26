import json
ids=[175,198,199,237,255,291,312,427,428,453,456,458,460,467,472,480,489,527,557,560,1052,1053]
d={p['id']:p for p in json.load(open('temp/products_full_original.json',encoding='utf-8'))}
cur={p['id']:p for p in json.load(open('data/products.json',encoding='utf-8'))}
out=[]
for i in ids:
    p=d.get(i) or cur[i]
    out.append(f"ID {i} {p.get('title')}\nEN: {p.get('desc')}\nES: {p.get('desc_es')}\n")
open('temp/short_sources.txt','w',encoding='utf-8').write('\n'.join(out))
print('done')
