# -*- coding: utf-8 -*-
"""Category census + which comparison-table rows a category can draw on.

Prints, for one product category (arg 1), every product without quickfacts and
the rows of every guide table the product appears in — so a scheme can be
chosen from real data instead of guessing.
"""
import json
import sys
from collections import Counter, defaultdict

CAT = sys.argv[1] if len(sys.argv) > 1 else 'keyboards'

products = json.load(open('data/products.json', encoding='utf-8'))
guides = json.load(open('data/guides.json', encoding='utf-8'))

print('categories:')
for c, n in sorted(Counter(p.get('category') for p in products).items(),
                   key=lambda kv: -kv[1]):
    flag = '  <== ' + CAT if c == CAT else ''
    print('   %-18s %3d%s' % (c, n, flag))
print()

cat_products = [p for p in products if p.get('category') == CAT]
have = [p for p in cat_products if p.get('facts')]
print('%s: %d products, %d with facts, %d pending'
      % (CAT, len(cat_products), len(have), len(cat_products) - len(have)))
print()

# guide tables that contain these products
names = {}
for p in cat_products:
    for k in ('title', 'title_es', 'name'):
        if p.get(k):
            names[p[k].strip().lower()] = p['id']

def norm(s):
    return ' '.join(str(s).lower().split())

rows_by_guide = defaultdict(list)
for g in guides:
    pt = g.get('productTable') or {}
    cols = [c.get('title') for c in pt.get('columns', [])]
    hit = [c for c in cols if c and norm(c) in names]
    if not hit:
        continue
    rows_by_guide[g['id']] = {
        'cols': cols,
        'rows': [r.get('label') for r in pt.get('rows', [])],
        'matched': hit,
    }

print('guides containing %s products: %d' % (CAT, len(rows_by_guide)))
for gid, info in rows_by_guide.items():
    print('  %-42s %d cols | rows: %s'
          % (gid, len(info['cols']), ', '.join(info['rows'])))

print()
print('pending products:')
for p in cat_products:
    if not p.get('facts'):
        print('  %3s  %-14s %s' % (p['id'], p.get('category'), p.get('title')))
