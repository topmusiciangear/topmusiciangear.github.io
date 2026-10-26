# -*- coding: utf-8 -*-
"""Find every fact whose icon name looks semantically wrong for its label."""
import json

prods = json.load(open('data/products.json', encoding='utf-8'))

SUSPECT = {'arrowLeft', 'arrowRight', 'star', 'circleCheck', 'lock', 'clock'}

for p in prods:
    for f in p.get('facts') or []:
        if f.get('icon') in SUSPECT:
            print('%4d %-40s %-10s %-18s %s'
                  % (p['id'], p['title'][:40], f['icon'],
                     f['label']['en'], f['value']))
