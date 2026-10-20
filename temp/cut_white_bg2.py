"""White-background removal with edge decontamination (no light halo on dark cards)."""
import sys
import numpy as np
from PIL import Image, ImageFilter
from scipy import ndimage

SRC = sys.argv[1] if len(sys.argv) > 1 else 'temp/mackie.jpg'
DST = sys.argv[2] if len(sys.argv) > 2 else 'temp/mackie_transparent.png'
BAND = 3

img = Image.open(SRC).convert('RGB')
arr = np.asarray(img).astype(np.float32)
r, g, b = arr[:, :, 0], arr[:, :, 1], arr[:, :, 2]
mn = np.minimum(np.minimum(r, g), b)

near_white = (r >= 236) & (g >= 236) & (b >= 236)
labels, _ = ndimage.label(near_white)
border = set(labels[0, :]) | set(labels[-1, :]) | set(labels[:, 0]) | set(labels[:, -1])
border.discard(0)
bg = np.isin(labels, list(border))

band = ndimage.binary_dilation(bg, iterations=BAND) & ~bg

alpha = np.full(arr.shape[:2], 255.0, dtype=np.float32)
alpha[bg] = 0.0
# Edge pixels: coverage = how far the pixel is from white
alpha[band] = np.clip(255.0 - mn[band], 0, 255)

# Decontaminate colour: P = a*C + (1-a)*255  ->  C = (P - (1-a)*255) / a
a = (alpha / 255.0)[..., None]
safe = np.maximum(a, 0.02)
rgb = np.where(a > 0.02, (arr - (1 - a) * 255.0) / safe, arr)
rgb = np.clip(rgb, 0, 255)

alpha_img = Image.fromarray(alpha.astype(np.uint8), 'L').filter(ImageFilter.GaussianBlur(0.6))
out = Image.fromarray(rgb.astype(np.uint8), 'RGB').convert('RGBA')
out.putalpha(alpha_img)
out.save(DST)

al = np.asarray(alpha_img)
print(f'ok -> {DST}')
print(f'transparent: {(al < 8).mean()*100:.1f}% | opaque: {(al > 247).mean()*100:.1f}% | edge band: {band.mean()*100:.2f}%')
