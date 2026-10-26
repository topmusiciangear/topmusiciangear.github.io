import json

d = {p['id']: p for p in json.load(open('data/products.json', encoding='utf-8'))}
short = json.load(open('temp/v3_short.json', encoding='utf-8'))
for w, pid, f, title, c in short:
    t = d[pid][f]
    print('===', pid, f, 'out', w, 'src', len(t.split()), '|', title)
    print('SRC:', t)
    print('OUT:', c)
    print()
