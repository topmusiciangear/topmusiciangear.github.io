import json, re
data=json.load(open('data/products.json',encoding='utf-8'))
en_stop=set('a an the and or but for with of to in on at by from as is are was were be been being this that these those per than into over under between during without within'.split())
es_stop=set('a al con de del el en es la las lo los para por que se un una y o u su sus sin sobre entre hasta desde segun según durante mediante tras contra ni e'.split())
rows=[]
for pr in data:
    for field,lang,stop in [('desc','EN',en_stop),('desc_es','ES',es_stop)]:
        s=(pr.get(field) or '').strip()
        if not s: continue
        words=re.findall(r"[\wÁÉÍÓÚÜÑáéíóúüñ-]+", s)
        last=words[-1].lower() if words else ''
        if last in stop or s.endswith(',') or s.endswith(';') or s.endswith(':'):
            rows.append((pr['id'],field,last,s))
with open('temp/desc_susp.txt','w',encoding='utf-8') as f:
    for r in rows:
        f.write(f"{r[0]} {r[1]} last={r[2]!r}\n{r[3]}\n\n")
print('suspicious:',len(rows))