import re

for f in ('guides/best-bass-amps_es.html', 'guides/best-bass-practice-amps_es.html'):
    s = open(f, encoding='utf-8').read()
    print('===', f)
    # locate the Darkglass card
    idx = s.find('Darkglass DG210A')
    if idx < 0:
        print('not found')
        continue
    start = s.rfind('<div class="guide-product-card', 0, idx)
    end = s.find('<div class="guide-product-card', idx)
    card = s[start:end if end > 0 else len(s)]
    for m in re.finditer(r'<a data-store="([^"]+)"[^>]*href="([^"]+)"[^>]*>(.*?)</a>', card, re.S):
        txt = ' '.join(re.sub(r'<[^>]+>', ' ', m.group(3)).split())
        print(' ', m.group(1), '|', txt)
        print('    ', m.group(2)[:200])
    pb = re.search(r'class="shop-btn-primary"[^>]*>(.*?)</a>', card, re.S)
    if pb:
        print(' primary:', ' '.join(re.sub(r'<[^>]+>', ' ', pb.group(1)).split()))
