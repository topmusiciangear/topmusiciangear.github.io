# -*- coding: utf-8 -*-
"""Dump pedal table cells from ONLY the five pedal guides.

temp/qf_specs.py scans every guide, so a pedal that also shows up in another
category's table could pick up a foreign "Power" cell (that is why the DD-8 came
back with "100 mA" as power and the BD-2 with "20 mA"). This reads the pedal
tables directly so the values are unambiguous.

Writes temp/specs_pedals_clean.json:
    { "<id>": { "Type": [...], "Bypass": [...], ... } }
"""
import json
import re
import unicodedata

G_PATH = 'data/guides.json'
P_PATH = 'data/products.json'

PEDAL_GUIDES = ['best-looper-pedals', 'best-multi-effects-pedals',
                'best-overdrive-distortion', 'best-reverb-delay',
                'guitar-pedals']

KEEP = ['Type', 'Controls', 'Bypass', 'Power', 'Current Draw',
        'DSP / Processing', 'Size', 'Standout Feature', 'Models', 'Battery',
        'Simultaneous Blocks', 'Expression Pedal', 'USB Audio Interface',
        'Looper', 'Signal Chain']

AMP_GUIDE = 'best-amp-modelers'


def norm(s):
    s = unicodedata.normalize('NFKD', s or '')
    s = ''.join(c for c in s if not unicodedata.combining(c))
    return re.sub(r'[^a-z0-9]+', ' ', s.lower()).strip()


def main():
    guides = {g['id']: g for g in json.load(open(G_PATH, encoding='utf-8'))}
    prods = [x for x in json.load(open(P_PATH, encoding='utf-8'))
             if x.get('category') == 'pedals']
    bynorm = {}
    for p in prods:
        bynorm.setdefault(norm(p['title']), p['id'])

    out = {}
    unmatched = []
    for gid in PEDAL_GUIDES + [AMP_GUIDE]:
        g = guides.get(gid)
        pt = (g or {}).get('productTable') or {}
        if not pt.get('columns'):
            continue
        labels = [r['label'] for r in pt['rows']]
        for i, col in enumerate(pt['columns']):
            title = norm(col['title'])
            pid = bynorm.get(title)
            if pid is None:
                # tolerate a trailing qualifier in the column title
                cand = [k for k in bynorm if title and (title in k or k in title)]
                if len(cand) == 1:
                    pid = bynorm[cand[0]]
            if pid is None:
                unmatched.append((gid, col['title']))
                continue
            d = out.setdefault(pid, {})
            for row in pt['rows']:
                if row['label'] not in KEEP:
                    continue
                val = row['values'][i]
                v = val.get('value') if isinstance(val, dict) else val
                if not v or v == '—':
                    continue
                d.setdefault(row['label'], [])
                if v not in d[row['label']]:
                    d[row['label']].append(v)

    open('temp/specs_pedals_clean.json', 'w', encoding='utf-8',
         newline='').write(json.dumps(out, ensure_ascii=False, indent=1))

    print('products matched:', len(out), 'of', len(prods))
    missing = [p['id'] for p in prods if p['id'] not in out]
    if missing:
        print('no pedal-table row:', missing)
    print('unmatched columns:', len(unmatched))
    for gid, t in unmatched[:12]:
        print('   ', gid, '|', t)


main()
