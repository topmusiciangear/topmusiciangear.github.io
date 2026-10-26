# -*- coding: utf-8 -*-
"""Print one line per plugin with the candidate fact values."""
import json
import sys

cat = sys.argv[1] if len(sys.argv) > 1 else 'plugins'
specs = json.load(open('temp/specs_%s.json' % cat, encoding='utf-8'))
bestfor = json.load(open('temp/bestfor_%s.json' % cat, encoding='utf-8'))
prods = [x for x in json.load(open('data/products.json', encoding='utf-8'))
         if x.get('category') == cat]

FIELDS = sys.argv[2].split(',') if len(sys.argv) > 2 else ['ptype', 'format', 'copyprot', 'latency', 'platforms']


def g(s, k):
    v = s.get(k) or []
    return ' || '.join(v)


for x in prods:
    pid = str(x['id'])
    s = specs.get(pid) or {}
    bf = ' || '.join(bestfor.get(pid) or [])
    print('%-5s %s' % (pid, x['title']))
    print('      BF: %s' % bf)
    for f in FIELDS:
        v = g(s, f)
        if v:
            print('      %-10s %s' % (f, v))
