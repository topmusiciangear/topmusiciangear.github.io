# -*- coding: utf-8 -*-
"""Show any EN field where the letters "vía" appear inside a longer word."""
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
    elif isinstance(node, str) and ('vía' in node or 'Vía' in node):
        out.append((path, node))


for g in json.load(open(PATH, encoding='utf-8')):
    hits = []
    walk(g, '', hits)
    for path, s in hits:
        for m in re.finditer(r'\S*vía\S*|\S*Vía\S*', s):
            print(g['id'], '|', path.lstrip('.'), '|', repr(m.group(0)))
            i = m.start()
            print('    ...', s[max(0, i - 70):i + 70].replace('\n', ' '), '...')
