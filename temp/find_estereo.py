import json
data=json.load(open('data/products.json',encoding='utf-8'))
out=[]
for pr in data:
    s=pr.get('desc_es') or ''
    if 'estéreo' in s or 'estereo' in s.lower():
        out.append(f"{pr['id']}: {s}")
open('temp/estereo.txt','w',encoding='utf-8').write('\n'.join(out[:10]))