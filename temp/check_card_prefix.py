import json, glob, re, html

d = json.load(open('data/products.json', encoding='utf-8'))
texts = set()
for p in d:
    for f in ('desc', 'desc_es'):
        t = ' '.join((p.get(f) or '').split())
        if t:
            texts.add(t)

bad = []
maxlen = 0
n = 0
for f in glob.glob('guides/*.html'):
    s = open(f, encoding='utf-8').read()
    for m in re.finditer(r'class="guide-product-card-desc">(.*?)</div>', s, re.S):
        txt = ' '.join(html.unescape(m.group(1)).split())
        n += 1
        maxlen = max(maxlen, len(txt))
        if txt not in texts and not any(t.startswith(txt) for t in texts):
            bad.append((f, txt[:80]))

print('cards', n, 'max chars', maxlen, 'not a prefix of any source text', len(bad))
for b in bad[:5]:
    print(b)
