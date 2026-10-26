# -*- coding: utf-8 -*-
"""Print description + store links for a set of product ids."""
import json
import sys

ps = {p['id']: p for p in json.load(open('data/products.json', encoding='utf-8'))}
for a in sys.argv[1:]:
    p = ps[int(a)]
    print('=' * 100)
    print(p['id'], p['title'], '|', p['category'], '| price', p.get('price'))
    print('DESC:', p.get('desc'))
    print('STORES:', ', '.join((p.get('stores') or {}).keys()))
    print()
