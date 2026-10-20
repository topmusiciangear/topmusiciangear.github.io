"""Cut the white studio background out of a product JPEG and save a transparent PNG."""
import sys
import numpy as np
from PIL import Image, ImageFilter
from scipy import ndimage

SRC = sys.argv[1] if len(sys.argv) > 1 else 'temp/mackie.jpg'
DST = sys.argv[2] if len(sys.argv) > 2 else 'temp/mackie_transparent.png'

img = Image.open(SRC).convert('RGB')
arr = np.asarray(img).astype(np.int16)
r, g, b = arr[:, :, 0], arr[:, :, 1], arr[:, :, 2]

# 1. Pixels that look like studio white (the three channels close to 255)
near_white = (r >= 238) & (g >= 238) & (b >= 238)

# 2. Only the white connected to the border counts as background: this keeps
#    white details inside the product (logo, "TONE"/"VOLUME" lettering).
labels, n = ndimage.label(near_white)
border_labels = set(labels[0, :]) | set(labels[-1, :]) | set(labels[:, 0]) | set(labels[:, -1])
border_labels.discard(0)
bg = np.isin(labels, list(border_labels))

# 3. Shrink one pixel so the anti-aliased white fringe stays out of the product
bg = ndimage.binary_erosion(bg, iterations=1)

# 4. Soft alpha: 0 on background, 255 on product, feathered edge
alpha = np.where(bg, 0, 255).astype(np.uint8)
alpha_img = Image.fromarray(alpha, 'L').filter(ImageFilter.GaussianBlur(0.8))

out = img.convert('RGBA')
out.putalpha(alpha_img)
out.save(DST)

# Report how much of the canvas is now transparent
a = np.asarray(alpha_img)
print(f'ok -> {DST}')
print(f'transparent pixels: {(a < 8).mean() * 100:.1f}%  |  fully opaque: {(a > 247).mean() * 100:.1f}%')
