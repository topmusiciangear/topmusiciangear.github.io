import json, re, html

g = json.load(open('data/guides.json', encoding='utf-8'))
prods = {p['id']: p for p in json.load(open('data/products.json', encoding='utf-8'))}
counts = {r['id']: r for r in json.load(open('temp/all_card_counts.json', encoding='utf-8'))}

short_ids = sorted({pid for pid, d in
                    {r['id']: {} for r in []}.items()})  # placeholder

# rebuild word map
by = {}
for r in json.load(open('temp/all_card_counts.json', encoding='utf-8')):
    by.setdefault(r['id'], {})[r['f']] = r

def strip(h):
    h = re.sub(r'<[^>]+>', ' ', h or '')
    return ' '.join(html.unescape(h).split())

corpus = []
for gi in g:
    for fld in ('intro', 'intro_es', 'conclusion', 'conclusion_es', 'verdict', 'verdict_es'):
        if gi.get(fld):
            corpus.append(strip(gi[fld]))
    for s in gi.get('sections') or []:
        for fld in ('content', 'content_es', 'text', 'text_es', 'verdict', 'verdict_es'):
            if s.get(fld):
                corpus.append(strip(s[fld]))
        for fld in ('pros', 'pros_es', 'cons', 'cons_es'):
            for it in s.get(fld) or []:
                corpus.append(strip(it))

sents = []
for txt in corpus:
    for x in re.split(r'(?<=[.!?])\s+', txt):
        x = x.strip()
        if 8 <= len(x.split()) <= 30:
            sents.append(x)

BAD = re.compile(r'(\$|€|£|price|precio|cheaper|barato|cost|coste|compared to|mejor que|better than|instead of)', re.I)

short = [pid for pid, d in by.items() if d.get('desc', {}).get('w', 99) < 32 or d.get('desc_es', {}).get('w', 99) < 32]
have_en = have_es = 0
missing = []
for pid in short:
    p = prods[pid]
    toks = [p['title']] + ([p['title_es']] if p.get('title_es') else [])
    # distinctive token: longest word from title
    words = [w for w in re.findall(r"[A-Za-z0-9\-]{3,}", p['title']) if not w.isdigit()]
    key = max(words, key=len) if words else p['title']
    en = [s for s in sents if key.lower() in s.lower() and not BAD.search(s) and re.search(r'[A-Za-z]', s)]
    es = [s for s in sents if key.lower() in s.lower() and not BAD.search(s) and re.search(r'[áéíóúñ¿¡]', s)]
    if en: have_en += 1
    if es: have_es += 1
    if not en and not es:
        missing.append((pid, p['title']))
print('products short in at least one lang:', len(short))
print('with usable EN guide sentence:', have_en)
print('with usable ES guide sentence:', have_es)
print('with neither:', len(missing))
print(missing[:15])
