# -*- coding: utf-8 -*-
"""Confirm that no ENGLISH page (guides/*.html without the _es suffix) contains
the accented Spanish "vía". Spanish pages are expected to have it.
"""
import glob
import re

bad = []
for f in sorted(glob.glob('guides/*.html')):
    if f.endswith('_es.html'):
        continue
    txt = open(f, encoding='utf-8').read()
    n = len(re.findall(r'\bvía\b', txt))
    if n:
        bad.append((f, n))

print('English pages scanned:', len([f for f in glob.glob('guides/*.html')
                                     if not f.endswith('_es.html')]))
print('English pages with an accented via:', len(bad))
for f, n in bad:
    print('  ', f, n)

es = [f for f in glob.glob('guides/*.html') if f.endswith('_es.html')
      and re.search(r'\bvía\b', open(f, encoding='utf-8').read())]
print('Spanish pages that still use via (expected, correct):', len(es))
