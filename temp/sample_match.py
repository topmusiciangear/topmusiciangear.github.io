import json, re, html, random

g = json.load(open('data/guides.json', encoding='utf-8'))
prods = {p['id']: p for p in json.load(open('data/products.json', encoding='utf-8'))}
rows = json.load(open('temp/all_card_counts.json', encoding='utf-8'))
by = {}
for r in rows:
    by.setdefault(r['id'], {})[r['f']] = r

def strip(h):
    h = re.sub(r'<[^>]+>', ' ', h or '')
    return ' '.join(html.unescape(h).split())

corpus = []
for gi in g:
    for fld in ('intro', 'intro_es', 'conclusion', 'conclusion_es', 'verdict', 'verdict_es'):
        if gi.get(fld):
            corpus.append((gi['id'], strip(gi[fld])))
    for s in gi.get('sections') or []:
        for fld in ('content', 'content_es', 'text', 'text_es'):
            if s.get(fld):
                corpus.append((gi['id'], strip(s[fld])))
        for fld in ('pros', 'pros_es'):
            for it in s.get(fld) or []:
                corpus.append((gi['id'], strip(it)))

sents = []
for gid, txt in corpus:
    for x in re.split(r'(?<=[.!?])\s+', txt):
        x = x.strip()
        if 8 <= len(x.split()) <= 30:
            sents.append((gid, x))

BAD = re.compile(r'(\$|€|£|price|precio|cheaper|barato|cost|coste|compared|mejor que|better than|instead of)', re.I)

short = [pid for pid, d in by.items() if d.get('desc', {}).get('w', 99) < 32 or d.get('desc_es', {}).get('w', 99) < 32]
random.seed(7)
random.shuffle(short)
n = 0
for pid in short:
    p = prods[pid]
    d = p.get('desc') or ''
    words = [w for w in re.findall(r"[A-Za-z0-9\-]{3,}", p['title']) if not w.isdigit()]
    key = max(words, key=len) if words else p['title']
    cands = [x for gid, x in sents if key.lower() in x.lower() and not BAD.search(x) and x.lower() not in d.lower()]
    if not cands:
        continue
    print('---', pid, p['title'], '| words en/es', by[pid].get('desc', {}).get('w'), by[pid].get('desc_es', {}).get('w'))
    print('  DESC:', d)
    print('  CAND:', cands[0][:220])
    n += 1
    if n >= 12:
        break
