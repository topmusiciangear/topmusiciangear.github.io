import json, re, unicodedata, collections

g = json.load(open('data/guides.json', encoding='utf-8'))
prods = {p['id']: p for p in json.load(open('data/products.json', encoding='utf-8'))}
rows = json.load(open('temp/all_card_counts.json', encoding='utf-8'))
by = {}
for r in rows:
    by.setdefault(r['id'], {})[r['f']] = r['w']
need = {p['id'] for p in prods.values()
        if by.get(p['id'], {}).get('desc', 0) < 38 or by.get(p['id'], {}).get('desc_es', 0) < 38}

def norm(s):
    s = unicodedata.normalize('NFKD', s or '')
    s = ''.join(c for c in s if not unicodedata.combining(c))
    return re.sub(r'\s+', ' ', s).strip().lower()

info = collections.defaultdict(lambda: {'pros_en': [], 'pros_es': [], 'specs': 0, 'sections': 0, 'content': []})
for gi in g:
    for s in gi.get('sections') or []:
        ids = [i for i in (s.get('products') or []) if isinstance(i, int)]
        matched = []
        if len(ids) >= 1:
            matched = ids
        else:
            h = norm(s.get('heading_es') or s.get('heading') or '')
            for pid, p in prods.items():
                t = norm(re.sub(r'\s*\([^)]*\)\s*$', '', p['title']))
                if t and len(t) > 6 and t in h:
                    matched.append(pid)
        for pid in matched:
            if pid not in need:
                continue
            d = info[pid]
            d['sections'] += 1
            for x in s.get('pros') or []:
                if isinstance(x, str) and 3 <= len(x.split()) <= 14:
                    d['pros_en'].append(x.strip())
            for x in s.get('pros_es') or []:
                if isinstance(x, str) and 3 <= len(x.split()) <= 14:
                    d['pros_es'].append(x.strip())
            if s.get('specs'):
                d['specs'] += 1
            for f in ('content', 'content_es'):
                if s.get(f):
                    d['content'].append(f)

print('need', len(need))
print('with single-product section:', sum(1 for i in info if info[i]['sections']))
print('with pros en:', sum(1 for i in info if info[i]['pros_en']))
print('with pros es:', sum(1 for i in info if info[i]['pros_es']))
print('with both pros:', sum(1 for i in info if info[i]['pros_en'] and info[i]['pros_es']))
print('with specs:', sum(1 for i in info if info[i]['specs']))
for pid in list(info)[:8]:
    p = prods[pid]
    print('\n---', pid, p['title'], by.get(pid))
    print('  pros_en:', info[pid]['pros_en'][:6])
    print('  pros_es:', info[pid]['pros_es'][:6])
