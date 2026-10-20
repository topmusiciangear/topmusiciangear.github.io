"""Baja las fotos de zZounds que el usuario ha indicado (tamano grande) y las guarda.

Prueba la URL exacta y variantes de host/ruta por si el CDN bloquea.
"""
import hashlib
import io
import json
import os
import urllib.request

from PIL import Image

os.chdir(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36'

# catalogo (la que esta en products.json)  ->  URL grande indicada por el usuario
PAIRS = [
    (
        'https://cf1.zzounds.com/media/productmedia/fit%2C1200by630/quality%2C85/SennheiserFullWidth-033977c33d261eb2ee34a674b455d34d.jpg',
        'https://cf1.zzounds.com/media/productmedia/fit%2C2018by3200/quality%2C85/SennheiserFullWidth-033977c33d261eb2ee34a674b455d34d.jpg',
    ),
    (
        'https://cf1.zzounds.com/media/productmedia/fit%2C1200by1200/quality%2C85/at875r_1_sq-d131afcabb5d59bd3eae9b9d21f98b75.jpg',
        'https://cf1.zzounds.com/media/productmedia/fit%2C2018by3200/quality%2C85/at875r_1_sq-d131afcabb5d59bd3eae9b9d21f98b75.jpg',
    ),
]

headers = {
    'User-Agent': UA,
    'Accept': 'image/avif,image/webp,image/apng,image/*,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.9',
    'Referer': 'https://www.zzounds.com/',
}

mapping = json.load(open('temp/img_map.json', encoding='utf-8'))

for catalog_url, wanted in PAIRS:
    variants = [
        wanted,
        wanted.replace('https://cf1.', 'https://cf2.'),
        wanted.replace('https://cf1.zzounds.com/', 'https://www.zzounds.com/'),
        wanted.replace('https://cf1.zzounds.com/', 'https://media.zzounds.com/'),
        wanted.replace('https://', 'http://'),
    ]
    saved = False
    for url in variants:
        try:
            req = urllib.request.Request(url, headers=headers)
            with urllib.request.urlopen(req, timeout=30) as r:
                data = r.read()
            im = Image.open(io.BytesIO(data))
            im.load()
            key = hashlib.md5(catalog_url.encode('utf-8')).hexdigest()[:10]
            if im.mode not in ('RGB', 'RGBA'):
                im = im.convert('RGB')
            if max(im.size) > 1600:
                im.thumbnail((1600, 1600), Image.LANCZOS)
            dest = 'img/products/' + key + '.webp'
            im.save(dest, 'WEBP', quality=90, method=6)
            mapping[catalog_url] = 'img/products/' + key + '.webp'
            print('OK   %dx%d  %.0f KB  %s' % (im.size[0], im.size[1], os.path.getsize(dest) / 1024, dest))
            saved = True
            break
        except Exception as e:  # noqa: BLE001
            print('fallo %s  (%s)' % (url[:70], e))
    if not saved:
        print('NO SE PUDO: ' + wanted[:90])

json.dump(mapping, open('temp/img_map.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
