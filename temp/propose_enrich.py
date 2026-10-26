import json, re, html, unicodedata, collections

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

def sents(t):
    return [x.strip() for x in re.split(r'(?<=[.!?])\s+(?=[A-Z0-9\u00C0-\u00DE\u00BF\u00A1"\'(])', t) if x.strip()]

# product -> best section
section = {}
for p in prods.values():
    t = norm(re.sub(r'\s*\([^)]*\)\s*$', '', p['title']))
    found = None
    for gi in g:
        for s in gi.get('sections') or []:
            ids = [i for i in (s.get('products') or []) if isinstance(i, int)]
            h = norm(s.get('heading_es') or s.get('heading') or '')
            if len(ids) == 1 and ids[0] == p['id'] and s.get('content'):
                found = (gi['id'], s)
                break
            if not ids and t and len(t) > 6 and t in h and s.get('content'):
                found = (gi['id'], s)
                break
        if found:
            break
    if found:
        section[p['id']] = found

need = [p for p in prods.values()
        if by.get(p['id'], {}).get('desc', 0) < 38 or by.get(p['id'], {}).get('desc_es', 0) < 38]
print('need', len(need), 'with section', sum(1 for p in need if p['id'] in section))

BAD = re.compile(r'(\$|€|£|\bprice\b|precio|cheaper|barat|cost\b|coste|compared|\bvs\b|better than|mejor que|instead of|our score|nuestra nota)', re.I)
WEAK_START = re.compile(r'^(This|That|These|Those|It|Its|They|Their|He|She|But|And|So|Yet|Esto|Eso|Esta|Este|Estos|Estas|Su|Sus|Pero|Y|Así|Además)\b')
STOP = set('the a an and or of to in for with on at by from is are was were be been it its this that these those y el la los las de del en con para por un una unos unas es son su sus se que al como más mas'.split())

def toks(s):
    return [w for w in re.findall(r"[A-Za-zÁÉÍÓÚÜÑáéíóúüñ0-9'\-]+", s.lower()) if w not in STOP and len(w) > 2]

def choose(desc, content, lang):
    d = desc or ''
    dt = set(toks(d))
    dw = len(d.split())
    budget = 46 - dw
    if budget < 6:
        return []
    cands = []
    for i, s in enumerate(sents(strip(content))):
        w = len(s.split())
        if w < 6 or w > min(30, budget + 6):
            continue
        if BAD.search(s) or WEAK_START.search(s):
            continue
        new = [t for t in toks(s) if t not in dt]
        novelty = len(new) / max(1, len(toks(s)))
        if novelty < 0.45:
            continue
        # must add at least 4 real content words
        if len(set(new)) < 4:
            continue
        score = novelty * 2 + (1.0 if 8 <= w <= 18 else 0.4) - i * 0.02
        cands.append((score, i, s, w, novelty))
    cands.sort(reverse=True)
    out = []
    total = dw
    for score, i, s, w, nov in cands:
        if total + w > 46:
            continue
        out.append((i, s, w, nov))
        total += w
        if total >= 38:
            break
    return out

shown = 0
for p in sorted(need, key=lambda p: by.get(p['id'], {}).get('desc', 0) + by.get(p['id'], {}).get('desc_es', 0))[:25]:
    if p['id'] not in section:
        continue
    gid, s = section[p['id']]
    print('\n===', p['id'], p['title'], '| guide', gid)
    for f, cf in (('desc', 'content'), ('desc_es', 'content_es')):
        d = p.get(f) or ''
        picks = choose(d, s.get(cf), f)
        print(' ', f, len(d.split()), '->', d)
        for i, x, w, nov in picks:
            print('    +[%d w=%.2f nov=%.2f] %s' % (i, w, nov, x))
    shown += 1
