# PLAN premium-interfaces — DECISIONES FINALES + DATOS VERIFICADOS (2026-09-20)

## Slug nuevo: `premium-interfaces` (aprobado por usuario; NO se llama pro/portable — pro-interfaces ya ocupa el espacio "Apollo vs Fireface UFX III" comparativa, es otra cosa)
- category = interfaces, badge general = premium
- PORTADA = la img del **Universal Audio Apollo x16 Gen 2 (id 182)**: cover del guide
- Estructura idéntica a pro-interfaces (template premium real: featuredProducts=[182,183], sections con products como IDs numéricos, productTable con `label/label_es` y `values[].value/value_es`, verdictProsCons con name/name_es/pros/pros_es/cons/cons_es, FAQ con q/a en/an, SEO: titleTag/titleTag_es/featuredSnippet/featuredSnippet_es/faqTitle/faqTitle_es etc.)

### CRÍTICO — DOS CONVENCIONES de products en guides.json:
- portable-interfaces usa sections[].products = **ARRAY DE NOMBRES (strings)** ej "Universal Audio Apollo x16 Gen 2"
- pro-interfaces usa sections[].products = **ARRAY DE IDS (número)** ej [182,183]
- Al migrar: REWRITE por id, no copiar objetos. Para quitar de portable: filtrar los nombres; para añadir a premium: pushear ids.

## PRODUCTOS (fuentes reales 5+ tiendas — NUNCA inventar precio):
### 1) Neumann MT 48 (o MT 48 U) — crear nuevo
- $1,995 Sweetwater https://www.sweetwater.com/store/detail/MT48--neumann-mt-48-audio-interface (desktop)
- $1,995 FrontEndAudio (MT 48 U) https://www.frontendaudio.com/neumann-mt-48-u-audio-interface/
- €1,511.80 MusicStore https://www.musicstore.com/en_OE/EUR/Neumann-MT-48-U/art-PCM0017584-000
- €1,910 Gear4Music IE https://www.gear4music.ie/Recording-and-Computers/Neumann-MT48-Premium-Audio-Interface/5E3S
- £1,525 Andertons https://www.andertons.co.uk/Neumann-MT-48-U-Audio-Interface/
- $1,750 GuitarCenter MT 48 U (150000037955 Arthur transit / 1500000074618-4808?) https://www.guitarcenter.com/Neumann/MT-48-U-AES67-and-USB-Audio-Interface-1500000430404.gc + Sweetwater
- IMG real (Sweetwater MT 48): https://media.sweetwater.com/api/i/q-82__ha-8fc5a8a7__hmac-4dac7e1896e3334c/images/items/750/MT48-med.jpg
### 2) Universal Audio Apollo x8p Gen 2 — crear nuevo
- $3,499 Sweetwater https://www.sweetwater.com/store/detail/ApolloX8PG2E--universal-audio-apollo-x8p-gen-2-essentials-plus-thunderbolt-audio-interface-with-uad-dsp
- $3,299 zZounds https://www.zzounds.com/a--925521/item--UADX8PG2E
- $3,499 Sam Ash https://www.samash.com/universal-audio-apollo-x8p-gen-2-audio-interface-essentials-plus-suite
- £3,333 Andertons https://www.andertons.co.uk/apollo-x8p-gen-2-essentials-plus/
- $3,499 GuitarCenter https://www.guitarcenter.com/Universal-Audio/Apollo-x8p-Gen-2-Photoshop/ (ver) | Amazon bundle B0DC12V1GS
- IMG real UA x8p Gen2: https://s7g10.scene7.com/is/image/Sweetwater/ApolloX8PG2E-industry ... (usar la de sweetwater o zzounds) — buscar en research
### 3) Apogee Symphony I/O Mk II (16x16 SE Thunderbolt) — crear nuevo
- $5,995 Sweetwater https://www.sweetwater.com/store/detail/Symph21616SE--apogee-symphony-i-o-mk-ii-16x16-se-thunderbolt-3
- $5,995 Vintage King https://vintageking.com/apogee-symphony-i-o-mk-ii-16x16-se-thunderbolt
- $5,495 lunchboxaudio https://www.lunchboxaudio.com/apogee-symphony-i-o-mk-ii-16x16-se-thunderbolt
- $7,995 B&H (Symphony I/O Mk II 16x16 SE TB) https://www.bhphotovideo.com/c/product/128878 Screw
- $8,399 B&H (16x16 SE TB+Dante) https://www.bhphotovideo.com/c/product/1817773-REG/...
- IMG real: sweetwater symphony io
### 4) Audient ORIA (immersive USB-C 16ch) — crear nuevo
- $3,499.99 Sweetwater https://www.sweetwater.com/store/detail/ORIA--audient-oria-immersive-audio-interface-and-monitor-control?verificar
- $3,499.99 Musician's Friend https://www.musiciansfriend.com/pro-audio/audient-oria-immersive-audio-interface-and-monitor-controller/m14719000000000
- $3,499 Vintage King https://vintageking.com/audient-oria-immersive-audio-interface-and-monitor-controller
- $3,499.99 lunchboxaudio https://lunchboxaudio.com/audient-oria-immersive-audio-interface-and-monitor-controller/
- $3,499 Audient (oficial) https://audient.com/products/monitor-controllers/oria/overview/ + zZounds
- IMG real ORIA: https://media.sweetwater.com/... ORIA-med.jpg
### 5) Lynx Aurora-n 16 (USB) — crear nuevo
- $4,199 Sweetwater https://www.sweetwater.com/store/detail/AuroraN16USB--lynx-aurora-n-16-usb
- $4,050 PureWave https://purewaveaudio.com/lynx-aurora-n-16-usb
- $4,050 Dale Pro Audio https://daleproaudio.com/products/lynx-auroran-16-usb
- $4,049 Lynx oficial https://www.lynxstudio.com/products/aurora-n/ (MSRP $4,199)
- zZounds / PureWave Aurora-n 16 TB3 $4,600-4,649
- IMG real Aurora-n: https://cdn11.bigcommerce.com/s-onqzwy.../Aurora-M-16__35699.1686087508.jpg?c=1

