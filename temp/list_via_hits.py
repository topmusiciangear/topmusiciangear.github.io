# -*- coding: utf-8 -*-
"""List every accented "vía" in an ENGLISH field of data/guides.json, with context."""
import json
import re

PATH = 'data/guides.json'


def walk(node, path, out):
    if isinstance(node, dict):
        for k, v in node.items():
            if k == 'es' or k.endswith('_es'):
                continue
            walk(v, path + '.' + k, out)
    elif isinstance(node, list):
        for i, v in enumerate(node):
            walk(v, '%s[%d]' % (path, i), out)
    elif isinstance(node, str):
        if 'vía' in node or 'Vía' in node:
            out.append((path, node))


guides = json.load(open(PATH, encoding='utf-8'))
total = 0
for g in guides:
    hits = []
    walk(g, '', hits)
    if not hits:
        continue
    print('=' * 78)
    print(g['id'])
    for path, s in hits:
        total += 1
        i = s.find('vía') if 'vía' in s else s.find('Vía')
        first = re.search(r'\bvía\b|\bVía\b', s)
        j = first.start() if first else 0
        print('   %-46s ...%s...' % (path.lstrip('.'), s[max(0, j - 60):j + 60].replace('\n', ' ')))
print()
print('TOTAL', total)
