# -*- coding: utf-8 -*-
"""Find Spanish-accented words that leaked into ENGLISH fields.

The SEO audit already looks for "versión" in rendered English pages. This scans
the two data files directly so the fix happens at the source, and it covers the
words that actually turned up during the quickfacts work ("vía" instead of
"via" was sitting in an English product description).

Only EN fields are inspected: any key ending in _es is skipped, and so is any
value under a key named *_es / es.

Run:  python temp/audit_es_leak.py
Exit: number of hits.
"""
import json
import re
import sys

# accented tokens that have no business in English copy
PATTERNS = [
    (r'\bvía\b', 'via'),
    (r'\bversi[ó]n\b', 'version'),
    (r'\btambién\b', 'también (Spanish)'),
    (r'\bgrabaci[ó]n\b', 'grabación (Spanish)'),
    (r'\bconexi[ó]n\b', 'conexión (Spanish)'),
    (r'\bselecci[ó]n\b', 'selección (Spanish)'),
    (r'\bmicr[ó]fono\b', 'micrófono (Spanish)'),
    (r'\bconfiguraci[ó]n\b', 'configuración (Spanish)'),
    (r'\bcancelaci[ó]n\b', 'cancelación (Spanish)'),
    (r'\baplicaci[ó]n\b', 'aplicación (Spanish)'),
    (r'\bdescripci[ó]n\b', 'descripción (Spanish)'),
    (r'\bfunci[ó]n\b', 'función (Spanish)'),
    (r'\bopci[ó]n\b', 'opción (Spanish)'),
    (r'\bsoluci[ó]n\b', 'solución (Spanish)'),
    (r'\binformaci[ó]n\b', 'información (Spanish)'),
    (r'\bcondici[ó]n\b', 'condición (Spanish)'),
    (r'\braz[ó]n\b', 'razón (Spanish)'),
]

FILES = ['data/products.json', 'data/guides.json']


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
        for pat, name in PATTERNS:
            for m in re.finditer(pat, node, re.I):
                s = max(0, m.start() - 55)
                out.append((path, name, node[s:m.end() + 55].replace('\n', ' ')))


def main():
    total = 0
    for f in FILES:
        data = json.load(open(f, encoding='utf-8'))
        out = []
        walk(data, '', out)
        print('=' * 70)
        print(f, '->', len(out), 'hits')
        for path, name, ctx in out:
            print('  %-60s %-22s %s' % (path[-60:], name, ctx))
        total += len(out)
    print()
    print('TOTAL', total)
    return total


sys.exit(main())
