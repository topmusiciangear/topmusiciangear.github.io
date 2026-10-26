import json, glob, os, re

# Applies temp/enrich_batches/out_NN.json additions to data/products.json.
# Only appends; never rewrites existing text. Runs the same checks as validate_all.py.

BAD = re.compile(r'(\$|\u20ac|\u00a3|\bprice\b|precio|cheaper|barat|\bcost\b|coste|our score|nuestra nota)', re.I)
SECOND = re.compile(r'(\byou\b|\byour\b|\btu\b|\btus\b|\bte\b|\bdeber[ií]as\b|si quieres|si buscas)', re.I)
REPL = re.compile(r'(\ufffd|\u00c2|\u00c3|\u251c|\u2502)')
END = re.compile(r'[.!?]["\')\]]?$')

def wc(s):
    return len((s or '').split())

prods = {p['id']: p for p in json.load(open('data/products.json', encoding='utf-8'))}
adds = {}
errors = []

for fn in sorted(glob.glob('temp/enrich_batches/in_*.json')):
    n = re.search(r'in_(\d+)\.json$', fn).group(1)
    outfn = 'temp/enrich_batches/out_%s.json' % n
    if not os.path.exists(outfn):
        errors.append('missing out_%s' % n)
        continue
    inp = json.load(open(fn, encoding='utf-8'))
    out = json.load(open(outfn, encoding='utf-8'))
    if [x['id'] for x in inp] != [x['id'] for x in out]:
        errors.append('batch %s ids/order mismatch' % n)
        continue
    for i, o in zip(inp, out):
        for f, a, need in (('desc', 'add_en', i['need_en']), ('desc_es', 'add_es', i['need_es'])):
            add = (o.get(a) or '').strip()
            if need and not add:
                errors.append('%s %s missing addition' % (i['id'], a))
            if not need and add:
                errors.append('%s %s unexpected addition' % (i['id'], a))
            if add:
                if not (40 <= wc(i[f] + ' ' + add) <= 45):
                    errors.append('%s %s words=%d' % (i['id'], a, wc(i[f] + ' ' + add)))
                if not END.search((i[f] + ' ' + add).strip()):
                    errors.append('%s %s bad ending' % (i['id'], a))
                if BAD.search(add) or SECOND.search(add) or REPL.search(add):
                    errors.append('%s %s banned/mojibake' % (i['id'], a))
            adds.setdefault(i['id'], {})[f] = add

print('errors', len(errors))
for e in errors[:20]:
    print(' -', e)
if errors:
    raise SystemExit(1)

changed = 0
fields = 0
for pid, d in adds.items():
    p = prods[pid]
    for f, add in d.items():
        if not add:
            continue
        before = p.get(f) or ''
        p[f] = before.rstrip() + ' ' + add
        fields += 1
    changed += 1

json.dump(list(prods.values()), open('data/products.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=2)
print('products changed', changed, 'fields appended', fields)
