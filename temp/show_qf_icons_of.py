# -*- coding: utf-8 -*-
"""Print facts (with icons) for the given product ids."""
import json
import sys

prods = json.load(open('data/products.json', encoding='utf-8'))
by_id = {p['id']: p for p in prods}
for raw in sys.argv[1:]:
    pid = int(raw)
    p = by_id.get(pid)
    if not p:
        print(pid, 'MISSING')
        continue
    print('%d %s' % (pid, p['title']))
    print('   bestFor: %r / %r' % (p.get('bestFor', {}).get('en'),
                                   p.get('bestFor', {}).get('es')))
    for f in p.get('facts') or []:
        print('   %-14s %-22s %s=%s' % (f['icon'], f['label']['en'],
                                        f['label']['es'], f['value']))
    print()
