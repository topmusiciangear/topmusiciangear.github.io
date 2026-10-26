# -*- coding: utf-8 -*-
"""Find (and optionally fix) table cells where Spanish text was pasted into the
English value with a " || " separator.

Example found in best-monitors / Type row / Kali IN-8 V2:
    value    = "3-way powered || Triamplificado de 3 vías"
    value_es = "Triamplificado de 3 vías"
so the English page rendered "3-way powered || Triamplificado de 3 vías".

Run without arguments to only report; pass --fix to strip the Spanish tail (the
part after " || ") from the English value and leave value_es untouched.
"""
import json
import re
import sys

PATH = 'data/guides.json'
FIX = '--fix' in sys.argv
SPAN = re.compile(r'[áéíóúñ¿¡]|\bde\b|\bcon\b|\by\b|\bpara\b', re.I)

guides = json.load(open(PATH, encoding='utf-8'))
found = 0
fixed = 0

for g in guides:
    pt = g.get('productTable') or {}
    for row in pt.get('rows') or []:
        for i, cell in enumerate(row.get('values') or []):
            if not isinstance(cell, dict):
                continue
            # take the first " || " split only
            for key in ('value',):
                v = cell.get(key)
                if not isinstance(v, str) or ' || ' not in v:
                    continue
                head, tail = v.split(' || ', 1)
                hit = bool(SPAN.search(tail))
                found += 1
                if hit:
                    print('%s | %s | col %d' % (g['id'], row['label'], i))
                    print('    %r' % v)
                if FIX and hit:
                    cell[key] = head.strip()
                    fixed += 1

if FIX:
    open(PATH, 'w', encoding='utf-8', newline='').write(
        json.dumps(guides, ensure_ascii=False, indent=2) + '\n')
    print('\nfixed:', fixed)
print('cells with " || " in value:', found)
