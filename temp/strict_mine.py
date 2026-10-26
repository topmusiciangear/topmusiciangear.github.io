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

def sents(t):
    return [x.strip() for x in re.split(r'(?<=[.!?])\s+(?=[A-Z0-9\u00C0-\u00DE\u00BF\u00A1"\'(])', t) if x.strip()]

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

REJECT = re.compile(r"(\$|€|£|\bprice\b|precio|cheaper|barat|\bcost\b|coste|compared|\bvs\b|better than|mejor que|instead of|our score|nuestra nota|"
                    r"\byou\b|\byour\b|\btu\b|\btus\b|\bte\b|deber|antes de comprar|check |expect|if you|si quieres|si buscas|for those|ideal for|perfect for|best for|"
                    r"recommend|recomiendo|avoid|evita|problem|problema|caveat|compromise|limitaci|limited|"
                    r"\bbut\b|\bhowever\b|\byet\b|sin embargo|no obstante|aunque|\bthough\b|\bonly\b|solo |sólo |\bjust\b|not for|no es |not a |"
                    r"\bthan\b|rather than|en lugar de|frente al|against the)", re.I)
FEATURE = re.compile(r"(\d|\bhas\b|\bhave\b|includes?|offers?|features?|uses?|combines?|adds?|provides?|delivers?|built|designed|comes?|ships?|runs?|supports?|"
                     r"records?|controls?|allows?|works?|creates?|gives?|tiene|incluye|ofrece|usa|utiliza|combina|añade|proporciona|entrega|construid|diseñad|"
                     r"viene|graba|controla|permite|funciona|crea|\bda\b)", re.I)
WEAK_START = re.compile(r"^(This|That|These|Those|It|Its|They|Their|He|She|But|And|So|Yet|Esto|Eso|Esta|Este|Estos|Estas|Su|Sus|Pero|Y|Así|Además|Sin|No)\b")
STOP = set('the a an and or of to in for with on at by from is are was were be been it its this that these those y el la los las de del en con para por un una unos unas es son su sus se que al como más mas'.split())

def toks(s):
    return [w for w in re.findall(r"[A-Za-zÁÉÍÓÚÜÑáéíóúüñ0-9'\-]+", s.lower()) if w not in STOP and len(w) > 2]

def cands(desc, content):
    dt = set(toks(desc or ''))
    out = []
    for i, s in enumerate(sents(strip(content))):
        w = len(s.split())
        if w < 8 or w > 26:
            continue
        if REJECT.search(s) or WEAK_START.search(s):
            continue
        if not FEATURE.search(s):
            continue
        ts = toks(s)
        nov = len([t for t in ts if t not in dt]) / max(1, len(ts))
        if nov < 0.4:
            continue
        out.append((i, s, w, nov))
    return out

hit = both = 0
for p in prods.values():
    if by.get(p['id'], {}).get('desc', 0) >= 38 and by.get(p['id'], {}).get('desc_es', 0) >= 38:
        continue
    if p['id'] not in section:
        continue
    gid, s = section[p['id']]
    a = cands(p.get('desc'), s.get('content'))
    b = cands(p.get('desc_es'), s.get('content_es'))
    if a:
        hit += 1
    if a and b:
        both += 1
print('products short:', sum(1 for p in prods.values() if by.get(p['id'], {}).get('desc', 0) < 38 or by.get(p['id'], {}).get('desc_es', 0) < 38))
print('with >=1 strict EN candidate:', hit, '| both langs:', both)

n = 0
for p in sorted(prods.values(), key=lambda p: by.get(p['id'], {}).get('desc', 0) + by.get(p['id'], {}).get('desc_es', 0)):
    if by.get(p['id'], {}).get('desc', 0) >= 38 and by.get(p['id'], {}).get('desc_es', 0) >= 38:
        continue
    if p['id'] not in section:
        continue
    gid, s = section[p['id']]
    a = cands(p.get('desc'), s.get('content'))
    b = cands(p.get('desc_es'), s.get('content_es'))
    if not a:
        continue
    print('\n===', p['id'], p['title'], by.get(p['id'], {}))
    print('  EN desc:', p.get('desc'))
    for i, x, w, nov in a[:2]:
        print('    +EN[%d w=%d nov=%.2f] %s' % (i, w, nov, x))
    if b:
        for i, x, w, nov in b[:2]:
            print('    +ES[%d w=%d nov=%.2f] %s' % (i, w, nov, x))
    else:
        print('    +ES none')
    n += 1
    if n >= 18:
        break
