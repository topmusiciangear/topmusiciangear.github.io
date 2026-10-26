import re

for f in ('guides/best-bass-amps_es.html', 'guides/best-bass-practice-amps_es.html'):
    s = open(f, encoding='utf-8').read()
    print('===', f)
    chunks = s.split('<div class="guide-product-card">')
    hits = [c for c in chunks if 'DG210A' in c]
    print('chunks with DG210A:', len(hits))
    for card in hits:
        card = card.split('<div class="guide-product-card">')[0]
        for m in re.finditer(r'<a data-store="([^"]+)"[^>]*href="([^"]+)"[^>]*>(.*?)</a>', card, re.S):
            txt = ' '.join(re.sub(r'<[^>]+>', ' ', m.group(3)).split())
            print(' ', m.group(1), '|', txt)
            print('    ', m.group(2)[:210])
