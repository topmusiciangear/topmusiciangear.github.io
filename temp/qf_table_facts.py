# -*- coding: utf-8 -*-
"""Print the facts already stored on the products that fill a guide's columns."""
import json
import sys

gid = sys.argv[1]
guides = json.load(open('data/guides.json', encoding='utf-8'))
prods = json.load(open('data/products.json', encoding='utf-8'))
g = [x for x in guides if x['id'] == gid][0]

for i, c in enumerate(g['productTable']['columns']):
    title = c.get('title')
    match = [p for p in prods if p['title'] == title]
    if not match:
        print('[%d] %-34s (no product)' % (i, title))
        continue
    p = match[0]
    facts = p.get('facts') or []
    if not facts:
        print('[%d] %-34s %s  NO FACTS' % (i, title, p['id']))
        continue
    print('[%d] %-34s %s  %s' % (i, title, p['id'],
                                 ' | '.join('%s=%s' % (f['label']['en'], f['value'])
                                            for f in facts)))
