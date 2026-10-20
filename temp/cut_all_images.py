"""Recorta el fondo de todas las fotos de producto con un modelo de segmentacion.

- Solo procesa imagenes con fondo BLANCO de estudio (detectado por flood fill desde
  los bordes). Las fotos de estilo de vida o con fondo de color se dejan intactas.
- El recorte real lo hace `rembg` (modelo isnet-general-use), que da bordes limpios
  y elimina sombras/reflejos, incluida la banda blanca que queda bajo la base.

Uso:
    python temp/cut_all_images.py            # solo procesa las que faltan
    python temp/cut_all_images.py --force    # reprocesa todo

Lee  temp/cut_manifest.json   ->  [{ url, out }]
Escribe  temp/cut_results.json  ->  { url: 'img/cut/xxxx.webp' | null }
"""
import hashlib
import json
import os
import sys
import time
import urllib.request

import numpy as np
from PIL import Image
from scipy import ndimage

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(ROOT)

FORCE = '--force' in sys.argv
MODEL = 'isnet-general-use'
MANIFEST = 'temp/cut_manifest.json'
RESULTS = 'temp/cut_results.json'
CACHE = 'temp/cut_cache'
OUTDIR = 'img/cut'

os.makedirs(CACHE, exist_ok=True)
os.makedirs(OUTDIR, exist_ok=True)

from rembg import new_session, remove  # noqa: E402

print('Cargando modelo %s...' % MODEL, flush=True)
SESSION = new_session(MODEL)


def fetch(url, key):
    if url.startswith('http'):
        ext = os.path.splitext(url.split('?')[0])[1].lower()
        if ext not in ('.jpg', '.jpeg', '.png', '.webp'):
            ext = '.jpg'
        raw = os.path.join(CACHE, key + ext)
        if not os.path.exists(raw) or os.path.getsize(raw) < 500:
            req = urllib.request.Request(url, headers={
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 '
                              '(KHTML, like Gecko) Chrome/124.0 Safari/537.36'
            })
            with urllib.request.urlopen(req, timeout=45) as r, open(raw, 'wb') as f:
                f.write(r.read())
        return raw
    p = url[3:] if url.startswith('../') else url
    return p if os.path.exists(p) else None


def white_bg_ratio(img):
    """Fraccion de blanco de estudio conectado a los bordes (0..1)."""
    small = img.convert('RGB').resize((320, 320), Image.BILINEAR)
    arr = np.asarray(small).astype(np.int16)
    r, g, b = arr[:, :, 0], arr[:, :, 1], arr[:, :, 2]
    near_white = (r >= 236) & (g >= 236) & (b >= 236)
    if near_white.mean() < 0.10:
        return 0.0
    labels, _ = ndimage.label(near_white)
    border = set(labels[0, :]) | set(labels[-1, :]) | set(labels[:, 0]) | set(labels[:, -1])
    border.discard(0)
    if not border:
        return 0.0
    return float(np.isin(labels, list(border)).mean())


def halo_ratio(rgba):
    """Pixeles claros (min canal > 215) que quedan opacos en el borde del objeto."""
    a = np.asarray(rgba.getchannel('A')).astype(np.uint8)
    rgb = np.asarray(rgba.convert('RGB')).astype(np.int16)
    mn = rgb.min(axis=2)
    opaque = a > 38
    if not opaque.any():
        return 1.0
    inner = ndimage.binary_erosion(opaque, iterations=3)
    edge = opaque & ~inner
    rim = edge & (mn > 215)
    return float(rim.sum() / max(edge.sum(), 1))


def trim_transparent(rgba, pad_pct=0.025):
    """Recorta el margen transparente dejando un pequeno aire alrededor del producto."""
    a = np.asarray(rgba.getchannel('A'))
    mask = a > 38
    if not mask.any():
        return rgba
    ys, xs = np.where(mask)
    x0, x1 = int(xs.min()), int(xs.max()) + 1
    y0, y1 = int(ys.min()), int(ys.max()) + 1
    w, h = rgba.size
    pad = int(max(x1 - x0, y1 - y0) * pad_pct)
    x0 = max(0, x0 - pad)
    y0 = max(0, y0 - pad)
    x1 = min(w, x1 + pad)
    y1 = min(h, y1 + pad)
    return rgba.crop((x0, y0, x1, y1))


