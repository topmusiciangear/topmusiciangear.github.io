// Scores revisados guia por guia, leyendo el veredicto y la conclusion de CADA
// guia. El veredicto dice quien es el flagship ("the time-tested standard",
// "best overall"); la conclusion dice el orden de preferencia.
//
// Formato: { "<guideId>": { "<nombre tal cual aparece en la guia>": 8.7-9.8 } }
//
// Si un producto sale en varias guias y una lo pone por encima de otro que otra
// guia coloca por debajo, manda la guia donde es el TOP de la comparativa.
module.exports = {
  'best-home-studio-speakers': {
    // Conclusion: "buy the Mackie CR4.5", veredicto: Best overall + 65 Hz, la mas barata.
    'Mackie CR4.5': 9.8,
    // Conclusion: segunda opcion para mezclar a alto volumen; 64 W continuos.
    'Behringer Truth 3.5 BT': 9.6,
    // Conclusion: solo 4 Hz por debajo del CR4.5, "best for isolation".
    'M-Audio BX4': 9.5,
    // Veredicto: "best all-round first monitor".
    'PreSonus Eris 3.5 2nd Gen': 9.4,
    // Conclusion: escritorio pequeno con presupuesto de 100 $.
    'Mackie CR3.5': 9.3,
    // Conclusion: "not a monitor" — sin entrada balanceada ni waveguide.
    'Edifier R1280T': 8.8,
  },

  // --- DAW: comparativas de 2, ambos de primer nivel, para usos distintos ---
  'ableton-vs-fl-studio': {
    // Veredicto: "live-performance and sound-design powerhouse" (Ableton va
    // primero y es el mas caro, 749 vs 199). FL es "beat-making favorite".
    'Ableton Live 12 Suite': 9.7,
    'FL Studio Producer Edition': 9.3,
  },
  'ableton-vs-logic': {
    // Conclusion: Ableton "creative powerhouse"; Logic "best value in
    // professional audio" y 200 vs 749. Ambos top-tier, Ableton lidera.
    'Ableton Live 12 Suite': 9.7,
    'Logic Pro': 9.5,
  },

  // --- Guitarras acusticas profesionales ---
  'acoustic-guitars-guide': {
    // Conclusion: "start with the Martin D-28 — and if you want that same soul
    // refined with modern build tech, the D-28 Modern Deluxe".
    'Martin D-28 Dreadnought': 9.8,
    // Conclusion: "the ultimate expression of traditional tone".
    'Martin D-28 Modern Deluxe': 9.7,
    // Conclusion: "the balanced studio weapon" para fingerstyle y sesion.
    'Martin OM-42': 9.5,
    // Conclusion: "modern engineering and handcrafted luxury".
    'Taylor 914ce Builder\u2019s Edition': 9.4,
    // Conclusion: mismo bloque que la 914ce.
    'Taylor PS14ce': 9.3,
    // Conclusion: "stage and studio icons" — la voz vintage calida de Gibson.
    'Gibson Custom Shop 1942 Banner J-45': 9.2,
    'Gibson SJ-200': 9.0,
  },

  // --- Monitores ---
  'adam-vs-genelec': {
    // Conclusion: "both are exceptional monitors"; el A7V va primero y la
    // guia lo elige para detalle y graves extendidos.
    'Adam Audio A7V': 9.6,
    // Conclusion: "excels with ruthless accuracy" — igual de excepcional.
    'Genelec 8040B': 9.5,
  },

  // --- Plugins de IA ---
  'ai-tools-plugins': {
    // Conclusion: "Start with Sonible smart:EQ 4" = el primero recomendado.
    'Sonible smart:EQ 4': 9.8,
    // Conclusion: "Add iZotope Neutron 5" como segunda.
    'iZotope Neutron 5': 9.6,
    // Conclusion: "consider MIXVAULT for immersive 3D EQ shaping".
    'Mastering The Mix MIXVAULT': 9.3,
    // Conclusion: "handles the final limiting stage".
    'Sonible smart:limit': 9.1,
    // Conclusion: "adds creative distortion when your mix needs character".
    'iZotope Trash': 8.9,
  },

  // --- PA activa vs pasiva ---
  // El veredicto elige DOS activos (EON712 y ELX200-15P) como "our active
  // picks", tres pasivos como alternativa solida y el SRT215 como monitor.
  'active-vs-passive-pa': {
    'JBL EON712 Active PA Speaker': 9.6,
    'EV ELX200-15P Active PA Speaker': 9.5,
    'Mackie SRT215 Active PA Speaker': 9.3,
    'JBL JRX215 Passive Speaker': 9.2,
    'EV ELX200-12 Passive Speaker': 9.1,
    'Yamaha CBR12 Passive Speaker': 9.0,
    // Citados en la tabla como alternativa activa, sin premio en el veredicto.
    'EV ZLX-12P-G2 Active PA Speaker': 8.9,
    'Yamaha DBR12 Active PA Speaker': 8.9,
    'QSC K12.2 Active PA Speaker': 8.8,
  },

  // --- Bajo de 5 cuerdas ---
  // La conclusion reparte por acciones, NO un ranking global: budget,
  // mid-range y premium winners. La nota refleja el escalon de calidad real
  // dentro de cada gama, no el orden de la tabla (que va de barato a caro).
  'best-5-string-basses': {
    // PREMIO: el AmPro II Jazz V es el flagship de Fender; el Ultra II es su
    // version activa, la mas completa del grupo.
    'Fender American Ultra II Jazz Bass V': 9.8,
    'Fender American Professional II Jazz Bass V': 9.7,
    // PREMIO: "the clearest low B" y la voz mas transparente.
    'Ibanez EHB1005MS Headless Bass': 9.6,
    // PREMIO: "for progressive metal".
    'Dingwall Combustion 5-String Bass': 9.5,
    // MID-RANGE: "for modern active metal".
    'Schecter Stiletto Stealth-5 Bass Guitar': 9.4,
    // MID-RANGE: "for passive tone".
    'Yamaha BB435 Bass': 9.3,
    'Ibanez SR505A Bass': 9.2,
    'Squier Classic Vibe \'70s Jazz Bass V': 9.1,
    // BUDGET: "for versatility".
    'Yamaha TRBX305 Bass': 9.0,
    // BUDGET: "classic passive voice".
    'Squier Affinity Jazz Bass V': 8.9,
    // Solo citados como punto de partida, sin premio en la conclusion.
    'Ibanez GSR205B Gio Bass': 8.8,
    'Sterling by Music Man SUB Ray5': 8.7,
  },

  // --- Acusticas para principiantes ---
  // Veredicto: el FG800 es "the best-value beginner acoustic of 2026"; la
  // conclusion lo repite como "the best-value acoustic you can buy". El CD-60S
  // es "best budget all-rounder" y el DR-100 "best ultra-budget".
  'best-acoustic-guitars-for-beginners': {
    'Yamaha FG800 Acoustic': 9.8,
    'Yamaha FS800': 9.5,
    'Fender CD-60S Acoustic': 9.4,
    // Conclusion: "our favorite value solid-top dreadnought to grow on".
    'Ibanez AW54 Artwood': 9.3,
    // Conclusion: "the premium travel pick" (450 $).
    'Martin LX1 Little Martin': 9.2,
    // Conclusion: "the best electro-acoustic for beginners".
    'Yamaha FGX800C': 9.1,
    // Conclusion: "the best ultra-budget pick" (169 $).
    'Epiphone DR-100 Acoustic Guitar': 8.9,
  },

  // --- Bajos por debajo de 700 $ ---
  // Todos del mismo escalon (todos bajo 700 y "pro-level build"), asi que la
  // nota separa por eluso que la conclusion les asigna: el TRBX304 es "the
  // most versatile for any genre" y encabeza el reparto.
  'best-bass-under-700': {
    // Conclusion: "the most versatile for any genre".
    'Yamaha TRBX304': 9.8,
    // Conclusion: "the passive P/J that sound engineers quietly reach for".
    'Yamaha BB434': 9.6,
    // Conclusion: "delivers that thick mid-forward funk and slap punch".
    'Sterling by Music Man StingRay Ray4': 9.5,
    // Conclusion: "the warm, woody voice of a classic jazz bass".
    'Sire Marcus Miller V5R': 9.4,
    // Conclusion: "The Schecter dominates for metal".
    'Schecter Stiletto Stealth 4 Bass': 9.3,
    // Conclusion: "brings modern speed and active tone shaping".
    'Ibanez SR300E': 9.2,
    // Conclusion: "offers custom-shop looks".
    'ESP LTD B-204SM Bass Guitar': 9.1,
    // Conclusion: "gives a unique sound".
    'Hofner Ignition Violin Bass (Beatle Bass)': 8.9,
  },

  // --- Electricas para principiantes ---
  // Conclusion: "the answer starts in the value tier". El Revstar es "the next
  // step up" y el unico que la guia saca del rango de entrada.
  'best-beginner-electric-guitar': {
    // Conclusion: "a step up that lasts" — el unico fuera del escalon de
    // entrada y el mas caro del grupo (540 $), por encima de los de valor.
    'Yamaha Revstar Element RSE20': 9.8,
    // Conclusion: "the best all-round starter" (abre el escalon de valor).
    'Yamaha Pacifica 112V': 9.6,
    // Conclusion: "the classic pick".
    'Squier Affinity Series Stratocaster': 9.5,
    // Conclusion: "the simplest for staying in tune".
    'Squier Sonic Stratocaster HT': 9.4,
    // Conclusion: "the cheapest real Les Paul-style humbucker guitar".
    'Epiphone Les Paul Special-II E1': 9.3,
    // Conclusion: "brings a premium roasted-maple neck to budget territory".
    'Jet Guitars JS-300': 9.2,
    // Conclusion: "handles rock and metal".
    'Ibanez Gio GRG121DX': 9.1,
    'Squier Sonic Mustang': 9.0,
    'Enya Nova Go Sonic': 8.9,
    // Citado en la tabla sin salir en la conclusion.
    'Squier Debut Series Stratocaster': 8.8,
  },

  // --- Mesas de mezcla de rack ---
  // Conclusion: "the X32 Rack remains the standard"; el resto son alternativas
  // por caso de uso (sin app, potencia 48ch, 96 kHz, rack 1U, presupuesto).
  'best-compact-mixers': {
    // Conclusion: "the X32 Rack remains the standard".
    'Behringer X32 Rack': 9.8,
    // Conclusion: "Bands who hate apps should buy the Ui24R".
    'Soundcraft Ui24R': 9.6,
    // Conclusion: "maximum power" con 48 canales estereo.
    'Behringer WING Rack': 9.5,
    // Conclusion: "96kHz purists" y "the budget option".
    'Behringer X Air XR18': 9.4,
    'Allen & Heath SQ-Rack': 9.3,
    // Conclusion: "the self-mixing CQ-20B".
    'Allen & Heath CQ-20B': 9.2,
    // Conclusion: "Travel light with the 1U M32C plus DL stage boxes".
    'Midas M32C': 9.1,
    // Conclusion: "bridge studio and stage".
    'PreSonus StudioLive SE 24R': 9.0,
  },

  // --- Condensadores profesionales ---
  // La conclusion es una escalera explicita de precio: "Eight condensers, one
  // ladder". El AT2020 (99 $) ABRE la escalera ("teaches placement for $99") y
  // el U 87 Ai (3.599 $) la CIERRA ("ends the climb"). Por eso la nota sube
  // con el escalon real, no con la posicion en la tabla.
  'best-condenser-mics': {
    // Conclusion: "ends the climb" — el flagship de toda la vida.
    'Neumann U 87 Ai': 9.8,
    // Conclusion: "covers tube gloss".
    'Warm Audio WA-8000': 9.5,
    // Conclusion: "sets the modern vocal standard".
    'Neumann TLM 103': 9.4,
    // Conclusion: "covers every pattern" (9 patrones).
    'AKG C414 XLII': 9.3,
    // Conclusion: "covers all 38 classics after tracking".
    'Universal Audio Sphere DLX': 9.1,
    // Conclusion: "brings transformer weight, pads and filters for $299".
    'sE Electronics sE2200': 9.2,
    // Conclusion: "sounds finished with zero switches".
    'Lewitt LCT 440 PURE': 9.0,
    // Conclusion: "removes self-noise from the equation" (4 dBA).
    'Rode NT1 Signature Series': 8.9,
    // Conclusion: "teaches placement for $99" — el punto de entrada.
    'Audio-Technica AT2020': 8.7,
  },

  // --- Auriculares de estudio ---
  // Conclusion: "Need one pair for everything? Get the DT 770 Pro" y "the HD
  // 490 Pro Plus is the most versatile keeper". El LCD-X es "the planar last
  // word" y el HD 600 "the legendary flat reference".
  'best-headphones': {
    // Conclusion: "the one pair for everything".
    'Beyerdynamic DT 770 Pro': 9.8,
    // Conclusion: "the most versatile keeper" para mezcla.
    'Sennheiser HD 490 Pro Plus': 9.7,
    // Conclusion: "the planar last word".
    'Audeze LCD-X': 9.5,
    // Conclusion: "the legendary flat reference" que evita la fatiga de agudos.
    'Sennheiser HD 600': 9.4,
    // Conclusion: "the portable mastering room".
    'Neumann NDH 30': 9.2,
    // Conclusion: "the honest first ticket" y referencia de_STARTING OUT.
    'Audio-Technica ATH-M50x': 9.1,
    // Conclusion: "the featherlight comfort reference".
    'Audio-Technica ATH-R70xa': 9.0,
    // Conclusion: presupuesto: "the absurd value".
    'Samson SR850': 8.9,
    // Conclusion: la eleccion economica de la guia.
    'Sony MDR-7506': 8.8,
    // Conclusion: "the fatiguing DT 990" — el unico con pega declarada.
    'Beyerdynamic DT 990 Pro': 8.7,
    // Citados en la tabla sin posto propio en la conclusion.
    'AKG K371': 8.9,
    'Audio-Technica ATH-M20x': 9.0,
  },
};
