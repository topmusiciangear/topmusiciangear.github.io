"""Guarda la foto de Keeley Caverns V2 que ha indicado el usuario (vista en angulo)
y la pone como foto del producto 595 en products.json / guides.json.

zZounds responde 403 a nuestro servidor, asi que la descarga se hace con un proxy
de imagen que pide exactamente la misma URL.
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

FACE = 'https://cf1.zzounds.com/media/productmedia/fit%2C1200by630/quality%2C85/CavernsFaceNewLogoHiRes-5c215819a8740c25e8c220cdcb52b2b5.jpg'
ANGLE = 'https://cf1.zzounds.com/media/productmedia/fit%2C2018by3200/quality%2C85/CavernsAngleNewLogoHiRes_837786-3a1bc24e77794f0c0f785d32f367c9b2.jpg'

u = urllib.parse.quote(ANGLE, safe='')
PROXIES = [
    'https://images.weserv.nl/?n=-1&output=jpg&url=' + u,
    'https://wsrv.nl/?n=-1&url=' + u,
    'https://api.allorigins.win/raw?url=' + u,
    'https://api.codetabs.com/v1/proxy/?quest=' + u,
]

data = None
for p in PROXIES:
    try:
        req = urllib.request.Request(p, headers={'User-Agent': UA, 'Accept': 'image/*,*/*;q=0.8'})
        with urllib.request.urlopen(req, timeout=45) as r:
            raw = r.read()
            ctype = r.headers.get('content-type', '')
        if len(raw) > 5000 and 'text/html' not in ctype:
            data = raw
            print('descargada via ' + p.split('?')[0])
            break
        print('descartado (%s, %d bytes)' % (ctype, len(raw)))
    except Exception as e:  # noqa: BLE001
        print('fallo %s (%s)' % (p.split('?')[0], e))

if not data:
    raise SystemExit('no se pudo descargar')

im = Image.open(io.BytesIO(data))
im.load()
if im.mode not in ('RGB', 'RGBA'):
    im = im.convert('RGB')
if max(im.size) > 1600:
    im.thumbnail((1600, 1600), Image.LANCZOS)
key = hashlib.md5(ANGLE.encode('utf-8')).hexdigest()[:10]
rel = 'img/products/' + key + '.webp'
im.save(rel, 'WEBP', quality=90, method=6)
print('%dx%d  %.0f KB  -> %s' % (im.size[0], im.size[1], os.path.getsize(rel) / 1024, rel))

# mapa URL -> archivo (para futuras descargas y para el script de aplicacion)
mapping = json.load(open('temp/img_map.json', encoding='utf-8'))
mapping[ANGLE] = rel
mapping[FACE] = rel
json.dump(mapping, open('temp/img_map.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)

# sustitucion de texto en los dos JSON (sin reformatear)
for f in ['data/products.json', 'data/guides.json']:
    s = open(f, encoding='utf-8').read()
    n = s.count('img/products/521925cff9.webp')
    s = s.replace('img/products/521925cff9.webp', rel)
    open(f, 'w', encoding='utf-8', newline='').write(s)
    print('%s: %d sustituciones -> %s' % (f, n, rel))
