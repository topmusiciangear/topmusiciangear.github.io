# -*- coding: utf-8 -*-
"""Print bestFor (en/es) and facts for the given product ids."""
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
    bf = p.get('bestFor') or {}
    print('%4d %s' % (pid, p['title'][:44]))
    print('      en: %r' % bf.get('en'))
    print('      es: %r' % bf.get('es'))
    for f in p.get('facts') or []:
        print('      %-10s %-16s -> %s' % (f['icon'], f['label']['en'],
                                           f['value']))
