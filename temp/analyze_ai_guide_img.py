from PIL import Image
import numpy as np
for f in ['img/products/06075d948d.webp']:
    im = Image.open(f).convert('RGB')
    a = np.asarray(im)
    lum = a.mean(axis=2)
    print(f, im.size)
    for thr in (40, 80, 120):
        ys, xs = np.where(lum > thr)
        if len(xs):
            print(f'  thr {thr}: bbox x {xs.min()}..{xs.max()} y {ys.min()}..{ys.max()} margins L{xs.min()} T{ys.min()} R{a.shape[1]-1-xs.max()} B{a.shape[0]-1-ys.max()}')
    rows = lum.mean(axis=1)
    print('  top rows:', [round(float(x),1) for x in rows[:8]])
