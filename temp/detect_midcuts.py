import json, re
cur={p['id']:p for p in json.load(open('data/products.json',encoding='utf-8'))}
before={p['id']:p for p in json.load(open('temp/products_before.json',encoding='utf-8'))}
def first_sentence(s):
    s=s.strip()
    m=re.search(r'[.!?](?:\s|$)', s)
    if m: return s[:m.end()].strip()
    return s
rows=[]
for pid,p in cur.items():
    o=before.get(pid,{})
    for f in ['desc','desc_es']:
        c=(p.get(f) or '').strip()
        b=(o.get(f) or '').strip()
        if not c or not b: continue
        fs=first_sentence(b)
        # normalize final period for compare
        cc=c[:-1] if c.endswith('.') else c
        ff=fs[:-1] if fs.endswith('.') else fs
        if fs and cc.lower()!=ff.lower() and ff.lower().startswith(cc.lower()):
            rows.append((pid,f,len(c),len(fs),c,fs))
with open('temp/midcuts.txt','w',encoding='utf-8') as f:
    for r in rows:
        f.write(f"{r[0]} {r[1]} cur={r[2]} first={r[3]}\nCUR: {r[4]}\nFIRST: {r[5]}\n\n")
print('mid-sentence cuts:',len(rows))