import json
d=json.load(open('temp/products_original_full.json',encoding='utf-8'))
box=0; repl=0
for p in d:
    for f in ['desc','desc_es']:
        s=p.get(f) or ''
        if any('\u2500'<=c<='\u257f' for c in s): box+=1
        if '\ufffd' in s: repl+=1
print('box',box,'repl',repl)
# show one ES
p=[x for x in d if x['id']==116][0]
print(repr(p['desc_es'][:200]))