from PIL import Image
import os
for f in ['temp/mixvault_hero.webp', 'temp/mixvault_og.bin', 'img/products/a7f377af19.webp']:
    try:
        im = Image.open(f)
        print(f, im.size, im.format, os.path.getsize(f))
    except Exception as e:
        print(f, 'ERR', e, os.path.getsize(f))
