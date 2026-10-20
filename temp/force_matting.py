"""Rehace recortes concretos con alpha matting (sin comparar metricas).

Uso: python temp/force_matting.py <md5> [<md5> ...]
"""
import hashlib
import json
import os
import sys

import numpy as np
from PIL import Image
from rembg import new_session, remove

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(ROOT)

CACHE = 'temp/cut_cache'


def cache_path(url):
    key = hashlib.md5(url.encode('utf-8')).hexdigest()[:10]
    for p in os.listdir(CACHE):
        if p.startswith(key + '.'):
            return os.path.join(CACHE, p)
    return None


def trim(rgba, pad_pct=0.025):
    a = np.asarray(rgba.getchannel('A'))
    m = a > 38
    if not m.any():
        return rgba
    ys, xs = np.where(m)
    x0, x1 = int(xs.min()), int(xs.max()) + 1
    y0, y1 = int(ys.min()), int(ys.max()) + 1
    w, h = rgba.size
    pad = int(max(x1 - x0, y1 - y0) * pad_pct)
    return rgba.crop((max(0, x0 - pad), max(0, y0 - pad), min(w, x1 + pad), min(h, y1 + pad)))


mapping = json.load(open('data/cut-images.json', encoding='utf-8'))
by_key = {os.path.basename(v).replace('.webp', ''): (u, v) for u, v in mapping.items()}
sess = new_session('isnet-general-use')

for key in sys.argv[1:]:
    if key not in by_key:
        print('no existe ' + key)
        continue
    url, rel = by_key[key]
    src = cache_path(url)
    if not src:
        print('sin cache ' + url)
        continue
    im = Image.open(src).convert('RGB')
    cut = remove(im, session=sess, post_process_mask=True, alpha_matting=True,
                 alpha_matting_foreground_threshold=250,
                 alpha_matting_background_threshold=15,
                 alpha_matting_erode_size=8).convert('RGBA')
    cut = trim(cut)
    cut.thumbnail((800, 800), Image.LANCZOS)
    cut.save(rel, quality=90, method=6)
    print('OK %s -> %s (%s)' % (key, rel, url))
