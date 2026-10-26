import json, re, collections

d = json.load(open('data/products.json', encoding='utf-8'))
bad_end, bad_moji, dbl, short = [], [], [], []
buckets = collections.Counter()
ends = re.compile(r'[.!?][\"\')\]]?$')
moji = re.compile('[\ufffd\u00c2\u00c3\u251c\u2502]')

for p in d:
    for f in ('desc', 'desc_es'):
        t = p.get(f) or ''
        if not t:
            continue
        w = len(t.split())
        buckets['<38' if w < 38 else '38-45' if w <= 45 else '46-54' if w <= 54 else '55+' if w <= 60 else '60+'] += 1
        if not ends.search(t):
            bad_end.append((p['id'], f, t[-40:]))
        if moji.search(t):
            bad_moji.append((p['id'], f, t[-40:]))
        if '  ' in t:
            dbl.append((p['id'], f))
        if w < 38:
            short.append((w, p['id'], f, (p.get('title') or '')[:40]))

print('fields', sum(buckets.values()))
for k in ('<38', '38-45', '46-54', '55+', '60+'):
    print(k, buckets[k])
print('bad_end', len(bad_end))
for x in bad_end[:10]:
    print(' ', x)
print('mojibake', len(bad_moji))
for x in bad_moji[:10]:
    print(' ', x)
print('double space', len(dbl), dbl[:5])
short.sort()
print('shortest 15:')
for x in short[:15]:
    print(' ', x)
