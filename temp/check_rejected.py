"""Analiza las imagenes descartadas (sin recorte) para ver si son productos sobre fondo
claro que el filtro de blanco (>=236) no detecto por tener un gris muy claro.
"""
import json
import os
import numpy as np
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(ROOT)

results = json.load(open('temp/cut_results.json', encoding='utf-8'))
manifest = json.load(open('temp/cut_manifest.json', encoding='utf-8'))
import hashlib

outs = {i['url']: i['out'] for i in manifest}
rows = []
for url, v in results.items():
    if v:
        continue
    key = hashlib.md5(url.encode('utf-8')).hexdigest()[:10]
    cands = [p for p in os.listdir('temp/cut_cache') if p.startswith(key + '.')]
    if not cands:
        rows.append((url, None, None))
        continue
    p = os.path.join('temp/cut_cache', cands[0])
    try:
        im = Image.open(p).convert('RGB').resize((160, 160), Image.BILINEAR)
        a = np.asarray(im).astype(np.int16)
        border = np.concatenate([a[0], a[-1], a[:, 0], a[:, -1]])
        rows.append((url, float(border.mean()), float((border.min(axis=1) >= 236).mean())))
    except Exception as e:
        rows.append((url, None, None))

rows.sort(key=lambda r: -(r[1] or 0))
print('descartadas: %d' % len(rows))
print('--- fondo claro (media borde > 215) ---')
n = 0
for url, mean, white in rows:
    if mean and mean > 215:
        n += 1
        print('%5.1f  blanco=%4.1f%%  %s' % (mean, (white or 0) * 100, url))
print('total fondo claro: %d' % n)
