"""Descarga TODAS las fotos externas de las guias y las guarda en el repo.

Motivo: si la tienda de origen cambia o borra la foto, la guia se queda sin imagen.
Con las fotos en `img/products/` no dependemos de nadie.

- Entrada: temp/img_manifest.json  ([{url, refs}])
- Cache:   temp/cut_cache (descargas previas del pipeline de recortes, nombre = md5[0:10].*)
- Salida:  img/products/<md5[0:10]>.webp  +  temp/img_map.json  {url: "img/products/x.webp"}
- Fallos:  temp/img_failed.json

Uso: python temp/migrate_images.py
"""
import hashlib
import io
import json
import os
import time
import urllib.parse
import urllib.request
from concurrent.futures import ThreadPoolExecutor, as_completed

from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(ROOT)

CACHE = 'temp/cut_cache'
OUT = 'img/products'
os.makedirs(OUT, exist_ok=True)

MAX_SIDE = 1200
QUALITY = 88
UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36'


def key_for(url):
    return hashlib.md5(url.encode('utf-8')).hexdigest()[:10]


def cache_file(key):
    if not os.path.isdir(CACHE):
        return None
    for name in os.listdir(CACHE):
        if name.startswith(key + '.'):
            return os.path.join(CACHE, name)
    return None


def fetch(url, tries=3):
    """Descarga los bytes de la imagen. Devuelve (bytes, origen) o (None, error)."""
    parsed = urllib.parse.urlparse(url)
    headers = {
        'User-Agent': UA,
        'Accept': 'image/avif,image/webp,image/apng,image/*,*/*;q=0.8',
        'Referer': parsed.scheme + '://' + parsed.netloc + '/',
    }
    last = ''
    for i in range(tries):
        try:
            req = urllib.request.Request(url, headers=headers)
            with urllib.request.urlopen(req, timeout=25) as r:
                data = r.read()
            if not data:
                last = 'vacio'
            else:
                return data, 'red'
        except Exception as e:  # noqa: BLE001
            last = str(e)
        time.sleep(1.2 * (i + 1))
    return None, last


def convert(data):
    im = Image.open(io.BytesIO(data))
    im.load()
    if im.mode not in ('RGB', 'RGBA'):
        im = im.convert('RGBA' if 'A' in im.getbands() or im.mode == 'P' else 'RGB')
    if max(im.size) > MAX_SIDE:
        im.thumbnail((MAX_SIDE, MAX_SIDE), Image.LANCZOS)
    buf = io.BytesIO()
    im.save(buf, 'WEBP', quality=QUALITY, method=6)
    return buf.getvalue()


def work(item):
    url = item['url']
    key = key_for(url)
    dest = os.path.join(OUT, key + '.webp')
    rel = 'img/products/' + key + '.webp'
    if os.path.exists(dest) and os.path.getsize(dest) > 0:
        return url, rel, 'ya existia', 0
    src = cache_file(key)
    if src:
        try:
            data = open(src, 'rb').read()
            out = convert(data)
            open(dest, 'wb').write(out)
            return url, rel, 'cache', len(out)
        except Exception as e:  # noqa: BLE001
            pass
    data, origin = fetch(url)
    if not data:
        return url, None, 'ERROR: ' + origin, 0
    try:
        out = convert(data)
    except Exception as e:  # noqa: BLE001
        return url, None, 'ERROR formato: ' + str(e), 0
    open(dest, 'wb').write(out)
    return url, rel, origin, len(out)


def main():
    items = json.load(open('temp/img_manifest.json', encoding='utf-8'))
    mapping = {}
    failed = []
    total_bytes = 0
    done = 0
    with ThreadPoolExecutor(max_workers=8) as ex:
        futs = {ex.submit(work, it): it for it in items}
        for fut in as_completed(futs):
            url, rel, status, size = fut.result()
            done += 1
            if rel:
                mapping[url] = rel
                total_bytes += size
            else:
                failed.append({'url': url, 'error': status})
                print('FALLO %s  %s' % (status, url), flush=True)
            if done % 25 == 0:
                print('%d/%d  (%.1f MB)' % (done, len(items), total_bytes / 1e6), flush=True)

    json.dump(mapping, open('temp/img_map.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    json.dump(failed, open('temp/img_failed.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    print('\nOK: %d/%d  ->  %.1f MB en %s' % (len(mapping), len(items), total_bytes / 1e6, OUT))
    print('fallos: %d (ver temp/img_failed.json)' % len(failed))


if __name__ == '__main__':
    main()
