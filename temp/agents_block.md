
## 🖼️ REGLA FIJA: fotos de producto RECORTADAS en TODAS las guías (20/10/2026)

**Todas las guías del sitio usan el mismo tratamiento visual** (aprobado por el usuario el 20/10/2026
con la guía best-monitors): la foto del producto va **recortada, sin fondo blanco, en WebP con
transparencia**, y se apoya sobre un **gris translúcido** (no sobre un bloque blanco).

Se aplica a los **tres** sitios donde aparece la foto dentro de una guía:

| Sitio | Clase | Estilo |
|---|---|---|
| Portada de la guía (hero 21:9) | `guide-detail-img--cutout` | `object-fit:contain`, padding 18px, fondo `rgba(255,255,255,.28)` |
| Miniaturas 120×120 de cada sección | `guide-section-img--cutout` | `contain`, padding 6px, fondo `rgba(255,255,255,.28)` |
| Cards de "What Products Are in This Guide?" | `guide-product-card--cutout` + `guide-product-card-img--cutout` | `contain`, padding 10px, card y tile translúcidas |
| Lightbox (foto en grande) | selector `#lightbox img[src*="/img/cut/"]` | fondo gris, **border-radius 14px** como las cards |

### Cómo se genera (NO hacerlo a mano)

1. `node temp/gen_cut_manifest.js` — junta las URLs únicas de `products.json` + `guides.json` en `temp/cut_manifest.json`.
2. `python temp/cut_all_images.py` — descarga, recorta y guarda `img/cut/<md5>.webp` (800 px, q90). Es **idempotente**: reutiliza lo ya recortado. `--force` para reprocesar.
3. `node temp/apply_cut_results.js` — escribe `data/cut-images.json` (URL -> WebP). `build-guides.js` lo lee con `cutFor()` y aplica las clases solo cuando existe el recorte.

**`temp/deploy.js` ejecuta estos 3 pasos automáticamente antes de reconstruir.** Por eso, al añadir
un producto nuevo, el deploy normal ya lo recorta; no hay que llamar a nada más.

### Algoritmo (por qué no deja halo)

Flood fill de blanco (`r,g,b >= 236`) **desde los bordes**, crecimiento por sombra suave
(`min(r,g,b) >= 205`, hasta 40 pasadas) para comerse la banda blanca de la base, banda de borde
de 3 px con `alpha = 255 - min(r,g,b)` y decontaminación de color. Los logotipos y textos blancos
**dentro** del producto se conservan porque no están conectados al borde.

### Seguridad (imágenes que NO se recortan)

Se descarta el recorte (se deja el JPEG original) cuando:
- el borde no es blanco (`< 15%` de fondo) → fotos de estilo de vida, backgrounds de color;
- el producto se comió por ser blanco (`center < 5%` de píxeles opacos en el centro);
- el resultado es casi vacío (`opaque < 5%`) o casi opaco (`> 90%`).

Esas imágenes siguen funcionando igual: sin clase `--cutout`, con `object-fit:cover` y su fondo
propio. Nunca se rompe una card por no tener recorte.

### Al añadir un producto o una guía nueva

- Solo hay que añadir el producto a `data/products.json` (con `img` de Gear4Music) y a la guía; el
  deploy recorta y aplica el estilo solo.
- Si el producto es **blanco sobre fondo blanco** y el recorte automático lo descarta, revisar la
  imagen a mano: es el único caso donde hace falta una foto con más contraste.
- El resto del sitio (home, deals) sigue usando las fotos originales; esta regla es de las guías.
