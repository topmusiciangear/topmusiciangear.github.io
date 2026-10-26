# -*- coding: utf-8 -*-
"""Count how Spanish text on the site writes streaming / podcast / gaming words."""
import json
import re
from collections import Counter

guides = json.load(open('data/guides.json', encoding='utf-8'))
prods = json.load(open('data/products.json', encoding='utf-8'))


def es_strings(g):
    for field in ('title_es', 'metaDesc_es', 'intro_es', 'conclusion_es', 'verdict_es'):
        if g.get(field):
            yield g[field]
    for s in g.get('sections') or []:
        for field in ('heading_es', 'body_es'):
            if s.get(field):
                yield s[field]
    for q in g.get('faq') or []:
        for field in ('q_es', 'a_es'):
            if q.get(field):
                yield q[field]
    for key in ('pros_es', 'cons_es'):
        for x in g.get(key) or []:
            yield x


pats = {
    'streaming': re.compile(r'\bstreaming\b', re.I),
    'Pódcast': re.compile(r'\bp[óo]dcast\b', re.I),
    'directo': re.compile(r'\bdirecto\b', re.I),
    'gaming': re.compile(r'\bgaming\b', re.I),
    'videojuegos': re.compile(r'\bvideojuegos?\b', re.I),
    'estudio casero': re.compile(r'\bestudio (casero|en casa)\b', re.I),
    'home studio': re.compile(r'\bhome studio\b', re.I),
}

c = Counter()
for g in guides:
    for text in es_strings(g):
        for name, rx in pats.items():
            c[name] += len(rx.findall(text))

for name in pats:
    print('%-15s %5d' % (name, c[name]))

print()
print('ES product fields:')
c2 = Counter()
for p in prods:
    txt = ' '.join(str(x) for x in (p.get('title_es'), p.get('desc_es')) if x)
    for name, rx in pats.items():
        c2[name] += len(rx.findall(txt))
for name in pats:
    print('%-15s %5d' % (name, c2[name]))
