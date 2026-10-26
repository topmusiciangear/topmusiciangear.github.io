import subprocess, json, re
rev='b0d477428a'
raw=subprocess.check_output(['git','show',f'{rev}:data/products.json'])
text=raw.decode('utf-16') if raw[:2]==b'\xff\xfe' else raw.decode('utf-8-sig')
d=json.loads(text)
STOP=set('''a an the and or but for with of to in on at by from as is are was were be been being this that these those per than into over under between during without within
el la los las un una de del al a con por para en y o u que se su sus sin sobre entre hasta desde segun según durante mediante tras contra ni e'''.split())
rows=[]
for p in d:
    for f in ['desc','desc_es']:
        s=(p.get(f) or '').strip()
        if not s: continue
        words=re.findall(r"[\wÁÉÍÓÚÜÑáéíóúüñ'’.-]+", s)
        last=words[-1].strip('.,;:—–-').lower() if words else ''
        if last in STOP or last.isdigit() or len(last)==1:
            rows.append((p['id'],p['title'],f,last,s))
with open('temp/b0d_bad.txt','w',encoding='utf-8') as f:
    for r in rows:
        f.write(f"ID {r[0]} {r[1]} [{r[2]}] last={r[3]!r}\n{r[4]}\n\n")
print('count',len(rows))