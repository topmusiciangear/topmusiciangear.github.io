"""Prueba de recorte con modelos de segmentacion (rembg)."""
import os
import sys

import numpy as np
from PIL import Image, ImageFilter

os.chdir(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from rembg import remove, new_session

MODEL = sys.argv[1] if len(sys.argv) > 1 else 'isnet-general-use'
URLS = sys.argv[2:] or ['https://r2.gear4music.com/media/41/419099/1200/preview.jpg']

session = new_session(MODEL)


def fetch(url):
    if url.startswith('http'):
        import hashlib
        import urllib.request
        key = hashlib.md5(url.encode()).hexdigest()[:10]
        ext = os.path.splitext(url.split('?')[0])[1] or '.jpg'
        cache = os.path.join('temp', 'cut_cache', 'test_' + key + ext)
        if not os.path.exists(cache):
            req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req, timeout=45) as r, open(cache, 'wb') as f:
                f.write(r.read())
        return Image.open(cache).convert('RGBA')
    return Image.open(url).convert('RGBA')


def stats(im):
    a = np.asarray(im.getchannel('A')).astype(float) / 255.0
    rgb = np.asarray(im.convert('RGB')).astype(float)
    mn = rgb.min(axis=2)
    opaque = a > 0.15
    # pixeles claros que quedan opacos junto al borde transparente = posible halo blanco
    edge = opaque & ~np.asarray(Image.fromarray((opaque * 255).astype('uint8')).filter(ImageFilter.MinFilter(5))) > 0
    rim = edge & (mn > 215)
    return opaque.mean(), rim.sum() / max(edge.sum(), 1)


for url in URLS:
    src = fetch(url)
    out = remove(src, session=session)
    out = out.convert('RGBA')
    # recortar margen transparente sobrante? no: mantener encuadre original
    occupancy, halo = stats(out)
    small = out.copy()
    small.thumbnail((700, 700), Image.LANCZOS)
    bg = Image.new('RGBA', small.size, (90, 90, 90, 255))
    bg.alpha_composite(small)
    name = os.path.splitext(os.path.basename(url.split('?')[0]))[0]
    tag = '_'.join(url.split('/')[-3:-1]) if url.startswith('http') else name
    bg.convert('RGB').save('temp/rb_%s_%s.png' % (MODEL, tag))
    print('%-22s %-40s opaque=%.2f halo=%.4f' % (MODEL, url.split('/')[-3] + '/' + url.split('/')[-1], occupancy, halo))
