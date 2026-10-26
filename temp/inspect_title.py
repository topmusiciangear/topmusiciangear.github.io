# -*- coding: utf-8 -*-
"""Inspect the generated title of one guide and where it comes from."""
import json
import re

GID = 'best-monitors-for-small-rooms'

g = [x for x in json.load(open('data/guides.json', encoding='utf-8'))
     if x['id'] == GID][0]
print('keys:', list(g.keys()))
for k in g:
    if 'title' in k.lower() or 'seo' in k.lower():
        v = g[k]
        if isinstance(v, str):
            print('  %-16s %r (%d)' % (k, v, len(v)))

h = open('guides/%s.html' % GID, encoding='utf-8').read()
print()
print('title tag :', re.findall(r'<title>(.*?)</title>', h))
print('og:title  :', re.findall(r'property="og:title" content="([^"]*)"', h))
print('h1        :', [re.sub(r'<[^>]+>', '', x) for x in
                       re.findall(r'<h1[^>]*>(.*?)</h1>', h, re.S)][:2])
