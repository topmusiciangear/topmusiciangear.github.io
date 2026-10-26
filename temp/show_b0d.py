import subprocess, json
rev='b0d477428a'
raw=subprocess.check_output(['git','show',f'{rev}:data/products.json'])
text=raw.decode('utf-16') if raw[:2]==b'\xff\xfe' else raw.decode('utf-8-sig')
data=json.loads(text)
ids=[62,105,117,124,154,180,203,207,215,222,244,275,300,347,534,684,1042]
for pid in ids:
    p=[x for x in data if x['id']==pid]
    if not p: continue
    p=p[0]
    print('ID',pid,p['title'])
    print('EN:',repr(p.get('desc')))
    print('ES:',repr(p.get('desc_es')))
    print()