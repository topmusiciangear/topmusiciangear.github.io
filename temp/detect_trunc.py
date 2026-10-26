import json, re
cur={p['id']:p for p in json.load(open('data/products.json',encoding='utf-8'))}
before={p['id']:p for p in json.load(open('temp/products_before.json',encoding='utf-8'))}
rows=[]
for pid,p in cur.items():
    o=before.get(pid,{})
    for f in ['desc','desc_es']:
        c=(p.get(f) or '').strip()
        b=(o.get(f) or '').strip()
        if not c or not b: continue
        c_core=c[:-1] if c.endswith('.') else c
        b_core=b
        # if current is a prefix of original (ignoring final period)
        if b_core.lower().startswith(c_core.lower()) and len(c_core)<len(b_core)-1:
            rows.append((pid,f,len(c),len(b),c,b))
with open('temp/truncations.txt','w',encoding='utf-8') as f:
    for r in rows:
        f.write(f"{r[0]} {r[1]} cur={r[2]} orig={r[3]}\nCUR: {r[4]}\nORIG: {r[5]}\n\n")
print('truncated prefixes:',len(rows))