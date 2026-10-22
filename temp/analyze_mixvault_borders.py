from PIL import Image
import numpy as np

files = ['temp/mixvault_hero.webp', 'temp/mixvault_og.bin', 'img/products/a7f377af19.webp']
for f in files:
    im = Image.open(f).convert('RGB')
    a = np.asarray(im)
    lum = a.mean(axis=2)
    print('===', f, im.size)
    for thr in (40, 80, 120):
        mask = lum > thr
        ys, xs = np.where(mask)
        if len(xs):
            print(f'  thr {thr}: bbox x {xs.min()}..{xs.max()} y {ys.min()}..{ys.max()} margins L{xs.min()} T{ys.min()} R{a.shape[1]-1-xs.max()} B{a.shape[0]-1-ys.max()}')
    rows = lum.mean(axis=1)
    print('  row means top10:', [round(float(x), 1) for x in rows[:10]])
    print('  row means bottom10:', [round(float(x), 1) for x in rows[-10:]])
    print('  row means at 2%,5%,10%:', [round(float(rows[int(a.shape[0]*p)]), 1) for p in (0.02, 0.05, 0.1)])
