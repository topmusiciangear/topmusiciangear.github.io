import json

d = {p['id']: p for p in json.load(open('data/products.json', encoding='utf-8'))}
allc = json.load(open('temp/v6_all.json', encoding='utf-8'))
weak = json.load(open('temp/v6_weak.json', encoding='utf-8'))

# comma-cut cards are those <=46 whose output is not a prefix of the source
print('=== COMMA CUT SAMPLES ===')
n = 0
for w, pid, f, title, c in allc:
    if w > 46 or n >= 12:
        continue
    src = d[pid][f]
    if c and not src.startswith(c.rstrip('.')):
        print('---', pid, f, w, title)
        print('OUT:', c)
        print()
        n += 1

print('=== SHORT SOURCES ===')
for pid, f in ((557, 'desc_es'), (488, 'desc_es'), (330, 'desc_es'), (470, 'desc'), (551, 'desc'), (666, 'desc_es')):
    t = d[pid][f]
    sents = t.split('. ')
    print('---', pid, f, 'total', len(t.split()))
    print('SENT LENS:', [len(s.split()) for s in sents])
    print(t)
    print()
