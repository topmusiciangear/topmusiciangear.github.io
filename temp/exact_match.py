import json, re, html, unicodedata

g = json.load(open('data/guides.json', encoding='utf-8'))
prods = {p['id']: p for p in json.load(open('data/products.json', encoding='utf-8'))}
rows = json.load(open('temp/all_card_counts.json', encoding='utf-8'))
by = {}
for r in rows:
    by.setdefault(r['id'], {})[r['f']] = r['w']

def strip(h):
    h = re.sub(r'<[^>]+>', ' ', h or '')
    return ' '.join(html.unescape(h).split())

def norm(s):
    s = unicodedata.normalize('NFKD', s or '')
    s = ''.join(c for c in s if not unicodedata.combining(c))
    return re.sub(r'\s+', ' ', s).strip().lower()

corpus = []
def add(gid, lang, txt):
    txt = strip(txt)
    if not txt:
        return
    for x in re.split(r'(?<=[.!?])\s+', txt):
        x = x.strip()
        if 8 <= len(x.split()) <= 28:
            corpus.append((gid, lang, x))

for gi in g:
    for fld, lang in (('intro', 'en'), ('intro_es', 'es'), ('conclusion', 'en'), ('conclusion_es', 'es'),
                      ('verdict', 'en'), ('verdict_es', 'es'), ('description', 'en'), ('description_es', 'es')):
        if gi.get(fld):
            add(gi['id'], lang, gi[fld])
    for s in gi.get('sections') or []:
        for fld, lang in (('content', 'en'), ('content_es', 'es'), ('text', 'en'), ('text_es', 'es'),
                          ('verdict', 'en'), ('verdict_es', 'es'), ('heading', 'en'), ('heading_es', 'es')):
            if s.get(fld):
                add(gi['id'], lang, s[fld])
        for fld, lang in (('pros', 'en'), ('pros_es', 'es'), ('cons', 'en'), ('cons_es', 'es')):
            for it in s.get(fld) or []:
                add(gi['id'], lang, it)

nc = [(norm(x[2]), x) for x in corpus]
BAD = re.compile(r'(\$|€|£|\bprice\b|precio|cheaper|barat|cost\b|coste|compared|mejor que|better than|instead of|our score|nuestra nota)', re.I)

need = [p for p in prods.values()
        if by.get(p['id'], {}).get('desc', 0) < 38 or by.get(p['id'], {}).get('desc_es', 0) < 38]
print('need', len(need))

hit_en = hit_es = both = 0
samples = []
for p in need:
    t = norm(p['title'])
    t2 = norm(re.sub(r'\s*\([^)]*\)\s*$', '', p['title']))
    keys = {t, t2}
    en = [x for nt, x in nc if any(k and k in nt for k in keys) and x[1] == 'en' and not BAD.search(x[2])]
    es = [x for nt, x in nc if any(k and k in nt for k in keys) and x[1] == 'es' and not BAD.search(x[2])]
    if en:
        hit_en += 1
    if es:
        hit_es += 1
    if en and es:
        both += 1
    if en and len(samples) < 12:
        samples.append((p['id'], p['title'], by.get(p['id'], {}), en[0][2], es[0][2] if es else ''))

print('en hit', hit_en, 'es hit', hit_es, 'both', both)
for s in samples:
    print('\n---', s[0], s[1], s[2])
    print('  EN:', s[3][:230])
    print('  ES:', s[4][:230])
