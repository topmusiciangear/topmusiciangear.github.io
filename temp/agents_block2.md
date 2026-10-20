### Algoritmo (rembg + filtro de fondo blanco)

1. **Filtro**: flood fill de blanco (`r,g,b >= 236`) desde los bordes sobre una miniatura de 320 px.
   Si el blanco de estudio conectado al borde es **< 15%**, la imagen no es una foto de producto
   sobre blanco (estilo de vida, fondo de color, escenario) y **no se toca**.
2. **Recorte**: `rembg` con el modelo **`isnet-general-use`** (`post_process_mask=True`). Da máscara
   con bordes suaves, sin halo y elimina sombras/reflejos, incluida la banda blanca que quedaba
   bajo la base del altavoz con el método anterior de flood fill.
3. **Aire**: se recorta el margen transparente sobrante al contenido + 2.5 %, para que el producto
   llene la tarjeta de forma uniforme (antes las fotos con mucho margen se veían pequeñas).
4. **Salida**: WebP 800 px, calidad 90, con alfa.
5. **Controles de calidad** (si falla, se descarta el recorte y queda el JPEG original):
   opacos entre 4 % y 95 %, centro con producto (`center > 5 %`) y halo de píxeles claros en el
   borde `< 6 %`.

### Seguridad (imágenes que NO se recortan)

- fondo no blanco (fotos de estilo de vida, conciertos, productos en contexto);
- el modelo no detecta nada (`opaque < 4 %`) o no recorta nada (`opaque > 95 %`);
- el centro queda vacío o el borde conserva un halo claro anómalo.

Esas imágenes siguen funcionando igual: sin clase `--cutout`, con `object-fit:cover` y su fondo
propio. Nunca se rompe una card por no tener recorte.
