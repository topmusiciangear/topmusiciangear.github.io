"""Prueba proxies de imagen para bajar las fotos de zZounds (nuestro servidor recibe 403).

No cambia la foto: pide exactamente la URL del usuario, solo que la descarga la hace
otro servidor. Guarda el resultado en img/products/<md5(url catalogo)>.webp.
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

PAIRS = [
    (
        'https://cf1.zzounds.com/media/productmedia/fit%2C1200by630/quality%2C85/SennheiserFullWidth-033977c33d261eb2ee34a674b455d34d.jpg',
        'https://cf1.zzounds.com/media/productmedia/fit%2C2018by3200/quality%2C85/SennheiserFullWidth-033977c33d261eb2ee34a674b455d34d.jpg',
    ),
    (
        'https://cf1.zzounds.com/media/productmedia/fit%2C1200by1200/quality%2C85/at875r_1_sq-d131afcabb5d59bd3eae9b9d21f98b75.jpg',
        'https://cf1.zzounds.com/media/productmedia/fit%2C2018by3200/quality%2C85/at875r_1_sq-d131afcabb5d59bd3eae9b9d21f98b75.jpg',
    ),
    (
        'https://cf1.zzounds.com/media/productmedia/fit%2C1200by630/quality%2C85/CavernsFaceNewLogoHiRes-5c215819a8740c25e8c220cdcb52b2b5.jpg',
        'https://cf1.zzounds.com/media/productmedia/fit%2C2018by3200/quality%2C85/CavernsFaceNewLogoHiRes-5c215819a8740c25e8c220cdcb52b2b5.jpg',
    ),
]


def proxies(url):
    u = urllib.parse.quote(url, safe='')
    return [
        'https://images.weserv.nl/?n=-1&output=jpg&url=' + u,
        'https://wsrv.nl/?n=-1&url=' + u,
        'https://api.allorigins.win/raw?url=' + u,
        'https://api.codetabs.com/v1/proxy/?quest=' + u,
        'https://corsproxy.io/?' + u,
    ]


def fetch_bytes(url):
    req = urllib.request.Request(url, headers={'User-Agent': UA, 'Accept': 'image/*,*/*;q=0.8'})
    with urllib.request.urlopen(req, timeout=45) as r:
        return r.read(), r.headers.get('content-type', '')


mapping = json.load(open('temp/img_map.json', encoding='utf-8'))

for catalog_url, wanted in PAIRS:
    saved = False
    for url in proxies(wanted):
        try:
            data, ctype = fetch_bytes(url)
            if len(data) < 5000 or 'text/html' in ctype:
                print('descartado (%s, %d bytes) %s' % (ctype, len(data), url[:60]))
                continue
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
            print('OK %dx%d %.0f KB -> %s' % (im.size[0], im.size[1], os.path.getsize(dest) / 1024, dest))
            saved = True
            break
        except Exception as e:  # noqa: BLE001
            print('fallo %s (%s)' % (url[:55], e))
    if not saved:
        print('SIN SUERTE: ' + catalog_url[-60:])

json.dump(mapping, open('temp/img_map.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
