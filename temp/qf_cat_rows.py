# -*- coding: utf-8 -*-
"""Dump plugin table cells per product so we can choose the 3 quickfacts."""
import json
import sys

g = json.load(open('data/guides.json', encoding='utf-8'))
prods = {x['id']: x for x in json.load(open('data/products.json', encoding='utf-8'))}
cat = sys.argv[1] if len(sys.argv) > 1 else 'plugins'
only = sys.argv[2] if len(sys.argv) > 2 else None

ROWS = ['Type', 'Format', 'Platforms', 'Copy Protection', 'Latency', 'Standout Feature',
        'Best For', 'Key Feature', 'Modulation Depth', 'Sound Design Potential', 'CPU Load',
        'Formats', 'Editing Type', 'Timing Tools', 'Formant Editing', 'Audio-to-MIDI',
        'Multi-Track View', 'Ecosystem']

bycol = {}
for guide in g:
    if guide.get('category') != cat:
        continue
    pt = guide.get('productTable') or {}
    cols = [c.get('title') for c in pt.get('columns') or []]
    for row in pt.get('rows') or []:
        lab = row.get('label')
        if lab not in ROWS:
            continue
        for c, v in zip(cols, row.get('values') or []):
            val = v.get('value') if isinstance(v, dict) else v
            bycol.setdefault(c, {})[lab] = val
            bycol[c].setdefault('_guide', guide['id'])

for c, d in bycol.items():
    if only and only.lower() not in c.lower():
        continue
    print('=' * 72)
    print(c, '   [', d.get('_guide'), ']')
    for lab in ROWS:
        if lab in d:
            print('   %-20s %s' % (lab, d[lab]))
