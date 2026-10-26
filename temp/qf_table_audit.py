import json, re, unicodedata

g = json.load(open('data/guides.json', encoding='utf-8'))
p = json.load(open('data/products.json', encoding='utf-8'))
pm = {x['id']: x for x in p}

def norm(s):
    s = unicodedata.normalize('NFKD', s or '')
    s = ''.join(c for c in s if not unicodedata.combining(c))
    s = s.lower()
    s = re.sub(r'[^a-z0-9]+', ' ', s)
    return s.strip()

# index products by normalized title pieces
prods = [x for x in p]

def match_col(col_title, guide):
    n = norm(col_title)
    # 1. exact normalized title match
    for x in prods:
        if norm(x['title']) == n:
            return x
    # 2. product title starts with column title (column=short name)
    cands = [x for x in prods if norm(x['title']).startswith(n + ' ')]
    if len(cands) == 1:
        return cands[0]
    # 3. column contains full product title
    cands = [x for x in prods if n.startswith(norm(x['title']))]
    if len(cands) == 1:
        return cands[0]
    # 4. brand + model tokens all present
    toks = n.split()
    cands = []
    for x in prods:
        pt = norm(x['title'])
        if all(t in pt.split() for t in toks):
            cands.append(x)
    if len(cands) == 1:
        return cands[0]
    # 5. prefer featured product of the guide whose title contains the model tokens
    feat = [pm[i] for i in guide.get('featuredProducts', []) if i in pm]
    cands = [x for x in feat if all(t in norm(x['title']).split() for t in toks)]
    if len(cands) == 1:
        return cands[0]
    return None

mapping = []  # (guide_id, col_index, col_title, product_id or None)
unmatched = []
for guide in g:
    pt = guide.get('productTable') or {}
    cols = pt.get('columns') or []
    for i, c in enumerate(cols):
        t = c.get('title') or ''
        m = match_col(t, guide)
        mapping.append((guide['id'], i, t, m['id'] if m else None))
        if not m:
            unmatched.append((guide['id'], i, t))

print('columns total:', len(mapping), 'unmatched:', len(unmatched))
for u in unmatched:
    print('  UNMATCHED', u)

json.dump(mapping, open('temp/qf_table_map.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)

# Build specs per product from tables
ROW_KEYS = {
    'type': ['type', 'tipo'],
    'pattern': ['polar pattern', 'patron polar', 'patron'],
    'selfnoise': ['self-noise', 'self noise', 'ruido propio', 'noise'],
    'spl': ['max spl', 'spl maximo', 'spl max', 'spl'],
    'freq': ['frequency response', 'respuesta de frecuencia', 'rango de frecuencia'],
    'band': ['frequency band', 'banda', 'band'],
    'output': ['output', 'outputs', 'connectivity', 'conexion', 'conexiones', 'salida'],
    'diaphragm': ['diaphragm', 'diafragma', 'capsule', 'capsula'],
}

def row_kind(label):
    l = norm(label)
    # "Output Impedance" / "Output / Preamp" are not connection types
    if l.startswith('output impedance') or l.startswith('impedancia de salida'):
        return 'impedance'
    if l.startswith('output preamp') or l.startswith('output pre-amp'):
        return 'impedance'
    if l.startswith('output level') or l.startswith('nivel de salida'):
        return 'outlevel'
    for k, names in ROW_KEYS.items():
        for nm in names:
            if l == norm(nm) or l.startswith(norm(nm)):
                return k
    return None

specs = {}
for guide in g:
    pt = guide.get('productTable') or {}
    cols = pt.get('columns') or []
    for entry in mapping:
        if entry[0] != guide['id']:
            continue
        idx, pid = entry[1], entry[3]
        if not pid:
            continue
        for row in pt.get('rows') or []:
            kind = row_kind(row.get('label', ''))
            if not kind:
                continue
            vals = row.get('values') or []
            if idx < len(vals) and isinstance(vals[idx], dict):
                v = vals[idx].get('value')
                if v:
                    specs.setdefault(pid, {}).setdefault(kind, set()).add(v.strip())

report = []
for prod in p:
    if not prod.get('facts'):
        continue
    pid = prod['id']
    s = specs.get(pid, {})
    ours = [(f['value'], f['label'].get('en', '')) for f in prod['facts']]
    report.append({
        'id': pid,
        'title': prod['title'],
        'ours': ours,
        'table': {k: sorted(v) for k, v in s.items()},
        'bestFor': prod.get('bestFor', {}).get('en', ''),
    })

json.dump(report, open('temp/qf_table_report.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)

lines = []
for r in report:
    lines.append(f"PID {r['id']} | {r['title']}")
    lines.append(f"   ours: {r['ours']}")
    lines.append(f"   table: {r['table']}")
open('temp/qf_table_report.txt', 'w', encoding='utf-8').write('\n'.join(lines))
print('report written', len(report))
