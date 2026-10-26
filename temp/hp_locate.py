# -*- coding: utf-8 -*-
"""Map each headphone product to the guide tables that carry a column for it.

Column titles and catalog titles differ ("Sennheiser HD 490 Pro" vs "Sennheiser
HD 490 Pro Plus"), so matching is by token subset. Prints, per product, every
guide column that matches and the cells of the rows the quickfacts need, which
makes it obvious when one product's data has to come from a different guide than
the rest (the two IEMs live in best-in-ear-monitors, which has no driver or
impedance row).
"""
import json
import re

STOP = {'the', 'and', 'with', 'pro', 'plus', 'mk', 'ii', 'iii', 'studio',
        'headphones', 'headphone', 'in-ear', 'monitors', 'gen'}


def toks(s):
    s = str(s).lower()
    s = re.sub(r'[^a-z0-9]+', ' ', s)
    return {w for w in s.split() if w and w not in STOP}


guides = json.load(open('data/guides.json', encoding='utf-8'))
prods = [p for p in json.load(open('data/products.json', encoding='utf-8'))
         if p.get('category') == 'headphones']

ROWS = ['Type', 'Driver Size', 'Impedance', 'Sensitivity',
        'Frequency Response', 'Weight', 'Wireless Band', 'Latency', 'Range']

for p in sorted(prods, key=lambda x: x['id']):
    if p.get('facts'):
        continue
    pt = toks(p['title'])
    print('=' * 100)
    print('%3d  %s' % (p['id'], p['title']))
    found = False
    for g in guides:
        tbl = g.get('productTable') or {}
        cols = [c.get('title') for c in tbl.get('columns', [])]
        for i, c in enumerate(cols):
            if not c:
                continue
            ct = toks(c)
            if not ct:
                continue
            if ct <= pt or pt <= ct:
                found = True
                print('    %-30s col %2d  "%s"' % (g['id'], i, c))
                vals = []
                for row in tbl.get('rows', []):
                    if row.get('label') in ROWS:
                        v = row['values'][i]
                        vals.append('%s=%s' % (row['label'],
                                               v.get('value') if isinstance(v, dict) else v))
                print('        ' + ' | '.join(vals))
    if not found:
        print('    !! no table column matches')
