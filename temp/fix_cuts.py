"""Limpia restos de fondo (sombra o recorte blanco) dentro de un recorte.

Trabaja sobre el WebP ya generado: quita las zonas opacas que son claras y neutras
(sombra de estudio, bloque blanco) y que estan conectadas al borde del objeto.
No toca nada si eso se llevaria mas del 35 % del producto (seria un producto blanco).

Uso:
    python temp/fix_cuts.py --list keys.txt     # una clave md5 por linea
    python temp/fix_cuts.py <md5> [<md5> ...]
    python temp/fix_cuts.py --all-suspicious    # detecta y limpia las sospechosas
"""
import json
import os
import sys

import numpy as np
from PIL import Image
from scipy import ndimage

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(ROOT)

LUM_MIN = 178
CHROMA_MAX = 22
GUARD = 0.35


def clean(img, lum_min=LUM_MIN, chroma_max=CHROMA_MAX, guard=GUARD, dry=False):
    arr = np.asarray(img.convert('RGBA')).astype(np.int16)
    rgb = arr[:, :, :3]
    a = arr[:, :, 3]
    obj = a > 38
    if not obj.any():
        return img, 0.0, 0.0

    lum = rgb.mean(axis=2)
    chroma = rgb.max(axis=2) - rgb.min(axis=2)
    light_neutral = obj & (lum >= lum_min) & (chroma <= chroma_max)

    # semillas: pixeles claros del objeto que tocan transparencia o el borde de la imagen
    trans = ~obj
    neigh = ndimage.binary_dilation(trans, iterations=1)
    seeds = light_neutral & (neigh | (np.pad(np.ones((1, 1), bool), ((0, obj.shape[0] - 1), (0, obj.shape[1] - 1)))))

    labels, n = ndimage.label(light_neutral, structure=np.ones((3, 3), bool))
    if n == 0:
        return img, 0.0, 0.0
    hit = set(np.unique(labels[seeds])) - {0}
    region = np.isin(labels, list(hit))
    frac = region.sum() / max(obj.sum(), 1)
    if frac > guard:
        return img, frac, 0.0

    a2 = a.copy()
    a2[region] = 0
    # suaviza el corte: 1 px de difuminado en el nuevo borde
    m = region.astype(np.float32)
    m = ndimage.gaussian_filter(m, 1.0)
    a2 = np.clip(a2.astype(np.float32) * (1.0 - m), 0, 255)
    out = arr.copy()
    out[:, :, 3] = a2
    return Image.fromarray(out.astype(np.uint8), 'RGBA'), frac, 1.0


def main():
    mapping = json.load(open('data/cut-images.json', encoding='utf-8'))
    by_key = {v.split('/')[-1].replace('.webp', ''): (u, v) for u, v in mapping.items()}

    args = sys.argv[1:]
    keys = []
    if args and args[0] == '--list':
        keys = [l.strip() for l in open(args[1], encoding='utf-8') if l.strip()]
    else:
        keys = args

    for k in keys:
        if k not in by_key:
            print('no existe clave ' + k)
            continue
        url, rel = by_key[k]
        im = Image.open(rel)
        out, frac, changed = clean(im)
        if changed:
            out.save(rel, quality=90, method=6)
        print('%s frac=%.3f %s %s' % (k, frac, 'LIMPIADO' if changed else 'sin cambios', url))


if __name__ == '__main__':
    main()
