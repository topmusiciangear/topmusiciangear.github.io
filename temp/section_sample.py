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

need = sorted(
    (p for p in prods.values()
     if by.get(p['id'], {}).get('desc', 0) < 38 or by.get(p['id'], {}).get('desc_es', 0) < 38),
    key=lambda p: by.get(p['id'], {}).get('desc', 0) + by.get(p['id'], {}).get('desc_es', 0))

shown = 0
for p in need:
    t = norm(re.sub(r'\s*\([^)]*\)\s*$', '', p['title']))
    best = None
    for gi in g:
        for s in gi.get('sections') or []:
            ids = s.get('products') or []
            h = norm(s.get('heading_es') or s.get('heading') or '')
            if len(ids) == 1 and ids[0] == p['id']:
                best = (gi['id'], s)
                break
            if not ids and t and len(t) > 6 and t in h and s.get('content'):
                best = (gi['id'], s)
                break
        if best:
            break
    if not best:
        continue
    gid, s = best
    print('\n===', p['id'], p['title'], by.get(p['id']))
    print('GUIDE', gid, '| HEADING:', (s.get('heading') or '')[:90])
    print('EN:', strip(s.get('content'))[:420])
    print('ES:', strip(s.get('content_es'))[:420])
    shown += 1
    if shown >= 10:
        break
