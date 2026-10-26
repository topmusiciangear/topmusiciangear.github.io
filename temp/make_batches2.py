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

def wc(t):
    return len((t or '').split())

need = [p for p in prods.values() if wc(p.get('desc')) < 38 or wc(p.get('desc_es')) < 38]
need.sort(key=lambda p: wc(p.get('desc')) + wc(p.get('desc_es')))

os.makedirs('temp/enrich_batches', exist_ok=True)
SIZE = 26
n = 0
for bi in range(0, len(need), SIZE):
    chunk = need[bi:bi + SIZE]
    out = []
    for p in chunk:
        sec = section.get(p['id'])
        out.append({
            'id': p['id'],
            'title': p['title'],
            'category': p.get('category'),
            'guide': sec[0] if sec else None,
            'desc': p.get('desc') or '',
            'desc_es': p.get('desc_es') or '',
            'en_words': wc(p.get('desc')),
            'es_words': wc(p.get('desc_es')),
            'need_en': wc(p.get('desc')) < 38,
            'need_es': wc(p.get('desc_es')) < 38,
            'source_en': strip(sec[1].get('content')) if sec else '',
            'source_es': strip(sec[1].get('content_es')) if sec else '',
        })
    n += 1
    json.dump(out, open('temp/enrich_batches/in_%02d.json' % n, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)

print('products', len(need), 'batches', n)
for i in range(1, n + 1):
    d = json.load(open('temp/enrich_batches/in_%02d.json' % i, encoding='utf-8'))
    print('batch', i, len(d), 'need_en', sum(1 for x in d if x['need_en']), 'need_es', sum(1 for x in d if x['need_es']),
          'no_source', sum(1 for x in d if not x['source_en']))
