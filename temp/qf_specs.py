import json, re, unicodedata, sys

g = json.load(open('data/guides.json', encoding='utf-8'))
p = json.load(open('data/products.json', encoding='utf-8'))
pm = {x['id']: x for x in p}
CAT = sys.argv[1] if len(sys.argv) > 1 else 'guitars'


def norm(s):
    s = unicodedata.normalize('NFKD', s or '')
    s = ''.join(c for c in s if not unicodedata.combining(c))
    s = s.lower().replace('–', '-').replace('—', '-')
    s = re.sub(r'[^a-z0-9.]+', ' ', s)
    return s.strip()


prods = [x for x in p if x.get('category') == CAT]
cat_titles = {norm(x['title']): x for x in prods}


def match_col(col_title, guide):
    n = norm(col_title)
    for x in prods:
        if norm(x['title']) == n:
            return x
    cands = [x for x in prods if norm(x['title']).startswith(n + ' ')]
    if len(cands) == 1:
        return cands[0]
    cands = [x for x in prods if n.startswith(norm(x['title']))]
    if len(cands) == 1:
        return cands[0]
    toks = n.split()
    cands = []
    for x in prods:
        pt = norm(x['title']).split()
        if all(t in pt for t in toks):
            cands.append(x)
    if len(cands) == 1:
        return cands[0]
    feat = [pm[i] for i in guide.get('featuredProducts', []) if i in pm and pm[i].get('category') == CAT]
    cands = [x for x in feat if all(t in norm(x['title']).split() for t in toks)]
    if len(cands) == 1:
        return cands[0]
    # reverse subset: every product token appears in the column title
    # ("Scaler 3" -> "Scaler Music Scaler 3", "Melodyne 5 Essential" -> "Celemony Melodyne 5 Essential")
    cands = []
    for x in prods:
        pt = norm(x['title']).split()
        if pt and all(t in toks for t in pt):
            cands.append(x)
    if len(cands) == 1:
        return cands[0]
    return None


ROW_KINDS = {
    'body': ['body shape', 'forma del cuerpo'],
    'top': ['top wood', 'top', 'tapa'],
    'back': ['back & sides', 'back/sides', 'back and sides', 'fondos y aros'],
    'bodywood': ['body wood', 'body', 'cuerpo', 'madera del cuerpo'],
    'neck': ['neck', 'mastil', 'mastil y diapason', 'neck & fretboard'],
    'frets': ['frets & fretboard', 'fretboard & frets', 'frets', 'trastes'],
    'pickups': ['pickups', 'pastillas', 'pickup', 'pastillas / electronica'],
    'scale': ['scale length', 'scale', 'escala', 'longitud de escala'],
    'bridge': ['tremolo / bridge', 'bridge', 'puente', 'tremolo'],
    'tuners': ['tuners', 'clavijas', 'clavijero'],
    'weight': ['weight', 'peso'],
    'nut': ['nut width', 'anchura de cejuela'],
    'electronics': ['electronics', 'electronica', 'pickup / electronics', 'pastillas / electronica'],
    'strings': ['strings', 'cuerdas'],
    'brace': ['bracing', 'varetaje'],
    'case': ['case/bag', 'estuche', 'funda'],
    # plugins / software
    'ptype': ['type', 'tipo'],
    'format': ['format', 'formats', 'formato', 'formatos'],
    'platforms': ['platforms', 'plataformas'],
    'copyprot': ['copy protection', 'proteccion anticopia', 'protección anticopia'],
    'latency': ['latency', 'latencia'],
    'cpu': ['cpu load', 'carga de cpu'],
    'standout': ['standout feature', 'key feature', 'caracteristica destacada'],
    'editing': ['editing type', 'tipo de edicion'],
    'timing': ['timing tools'],
    'formant': ['formant editing'],
    'midiout': ['audio-to-midi'],
    'multitrack': ['multi-track view'],
    'ecosystem': ['ecosystem', 'ecosistema'],
}


def row_kind(label):
    l = norm(label)
    for k, names in ROW_KINDS.items():
        for nm in names:
            if l == norm(nm):
                return k
    for k, names in ROW_KINDS.items():
        for nm in names:
            if l.startswith(norm(nm)):
                return k
    return None


