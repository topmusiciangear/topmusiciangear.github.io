import subprocess, json, re
rev='079b5d2308'
raw=subprocess.check_output(['git','show',f'{rev}:data/products.json'])
text=raw.decode('utf-16') if raw[:2]==b'\xff\xfe' else raw.decode('utf-8-sig')
d=json.loads(text)
STOP=set('''a an the and or but for with of to in on at by from as is are was were be been being this that these those per than into over under between during without within
el la los las un una de del al a con por para en y o u que se su sus sin sobre entre hasta desde segun según durante mediante tras contra ni e'''.split())
bad=[]; noend=[]
for p in d:
    for f in ['desc','desc_es']:
        s=(p.get(f) or '').strip()
        if not s: continue
        words=re.findall(r"[\wÁÉÍÓÚÜÑáéíóúüñ'’.-]+", s)
        last=words[-1].strip('.,;:—–-').lower() if words else ''
        if last in STOP or last.isdigit() or len(last)==1:
            bad.append((p['id'],f,last,s))
        if not re.search(r'[.!?]$',s): noend.append((p['id'],f,s))
with open('temp/audit_079b.txt','w',encoding='utf-8') as f:
    f.write('BAD\n')
    for x in bad: f.write(f"{x[0]} {x[1]} last={x[2]!r}\n{x[3]}\n\n")
    f.write('NOEND\n')
    for x in noend: f.write(f"{x[0]} {x[1]}\n{x[2]}\n\n")
print('bad',len(bad),'noend',len(noend))