# -*- coding: utf-8 -*-
"""Align the Spanish table cells with the English corrections made for guitars."""
import json

G_PATH = 'data/guides.json'

FIXES = [
    ('beginner-guitar', 'Body Wood', 'Squier Affinity Series Stratocaster',
     'Aliso / álamo', 'Álamo'),
    ('beginner-guitar', 'Neck', 'Yamaha Pacifica 112V',
     'Arce, 21 trastes', 'Arce, 22 trastes'),
    ('beginner-guitar', 'Frets & Fretboard', 'Yamaha Pacifica 112V',
     '21, arce', '22, arce'),
    ('beginner-guitar', 'Scale Length', 'Yamaha FG800 Acoustic',
     '25,5" (648 mm)', '25,6" (650 mm)'),
    ('best-beginner-electric-guitar', 'Frets & Fretboard', 'Squier Sonic Mustang',
     '21 medium jumbo, arce/laurel', '22 medium jumbo, arce/laurel'),
    ('best-beginner-electric-guitar', 'Pickups', 'Enya Nova Go Sonic',
     'Single coil + humbucker', '2 humbuckers (Alnico II/V)'),
    ('best-beginner-electric-guitar', 'Scale Length', 'Enya Nova Go Sonic',
     '25,5" (648 mm)', '24,75" (629 mm)'),
    ('best-beginner-electric-guitar', 'Bridge', 'Enya Nova Go Sonic',
     'Fijo', 'Tune-o-matic'),
    ('best-electric-guitars-2026', 'Body Wood', "Squier Classic Vibe '50s Stratocaster",
     'Aliso', 'Pino'),
    ('best-electric-guitars-2026', 'Frets & Fretboard', 'Squier Sonic Mustang',
     '21, arce, 9,5"', '22, arce, 9,5"'),
]

g = json.load(open(G_PATH, encoding='utf-8'))
applied = 0
for gid, row_label, col_title, old, new in FIXES:
    hit = False
    for guide in g:
        if guide['id'] != gid:
            continue
        pt = guide.get('productTable') or {}
        cols = [c.get('title') for c in pt.get('columns') or []]
        if col_title not in cols:
            print('  ! no column', gid, col_title)
            continue
        ci = cols.index(col_title)
        for row in pt.get('rows') or []:
            if (row.get('label') or '').strip() != row_label:
                continue
            cell = row['values'][ci]
            if not isinstance(cell, dict) or 'value_es' not in cell:
                continue
            cur = cell['value_es']
            if cur == new:
                hit = True
            elif cur == old:
                cell['value_es'] = new
                hit = True
                applied += 1
            else:
                print('  ! unexpected ES cell', gid, col_title, row_label, '->', cur)
    if not hit:
        print('  ! not applied', gid, row_label, col_title)

open(G_PATH, 'w', encoding='utf-8', newline='').write(
    json.dumps(g, ensure_ascii=False, indent=2) + '\n')
print('ES cells fixed:', applied)
