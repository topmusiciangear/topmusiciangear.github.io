"""Recorta el margen transparente de los WebP ya generados (una sola vez)."""
import json
import os

from PIL import Image

os.chdir(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))


def trim(rgba, pad_pct=0.025):
    a = rgba.getchannel('A').point(lambda v: 255 if v > 38 else 0)
    bbox = a.getbbox()
    if not bbox:
        return rgba
    x0, y0, x1, y1 = bbox
    w, h = rgba.size
    pad = int(max(x1 - x0, y1 - y0) * pad_pct)
    return rgba.crop((max(0, x0 - pad), max(0, y0 - pad), min(w, x1 + pad), min(h, y1 + pad)))


with open('data/cut-images.json', encoding='utf-8') as f:
    mapping = json.load(f)

files = sorted(set(mapping.values()))
changed = 0
for rel in files:
    if not os.path.exists(rel):
        continue
    im = Image.open(rel).convert('RGBA')
    out = trim(im)
    if out.size != im.size:
        out.save(rel, quality=90, method=6)
        changed += 1

print('Recortados %d de %d WebP' % (changed, len(files)))
