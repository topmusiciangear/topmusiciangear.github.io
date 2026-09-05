# TASK NOTE (para hacer luego)

## 0) REGLA GENERAL (usuario 05/09/2026): NUNCA traducir literalmente EN->ES
- Las traducciones word-for-word suenan a IA y se leen fatal en español (ejemplo citado por el usuario: el intro ES de studio-subwoofers-setup).
- REGLA PERMANENTE: cualquier texto ES debe escribirse directamente en español natural de cero, no como calco del inglés.

## 0.1) REESCRIBIR el español de la guía studio-subwoofers-setup (DONE 05/09/2026)
- Completada: intro, titles/headings, todos los section content_es (KH 810 II, KH 750 DSP, ATC, PMC, Dynaudio, Genelec, crossover, fase), conclusion_es, verdict_es, featuredSnippet text_es, pros/cons_es PMC y faq_a2_es reescritos en español natural.
- Cambios clave: "se integre sin costuras"→"se funda con tus monitores"; "cómo posicionarlo... y elegir graves de gama alta" (título, se mantuvo); eliminados "brief scan", "lo más parecido a un atajo", "fase escalonada", "Escucha la costura", "está construido como el mobiliario que se supone que es", "es la elección flagship", "filtros de límite", "te da el 80% del camino".

## 0.2) SEGUNDA PASADA ES natural (DONE 05/09/2026, usuario: "está grabando mal, suena genérico")
- Causal: aún quedaban frases literalistas. Corregido en studio-subwoofers-setup:
  - title_es → "Cómo configurar un subwoofer de estudio: posición, calibración y los mejores modelos de gama alta"
  - intro_es → "lograr que se integre bien" (NO "se funda"); "los graves suenan embarrados" ok; "mezclas no se trasladan igual"; "recorre el proceso completo"
  - crawl → "la presión del sonido forma máximos y nulos"; "primero se coloca y luego se calibra"; "ese punto, no el que quede mejor visualmente"; "asimetría es justo lo que buscas"
  - KH810 → "mantienen la señal intacta, bit a bit"; "parece un mueble de sala de control"
  - KH750 → "MA 1 hace por ti la calibración que esa sala nunca ha tenido"; "este sub triunfa"
  - ATC → "Algunos de los mejores graves"; "El corte de graves"; "Tiene potencia de sobra"; PROS "mantiene la señal intacta, bit a bit"
  - PMC → "se integre con los canales" (NO "se funda"); "opciones de proximidad a las paredes" (NO "ajustes de límite de sala"); PROS "caída de graves suave y progresiva"; CONS "extensión de graves moderada"
  - Dynaudio → "concentra gran ingeniería" (NO "mete")
  - crossover → "un pequeño escalón" → "justo por encima"; "Acompáñalo con un paso alto" (NO "Empareja")
  - conclusion_es → "margen de sobra" (NO "margen serio"); link "mejores subwoofers de estudio por menos de $700" (NO "bajo $700")
  - verdict_es → "para montajes compactos, el PMC y el Dynaudio son las mejores opciones" (NO "deberían mirar")
  - snippet text_es → "elección principal" (NO "elección estrella"); "impulsa un altavoz" (NO "mueve un driver")
  - faq_a2_es → "opciones de proximidad a las paredes vía SoundAlign"
- TAMBIÉN: "bajo $300"→"por menos de $300" (best-interface) y "bajo $500"→"por menos de $500" (studio-subwoofers).
- Byline de autor (build-guides.js): ahora DINÁMICO con `fmtMonthYear(guide.datePublished, es)` — antes "Agosto 2026" hardcodeado, incongruente con datePublished 2026-09-05 de esta guía. ES: "Por Daniel Carnago · septiembre 2026" etc.
- REGLA PERMANENTE nueva (usuario): NUNCA "under $X" literal → "por menos de $X". NUNCA "se funda" (subuer/blend) → "se integre". Cualquier ES debe sonar como lo diría un humano.

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