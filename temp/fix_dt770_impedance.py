# -*- coding: utf-8 -*-
"""Fix the DT 770 Pro impedance in the best-headphones comparison table.

The catalog entry is the 80 Ohm DT 770 Pro: the description says "80 Ohm
drivers", four of its five store links point at the 80 Ohm listing
(gear4music .../80-Ohm/, musicstore ...80-Ohm, andertons ...80-ohms, amazon
B07H48TGYM), the verdict text is written for 80 Ohm ("The 80 Ohm version pulls
out detail..."), and the mixing and tracking guides both list 80 Ohms. The
best-headphones table is the only place that says 250 — the classic studio
variant, which this catalog entry does not sell.

Only that single cell is touched (EN and ES).
"""
import json

GID = 'best-headphones'
COL_TITLE = 'Beyerdynamic DT 770 Pro'
ROW = 'Impedance'


def main():
    guides = json.load(open('data/guides.json', encoding='utf-8'))
    g = [x for x in guides if x['id'] == GID][0]
    pt = g['productTable']
    cols = [c.get('title') for c in pt['columns']]
    idx = cols.index(COL_TITLE)

    for row in pt['rows']:
        if row.get('label') != ROW:
            continue
        cell = row['values'][idx]
        before = (cell.get('value'), cell.get('value_es')) if isinstance(cell, dict) else cell
        if isinstance(cell, dict):
            cell['value'] = '80 Ω'
            cell['value_es'] = '80 Ω'
        else:
            row['values'][idx] = '80 Ω'
            before = cell
        print('%s / %s  was %r  now %r' % (GID, COL_TITLE, before,
                                           ('80 Ω', '80 Ω') if isinstance(cell, dict) else '80 Ω'))

    open('data/guides.json', 'w', encoding='utf-8', newline='').write(
        json.dumps(guides, ensure_ascii=False, indent=2) + '\n')
    print('saved')


main()
