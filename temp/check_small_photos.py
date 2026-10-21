"""Revisa que ninguna foto guardada sea diminuta o un placeholder."""
import glob
import os

from PIL import Image

small = []
total = 0
for f in glob.glob('img/products/*.webp'):
    total += 1
    im = Image.open(f)
    w, h = im.size
    if max(w, h) < 500:
        small.append((f, w, h, os.path.getsize(f)))

print('fotos guardadas: %d' % total)
print('con lado mayor < 500 px: %d' % len(small))
for f, w, h, s in sorted(small, key=lambda x: max(x[1], x[2]))[:15]:
    print('  %dx%d  %.0f KB  %s' % (w, h, s / 1024, f))
