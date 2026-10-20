"""Prueba variantes de rembg sobre las imagenes reportadas (sombra incluida en el recorte)."""
import json
import os

from PIL import Image
from rembg import new_session, remove

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(ROOT)

CASES = [
    ('bb234', 'temp/orig_bb234.jpg'),
    ('bronco', 'temp/orig_bronco.jpg'),
]

isnet = new_session('isnet-general-use')
u2net = new_session('u2net')

variants = [
    ('isnet', lambda im: remove(im, session=isnet, post_process_mask=True)),
    ('u2net', lambda im: remove(im, session=u2net, post_process_mask=True)),
    ('isnet-matting', lambda im: remove(im, session=isnet, alpha_matting=True,
                                        alpha_matting_foreground_threshold=250,
                                        alpha_matting_background_threshold=15,
                                        alpha_matting_erode_size=8)),
]

W = 430
sheet = Image.new('RGB', (W * len(variants), W * len(CASES)), (25, 25, 25))
for row, (name, path) in enumerate(CASES):
    im = Image.open(path).convert('RGB')
    for col, (vname, fn) in enumerate(variants):
        try:
            out = fn(im).convert('RGBA')
        except Exception as e:
            print('error', name, vname, e)
            continue
        out.save('temp/probe_%s_%s.webp' % (name, vname), quality=90)
        t = out.copy()
        t.thumbnail((W - 10, W - 10), Image.LANCZOS)
        tile = Image.new('RGBA', (W - 10, W - 10), (200, 200, 200, 255))
        tile.alpha_composite(t, ((W - 10 - t.width) // 2, (W - 10 - t.height) // 2))
        sheet.paste(tile.convert('RGB'), (col * W + 5, row * W + 5))
        print(name, vname, 'ok', out.size)
sheet.save('temp/probe_variants.png')
print('temp/probe_variants.png', sheet.size)
