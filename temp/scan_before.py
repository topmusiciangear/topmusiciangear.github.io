import json
d=json.load(open('temp/products_before.json',encoding='utf-8'))
box=0; repl=0
for p in d:
    for f in ['desc','desc_es']:
        s=p.get(f) or ''
        if any('\u2500'<=c<='\u257f' for c in s): box+=1
        if '\ufffd' in s: repl+=1
print('box fields',box,'replacement fields',repl)