## YA EXISTEN (no crear):
- id 182 UA Apollo x16 Gen 2 ($3,999, premium) → migrar a premium-interfaces (portada + producto)
- id 16 UA Apollo Twin X Gen 2 ($999, premium) → migrar a premium-interfaces
- id 183 RME Fireface UFX III ($3,199, premium) → incluir en premium-interfaces
- id 17 RME Babyface Pro FS ($949) → se queda PORTABLE? NO: user lo listó en premium. Decisión: Babyface Pro FS QUIZÁ se queda portable (es la reina portátil) — pero user lo incluyó en la lista premium. Verificar al construir: portable-interfaces tras migrar debe QUEDAR con portátiles reales (Babyface, Scarlett, SSL2...). Apollo Twin X/x16 NO encajan → migran. Babyface Pro FS ES portátil → queda portable.

## Construcción premium-interfaces (EN+ES):
- sections: [Desktop Premium (Neumann MT 48, UA Apollo Twin X Gen 2? — Twin X es desktop, Babyface es portable-desktop), Rack/Rackmount (Apollo x8p Gen 2, RME Fireface UFX III, Apollo x16 Gen 2), Especialidades/Immersive (Apogee Symphony, Audient ORIA, Lynx Aurora-n)]
- productTable con las 7: columnas label EN/ES (Best For, Preamps, Connectivity, Sample Rate, DSP, Channels) + values EN/ES
- verdict stable: "¿Cuál elegir?" Apollo Twin X Gen 2 para desktop/premium-portable; RME Fireface UFX III para rack fiabilidad; Apollo x16 Gen 2 DSP; favorecer por caso de uso
- FAQ EN+ES (3-5), faqTitle/faqTitle_es, relatedGuides (pro-interfaces, apollo-vs-babyface, portable-interfaces...)
- SEO: titleTag/titleTag_es, featuredSnippet/featuredSnippet_es, featuredProducts=[182,16,183,+5nuevos]
- Unit: intro, intro_es, description, description_es, conclusion con <a guide-link-btn> a portable/pro

## Migración portable-interfaces (quitar 2 Apollo):
- portable-interfaces sections[0].products filtrados: quitar "Universal Audio Apollo Twin X Gen 2" + "Universal Audio Apollo x16 Gen 2" (dejar RME Babyface, Focusrite, SSL, Volt, MiniFuse...)
- portable-interfaces sections[1].products: ídem quitar ambos Apollo
- portable-interfaces verdictProsCons: verificar si menciona UA → dejar solo portátiles
- portable-interfaces FAQ: verificar que no haga apollo-only preguntas
- Apollo Twin X y x16 pasar a premium-interfaces sections
- Apollo Twin X: portable badge queda portable? El producto YA existe con badge premium — NO tocar products.json de UA existentes (solo agregar los 4 nuevos). Los ids 16 y 182 ya tienen todos los stores. Solo cambiar a qué guide apuntan.

## Rebuild
- node build-guides.js (reconstruye guides/*.html desde data/guides.json + products.json)
- Verificar: portable-interfaces.html + _es SIN Apollo; premium-interfaces.html + _es CREADA con portada = img id 182
