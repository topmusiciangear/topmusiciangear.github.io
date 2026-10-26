# -*- coding: utf-8 -*-
"""List the icon names the quickfacts renderer understands."""
import re

s = open('build-guides.js', encoding='utf-8').read()
i = s.find('function _qfIcon')
seg = s[i:i + 12000]
names = sorted(set(re.findall(r"name === '([a-zA-Z]+)'", seg)))
print('icons:', names)

# which icons do products already use?
import json
from collections import Counter
prods = json.load(open('data/products.json', encoding='utf-8'))
used = Counter()
weird = []
for p in prods:
    for f in p.get('facts') or []:
        used[f.get('icon')] += 1
        if f.get('icon') == 'arrowLeft':
            weird.append(p['id'])
print('in use:', dict(used))
print('unknown in use:', sorted(set(used) - set(names)))
print('products with arrowLeft icon:', weird)

