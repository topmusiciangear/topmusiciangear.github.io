import json
cur={p['id']:p for p in json.load(open('data/products.json',encoding='utf-8'))}
full={p['id']:p for p in json.load(open('temp/products_full_original.json',encoding='utf-8'))}
b0d={p['id']:p for p in json.load(open('temp/products_before.json',encoding='utf-8'))}
print('cur',len(cur),'full',len(full),'before',len(b0d))
missing=[i for i in cur if i not in full]
print('missing from full:',missing)
for i in missing:
    p=cur[i]
    print('ID',i,p.get('title'))
    print(' desc:',repr(p.get('desc')))
    print(' desc_es:',repr(p.get('desc_es')))
    print(' before desc:',repr((b0d.get(i) or {}).get('desc')))
    print(' before desc_es:',repr((b0d.get(i) or {}).get('desc_es')))
# mojibake double-encoding scan in full
bad=[]
for i,p in full.items():
    for f in ['desc','desc_es']:
        s=p.get(f) or ''
        for seq in ['Ã','Â','â€','\ufffd']:
            if seq in s:
                bad.append((i,f,seq,s[:120]))
                break
print('suspicious double-encoded in full:',len(bad))
for x in bad[:20]: print(x)
# also cur
bad2=[]
for i,p in cur.items():
    for f in ['desc','desc_es']:
        s=p.get(f) or ''
        for seq in ['Ã','Â','â€','\ufffd']:
            if seq in s:
                bad2.append((i,f,seq,s[:120]))
                break
print('suspicious in cur:',len(bad2))
for x in bad2[:20]: print(x)
