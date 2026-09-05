# TASK NOTE (para hacer luego)

## 0) REGLA GENERAL (usuario 05/09/2026): NUNCA traducir literalmente EN->ES
- Las traducciones word-for-word suenan a IA y se leen fatal en español (ejemplo citado por el usuario: el intro ES de studio-subwoofers-setup).
- REGLA PERMANENTE: cualquier texto ES debe escribirse directamente en español natural de cero, no como calco del inglés.

## 0.1) REESCRIBIR el español de la guía studio-subwoofers-setup (DONE 05/09/2026)
- Completada: intro, titles/headings, todos los section content_es (KH 810 II, KH 750 DSP, ATC, PMC, Dynaudio, Genelec, crossover, fase), conclusion_es, verdict_es, featuredSnippet text_es, pros/cons_es PMC y faq_a2_es reescritos en español natural.
- Cambios clave: "se integre sin costuras"→"se funda con tus monitores"; "cómo posicionarlo... y elegir graves de gama alta" (título, se mantuvo); eliminados "brief scan", "lo más parecido a un atajo", "fase escalonada", "Escucha la costura", "está construido como el mobiliario que se supone que es", "es la elección flagship", "filtros de límite", "te da el 80% del camino".

## 1) Waves SSL G-Master Buss Compressor — fix product 119 (DONE, local)
- Modeled from the SSL 4000 G console's master buss compressor; "the sound of a million hit records".
- FALSE prices/links currently on G4M and MusicStore buttons (product 119 stores.gear4music = awin -> "Waves SSL 4000 Collection"; stores.musicstore = awin -> "Studio Classics Collection" = FAKE LINK/PRICES).
- TODO: REMOVE musicstore store entry + remove the two fake prices (G4M & MS) from the buy buttons in TEST_SHOP_BTN / shp buttons. Keep ONLY PluginBoutique home with its affiliate link (a_aid): `https://www.pluginboutique.com/product/2-Effects/8-Compressor/13690-SSL-G-Master-Buss-Compressor?a_aid=6a01e859cbe1a`.
- Correct price = $39 at PluginBoutique (NOT $30 — currently some button shows $30).
- Keep price: 39. Keep zzounds oos as-is unless instructed.

## 2) Sonnox VoxDoubler — update product 378 (DONE, local)
- Two separate plugins: Thicken (adds body and weight), Widen (spreads stereo field); natural doubles without multiple takes.
- ADD store buttons (with prices shown):
  - Andertons `https://www.andertons.co.uk/sonnox-voxdoubler-esd/` -> price GBP 82.80
  - G4M `https://www.gear4music.com/Recording-and-Computers/Sonnox-Toolbox-VoxDoubler/4W9G` -> price GBP 82.80
  - So REMOVE "andertons","gear4music" from excludeStores (378 currently excludes them).
- CHANGE img to: `https://r2.gear4music.com/media/83/838272/1200/preview.jpg` (clean URL, no _gl tracking suffix). This also fixes the broken banners.pluginboutique.com image for 378.
- desc/desc_es already match; price stays 89 unless told otherwise.

## 3) iZotope RX 12 Advanced — fix product 122 (DONE, local)
- "Industry standard for audio repair and restoration, v12. Repair Assistant pinpoints noise, hum, clicks and reverb problems..."
- Andertons link + price: OK, keep `https://www.andertons.co.uk/izotope-rx-12-advanced/` as-is.
- MusicStore link: OK, but PRICE IS WRONG on the button -> correct to EUR 1,349.00 (currently shows something else).
- product 122 stores currently: pluginboutique (affiliate), gear4music (awin), musicstore (awin); excludeStores ["zzounds"].
- price field currently 1399 (USD) — do NOT change; only fix the MS buy-button price to €1,349.00.