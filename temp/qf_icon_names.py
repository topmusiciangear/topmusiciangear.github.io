# -*- coding: utf-8 -*-
"""List real icon keys from js/icons.js and validate every product fact icon."""
import json
import re

src = open('js/icons.js', encoding='utf-8').read()
keys = sorted(set(re.findall(r'^\s{2}([A-Za-z][A-Za-z0-9]*):\s*\{\s*path:', src, re.M)))
print('icons.js keys (%d):' % len(keys))
print(', '.join(keys))

build = open('build-guides.js', encoding='utf-8').read()
start = build.find('function _qfIcon')
seg = build[start:build.find('_cardBase', start)]
custom = set(re.findall(r"name === '([a-zA-Z]+)'", seg))

prods = json.load(open('data/products.json', encoding='utf-8'))
bad = {}
used = {}
for p in prods:
    for f in p.get('facts') or []:
        ic = f.get('icon')
        used[ic] = used.get(ic, 0) + 1
        if ic not in keys and ic not in custom:
            bad.setdefault(ic, []).append(p['id'])

print()
print('facts icons in use:', sorted(used))
print('unresolvable:', bad)
