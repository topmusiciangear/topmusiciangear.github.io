"""Reprocesa con alpha matting los recortes que conservan sombra o fondo dentro del objeto.

El modelo isnet (sin matting) a veces incluye la sombra de estudio o un trozo de fondo
claro dentro de la mascara: se ve como una mancha gris/blanca pegada al producto.
Con alpha matting la mascara se ajusta al borde real del objeto y esas zonas desaparecen.

Criterio de entrada: fraccion de pixeles claros y neutros conectados al borde del objeto
(`leak`) mayor que --min-leak (por defecto 0.03).

Uso:
    python temp/recut_matting.py            # revisa todos y rehace los que tienen fuga
    python temp/recut_matting.py --force    # rehace toda la lista, tenga fuga o no
    python temp/recut_matting.py --keys a,b,c
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
MIN_LEAK = 0.03
GUARD = 0.35


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


def stats(rgba):
    a = np.asarray(rgba.getchannel('A'))
    h, w = a.shape
    op = a > 38
    opaque = op.mean()
    center = op[int(h * .35):int(h * .65), int(w * .35):int(w * .65)].mean()
    return opaque, center


def cache_path(url):
    key = hashlib.md5(url.encode('utf-8')).hexdigest()[:10]
    for p in os.listdir(CACHE):
        if p.startswith(key + '.'):
            return os.path.join(CACHE, p)
    return None


def main():
    args = sys.argv[1:]
    force = '--force' in args
    keys = None
    if '--keys' in args:
        keys = set(args[args.index('--keys') + 1].split(','))

    mapping = json.load(open('data/cut-images.json', encoding='utf-8'))
    targets = []
    for url, rel in mapping.items():
        key = os.path.basename(rel).replace('.webp', '')
        if keys and key not in keys:
            continue
        if not os.path.exists(rel):
            continue
        lk = leak_ratio(Image.open(rel))
        if force or lk > MIN_LEAK:
            targets.append((url, rel, key, lk))

    print('candidatos: %d' % len(targets), flush=True)
    sess = new_session('isnet-general-use')
    changed = 0
    for i, (url, rel, key, lk) in enumerate(targets, 1):
        src = cache_path(url)
        if not src:
            print('[%d/%d] sin cache %s' % (i, len(targets), url), flush=True)
            continue
        im = Image.open(src).convert('RGB')
        try:
            cut = remove(im, session=sess, post_process_mask=True, alpha_matting=True,
                         alpha_matting_foreground_threshold=250,
                         alpha_matting_background_threshold=15,
                         alpha_matting_erode_size=8).convert('RGBA')
        except Exception as e:
            print('[%d/%d] error %s (%s)' % (i, len(targets), url, e), flush=True)
            continue
        cut = trim(cut)
        opaque, center = stats(cut)
        new_leak = leak_ratio(cut)
        ok = 0.04 < opaque < 0.95 and center > 0.05 and new_leak <= GUARD
        better = new_leak < lk - 0.005
        print('[%d/%d] %s leak %.3f -> %.3f  opaque=%.2f %s' % (
            i, len(targets), key, lk, new_leak, opaque, 'OK' if ok and better else 'descartado'), flush=True)
        if ok and better:
            cut.thumbnail((800, 800), Image.LANCZOS)
            cut.save(rel, quality=90, method=6)
            changed += 1

    print('\nrehechos: %d de %d' % (changed, len(targets)))


if __name__ == '__main__':
    main()
