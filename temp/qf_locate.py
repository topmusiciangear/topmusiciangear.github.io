# -*- coding: utf-8 -*-
"""Locate each product of a category inside the guide comparison tables.

Usage:  python temp/qf_locate.py <category>

Prints one line per product with every guide+column whose header shares tokens
with the catalog title, so the fact scheme can be chosen from the table that
actually carries the product. Also flags products that appear in no table.
"""
import json
import re
import sys
import unicodedata

STOP = {'the', 'and', 'with', 'pro', 'plus', 'mk', 'ii', 'iii', 'gen', 'v2', 'v3',
        'audio', 'interface', 'amp', 'amplifier', 'combo'}

cat = sys.argv[1]


def norm(s):
    s = unicodedata.normalize('NFKD', s or '')
    s = ''.join(c for c in s if not unicodedata.combining(c))
    s = s.lower().replace('–', '-').replace('—', '-')
    return re.sub(r'[^a-z0-9]+', ' ', s).strip()


def ct(s):
    return {w for w in norm(s).split() if w and w not in STOP}


prods = [p for p in json.load(open('data/products.json', encoding='utf-8'))
         if p.get('category') == cat]
guides = json.load(open('data/guides.json', encoding='utf-8'))

for p in prods:
    pt = ct(p['title'])
    hits = []
    for g in guides:
        if not g.get('productTable'):
            continue
        cols = [c.get('title') or '' for c in g['productTable']['columns']]
        for i, c in enumerate(cols):
            cct = ct(c)
            if not cct:
                continue
            if cct <= pt or pt <= cct:
                hits.append('%s[%d] %s' % (g['id'], i, c))
    print('%4d %-46s %s' % (p['id'], p['title'][:46],
                            '; '.join(hits) if hits else 'NO TABLE'))
