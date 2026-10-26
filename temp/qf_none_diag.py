# -*- coding: utf-8 -*-
"""For products with no specs, show product title vs plugin table columns sharing tokens."""
import json
import re
import sys
import unicodedata

cat = sys.argv[1] if len(sys.argv) > 1 else 'plugins'
g = json.load(open('data/guides.json', encoding='utf-8'))
p = json.load(open('data/products.json', encoding='utf-8'))
specs = json.load(open('temp/specs_%s.json' % cat, encoding='utf-8'))
PLUGIN_GUIDES = {x['id'] for x in g if x.get('category') == cat}


def norm(s):
    s = unicodedata.normalize('NFKD', s or '')
    s = ''.join(c for c in s if not unicodedata.combining(c))
    s = s.lower().replace('–', '-').replace('—', '-')
    return re.sub(r'[^a-z0-9.]+', ' ', s).strip()


cols = []
for guide in g:
    if guide.get('category') != cat:
        continue
    pt = guide.get('productTable') or {}
    for c in pt.get('columns') or []:
        cols.append((guide['id'], c.get('title'), norm(c.get('title') or '')))

for x in p:
    if x.get('category') != cat:
        continue
    if specs.get(str(x['id'])):
        continue
    t = norm(x['title'])
    toks = set(t.split()) - {'the', 'and', 'plugin', 'audio'}
    print('=' * 70)
    print('PRODUCT', x['id'], '|', x['title'], '   norm:', t)
    for gid, title, n in cols:
        ct = set(n.split()) - {'the', 'and', 'plugin', 'audio'}
        if toks & ct:
            print('    col:', gid, '::', title, '  norm:', n)
