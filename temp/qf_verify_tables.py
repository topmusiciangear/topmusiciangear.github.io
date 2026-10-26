# -*- coding: utf-8 -*-
checks = [
    ('guides/beginner-guitar_es.html',
     ['25,6" (650 mm)', 'Arce, 22 trastes', '22, arce', '\u00c1lamo']),
    ('guides/best-beginner-electric-guitar_es.html',
     ['24,75" (629 mm)', '2 humbuckers (Alnico II/V)', 'Tune-o-matic',
      '22 medium jumbo, arce/laurel']),
    ('guides/best-electric-guitars-2026_es.html',
     ['Pino', '22, arce, 9,5"']),
    ('guides/beginner-guitar.html',
     ['25.6 in (650 mm)', 'Maple, 22 frets', '22, maple', 'Poplar']),
    ('guides/best-electric-guitars-2026.html',
     ['Pine', '22, maple, 9.5"']),
]
fail = 0
for path, pats in checks:
    s = open(path, encoding='utf-8').read()
    print(path)
    for p in pats:
        ok = p in s
        if not ok:
            fail += 1
        print('   ', 'OK  ' if ok else 'MISS', p)
print()
print('MISSES:', fail)
