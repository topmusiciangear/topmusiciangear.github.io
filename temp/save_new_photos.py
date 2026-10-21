"""Guarda las fotos nuevas que ha indicado el usuario y las asigna al producto.

468  Neumann KH 810 II     -> BigCommerce (Andertons)
648  MiniDSP UMIK-1       -> Amazon
650  Auralex MoPAD-XL     -> BigCommerce
"""
import hashlib
import io
import json
import os
import urllib.parse
import urllib.request

from PIL import Image

os.chdir(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36'

ITEMS = [
    (468, 'https://cdn11.bigcommerce.com/s-4hc0jwsnnq/images/stencil/original/products/45072/227529/700282_7__56342.1757427093.jpg?c=1'),
    (648, 'https://m.media-amazon.com/images/I/51FrgWE6W7L._AC_SL1200_.jpg'),
    (650, 'https://cdn11.bigcommerce.com/s-pbjm8zp7wl/images/stencil/1280x1280/products/114/882/MoPAD-XL-Set-1k-web__22522.1686836468.png?c=1?imbypass=on'),
]

mapping = json.load(open('temp/img_map.json', encoding='utf-8'))

for pid, url in ITEMS:
    parsed = urllib.parse.urlparse(url)
    req = urllib.request.Request(url, headers={
        'User-Agent': UA,
        'Accept': 'image/avif,image/webp,image/*,*/*;q=0.8',
        'Referer': parsed.scheme + '://' + parsed.netloc + '/',
    })
    with urllib.request.urlopen(req, timeout=45) as r:
        data = r.read()
    im = Image.open(io.BytesIO(data))
    im.load()
    if im.mode not in ('RGB', 'RGBA'):
        im = im.convert('RGBA' if 'A' in im.getbands() else 'RGB')
    if max(im.size) > 1400:
        im.thumbnail((1400, 1400), Image.LANCZOS)
    key = hashlib.md5(url.encode('utf-8')).hexdigest()[:10]
    rel = 'img/products/' + key + '.webp'
    im.save(rel, 'WEBP', quality=90, method=6)
    mapping[url] = rel
    print('id %d  %dx%d  %.0f KB  -> %s' % (pid, im.size[0], im.size[1], os.path.getsize(rel) / 1024, rel))

json.dump(mapping, open('temp/img_map.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)

# asignar al producto (reemplazo de texto, sin reformatear)
prods = json.load(open('data/products.json', encoding='utf-8'))
by_id = {p['id']: p for p in prods}
s = open('data/products.json', encoding='utf-8').read()
for pid, url in ITEMS:
    old = by_id[pid]['img']
    new = mapping[url]
    if old != new:
        s = s.replace('"img": "%s"' % old, '"img": "%s"' % new)
        print('id %d: %s -> %s' % (pid, old, new))
open('data/products.json', 'w', encoding='utf-8', newline='').write(s)
