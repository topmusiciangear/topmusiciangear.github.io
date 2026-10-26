import re

for f in ('guides/best-bass-amps_es.html', 'guides/best-bass-practice-amps_es.html'):
    s = open(f, encoding='utf-8').read()
    print('===', f)
    for m in re.finditer('DG210A', s):
        print('  at', m.start(), repr(s[max(0, m.start()-120):m.start()+160]))
        break
    print('  data-store count:', s.count('data-store='))
