"""Baja las 3 fotos que no se pudieron descargar (zZounds bloquea) desde otra tienda.

Se guardan con la misma clave md5 que las demas (md5 de la URL original del catalogo),
asi el mapa URL -> archivo local sigue siendo consistente.
"""
import hashlib
import io
import json
import os
import urllib.request

from PIL import Image

os.chdir(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36'
OUT = 'img/products'

PAIRS = {
    # catalogo (zZounds, bloquea)  ->  fuente alternativa
    'https://cf1.zzounds.com/media/productmedia/fit%2C1200by1200/quality%2C85/at875r_1_sq-d131afcabb5d59bd3eae9b9d21f98b75.jpg':
        'https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/_20/208654/10980071_800.jpg',
    'https://cf1.zzounds.com/media/productmedia/fit%2C1200by630/quality%2C85/SennheiserFullWidth-033977c33d261eb2ee34a674b455d34d.jpg':
        'https://images.musicstore.de/images/1600/sennheiser-mkh-50-p48_1_REC0014199-000.jpg',
    'https://cf1.zzounds.com/media/productmedia/fit%2C1200by630/quality%2C85/CavernsFaceNewLogoHiRes-5c215819a8740c25e8c220cdcb52b2b5.jpg':
        'https://cdn11.bigcommerce.com/s-4hc0jwsnnq/products/13761/images/50053/153429-tmp4715__61300.1715109711.1280.1280.jpg?c=1',
}

mapping = json.load(open('temp/img_map.json', encoding='utf-8'))

for original, source in PAIRS.items():
    key = hashlib.md5(original.encode('utf-8')).hexdigest()[:10]
    req = urllib.request.Request(source, headers={'User-Agent': UA, 'Referer': source.split('/')[0] + '//' + source.split('/')[2] + '/'})
    with urllib.request.urlopen(req, timeout=30) as r:
        data = r.read()
    im = Image.open(io.BytesIO(data))
    im.load()
    if im.mode not in ('RGB', 'RGBA'):
        im = im.convert('RGB')
    if max(im.size) > 1200:
        im.thumbnail((1200, 1200), Image.LANCZOS)
    dest = os.path.join(OUT, key + '.webp')
    im.save(dest, 'WEBP', quality=88, method=6)
    mapping[original] = 'img/products/' + key + '.webp'
    print('%s  %dx%d  %.0f KB  <- %s' % (key, im.size[0], im.size[1], os.path.getsize(dest) / 1024, source))

json.dump(mapping, open('temp/img_map.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('mapa: %d URLs' % len(mapping))
