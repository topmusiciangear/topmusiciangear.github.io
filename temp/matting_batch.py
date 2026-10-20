"""Genera una version con alpha matting de los recortes sospechosos, SIN sobrescribir.

Salida: temp/matting_out/<key>.webp  y  temp/matting_report.json
Uso: python temp/matting_batch.py [--min-leak 0.02] [--limit N]
"""
import hashlib
import json
import os
import sys

import numpy as np
from PIL import Image
from scipy import ndimage
from rembg import new_session, remove

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(ROOT)

CACHE = 'temp/cut_cache'
OUT = 'temp/matting_out'
os.makedirs(OUT, exist_ok=True)

MIN_LEAK = 0.02
if '--min-leak' in sys.argv:
    MIN_LEAK = float(sys.argv[sys.argv.index('--min-leak') + 1])
LIMIT = 10 ** 9
if '--limit' in sys.argv:
    LIMIT = int(sys.argv[sys.argv.index('--limit') + 1])


def leak_ratio(img):
    arr = np.asarray(img.convert('RGBA')).astype(np.int16)
    rgb = arr[:, :, :3]
    a = arr[:, :, 3]
    obj = a > 38
    if not obj.any():
        return 1.0
    lum = rgb.mean(axis=2)
    ch = rgb.max(axis=2) - rgb.min(axis=2)
    ln = obj & (lum >= 178) & (ch <= 22)
    if not ln.any():
        return 0.0
    lab, n = ndimage.label(ln, structure=np.ones((3, 3), bool))
    border = np.zeros_like(obj)
    border[0, :] = border[-1, :] = True
    border[:, 0] = border[:, -1] = True
    seed = ln & (ndimage.binary_dilation(~obj, iterations=1) | border)
    hit = set(np.unique(lab[seed])) - {0}
    if not hit:
        return 0.0
    return float(np.isin(lab, list(hit)).sum() / max(obj.sum(), 1))


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


def cache_path(url):
    key = hashlib.md5(url.encode('utf-8')).hexdigest()[:10]
    for p in os.listdir(CACHE):
        if p.startswith(key + '.'):
            return os.path.join(CACHE, p)
    return None


mapping = json.load(open('data/cut-images.json', encoding='utf-8'))
cands = []
for url, rel in mapping.items():
    key = os.path.basename(rel).replace('.webp', '')
    if not os.path.exists(rel):
        continue
    lk = leak_ratio(Image.open(rel))
    if lk > MIN_LEAK:
        cands.append((url, rel, key, lk))

cands.sort(key=lambda t: -t[3])
print('candidatos: %d' % len(cands), flush=True)
cands = cands[:LIMIT]

sess = new_session('isnet-general-use')
report = {}
for i, (url, rel, key, lk) in enumerate(cands, 1):
    src = cache_path(url)
    if not src:
        print('[%d/%d] sin cache %s' % (i, len(cands), url), flush=True)
        continue
    im = Image.open(src).convert('RGB')
    cut = remove(im, session=sess, post_process_mask=True, alpha_matting=True,
                 alpha_matting_foreground_threshold=250,
                 alpha_matting_background_threshold=15,
                 alpha_matting_erode_size=8).convert('RGBA')
    cut = trim(cut)
    cut.thumbnail((800, 800), Image.LANCZOS)
    out = os.path.join(OUT, key + '.webp')
    cut.save(out, quality=90, method=6)
    new_leak = leak_ratio(cut)
    report[key] = {'url': url, 'rel': rel, 'old_leak': round(lk, 4), 'new_leak': round(new_leak, 4)}
    print('[%d/%d] %s %.3f -> %.3f' % (i, len(cands), key, lk, new_leak), flush=True)

json.dump(report, open('temp/matting_report.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('\nlisto: %d versiones en %s' % (len(report), OUT))
