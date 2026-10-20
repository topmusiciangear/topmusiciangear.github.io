"""Cut out the white background of every product image in a guide and save WebP."""
import json
import os
import sys
import urllib.request

import numpy as np
from PIL import Image, ImageFilter
from scipy import ndimage

IDS = [116, 20, 19, 21, 199, 305, 331, 300, 304, 307]
OUT = 'img/guides/best-monitors'
os.makedirs(OUT, exist_ok=True)

with open('data/products.json', encoding='utf-8') as f:
    products = json.load(f)


def cut(img):
    arr = np.asarray(img.convert('RGB')).astype(np.float32)
    r, g, b = arr[:, :, 0], arr[:, :, 1], arr[:, :, 2]
    mn = np.minimum(np.minimum(r, g), b)
    near_white = (r >= 236) & (g >= 236) & (b >= 236)
    labels, _ = ndimage.label(near_white)
    border = set(labels[0, :]) | set(labels[-1, :]) | set(labels[:, 0]) | set(labels[:, -1])
    border.discard(0)
    bg = np.isin(labels, list(border))
    if bg.mean() < 0.15:
        return None, bg.mean()
    band = ndimage.binary_dilation(bg, iterations=3) & ~bg
    alpha = np.full(arr.shape[:2], 255.0, dtype=np.float32)
    alpha[bg] = 0.0
    alpha[band] = np.clip(255.0 - mn[band], 0, 255)
    a = (alpha / 255.0)[..., None]
    safe = np.maximum(a, 0.02)
    rgb = np.where(a > 0.02, (arr - (1 - a) * 255.0) / safe, arr)
    rgb = np.clip(rgb, 0, 255)
    alpha_img = Image.fromarray(alpha.astype(np.uint8), 'L').filter(ImageFilter.GaussianBlur(0.6))
    out = Image.fromarray(rgb.astype(np.uint8), 'RGB').convert('RGBA')
    out.putalpha(alpha_img)
    return out, bg.mean()


for pid in IDS:
    p = next(x for x in products if x['id'] == pid)
    url = p['img']
    raw = os.path.join('temp', f'mon_{pid}{os.path.splitext(url.split("?")[0])[1] or ".jpg"}')
    if not os.path.exists(raw):
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=45) as r, open(raw, 'wb') as f:
            f.write(r.read())
    im = Image.open(raw).convert('RGB')
    cut_img, ratio = cut(im)
    if cut_img is None:
        print(f'{pid} SKIP white={ratio:.2%} ({im.size})')
        continue
    cut_img.thumbnail((800, 800), Image.LANCZOS)
    dst = os.path.join(OUT, f'{pid}.webp')
    cut_img.save(dst, quality=90, method=6)
    kb = os.path.getsize(dst) / 1024
    print(f'{pid} ok  {im.size} -> {cut_img.size}  white={ratio:.1%}  {kb:.0f} KB')
