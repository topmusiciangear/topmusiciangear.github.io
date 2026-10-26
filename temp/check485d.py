import re, json

for f in ('guides/best-bass-amps.html', 'guides/best-bass-amps_es.html',
          'guides/best-bass-practice-amps.html', 'guides/best-bass-practice-amps_es.html'):
    s = open(f, encoding='utf-8').read()
    print('===', f, 'DG210A count', s.count('DG210A'), '| 485 count', s.count('485'))
    m = re.search(r'<div class="guide-product-card"[^>]*>', s)
    if m:
        print('  card tag sample:', m.group(0)[:300])
