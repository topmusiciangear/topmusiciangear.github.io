import json, re, sys

d = json.load(open('data/products.json', encoding='utf-8'))
for p in d:
    if 'P-225' in p['title']:
        for f in ('desc', 'desc_es'):
            t = p.get(f) or ''
            print(p['id'], p['title'], f, 'words=', len(t.split()), 'chars=', len(t))
            print(t)
            print()

# sentence/word stats over all descriptions
def sents(t):
    return [s for s in re.split(r'(?<=[.!?])\s+', t.strip()) if s]
ws = []
for p in d:
    for f in ('desc', 'desc_es'):
        t = ' '.join((p.get(f) or '').split())
        if t:
            ws.append(len(t.split()))
ws.sort()
print('word counts: n', len(ws), 'min', ws[0], 'p10', ws[int(len(ws) * .1)], 'median', ws[len(ws) // 2], 'p90', ws[int(len(ws) * .9)], 'max', ws[-1])
print('<=47 words:', sum(1 for x in ws if x <= 47), '>47:', sum(1 for x in ws if x > 47))
