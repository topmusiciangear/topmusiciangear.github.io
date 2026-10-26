import json, re
d=json.load(open('temp/products_before.json',encoding='utf-8'))
STOP=set('''a an the and or but for with of to in on at by from as is are was were be been being this that these those per than into over under between during without within
el la los las un una unos unas de del al a con por para en y o u que se su sus sin sobre entre hasta desde segun según durante mediante tras contra ni e'''.split())
bad=[]; noend=[]; short=[]
for p in d:
    for f in ['desc','desc_es']:
        s=(p.get(f) or '').strip()
        if not s: continue
        words=re.findall(r"[\wÁÉÍÓÚÜÑáéíóúüñ'’.-]+", s)
        last=words[-1].strip('.,;:—–-').lower() if words else ''
        if last in STOP or last.isdigit() or len(last)==1:
            bad.append((p['id'],f,last,s))
        if not re.search(r'[.!?]$',s):
            noend.append((p['id'],f,s))
        if len(s)<40:
            short.append((p['id'],f,len(s),s))
with open('temp/before_audit.txt','w',encoding='utf-8') as f:
    f.write('BAD ENDINGS\n')
    for x in bad: f.write(f"{x[0]} {x[1]} last={x[2]!r}\n{x[3]}\n\n")
    f.write('NO PUNCT\n')
    for x in noend: f.write(f"{x[0]} {x[1]}\n{x[2]}\n\n")
    f.write('SHORT\n')
    for x in short: f.write(f"{x[0]} {x[1]} {x[2]}\n{x[3]}\n\n")
print('bad',len(bad),'noend',len(noend),'short',len(short))