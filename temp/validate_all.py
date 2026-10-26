import json, glob, os, re, sys

BAD = re.compile(r'(\$|\u20ac|\u00a3|\bprice\b|precio|cheaper|barat|\bcost\b|coste|our score|nuestra nota)', re.I)
SECOND = re.compile(r'(\byou\b|\byour\b|\btu\b|\btus\b|\bte\b|\bdeber[ií]as\b|si quieres|si buscas)', re.I)
REPL = re.compile(r'(\ufffd|\u00c2|\u00c3|\u251c|\u2502)')
END = re.compile(r'[.!?]["\')\]]?$')

def wc(s):
    return len((s or '').split())

rows = []
for fn in sorted(glob.glob('temp/enrich_batches/in_*.json')):
    n = re.search(r'in_(\d+)\.json$', fn).group(1)
    outfn = 'temp/enrich_batches/out_%s.json' % n
    if not os.path.exists(outfn):
        print('batch', n, 'MISSING OUT')
        continue
    inp = json.load(open(fn, encoding='utf-8'))
    out = json.load(open(outfn, encoding='utf-8'))
    om = {x.get('id'): x for x in out}
    errs = []
    if [x.get('id') for x in inp] != [x.get('id') for x in out]:
        errs.append('ids/order mismatch')
    cnt = 0
    for i in inp:
        o = om.get(i['id'])
        if not o:
            errs.append('missing id %s' % i['id'])
            continue
        for f, a, need in (('desc', 'add_en', i['need_en']), ('desc_es', 'add_es', i['need_es'])):
            add = (o.get(a) or '').strip()
            final = (i[f] + (' ' + add if add else '')).strip()
            if need:
                if not add:
                    errs.append('%s %s empty' % (i['id'], a))
                elif not (40 <= wc(final) <= 45):
                    errs.append('%s %s words=%d' % (i['id'], a, wc(final)))
            else:
                if add:
                    errs.append('%s %s should be empty' % (i['id'], a))
            if add:
                cnt += 1
                if not END.search(final):
                    errs.append('%s %s bad ending: %r' % (i['id'], a, final[-30:]))
                if BAD.search(add):
                    errs.append('%s %s banned token' % (i['id'], a))
                if SECOND.search(add):
                    errs.append('%s %s second person' % (i['id'], a))
                if REPL.search(add):
                    errs.append('%s %s mojibake' % (i['id'], a))
                if '  ' in (i[f] + ' ' + add):
                    errs.append('%s %s double space' % (i['id'], a))
                if not final.startswith(i[f]):
                    errs.append('%s %s prefix broken' % (i['id'], a))
    rows.append((n, len(inp), cnt, errs))
    print('batch', n, 'items', len(inp), 'additions', cnt, 'errors', len(errs))
    for e in errs[:8]:
        print('   -', e)

print('\ntotal batches', len(rows), 'total additions', sum(r[2] for r in rows), 'total errors', sum(len(r[3]) for r in rows))