specs = {}
bestfor = {}
unmatched = []
for guide in g:
    pt = guide.get('productTable') or {}
    cols = pt.get('columns') or []
    if not cols:
        continue
    for i, c in enumerate(cols):
        t = c.get('title') or ''
        m = match_col(t, guide)
        if not m:
            n = norm(t)
            if any(tok in ' '.join(norm(x['title']) for x in prods) for tok in n.split()[:1]):
                unmatched.append((guide['id'], t))
            continue
        pid = m['id']
        for row in pt.get('rows') or []:
            kind = row_kind(row.get('label', ''))
            if not kind:
                continue
            vals = row.get('values') or []
            if i < len(vals) and isinstance(vals[i], dict):
                v = (vals[i].get('value') or '').strip()
                if v:
                    specs.setdefault(pid, {}).setdefault(kind, [])
                    if v not in specs[pid][kind]:
                        specs[pid][kind].append(v)
        # best for row
        for row in pt.get('rows') or []:
            if norm(row.get('label', '')).startswith('best for'):
                vals = row.get('values') or []
                if i < len(vals) and isinstance(vals[i], dict):
                    v = (vals[i].get('value') or '').strip()
                    if v:
                        bestfor.setdefault(pid, [])
                        if v not in bestfor[pid]:
                            bestfor[pid].append(v)

KINDS = list(ROW_KINDS)
# Manual aliases for columns whose titles never resolve unambiguously (duplicate products,
# brand-prefix differences). pid -> (guide id, column title)
ALIAS_COLS = [
    (382, 'best-midi-theory-plugins', 'Scaler Music Scaler 3'),
    (1032, 'repitch-vs-melodyne', 'Celemony Melodyne 5 Essential'),
    (1040, 'repitch-vs-melodyne', 'Synchro Arts RePitch 2 Standard'),
]
for pid, gu, col in ALIAS_COLS:
    guide = next((x for x in g if x['id'] == gu), None)
    if not guide:
        print('  ! alias guide missing', gu)
        continue
    pt = guide.get('productTable') or {}
    cols = [c.get('title') for c in pt.get('columns') or []]
    if col not in cols:
        print('  ! alias column missing', gu, col)
        continue
    i = cols.index(col)
    for row in pt.get('rows') or []:
        lab = row.get('label', '')
        vals = row.get('values') or []
        if i >= len(vals) or not isinstance(vals[i], dict):
            continue
        v = (vals[i].get('value') or '').strip()
        if not v:
            continue
        kind = row_kind(lab)
        if kind:
            specs.setdefault(pid, {}).setdefault(kind, [])
            if v not in specs[pid][kind]:
                specs[pid][kind].append(v)
        if norm(lab).startswith('best for'):
            bestfor.setdefault(pid, [])
            if v not in bestfor[pid]:
                bestfor[pid].append(v)

lines = []
empty = []
for x in prods:
    pid = x['id']
    s = specs.get(pid, {})
    if not s:
        empty.append((pid, x['title']))
    lines.append(f"PID {pid} | {x['title']}")
    if pid in bestfor:
        lines.append(f"   bestFor: {' || '.join(bestfor[pid])}")
    for k in KINDS:
        if k in s:
            lines.append(f"   {k:10}: {' | '.join(s[k])}")

lines.append('')
lines.append('=== NO TABLE DATA ===')
for pid, t in empty:
    lines.append(f"  {pid} | {t}")
lines.append('')
lines.append('=== UNMATCHED COLUMNS ===')
for gu, t in unmatched:
    lines.append(f"  {gu} :: {t}")

open('temp/specs_out.txt', 'w', encoding='utf-8').write('\n'.join(lines))
print('\n'.join(lines[:40]))
print('...')
print('products', len(prods), 'no table data', len(empty), 'unmatched cols', len(unmatched))
json.dump(specs, open('temp/specs_%s.json' % CAT, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
json.dump(bestfor, open('temp/bestfor_%s.json' % CAT, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
