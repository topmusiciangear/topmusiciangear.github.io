# -*- coding: utf-8 -*-
"""Show the table cells for the known Gibson/Enya conflicts."""
import json

g = json.load(open('data/guides.json', encoding='utf-8'))
p = {x['id']: x for x in json.load(open('data/products.json', encoding='utf-8'))}

WANT = ['Gibson SJ-200', 'Gibson J-45', 'Enya']

for guide in g:
    pt = guide.get('productTable') or {}
    cols = [c.get('title') for c in pt.get('columns') or []]
    for row in pt.get('rows') or []:
        for c, v in zip(cols, row.get('values') or []):
            if not isinstance(v, dict):
                continue
            val = v.get('value') or ''
            if row.get('label') in ('Weight', 'Frets & Fretboard', 'Pickups', 'Electronics',
                                    'Body Wood', 'Neck', 'Hardware', 'Bridge'):
                continue
        # print only rows for those product columns
    for c, v in zip(cols, []):
        pass

for guide in g:
    pt = guide.get('productTable') or {}
    cols = [c.get('title') for c in pt.get('columns') or []]
    for c in cols:
        if not any(w.lower() in (c or '').lower() for w in WANT):
            continue
        ci = cols.index(c)
        print('=' * 70)
        print(guide['id'], '|', c)
        for row in pt.get('rows') or []:
            cell = row['values'][ci] if ci < len(row['values']) else None
            if isinstance(cell, dict):
                print('   %-22s %s' % (row.get('label'), cell.get('value')))
            else:
                print('   %-22s %s' % (row.get('label'), cell))
