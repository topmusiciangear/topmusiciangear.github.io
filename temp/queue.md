# Cola de la sesion — aplicado en ficheros, SIN construir y SIN desplegar

Estado: los 11 de abajo ya estan escritos en `build-guides.js` + `data/products.json` +
`temp/pb_verify_data.js`. Falta `gen-shop-buttons` -> `build-guides` -> tests -> deploy.

| # | id | Producto | Cambios aplicados |
|---|----|----------|-------------------|
| 1 | 324 | Novation Launchkey Mini 25 MK4 | MS €99 (€111→), zZounds SKU `AKAMPKMINI4`... ver nota, Andertons £99, G4M £102 |
| 2 | 14 | NI Kontrol S61 MK3 | G4M £699, Andertons -> home (wrap Impact auto) sin precio + `oos` |
| 3 | 370 | Roland GO:KEYS 3 | MS €349, G4M £315 + enlace nuevo 6AB8, Andertons £319 |
| 4 | 143 | Moog Subsequent 37 | MS €1,679, G4M £1,594, Andertons £1,469 |
| 5 | 475 | Arturia MicroFreak | MS €319, G4M `oos` sin precio (descatalogado en G4M) |
| 6 | 476 | Behringer DeepMind 12 | G4M nuevo `/1RU7` `oos` sin precio, fuera de `excludeStores` |
| 7 | 477 | ASM Hydrasynth | MS €1,299, G4M £1,099, Andertons £1,058 |
| 8 | 478 | Sequential Take 5 | zZounds $1,499, MS €1,459 |
| 9 | 267 | Shure PSM300 | MS €959, zZounds $989, G4M £875 |
| 10 | 269 | Shure SE846 Gen 2 | G4M £902 (arreglado `£813` sin decimales) |
| 11 | 349 | Sennheiser EW IEM G4 Stereo | MS €949 + enlace nuevo `PAH0019940-000`, G4M `£881` -> `£881.00` |

## Notas / avisos para el usuario
- **id 324 Launchkey**: el numero del item 1 es MS/G4M/Andertons. El cambio de SKU zZounds
  `AKAMPKMINI3` -> `AKAMPKMINI4` ya estaba en HEAD (deploy `f4f6957a36`), NO rehacer.
  OJO: un `git checkout -- build-guides.js` borró este bloque y hubo que reaplicarlo.
- **id 14 Kontrol**: SÍ existe afiliado de Andertons, lo inyecta `wrapAndertons()`
  (build-guides.js:175, deep-link Impact `pxf.io`). `products.json` guarda URLs limpias.
- **id 349**: el enlace de Music Store es la variante **banda B**; el de G4M es **GB band**
  (2B9S) y el de Andertons tambien `-gb-`. Son bandas de frecuencia distintas.
- **id 476 DeepMind 12**: la descripcion del usuario es casi correcta ("8-bus modulation matrix"
  CONFIRMADO), pero el filtro es conmutable 12/24 dB (no fijo 24), las 3 envolventes son
  por voz, y tiene **49 teclas**. El modelo esta superado por el **DeepMind 12X** (mismo
  hardware, acabado nuevo). zZounds ya estaba `oos` correctamente ("No longer available").
- **id 475 MicroFreak**: sigue siendo Plaits (firmware V5, 21 modos). No hay MicroFreak 2.
  El blanco es la Vocoder Edition, otro producto.
- **id 267 PSM300**: el Amazon $419.99 queda SIN tocar (descuadrado con el resto, ~$419 vs
  ~$989) — pendiente de que el usuario lo confirme.

## Cuando el usuario diga "listo"
1. `node temp/gen-shop-buttons.js`
2. `node build-guides.js`
3. `node temp/pb_verify_data.js`
4. `node temp/test_no_pb_regression.js`
5. `node scripts/verify-links.js`
6. `node temp/verify75.js` (verifica los 11 ids contra `js/shop-buttons.js`)
7. `node temp/deploy.js "<mensaje>"` + esperar Pages `built` + verificar en vivo
