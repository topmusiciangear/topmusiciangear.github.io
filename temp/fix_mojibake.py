import json
path='data/products.json'
data=json.load(open(path,encoding='utf-8'))
fixed=0
for pr in data:
    for field in ('desc','desc_es'):
        v=pr.get(field)
        if isinstance(v,str):
            try:
                nv=v.encode('cp437').decode('utf-8')
                if nv!=v:
                    pr[field]=nv
                    fixed+=1
            except Exception:
                pass
json.dump(data, open(path,'w',encoding='utf-8'), ensure_ascii=False, indent=2)
print('fixed fields:', fixed)