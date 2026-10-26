# -*- coding: utf-8 -*-
"""Coverage report per category: which fact rows are available for each product."""
import json
import sys

cat = sys.argv[1] if len(sys.argv) > 1 else 'plugins'
specs = json.load(open('temp/specs_%s.json' % cat, encoding='utf-8'))
prods = [x for x in json.load(open('data/products.json', encoding='utf-8'))
         if x.get('category') == cat]

KINDS = sys.argv[2].split(',') if len(sys.argv) > 2 else ['ptype', 'format', 'copyprot', 'latency', 'platforms']

print('products:', len(prods), '| with specs:', len(specs))
full = partial = none = 0
for x in prods:
    s = specs.get(str(x['id'])) or {}
    have = [k for k in KINDS if s.get(k)]
    miss = [k for k in KINDS if not s.get(k)]
    if not miss:
        full += 1
    elif have:
        partial += 1
        print('  PARTIAL %-5s %-45s have=%s miss=%s' % (x['id'], x['title'][:45], have, miss))
    else:
        none += 1
        print('  NONE    %-5s %s' % (x['id'], x['title']))
print()
print('full:', full, 'partial:', partial, 'none:', none)
