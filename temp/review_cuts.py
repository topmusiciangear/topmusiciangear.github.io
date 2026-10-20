"""Revisa la calidad de los recortes y saca una hoja de contactos con los dudosos."""
import json
import os

import numpy as np
from PIL import Image, ImageDraw, ImageFont

os.chdir(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

with open('data/cut-images.json', encoding='utf-8') as f:
    mapping = json.load(f)

rows = []
for url, rel in mapping.items():
    try:
        im = Image.open(rel).convert('RGBA')
    except Exception as ex:
        rows.append({'url': url, 'file': rel, 'error': str(ex)})
        continue
    a = np.asarray(im.getchannel('A'))
    rgb = np.asarray(im.convert('RGB')).astype(np.int16)
    mn = rgb.min(axis=2)
    h, w = a.shape
    opaque = a > 38
    frac = opaque.mean()

    ys, xs = np.where(opaque)
    bbox = (int(xs.min()), int(ys.min()), int(xs.max()), int(ys.max())) if len(xs) else (0, 0, 0, 0)
    touches = (bbox[0] <= 1 or bbox[1] <= 1 or bbox[2] >= w - 2 or bbox[3] >= h - 2)

    # banda clara pegada al borde inferior del producto (resto de fondo/sombra)
    bottom_strip = 0.0
    if len(xs):
        y1 = bbox[3]
        strip = opaque[max(0, y1 - 8):y1 + 1, :]
        light = (mn[max(0, y1 - 8):y1 + 1, :] > 200) & strip
        bottom_strip = float(light.sum() / max(strip.sum(), 1))

    # halo: pixeles claros en el borde del objeto
    inner = np.zeros_like(opaque)
    if len(xs):
        from scipy import ndimage
        inner = ndimage.binary_erosion(opaque, iterations=3)
    edge = opaque & ~inner
    halo = float((edge & (mn > 210)).sum() / max(edge.sum(), 1))

    rows.append({
        'url': url, 'file': rel, 'opaque': round(frac, 3), 'halo': round(halo, 3),
        'bottom': round(bottom_strip, 3), 'touches': touches,
        'size': [w, h], 'bbox': bbox,
    })

def flag(r):
    if r.get('error'):
        return True
    return (r['opaque'] < 0.08 or r['halo'] > 0.15 or r['bottom'] > 0.10)

flagged = [r for r in rows if flag(r)]
with open('temp/cut_review.json', 'w', encoding='utf-8') as f:
    json.dump({'all': rows, 'flagged': flagged}, f, ensure_ascii=False, indent=1)

print('%d recortes, %d marcados para revisar' % (len(rows), len(flagged)))
for r in flagged[:40]:
    print('  %-12s opaque=%.2f halo=%.3f bottom=%.2f touches=%s  %s' % (
        r.get('error', '') or '', r.get('opaque', 0), r.get('halo', 0), r.get('bottom', 0),
        r.get('touches', False), r['url']))

# hoja de contactos de los marcados
if flagged:
    TW, TH, LAB = 240, 240, 22
    cols = 6
    n = min(len(flagged), 60)
    rowsn = (n + cols - 1) // cols
    sheet = Image.new('RGB', (TW * cols, (TH + LAB) * rowsn), (18, 18, 18))
    d = ImageDraw.Draw(sheet)
    try:
        font = ImageFont.truetype('arial.ttf', 13)
    except Exception:
        font = ImageFont.load_default()
    for i, r in enumerate(flagged[:n]):
        try:
            im = Image.open(r['file']).convert('RGBA')
        except Exception:
            continue
        im.thumbnail((TW - 12, TH - 12), Image.LANCZOS)
        tile = Image.new('RGBA', (TW - 12, TH - 12), (90, 90, 90, 255))
        tile.alpha_composite(im, ((TW - 12 - im.width) // 2, (TH - 12 - im.height) // 2))
        cx = (i % cols) * TW
        cy = (i // cols) * (TH + LAB)
        sheet.paste(tile.convert('RGB'), (cx + 6, cy + 6))
        d.text((cx + 6, cy + TH - 10), '%d %s' % (i + 1, r['url'].split('/')[-3]), fill=(220, 220, 220), font=font)
    sheet.save('temp/cut_flagged.png')
    print('-> temp/cut_flagged.png')
