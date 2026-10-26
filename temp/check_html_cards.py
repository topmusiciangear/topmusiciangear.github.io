import glob, re, html, collections, json

buckets = collections.Counter()
issues = []
total = 0
seen = {}
for f in glob.glob('guides/*.html'):
    s = open(f, encoding='utf-8').read()
    for m in re.finditer(r'<div class="guide-product-card-desc">(.*?)</div>', s, re.S):
        t = html.unescape(m.group(1)).strip()
        if not t:
            issues.append((f, 'empty'))
            continue
        total += 1
        w = len(t.split())
        buckets['<38' if w < 38 else '38-46' if w <= 46 else '47-54' if w <= 54 else '55-60' if w <= 60 else '61+'] += 1
        if not re.search(r'[.!?]["\')\]]?$', t):
            issues.append((f, 'end', t[-40:]))
        if t.count('(') != t.count(')'):
            issues.append((f, 'paren', t[-40:]))
        if '...' in t or '\u2026' in t:
            issues.append((f, 'ellipsis', t[-40:]))
        if '\ufffd' in t or 'Â' in t or 'Ã' in t:
            issues.append((f, 'mojibake', t[-40:]))
        if re.search(r'\s[,.;:]', t):
            issues.append((f, 'spacepunct', t[-40:]))
        if re.search(r'[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]-$', t):
            issues.append((f, 'hyphen', t[-40:]))

print('cards', total)
for k in ('<38', '38-46', '47-54', '55-60', '61+'):
    print(k, buckets[k])
print('issues', len(issues))
for x in issues[:15]:
    print(' ', x)
