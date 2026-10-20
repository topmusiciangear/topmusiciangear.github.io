"""Guarda en el repo las fotos de las ofertas (deals.json + manual-deals.json).

- Reutiliza temp/img_map.json si la URL ya esta guardada (fotos de producto).
- Si no, descarga, convierte a WebP 1200 px y guarda img/products/<md5(url)>.webp.
- Escribe temp/deal_img_map.json {url: "img/products/x.webp"}.

Uso: python temp/localize_deal_images.py
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
OUT = 'img/products'
os.makedirs(OUT, exist_ok=True)

main_map = json.load(open('temp/img_map.json', encoding='utf-8'))
deal_map = {}
failed = []
seen = set()

for file in ['data/deals.json', 'data/manual-deals.json']:
    data = json.load(open(file, encoding='utf-8'))
    items = data if isinstance(data, list) else data.get('deals', [])
    for d in items:
        url = d.get('img') or ''
        if not url.startswith('http') or url in seen:
            continue
        seen.add(url)
        if url in main_map:
            deal_map[url] = main_map[url]
            continue
        key = hashlib.md5(url.encode('utf-8')).hexdigest()[:10]
        dest = os.path.join(OUT, key + '.webp')
        rel = 'img/products/' + key + '.webp'
        if os.path.exists(dest):
            deal_map[url] = rel
            main_map[url] = rel
            continue
        parsed = urllib.parse.urlparse(url)
        req = urllib.request.Request(url, headers={
            'User-Agent': UA,
            'Accept': 'image/avif,image/webp,image/*,*/*;q=0.8',
            'Referer': parsed.scheme + '://' + parsed.netloc + '/',
        })
        try:
            with urllib.request.urlopen(req, timeout=30) as r:
                raw = r.read()
            im = Image.open(io.BytesIO(raw))
            im.load()
            if im.mode not in ('RGB', 'RGBA'):
                im = im.convert('RGB')
            if max(im.size) > 1200:
                im.thumbnail((1200, 1200), Image.LANCZOS)
            im.save(dest, 'WEBP', quality=88, method=6)
            deal_map[url] = rel
            main_map[url] = rel
            print('OK   %s  %dx%d  %s' % (key, im.size[0], im.size[1], url[:80]))
        except Exception as e:  # noqa: BLE001
            failed.append({'url': url, 'error': str(e)})
            print('FALLO %s  (%s)' % (url[:90], e))

json.dump(deal_map, open('temp/deal_img_map.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
json.dump(main_map, open('temp/img_map.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('\nURLs de ofertas: %d | guardadas: %d | fallos: %d' % (len(seen), len(deal_map), len(failed)))
