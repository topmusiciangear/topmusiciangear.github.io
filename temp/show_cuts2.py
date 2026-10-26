import json, random

d = {p['id']: p for p in json.load(open('data/products.json', encoding='utf-8'))}
allc = json.load(open('temp/v8_all.json', encoding='utf-8'))

cut = []
for w, pid, f, title, c in allc:
    src = d[pid][f]
    body = c[:-1] if c.endswith('.') else c
    if not src.startswith(body):
        continue
    nxt = src[len(body):len(body) + 3]
    if not (nxt == '' or nxt.startswith('.') or nxt.startswith('!') or nxt.startswith('?')):
        cut.append((w, pid, f, title, c, src))

print('cut cards', len(cut))
random.seed(7)
for w, pid, f, title, c, src in random.sample(cut, min(15, len(cut))):
    print('---', w, pid, f, title)
    print('OUT:', c)
    print()
