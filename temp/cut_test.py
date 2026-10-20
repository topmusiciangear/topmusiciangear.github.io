"""Prueba de variantes de recorte sobre una imagen concreta."""
import os
import sys
import urllib.request

import numpy as np
from PIL import Image, ImageFilter
from scipy import ndimage

os.chdir(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))


def load(url_or_path):
    if url_or_path.startswith('http'):
        cache = os.path.join('temp', 'cut_cache', 'test_' + os.path.basename(url_or_path))
        if not os.path.exists(cache):
            req = urllib.request.Request(url_or_path, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req, timeout=45) as r, open(cache, 'wb') as f:
                f.write(r.read())
        return Image.open(cache).convert('RGB')
    return Image.open(url_or_path).convert('RGB')


def cut(img, soft_thr=205, soft_level=0, sat=32, rim=0):
    arr = np.asarray(img).astype(np.float32)
    r, g, b = arr[:, :, 0], arr[:, :, 1], arr[:, :, 2]
    mn = np.minimum(np.minimum(r, g), b)
    mx = np.maximum(np.maximum(r, g), b)

    near_white = (r >= 236) & (g >= 236) & (b >= 236)
    labels, _ = ndimage.label(near_white)
    border = set(labels[0, :]) | set(labels[-1, :]) | set(labels[:, 0]) | set(labels[:, -1])
    border.discard(0)
    bg = np.isin(labels, list(border))
    if bg.mean() < 0.15:
        return None, bg.mean()

    # Nivel 1: gris muy claro pegado al blanco.
    light = mn >= soft_thr
    for _ in range(40):
        grown = ndimage.binary_dilation(bg) & light
        if not (grown & ~bg).any():
            break
        bg = grown

    # Nivel 2: sombra suave (gris neutro) pegada al fondo.
    if soft_level:
        neutral = (mx - mn) <= sat
        soft = (mn >= soft_level) & neutral
        for _ in range(80):
            grown = ndimage.binary_dilation(bg) & soft
            if not (grown & ~bg).any():
                break
            bg = grown

    band = ndimage.binary_dilation(bg, iterations=3) & ~bg
    alpha = np.full(arr.shape[:2], 255.0, dtype=np.float32)
    alpha[bg] = 0.0
    alpha[band] = np.clip(255.0 - mn[band], 0, 255)

    a = (alpha / 255.0)[..., None]
    safe = np.maximum(a, 0.02)
    rgb = np.where(a > 0.02, (arr - (1 - a) * 255.0) / safe, arr)
    rgb = np.clip(rgb, 0, 255)
    out = Image.fromarray(rgb.astype(np.uint8), 'RGB').convert('RGBA')
    out.putalpha(Image.fromarray(alpha.astype(np.uint8), 'L').filter(ImageFilter.GaussianBlur(0.6)))
    return out, bg.mean()


def on_grey(im, size=800):
    bg = Image.new('RGBA', im.size, (90, 90, 90, 255))
    bg.alpha_composite(im)
    return bg.convert('RGB').resize(size if isinstance(size, tuple) else (size, size), Image.LANCZOS)


if __name__ == '__main__':
    url = sys.argv[1] if len(sys.argv) > 1 else 'img/guides/best-monitors/116.webp'
    src = load(url)
    variants = [
        ('A_actual', dict()),
        ('B_sombra175', dict(soft_level=175)),
        ('C_sombra165_sat25', dict(soft_level=165, sat=25)),
        ('D_sombra155', dict(soft_level=155)),
    ]
    W = 420
    sheet = Image.new('RGB', (W * len(variants), W), (20, 20, 20))
    for i, (name, kw) in enumerate(variants):
        im, ratio = cut(src, **kw)
        if im is None:
            print(name, 'SKIP', ratio)
            continue
        out = on_grey(im, W)
        sheet.paste(out, (i * W, 0))
        alpha = np.asarray(im.getchannel('A'))
        h, w = alpha.shape
        bottom = alpha[int(h * .82):int(h * .95), int(w * .2):int(w * .8)]
        print('%-20s white=%.1f%%  bottom-opaque=%.3f' % (name, ratio * 100, (bottom > 10).mean()))
    sheet.save('temp/cut_variants.png')
    print('-> temp/cut_variants.png')
