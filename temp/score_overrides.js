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

  // --- Micros para instrumentos ---
  // Conclusion: "There's no single best microphone". La guia fija una PAREJA
  // base (SM57 + RE20, "your go-to pair") y luego especialistas por
  // instrumento. La nota refleja ese papel, no un ranking global.
  'best-instrument-mics': {
    // Conclusion: "Buy the SM57 and the RE20 first" — la pareja base.
    'Shure SM57': 9.8,
    'Electro-Voice RE20': 9.7,
    // Conclusion: "add an R-121 and a pair of Neumanns for guitars and acoustics".
    'Royer R-121': 9.5,
    'Neumann KM 184': 9.3,
    // Conclusion: "an e604 for drums".
    'Sennheiser e 604': 9.2,
    // Conclusion: "a DPA 4099 for strings".
    'DPA 4099 CORE': 9.2,
    // Mencionados en el veredicto como inherentes al rango dinamico.
    'Sennheiser MD 421 Kompakt': 9.1,
    'Shure Beta 58A': 9.0,
    'Shure Beta 52A': 8.9,
    'Sennheiser e 906': 8.9,
    'Austrian Audio OC818': 8.8,
    'Audix D6': 8.8,
    'Coles 4038': 8.7,
    // Citado en la tabla sin rol asignado en la conclusion.
    'Beyerdynamic M 201': 8.7,
  },

  // --- Micro para voz y grabacion domestica ---
  // Conclusion: "Start with the category that matches what you record". El
  // veredicto coloca el SM7B/SM7dB como dinamicos de referencia y la C414 y el
  // TLM 102 como "premium step-ups" del condensador.
  'best-microphone': {
    // Veredicto: "the premium step-ups" de condensador.
    'AKG C414 XLII': 9.7,
    'Neumann TLM 102': 9.6,
    // Veredicto: "the Shure SM7B and SM7dB own broadcast dynamics".
    'Shure SM7B': 9.5,
    'Shure SM7dB': 9.3,
    // Conclusion: condensadores de caracter.
    'Aston Microphones Origin': 9.1,
    'Lewitt LCT 440 PURE': 9.1,
    // Conclusion: "the Lewitt LCT 240 PRO and Audio-Technica AT2020 under $150".
    'Lewitt LCT 240 PRO': 9.0,
    'Rode NT1 5th Generation': 8.9,
    'Rode NT1 Signature Series': 8.9,
    // Conclusion: "The sE X1 R ribbon smooths harsh sources".
    'sE Electronics X1 R': 8.8,
    'Audio-Technica AT2020': 8.7,
  },

  // --- Monitores de estudio (guia general) ---
  // Conclusion: "At the top, the Genelec 8351B is the coaxial endgame". El
  // resto se ordena por el escalon que la propia guia describe: reference >
  // detail/accuracy > valor > presupuesto.
  'best-monitors': {
    // Conclusion: "the coaxial endgame" (4.195 $).
    'Genelec 8351B SAM 3-Way Coaxial Studio Monitor': 9.8,
    // Veredicto: "Reference?" / Conclusion: "tunes itself to your room".
    'Neumann KH 80 DSP': 9.6,
    // Veredicto: "DSP correction?" y Conclusion: "reference sound fits in a
    // 3-inch box" — referencia compacta.
    'Genelec 8010A': 9.5,
    // Conclusion: "reveals every transient" — el detalle de cinta.
    'Adam Audio A7V': 9.4,
    // Conclusion: "brings coaxial 3-way accuracy within reach".
    'Kali Audio IN-8 V2': 9.3,
    // Conclusion: "the honest reference".
    'Yamaha HS8': 9.2,
    // Conclusion: "the do-it-all DSP option".
    'KRK Rokit 7 G5': 9.1,
    // Conclusion: "the smartest value with boundary EQ".
    'Kali Audio LP-6 V2': 9.0,
    // Conclusion: el trío que resuelve el espacio.
    'Kali Audio LP-UNF': 8.9,
    'Kali Audio IN-UNF': 8.8,
    'Kali Audio WS-6.2': 8.7,
    // Conclusion: "leads the ultra-budget class".
    'JBL 305P MkII': 8.7,
  },

  // --- Monitores para salas pequenas ---
  // Conclusion: "the Genelec 8030C is the professional reference with the
  // tightest tolerance" y el KH 80 "the most adjustable". El JBL 305P abre la
  // guia como el mas preciso por pareja en salas pequenas.
  'best-monitors-for-small-rooms': {
    // Veredicto: "the professional reference with the tightest +-2 dB".
    'Genelec 8030C': 9.8,
    // Conclusion: "the most adjustable monitor here for room correction".
    'Neumann KH 80 DSP': 9.6,
    // Conclusion: "the reference compact for those who can pay for it".
    'Genelec 8010A': 9.4,
    // Conclusion: "the most powerful compact for serious mixing".
    'iLoud MTM MKII': 9.2,
    // Conclusion: "the backpack-sized reference".
    'iLoud Micro Monitor Pro': 9.1,
    // Conclusion: "ribbon-tweeter detail" en escritorio.
    'ADAM Audio D3V': 9.0,
    // Conclusion: "ribbon-tweeter detail at the most affordable price".
    'ADAM Audio T5V': 8.9,
    // Conclusion: "the honest midrange king" con ajuste de sala.
    'Yamaha HS5': 8.9,
    // Conclusion: "the best 6.5-inch pick ... for near-wall placement".
    'Kali Audio LP-6 V2': 8.8,
    'Kali Audio LP-UNF': 8.8,
    // Conclusion: "the most accurate monitor per pair" en salas pequenas.
    'JBL 305P MkII': 8.7,
    'KRK Rokit 5 G5': 8.7,
    'PreSonus Eris Studio 5': 8.7,
  },

  // --- Micros XLR economicos (menos de 200 $) ---
  // Conclusion: "Buy the SM57 first — it should be the first microphone every
  // musician owns". El NT1 Signature es "the quietest at any price" y el AT2035
  // "the versatile everyday studio mic". El resto son dinamicos de escenario.
  'budget-mics': {
    // Conclusion: "the most recorded microphone in history", el primero de todos.
    'Shure SM57': 9.8,
    // Conclusion: "the most popular vocal mic in the world".
    'Shure SM58': 9.6,
    // Conclusion: "the quietest large-diaphragm condenser at any price".
    'Rode NT1 Signature': 9.5,
    // Conclusion: "the best entry point into condenser recording".
    'Audio-Technica AT2020': 9.4,
    // Conclusion: "the versatile everyday studio mic" con pad y filtro.
    'Audio-Technica AT2035': 9.3,
    // Conclusion: "the best broadcast-style dynamic for podcasting".
    'Rode PodMic': 9.2,
    // Conclusion: "the best first podcast mic" (USB-C y XLR en un cuerpo).
    'Samson Q2U USB/XLR Microphone': 9.1,
    // Conclusion: "adds tap-to-mute and gain control for streamers".
    'FIFINE AmpliTank K688 Dynamic USB/XLR Microphone': 9.0,
    // Conclusion: "the premium dynamic that punches above its price".
    'sE Electronics V7': 8.9,
    // Conclusion: "the broadcast dynamic built for desk setups".
    'Elgato Wave DX': 8.9,
    // Conclusion: "the hybrid for broadcasters who want USB and XLR flexibility".
    'Samson Q9U XLR/USB Microphone': 8.9,
    // Conclusion: "the premium stage dynamics that survive the road".
    'Sennheiser e935': 8.9,
    'Shure Beta 58A': 8.9,
    'Sennheiser e945': 8.9,
    'Electro-Voice ND86': 8.9,
    'AKG D5': 8.9,
    // Conclusion: "gives streamers the most hardware per dollar".
    'Maono PD200X Dynamic Microphone': 8.9,
    // Conclusion: "entry-level condensers" y "ultra-budget dynamics".
    'Samson C01 Studio': 8.8,
    'AKG P120 Large-Diaphragm': 8.8,
    'MAONO PD100 Gen2 USB/XLR Dynamic Microphone': 8.8,
    'Behringer B 906': 8.8,
    'FIFINE K669D XLR': 8.8,
    // Conclusion: "the best starting point if your budget is absolute floor".
    'Behringer XM8500 Ultravoice': 8.7,
  },

  // --- Micros USB economicos (menos de 110 $) ---
  // Conclusion: "The Samson Q2U is the best all-round budget USB mic" y el
  // NT-USB Mini "the premium pick" del techo de precio.
  'budget-usb-mics': {
    // Conclusion: "the best all-round budget USB mic" (abre el reparto).
    'Samson Q2U USB/XLR Microphone': 9.8,
    // Conclusion: "If you want the best build for the money, the premium pick".
    'Rode NT-USB Mini Studio Condenser Microphone': 9.5,
    // Conclusion: "the budget dynamic that ignores your keyboard".
    'FIFINE AmpliGame AM8 Dynamic USB Microphone': 9.3,
    // Conclusion: "gives you the most hardware per dollar".
    'Maono PD200X Dynamic Microphone': 9.2,
    'FIFINE AmpliTank K688 Dynamic USB/XLR Microphone': 9.1,
    // Conclusion: "deliver proven performance" en el presupuesto mas ajustado.
    'TONOR TC-777 USB Microphone': 9.0,
    'FIFINE AmpliGame A6V USB Gaming Microphone': 9.0,
    // Conclusion: "the best compact condenser at this price".
    'Razer Seiren V3 Mini': 8.9,
    'Maono PM461 USB Microphone': 8.9,
    'Blue Yeti Nano USB Condenser Microphone': 8.9,
    'FIFINE T669 USB Microphone Kit': 8.9,
    // Conclusion: "the compact HyperX SoloCast as an elegant alternative".
    'HyperX SoloCast 2': 8.8,
    'HyperX SoloCast USB Condenser Microphone': 8.8,
  },
};
