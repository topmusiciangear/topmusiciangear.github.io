"""Reprocesa con otros ajustes las imagenes descartadas que SI tienen fondo blanco.
Las que el modelo principal no supo separar (opaque bajo) se prueban con u2net y sin
post-proceso, y se guardan si pasan los controles.
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
OUTDIR = 'img/cut'


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


def metrics(rgba):
    a = np.asarray(rgba.getchannel('A'))
    h, w = a.shape
    op = a > 38
    opaque = op.mean()
    center = op[int(h * .35):int(h * .65), int(w * .35):int(w * .65)].mean()
    rgb = np.asarray(rgba.convert('RGB')).astype(np.int16)
    mn = rgb.min(axis=2)
    inner = ndimage.binary_erosion(op, iterations=3)
    edge = op & ~inner
    halo = float((edge & (mn > 215)).sum() / max(edge.sum(), 1))
    return opaque, center, halo


results = json.load(open('temp/cut_results.json', encoding='utf-8'))

# candidatas: descartadas con borde casi blanco
cands = []
for url, v in results.items():
    if v:
        continue
    p = cache_path(url)
    if not p:
        continue
    im = Image.open(p).convert('RGB').resize((160, 160), Image.BILINEAR)
    b = np.asarray(im).astype(np.int16)
    border = np.concatenate([b[0], b[-1], b[:, 0], b[:, -1]])
    if (border.min(axis=1) >= 236).mean() > 0.85:
        cands.append((url, p))

print('candidatas con fondo blanco: %d' % len(cands), flush=True)

isnet = new_session('isnet-general-use')
u2net = new_session('u2net')

fixed = {}
for i, (url, p) in enumerate(cands, 1):
    im = Image.open(p).convert('RGB')
    best = None
    for name, sess, ppm in [('isnet-nopost', isnet, False), ('u2net', u2net, True), ('u2net-nopost', u2net, False)]:
        try:
            cut = remove(im, session=sess, post_process_mask=ppm).convert('RGBA')
        except Exception as e:
            print('  err %s %s' % (name, e))
            continue
        cut = trim(cut)
        opaque, center, halo = metrics(cut)
        ok = 0.04 < opaque < 0.95 and center > 0.05 and halo < 0.35
        print('[%d/%d] %-14s opaque=%.2f center=%.2f halo=%.2f %s' % (i, len(cands), name, opaque, center, halo, 'OK' if ok else ''), flush=True)
        if ok and (best is None or opaque > best[0]):
            best = (opaque, cut)
    if best:
        key = hashlib.md5(url.encode('utf-8')).hexdigest()[:10]
        out = os.path.join(OUTDIR, key + '.webp')
        best[1].thumbnail((800, 800), Image.LANCZOS)
        best[1].save(out, quality=90, method=6)
        results[url] = out
        fixed[url] = out
        print('   -> GUARDADO %s' % out, flush=True)

json.dump(results, open('temp/cut_results.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=0, sort_keys=True)
print('\narregladas: %d de %d' % (len(fixed), len(cands)))
