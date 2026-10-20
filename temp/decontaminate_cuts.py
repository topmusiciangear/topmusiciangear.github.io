"""Quita el halo blanco de los recortes ya generados (sin volver a inferir).

El modelo (rembg) devuelve el color original de la foto con un alfa suave: en el borde
los pixeles son mezcla del producto y del fondo blanco (color = a*producto + (1-a)*blanco).
Al ponerlos sobre el gris claro de las cards ese borde se ve como una linea blanca.

Aqui se "des-mezcla" el color contra blanco: rgb' = (rgb - (1-a)*255) / a, y se descarta
el alfa < 0.10, que solo aporta halo.

Uso:  python temp/decontaminate_cuts.py [--dry]
"""
import json
import os
import shutil
import sys

import numpy as np
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(ROOT)

DRY = '--dry' in sys.argv
BAK = 'temp/cut_bak'

with open('data/cut-images.json', encoding='utf-8') as f:
    mapping = json.load(f)

if not DRY:
    os.makedirs(BAK, exist_ok=True)

files = sorted(set(mapping.values()))
print('recortes: %d' % len(files))

n = 0
for rel in files:
    if not os.path.exists(rel):
        continue
    bak = os.path.join(BAK, os.path.basename(rel))
    if not DRY and not os.path.exists(bak):
        shutil.copy2(rel, bak)

    im = Image.open(rel).convert('RGBA')
    arr = np.asarray(im).astype(np.float32)
    rgb, a = arr[:, :, :3], arr[:, :, 3:4] / 255.0

    out_a = a.copy()
    out_a[out_a < 0.10] = 0.0

    safe = np.maximum(a, 0.10)
    unblended = (rgb - (1.0 - a) * 255.0) / safe
    unblended = np.clip(unblended, 0, 255)
    out_rgb = np.where(a >= 0.10, unblended, rgb)

    res = np.concatenate([out_rgb, out_a * 255.0], axis=2)
    img = Image.fromarray(np.round(res).astype(np.uint8), 'RGBA')

    if not DRY:
        img.save(rel, quality=90, method=6)
    n += 1

print(('simulados' if DRY else 'procesados') + ': %d' % n)