def process(item):
    url, out = item['url'], item['out']
    key = hashlib.md5(url.encode('utf-8')).hexdigest()[:10]
    try:
        src = fetch(url, key)
    except Exception as ex:
        return url, None, 'error', 'descarga: %s' % ex

    if not src:
        return url, None, 'error', 'archivo no encontrado'

    try:
        im = Image.open(src)
        im.load()
        im = im.convert('RGB')
    except Exception as ex:
        return url, None, 'error', 'imagen: %s' % ex

    ratio = white_bg_ratio(im)
    if ratio < 0.15:
        return url, None, 'sinfondo', 'borde blanco %.1f%%' % (ratio * 100)

    cut_img = remove(im, session=SESSION, post_process_mask=True).convert('RGBA')
    cut_img = trim_transparent(cut_img)

    a = np.asarray(cut_img.getchannel('A'))
    h, w = a.shape
    opaque = (a > 38).mean()
    center = (a[int(h * .35):int(h * .65), int(w * .35):int(w * .65)] > 38).mean()
    if opaque < 0.04 or opaque > 0.95 or center < 0.05:
        return url, None, 'dudoso', 'opaque=%.2f center=%.2f' % (opaque, center)

    halo = halo_ratio(cut_img)
    if halo > 0.35:
        # borde practicamente blanco: probablemente el modelo no separo bien el producto
        return url, None, 'halo', 'halo=%.3f' % halo

    cut_img.thumbnail((800, 800), Image.LANCZOS)
    cut_img.save(out, quality=90, method=6)
    return url, out, 'ok', 'opaque=%.2f halo=%.3f' % (opaque, halo)


with open(MANIFEST, encoding='utf-8') as f:
    manifest = json.load(f)

results = {}
if os.path.exists(RESULTS):
    try:
        with open(RESULTS, encoding='utf-8') as f:
            results = json.load(f)
    except Exception:
        results = {}

pending = []
reused = 0
for item in manifest:
    out = item['out']
    if os.path.exists(out) and not FORCE and os.path.getsize(out) > 500:
        results[item['url']] = out
        reused += 1
    else:
        pending.append(item)

total = len(manifest)
ok = skipped = failed = 0
done = reused
t0 = time.time()

if pending:
    print('Procesando %d imagenes nuevas (%d ya estaban)...' % (len(pending), reused), flush=True)

    # Descargar en paralelo; la inferencia va en serie (usa todos los nucleos).
    def prefetch(item):
        key = hashlib.md5(item['url'].encode('utf-8')).hexdigest()[:10]
        try:
            fetch(item['url'], key)
        except Exception:
            pass

    from concurrent.futures import ThreadPoolExecutor
    with ThreadPoolExecutor(max_workers=8) as ex:
        list(ex.map(prefetch, pending))

for item in pending:
    url, out, status, detail = process(item)
    done += 1
    if status == 'ok':
        ok += 1
        results[url] = out
    elif status == 'error':
        failed += 1
        results[url] = None
        print('[%d/%d] ERROR %s (%s)' % (done, total, url, detail), flush=True)
    else:
        skipped += 1
        results[url] = None
        if status in ('dudoso', 'halo'):
            print('[%d/%d] SKIP %s %s (%s)' % (done, total, status, detail, url), flush=True)

    if done % 20 == 0 or done == total:
        rate = (time.time() - t0) / max(done - reused, 1)
        print('[%d/%d] recortadas=%d reusadas=%d sinfondo=%d errores=%d  (%.1fs/img)' % (
            done, total, ok, reused, skipped, failed, rate), flush=True)

with open(RESULTS, 'w', encoding='utf-8') as f:
    json.dump(results, f, ensure_ascii=False, indent=0, sort_keys=True)

print('\nListo: nuevas=%d reusadas=%d descartadas=%d errores=%d de %d' % (
    ok, reused, skipped, failed, total))
print('Resultados -> %s' % RESULTS)
