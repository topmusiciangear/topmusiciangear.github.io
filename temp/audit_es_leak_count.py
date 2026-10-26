# -*- coding: utf-8 -*-
"""Count the Spanish-accented tokens sitting in ENGLISH fields (no fixing)."""
import json
import re
import sys
from collections import Counter

FILES = ['data/products.json', 'data/guides.json']
PAT = re.compile(r'\bv[ií]a\b', re.I)


def walk(node, path, out, skip_es=True):
    if isinstance(node, dict):
        for k, v in node.items():
            if skip_es and (k == 'es' or k.endswith('_es')):
                continue
            walk(v, path + '.' + k, out, skip_es)
    elif isinstance(node, list):
        for i, v in enumerate(node):
            walk(v, '%s[%d]' % (path, i), out, skip_es)
    elif isinstance(node, str):
        if 'vía' in node or 'Vía' in node:
            out.append((path, node))


for f in FILES:
    data = json.load(open(f, encoding='utf-8'))
    hits = []
    walk(data, '', hits)
    print('=' * 60)
    print(f, '->', len(hits), 'EN fields with an accented vía')
    keys = Counter(re.sub(r'\[\d+\]', '[]', p).lstrip('.') for p, _ in hits)
    for k, n in keys.most_common():
        print('   %-56s %d' % (k, n))
    # how many guides / products are affected
    roots = set(re.sub(r'\.\[?.*$', '', p) if not p.startswith('[') else
                re.match(r'\[(\d+)\]', p).group(1) for p, _ in hits)
    print('   affected entries:', len(roots))

    # sanity: confirm the ES side does contain accents (i.e. we are not
    # accidentally reporting Spanish fields as English)
    es_hits = []
    walk(data, '', es_hits, skip_es=False)
    acc_es = sum(1 for p, s in es_hits if 'vía' in s)
    print('   (fields with vía counting ES too: %d)' % acc_es)
