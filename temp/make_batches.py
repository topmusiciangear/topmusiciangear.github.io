import json, re, html, unicodedata, os

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
need.sort(key=lambda p: by.get(p['id'], {}).get('desc', 0) + by.get(p['id'], {}).get('desc_es', 0))

os.makedirs('temp/enrich_batches', exist_ok=True)
SIZE = 26
n = 0
for bi in range(0, len(need), SIZE):
    chunk = need[bi:bi + SIZE]
    out = []
    for p in chunk:
        sec = section.get(p['id'])
        item = {
            'id': p['id'],
            'title': p['title'],
            'category': p.get('category'),
            'guide': sec[0] if sec else None,
            'en_words': by.get(p['id'], {}).get('desc', 0),
            'es_words': by.get(p['id'], {}).get('desc_es', 0),
            'desc': p.get('desc') or '',
            'desc_es': p.get('desc_es') or '',
            'source_en': strip(sec[1].get('content')) if sec else '',
            'source_es': strip(sec[1].get('content_es')) if sec else '',
        }
        out.append(item)
    n += 1
    fn = 'temp/enrich_batches/in_%02d.json' % n
    json.dump(out, open(fn, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('products', len(need), 'batches', n, 'dir temp/enrich_batches')
for i in range(1, n + 1):
    d = json.load(open('temp/enrich_batches/in_%02d.json' % i, encoding='utf-8'))
    print('batch', i, len(d), 'ids', d[0]['id'], '-', d[-1]['id'])
