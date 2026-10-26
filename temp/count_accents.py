import json
data=json.load(open('data/products.json',encoding='utf-8'))
count=0
out=[]
for pr in data:
    for f in ['desc_es','pros_es','cons_es','title_es']:
        v=pr.get(f)
        if isinstance(v,list):
            for item in v:
                if 'é' in item or 'í' in item or 'ó' in item or 'á' in item or 'ú' in item or 'ñ' in item:
                    count+=1
        elif isinstance(v,str):
            if 'é' in v or 'í' in v or 'ó' in v or 'á' in v or 'ú' in v or 'ñ' in v:
                count+=1
open('temp/accent_count.txt','w',encoding='utf-8').write(str(count))