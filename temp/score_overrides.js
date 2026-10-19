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
    'Samson Q9U XLR/USB Dynamic Broadcast Microphone': 8.9,
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

  // --- Guitarra electrica (guia general) ---
  // Conclusion: "Start with the category that matches where you are now".
  // El veredicto fija cuatro escalones: principiante, gama media para tocar,
  // premium para profesionales, y silenciosas para casa.
  'best-electric-guitar': {
    // Veredicto: "Ultra II noiseless flagship" y "AmPro II Tele twang".
    'Fender American Ultra II Stratocaster': 9.8,
    // Veredicto: "LP 60s authority" — el premium de Gibson.
    'Gibson Les Paul Standard \'60s': 9.7,
    // Veredicto: "premium Gibson and PRS for professionals".
    'Fender American Professional II Stratocaster': 9.6,
    'Fender American Professional II Telecaster': 9.6,
    'PRS SE Custom 24': 9.5,
    'Ibanez AZ2402 Prestige': 9.5,
    'ESP E-II Eclipse DB': 9.4,
    // Veredicto: "mid-range Fender Player and PRS SE for gigging".
    'Fender Player II Stratocaster HSS': 9.3,
    'Fender Player II Jazzmaster': 9.3,
    'Fender Player II Telecaster': 9.3,
    // Veredicto: "silent guitars for home recording" / "carbon Enya Nova Go".
    'Enya Nova Go Sonic Smart Electric Guitar': 9.2,
    'Strandberg Boden Essential 6': 9.2,
    // Conclusion: escalon de principiante.
    'Squier Affinity Series Stratocaster': 9.0,
    'Squier Classic Vibe \'50s Stratocaster': 9.0,
    'Yamaha Pacifica 112V': 9.0,
    'Squier Sonic Mustang': 8.9,
    'Squier Debut Series Stratocaster': 8.7,
  },

  // --- Parlor para blues y fingerstyle ---
  // Conclusion: "the Yamaha CSF1M is the best all-around parlor" y el Jim
  // Dandy "owns vintage vibe" y es "eloverall winner" segun el veredicto.
  'best-parlor-guitars': {
    // Veredicto: "CSF1M is the overall winner for solid-top tone".
    'Yamaha CSF1M': 9.8,
    // Veredicto: "Jim Dandy owns the budget blues crown".
    'Gretsch G9500 Jim Dandy': 9.6,
    // Conclusion: "wins on boutique build".
    'PRS SE P20e Tonare Parlor': 9.4,
    // Conclusion: "the stage personalities the Rancher Penguin".
    'Gretsch G5021E Rancher Penguin': 9.2,
    // Conclusion: "Slide players should grab the Epiphone L-00 Studio".
    'Epiphone L-00 Studio': 9.1,
    // Conclusion: "budget buyers the Fender CP-60S".
    'Fender CP-60S': 9.0,
    'Fender Highway Series Parlor All-Mahogany Acoustic-Electric': 8.9,
  },

  // --- Pedales de reverb y delay ---
  // Conclusion: "Start with the DD-8 and Hall of Fame 2 for a complete
  // time-based setup". El BigSky MX es "the reverb professionals reach for".
  'best-reverb-delay': {
    // Veredicto: "the versatile delay that does everything", el primero.
    'Boss DD-8 Digital Delay': 9.8,
    // Conclusion: "the reverb professionals reach for who demand the best".
    'Strymon BigSky MX': 9.6,
    // Veredicto: "the value reverb with great algorithms".
    'TC Electronic Hall of Fame 2': 9.5,
    // Conclusion: menciones por nicho.
    'Strymon TimeLine': 9.2,
    'Meris LVX': 9.1,
    'Eventide TimeFactor': 9.1,
    'Source Audio Nemesis': 9.0,
    // Conclusion: "Hybrid hunters".
    'Keeley Caverns V2': 9.0,
    'Universal Audio Del-Verb': 8.9,
    // Conclusion: "analog purists".
    'MXR M169 Carbon Copy': 8.9,
    // Conclusion: "nailed classic studio verbs".
    'Universal Audio Golden Reverberator': 8.8,
    // Conclusion: "packs presets and 32-bit sound in a compact box".
    'Boss RV-200': 8.8,
    'Boss RC-5 Loop Station': 8.8,
  },

  // --- Micros de cañon (shotgun) para cine, video y broadcast ---
  // Conclusion: "the Sennheiser MKH 416 remains the professional default", con
  // el NTG5 como rival moderno mas ligero y el MKH 50 mandando en interiores
  // reflectantes.
  'best-shotgun-mics': {
    // Conclusion: "the professional default" y "proven reliability".
    'Sennheiser MKH 416': 9.8,
    // Conclusion: "the MKH 50 ruling reflective interiors" — el mas caro.
    'Sennheiser MKH 50': 9.5,
    // Conclusion: "its lighter modern rival" que "wins on noise floor".
    'Rode NTG5': 9.4,
    // Conclusion: "Indie budgets should buy the MKE 600 without hesitation".
    'Sennheiser MKE 600': 9.2,
    // Conclusion: "brings RF-bias immunity for humid locations".
    'Rode NTG3': 9.1,
    // Conclusion: "For camera-top duty, the VideoMic NTG is the one to beat".
    'Rode VideoMic NTG': 9.0,
    // Conclusion: "covers battery-powered short-boom work with a single AA".
    'Audio-Technica AT897': 8.9,
    // Conclusion: "the MKE 400 is the easiest first upgrade".
    'Sennheiser MKE 400': 8.9,
    'Deity S-Mic 3': 8.9,
    'Rode VideoMic GO II': 8.9,
    'Audio-Technica AT875R': 8.8,
  },

  // --- Pianos digitales para casa y estudio ---
  // Conclusion: "the Roland FP-30X is the best all-round digital piano for home
  // players". El CLP-835 es "the premium step-up for players who want the
  // closest thing to an acoustic grand".
  'best-digital-pianos': {
    // Conclusion: "the premium step-up ... closest thing to an acoustic grand".
    'Yamaha Clavinova CLP-835': 9.8,
    // Conclusion: "the best all-round digital piano for home players".
    'Roland FP-30X': 9.6,
    // Conclusion: "the Yamaha YDP-166 is the classic choice".
    'Yamaha Arius YDP-166': 9.4,
    // Conclusion: "brings true escapement feel and 256-note polyphony for the money".
    'Roland RP107 Digital Piano': 9.3,
    // Conclusion: "the most affordable console".
    'Yamaha Arius YDP-146 Digital Piano': 9.2,
    // Conclusion: "delivers the same keybed" con precio de entrada.
    'Roland FP-10 Digital Piano': 9.1,
    // Conclusion: "wins on size" — el compacto.
    'Casio Privia PX-S1100 Digital Piano': 9.0,
    // Citado en la tabla sin salir en la conclusion.
    'Yamaha P-225': 8.9,
  },

  // --- Amplificadores de guitarra y bajo ---
  // Conclusion: "Start with a Boss Katana-50 EX for versatility at home and on
  // stage", y "upgrade to a tube combo ... when you gig".
  'guitar-bass-amps': {
    // Conclusion: "Start with a Boss Katana-50 EX" — abre la guia.
    'Boss Katana-50 EX Gen 3': 9.8,
    // Conclusion: "the Blues Junior has no headphone or DI out" — tube icono.
    'Fender Blues Junior IV': 9.6,
    // Conclusion: "upgrade to a tube combo" en el escalon profesional.
    'Marshall DSL40CR': 9.4,
    'Fender Tone Master Deluxe Reverb': 9.3,
    'Vox AC30': 9.2,
    // Conclusion: amps de bajo dedicados.
    'Fender Rumble 500 V3': 9.5,
    'Markbass CMD 102 P V': 9.4,
    'Ampeg Rocket Bass RB-115': 9.2,
    // Conclusion: "the desktop" con bateria y line out.
    'Yamaha THR30II Wireless Desktop Amp': 9.1,
    'Positive Grid Spark 2': 9.0,
    'Fender Mustang GTX100': 8.9,
  },

  // --- Sistemas PA para sonido en vivo ---
  // Conclusion: "Start with powered speakers (JBL EON712) and a digital mixer
  // (Behringer XR18) for small venues", escalando a pasivas para locales grandes.
  'live-sound-pa': {
    // Conclusion: "Start with powered speakers (JBL EON712)".
    'JBL EON712 Active PA Speaker': 9.8,
    // Conclusion: "and a digital mixer (Behringer XR18)" — el segundo eje.
    'Behringer X Air XR18': 9.6,
    // Conclusion: "Scale up to passive speakers with separate amplifiers".
    // OJO: el veredicto nombra el JBL VTX A12 y el Yamaha TF1 para salas
    // grandes, pero ninguno de los dos esta en el catalogo ni en la tabla.
    'EV ZLX-12P-G2 Active PA Speaker': 9.4,
    'QSC K12.2 Active PA Speaker': 9.3,
    // Citados en la tabla como alternativas del escalon de saldo.
    'JBL PRX ONE Active PA Column': 9.2,
    'Yamaha Stagepas 1K MKII Active PA Mixer': 9.2,
    'Yamaha DXR12mkII Active PA Speaker': 9.1,
    'Electro-Voice EVERSE 12 Active PA Speaker': 9.0,
    'Alto Professional TS412 Active PA Speaker': 9.0,
    'LD Systems ICOA 12 A BT Active PA Speaker': 8.9,
  },

  // --- Subwoofers activos para bandas ---
  // Conclusion: "For a working rig, the ELX200-18SP stands out: light enough to
  // load alone, loud enough for real gigs". El KS118 es "one of the venue kings".
  // OJO: la tabla de esta guia solo lista el QSC KS118 de los cinco productos
  // que menciona la conclusion (faltan ELX200-18SP, SUB 8004-AS, PRX918XLF y
  // DXS18XLF). Pendiente de anadirlos al catalogo.
  'best-live-subwoofers': {
    // Conclusion: "one of the venue kings with the best cardioid".
    'QSC KS118': 9.6,
  },

  // --- Superficies de control DAW ---
  // Conclusion: "The SSL UF8 is the best all-around DAW control surface" y el
  // FaderPort 8 "the best value". OJO: el veredicto nombra tambien el
  // Behringer X-Touch ("budget king"), el Avid S1 y el Mackie MCU Pro, que NO
  // estan en la tabla de esta guia.
  'midi-controllers': {
    // Conclusion: "the best all-around DAW control surface".
    'SSL UF8': 9.8,
    // Conclusion: "the best value".
    'PreSonus FaderPort 8': 9.6,
  },

  // --- Estudio domestico por niveles ---
  // Conclusion: "Tier 2 is the one to buy if you are going to sing" — el NT1
  // 5th Gen con 32 bits float y el ATH-M50x que "no flatter anything you mix".
  'starter-studio': {
    // Conclusion: el micro del nivel 2, el que registra 32 bits float.
    'Rode NT1 5th Generation': 9.6,
    // Conclusion: "will not flatter anything you mix" — el headphone clave.
    'Audio-Technica ATH-M50x': 9.5,
    // Conclusion: "do not skip the acoustic treatment" — el mas citado.
    'G4M Acoustics Squarewave Acoustic Treatment Panels (4-Pack)': 9.4,
    // Conclusion: el soporte y el tratamiento "carry over" entre niveles.
    'K&M 210/2 Mic Stand': 9.3,
    // Nivel 2: interfaz SSL con "SSL character".
    'SSL 2+ MKII': 9.3,
    // Nivel 3: el build que "triples the budget".
    'Focusrite Scarlett 2i2 4th Gen': 9.2,
    'Universal Audio Apollo Twin X Gen 2': 9.2,
    'Neumann TLM 102': 9.1,
    'Yamaha HS8': 9.1,
    // Nivel 1: entradaeconomica.
    'Rode NT1 Signature Series': 9.0,
    'Aston Microphones Shield GN Pop Filter': 9.0,
    'Mogami Gold Studio XLR Cable': 9.0,
    'KRK Rokit 7 G5': 9.0,
    'Sony MDR-7506': 8.9,
    'PreSonus Eris Studio 5': 8.9,
    'Audio-Technica ATH-M20x': 8.7,
  },

  // --- Pedales de efectos para guitarra ---
  // Conclusion: "start by setting the essential pillars: a precise tuner ... a
  // dynamic overdrive ... integrated analog modulation ... a versatile
  // time-based delay".
  'guitar-pedals': {
    // Conclusion: "start by setting the essential pillars: a precise tuner".
    'Boss TU-3 Chromatic Tuner': 9.8,
    // Conclusion: "the versatile time-based delay" entre los pilares.
    'Boss DD-8 Digital Delay': 9.6,
    // Conclusion: "a dynamic overdrive to push your amp" y "integrated analog
    // modulation" (Boss SD-1 y CE-2W): la conclusion los nombra como ejemplo
    // de los pilares, pero ninguno de los dos esta en el catalogo.
    // Veredicto: "the definitive studio-quality ambient brain".
    'Strymon BigSky MX': 9.3,
    // Conclusion: "the definitive drive push" segun el veredicto.
    'Ibanez TS9 Tube Screamer': 9.3,
    // Conclusion: "add spatial reverbs".
    'TC Electronic Hall of Fame 2': 9.2,
    // Conclusion: "mechanical expression pedals like the wah".
    'Dunlop GCB95 Crybaby Wah': 9.1,
    // Veredicto: "MXR and EHX phasers inject psychedelic modulation".
    'MXR Phase 95': 9.0,
    'Electro-Harmonix Nano Small Stone': 8.9,
  },

  // --- Plugins de efectos creativos ---
  // Conclusion: "Start with the Soundtoys 5.5 Bundle" y "Add Eventide Blackhole
  // for the most creative reverb ever made".
  'fx-plugins': {
    // Conclusion: "the bundle that matters ... the one purchase you won't regret".
    'Soundtoys 5.5 Bundle': 9.8,
    // Conclusion: "the most creative reverb ever made".
    'Eventide Blackhole': 9.6,
    // Conclusion: anade "character, movement and personality".
    'Cableguys ShaperBox 3': 9.4,
    'XLN Audio RC-20 Retro Color': 9.3,
    'Baby Audio Transit 2': 9.2,
    'Devious Machines Infiltrator 2': 9.1,
    'Cableguys HalfTime': 9.0,
    'Excite Audio Lifeline Expanse': 9.0,
    'iZotope Trash': 8.9,
    'Excite Audio Motion: Harmonic': 8.9,
    'D16 Group Repeater Delay': 8.8,
    'Arturia Chorus JUN-6': 8.7,
    'Baby Audio Spaced Out': 8.7,
  },

  // --- Plugins de mezcla y masterizacion ---
  // Conclusion: "Start with Ozone 12 Advanced for mastering that sounds
  // professional out of the gate, and add the FabFilter Total Bundle".
  'mixing-plugins': {
    // Conclusion: "Start with Ozone 12 Advanced" — abre la cadena.
    'iZotope Ozone 12 Advanced': 9.8,
    // Conclusion: "the most advanced mixing tools available".
    'FabFilter Total Bundle': 9.6,
    // Conclusion: "adds the energy of the most famous analog compressor".
    'Universal Audio 1176 Classic Limiter Collection': 9.5,
    // Conclusion: "three focused tools" para cerrar la cadena.
    'Brainworx bx_clipper': 9.3,
    'Baby Audio Smooth Operator Pro': 9.2,
    'Mastering The Mix REFERENCE 3': 9.1,
    // Veredicto: "covers all EQ duties for a fraction of the bundle".
    'FabFilter Pro-Q 4': 9.0,
    'NUGEN Audio ISL 2st': 8.7,
  },

  // --- In-ear monitors para escenario y estudio ---
  // Conclusion: "the Shure SE846 Gen 2 remains the reference with its quad-BA
  // drivers and interchangeable nozzles". El veredicto menciona el SE215 Pro
  // con cable como opcion economica, pero no esta en la tabla.
  'best-in-ear-monitors': {
    // Conclusion: "the reference" con quad-BA y boquillas intercambiables.
    'Shure SE846 Gen 2': 9.8,
    // Conclusion: sistemas inalambricos con "reliable RF performance".
    'Sennheiser EW IEM G4 Stereo Wireless System': 9.5,
    'Sennheiser ew IEM G4-TWIN-E': 9.3,
    'Sennheiser XSW IEM Wireless System': 9.2,
    // Conclusion: la opcion inalambrica economica.
    'Xvive U4 Wireless In-Ear Monitor System': 9.1,
    'Xvive U4R4 Wireless IEM System (4 Receivers)': 9.0,
    'Phenyx Pro PTM-10 UHF Stereo IEM System': 8.9,
    // En la tabla pero sin mencion en veredicto ni conclusion.
    'Sennheiser IE 900': 8.8,
  },

  // --- Sistemas IEM inalambricos ---
  // Conclusion: "Touring professionals should own the Sennheiser EW IEM G4;
  // working bands get the best balance from the Shure PSM 300 twin pack".
  'best-wireless-iems': {
    // Conclusion: "Touring professionals should own" el EW IEM G4.
    'Sennheiser EW IEM G4 Stereo Wireless System': 9.8,
    // Conclusion: "working bands get the best balance from the PSM 300 twin pack".
    'Shure PSM300': 9.6,
    // Conclusion: "Duos save with the G4-TWIN".
    'Sennheiser ew IEM G4-TWIN-E': 9.4,
    // Conclusion: "whole bands with the U4R4".
    'Xvive U4R4 Wireless IEM System (4 Receivers)': 9.3,
    // Conclusion: "expanding line-check rigs grow on the XSW IEM".
    'Sennheiser XSW IEM Wireless System': 9.2,
    // Conclusion: "Small budgets transform overnight with the Xvive U4".
    'Xvive U4 Wireless In-Ear Monitor System': 9.1,
    // Conclusion: "stereo on a shoestring means the Phenyx PTM-10".
    'Phenyx Pro PTM-10 UHF Stereo IEM System': 8.7,
  },

  // --- Bajo Fender por genero ---
  // Conclusion: el Player Precision "drives rock, punk and Motown"; el American
  // Pro II Precision es para "premium country, blues and classic rock"; el
  // American Ultra II esta "above that tier".
  'fender-bass-guide': {
    // Conclusion: "Above that tier", con P/J activo para "one instrument for
    // every room".
    'Fender American Ultra II Precision Bass': 9.8,
    // Conclusion: "the go-to choice for Latin music, fusion and soul".
    'Fender American Professional II Jazz Bass': 9.5,
    // Conclusion: "premium country, blues and classic rock" con V-Mod II.
    'Fender American Professional II Precision Bass': 9.4,
    // Conclusion: "The Player Precision Bass drives rock, punk and Motown".
    'Fender Player II Precision Bass': 9.3,
    // Conclusion: "The Player Jazz Bass delivers bright, articulate tone".
    'Fender Player II Jazz Bass': 9.3,
    // Conclusion: "recognisably Fender-family tone for a fraction of the money".
    'Squier Classic Vibe \'60s Jazz Bass': 9.1,
    'Squier Affinity Series Precision Bass PJ': 9.0,
  },

  // --- Amplis de bajo para ensayo en casa ---
  // Conclusion: "The Fender Rumble 40 V3 is the best all-round bass practice
  // combo" con XLR directo para grabar.
  'best-bass-practice-amps': {
    // Conclusion: "the best all-round bass practice combo".
    'Fender Rumble 40 V3': 9.8,
    // Conclusion: "the portable smart pick with battery power and ToneCloud".
    'Positive Grid Spark MINI': 9.5,
    // Conclusion: "the desktop modeling amp" con 30 W estereo.
    'Yamaha THR30II': 9.3,
    // Conclusion: "For budget analog tone, the Orange Crush Bass 25 is unbeatable".
    'Orange Crush Bass 25': 9.2,
    // Conclusion: "the Boss WAZA-AIR Bass puts a full bass rig inside your headphones".
    'Boss WAZA-AIR Bass': 9.1,
    // Conclusion: "the Darkglass DG210A stands alone" — el mas caro.
    'Darkglass DG210A': 9.0,
  },

  // --- Amplis de bajo para cada jugador ---
  // Conclusion: "The Ampeg RB-210 is the complete Ampeg combo", el Rumble 500
  // es "the lightweight portable standard" y el Markbass "the iconic pro combo".
  'best-bass-amps': {
    // Conclusion: "the iconic pro combo if lightweight premium tone is your priority".
    'Markbass Mini CMD 121P V': 9.8,
    // Conclusion: "The Ampeg RB-210 is the complete Ampeg combo".
    'Ampeg Rocket Bass RB-210': 9.7,
    // Conclusion: "the modern pro choice for massive, cab-ready low end".
    'Darkglass DG210A Microtubes 500': 9.5,
    // Conclusion: "the lightweight portable standard that every gigging bassist
    // should consider".
    'Fender Rumble 500 V3': 9.4,
    // Conclusion: "the bedroom-to-stage standard at $270" — la entrada.
    'Fender Rumble 40 V3': 9.2,
    // Conclusion: "a 60W modeling combo with Boss effects".
    'Boss Katana-110 Bass': 9.1,
    // Conclusion: "the value analog pick ... cuts through any mix".
    'Orange Crush Bass 50': 8.9,
  },

  // --- Amplis de ensayo para casa ---
  // Conclusion: "The Fender Champion II 25 is the best beginner amp. The Boss
  // Katana 50 Gen 3 is the most versatile ... the Katana 50 is the sweet spot".
  'best-practice-amps': {
    // Conclusion: "the Katana 50 is the sweet spot—it grows with you".
    'Boss Katana 50 Gen 3': 9.8,
    // Conclusion: "The Fender Champion II 25 is the best beginner amp".
    'Fender Champion II 25': 9.6,
    // Conclusion: "The Orange Crush 35RT is the rock player's choice".
    'Orange Crush 35RT': 9.4,
    // Conclusion: "If you want desktop tone the THR10II is unbeatable".
    'Yamaha THR10II': 9.2,
    // Conclusion: "the Spark 2 brings app-based smart jamming".
    'Positive Grid Spark 2': 9.1,
    // Conclusion: "the Waza-Air nails silent wireless practice".
    'Boss Waza-Air': 9.0,
  },

  // --- Microfonos inalambricos para escenario ---
  // Conclusion: "the Shure BLX288/PG58 is the perfect balance of price and
  // performance" y el EW-D Dual es "the gold standard" digital.
  'stage-wireless': {
    // Conclusion: "if you need absolute best digital performance, the EW-D Dual
    // is the gold standard".
    'Sennheiser EW-D Dual': 9.8,
    // Conclusion: "the Shure BLX288/PG58 is the perfect balance".
    'Shure BLX288/PG58': 9.6,
    // Conclusion: "For touring professionals, the EW 100 G4-935 is the reliable choice".
    'Sennheiser EW 100 G4-935': 9.4,
    // Conclusion: "If budget is tight, the EW-D 835-S delivers great value".
    'Sennheiser EW-D 835-S Vocal Set': 9.1,
    // Citado en la tabla sin mencion en veredicto ni conclusion.
    'Shure BLX24R/SM58 Wireless': 8.9,
  },

  // --- Cunas de monitor activas ---
  // Conclusion: "The Electro-Voice PXM-12MP is the best all-round wedge for
  // most working bands ... For a working rig, the PXM-12MP covers most needs".
  'stage-wedges': {
    // Conclusion: "the best all-round wedge for most working bands".
    'Electro-Voice PXM-12MP': 9.8,
    // Conclusion: "the power pick for loud stages and demanding monitoring".
    'RCF NX 912-SMA': 9.6,
    // Conclusion: "the balanced value choice with serious DSP".
    'Yamaha DHR12M': 9.4,
    // Conclusion: "the budget wedge that still sounds full and clear".
    'LD Systems MON 12 A G3': 9.2,
    // Conclusion: "the value-powered pick" con 1100 W y ULTRANET.
    'Turbosound Flashline TFX122M-AN Stage Monitor': 9.1,
  },

  // --- Sintetizadores para produccion ---
  // Conclusion: "The Yamaha Montage M8x is the ultimate workstation for
  // professionals who need everything in one instrument".
  'best-synthesizers': {
    // Conclusion: "the ultimate workstation" — el mas caro con diferencia.
    'Yamaha Montage M8x': 9.8,
    // Conclusion: "the definitive bass and lead machine with that iconic Moog sound".
    'Moog Subsequent 37': 9.6,
    // Conclusion: "the best affordable analog synth for producers".
    'Korg Minilogue XD': 9.4,
    // Mencionados en la tabla sin llegar a la conclusion.
    'Sequential OB-6 Keyboard': 9.2,
    'Arturia MicroFreak': 9.1,
    'ASM Hydrasynth Keyboard': 9.0,
    'Behringer DeepMind 12': 8.9,
    'Sequential Take 5': 8.7,
  },

  // --- Caja de ritmos y grooveboxes ---
  // Conclusion: tres misiones. "Digitakt II, Syntakt and Perkons HD-01 open the
  // door to the deepest sound design"; el escalon medio es "the definitive work
  // tools".
  'best-drum-machine': {
    // Conclusion: "the deepest sound design ... massive stereo sampling labs".
    'Elektron Digitakt II': 9.8,
    // Conclusion: "the mighty" y "colossal menu-free control panels".
    'Erica Synths Perkons HD-01': 9.5,
    // Conclusion: "advanced hybrid synthesis".
    'Elektron Syntakt': 9.4,
    // Conclusion: "the definitive work tools" para el escenario.
    'Roland TR-8S': 9.2,
    'Akai MPC One G2': 9.2,
    'Arturia DrumBrute Impact': 9.1,
    // Conclusion: "Travel light" — el escalon economico.
    'Novation Circuit Tracks': 9.0,
    'Roland AIRA Compact T-8': 8.9,
  },

  // --- Interfaces portatiles ---
  // Conclusion: "The Focusrite Scarlett 2i2 and Universal Audio Volt 2 are the
  // best all-around portable interfaces. The Audient EVO 4 is the best budget option".
  'portable-interfaces': {
    // Conclusion: "the best all-around portable interfaces" (abre el reparto).
    'Focusrite Scarlett 2i2 4th Gen': 9.8,
    'Universal Audio Volt 2': 9.6,
    // Conclusion: "the best budget option" al precio mas bajo del grupo.
    'Audient EVO 4': 9.3,
    // Citadas en la tabla como alternativas de la misma categoria.
    'RME Babyface Pro FS': 9.2,
    'Arturia MiniFuse 2 OTG': 9.1,
    'Audient iD14 MkII': 9.0,
    'SSL 2+ MKII': 8.9,
    'Universal Audio Volt 276': 8.8,
    'MOTU M2': 8.7,
  },

  // --- Interfaces premium para estudio ---
  // Conclusion: "the six here all belong in a permanent rack — the question is
  // which job you buy them for". No hay un ganador unico: cada una gana un uso.
  'premium-interfaces': {
    // Conclusion: "Apollo x8p Gen 2 wins tracking when you live in UAD Unison".
    'Universal Audio Apollo x8p Gen 2': 9.7,
    // Conclusion: "RME Fireface UFX III wins uptime when you tour ... MADI".
    'RME Fireface UFX III': 9.6,
    // Conclusion: "Neumann MT 48 (U) wins the desktop" — el mas barato.
    'Neumann MT 48 (U)': 9.5,
    // Conclusion: "Audient Horizon 8P wins console-character tracking".
    'Audient Horizon 8P': 9.4,
    // Conclusion: "Orion Studio Synergy Core wins connectivity-per-pound".
    'Antelope Orion Studio Synergy Core': 9.3,
    // Conclusion: "Audient ORIA wins immersive when you build in Atmos".
    'Audient ORIA Immersive Audio Interface': 9.2,
  },

  // --- Samplers y fabricacion de beats ---
  // Conclusion: "Choose your machine by workflow". El MPC XL es "the definitive
  // centerpiece" y el EP-133 el que hace "quick sketches anywhere".
  'best-samplers-drum-computers': {
    // Conclusion: "the imposing MPC XL will be the definitive centerpiece".
    'Akai Professional MPC XL': 9.8,
    // Conclusion: "the MPC range" para producciones mas grandes.
    'Akai MPC Live III': 9.5,
    // Conclusion: "you need the Maschine+ ecosystem".
    'Native Instruments Maschine+': 9.4,
    // Conclusion: "The Digitakt II will reward analytical minds".
    'Elektron Digitakt II': 9.3,
    'Akai MPC One G2': 9.3,
    // Conclusion: "the Key 37 Gen 2 will give wings to those who think through keys".
    'Akai Professional MPC Key 37 Gen 2': 9.2,
    // Conclusion: "live transitions and effects are your thing".
    'Roland SP-404MKII': 9.1,
    'Novation Circuit Rhythm': 9.1,
    // Conclusion: "quick sketches anywhere" — el escalon de bolsillo.
    'Teenage Engineering EP-133 K.O. II': 9.0,
    'Roland AIRA Compact P-6': 8.9,
  },

  // --- Plugins de canal (emulacion analogica) ---
  // Conclusion: "The Waves SSL G-Master Buss Compressor gives you the glue and
  // punch of one of the most famous consoles".
  'channel-strip-plugins': {
    // Conclusion: "the glue and punch of one of the most famous consoles".
    'Waves SSL G-Master Buss Compressor': 9.8,
    // Conclusion: "UAD Ultimate 14 gives you the complete analog studio in your DAW".
    'Universal Audio UAD Ultimate 14': 9.5,
    // Conclusion: "gives you the surgical precision to fix problems".
    'FabFilter Pro-Q 4': 9.4,
    // Conclusion: "the officially licensed SSL channel strip".
    'Brainworx bx_console SSL 4000 E': 9.2,
    // Citados en la tabla sin salir en la conclusion.
    'FabFilter Total Bundle': 9.1,
    'Universal Audio 1176 Classic Limiter Collection': 9.0,
  },

  // --- Pedales de overdrive y distorsion ---
  // Conclusion: "Start with the BD-2 for versatility, add the TS9 for that
  // mid-boost magic, and grab the RAT when you need searing distortion".
  'best-overdrive-distortion': {
    // Conclusion: "the most responsive, touch-sensitive overdrive at a
    // hard-to-beat price" — la recomendacion de apertura.
    'Boss BD-2 Blues Driver': 9.8,
    // Conclusion: "the classic tube screamer that every guitarist should own".
    'Ibanez TS9 Tube Screamer': 9.6,
    // Conclusion: "delivers legendary distortion that defined generations of rock".
    'ProCo RAT 2': 9.4,
    // Conclusion: "The OCD brings MOSFET feel".
    'Fulltone OCD v2': 9.2,
    // Conclusion: "the Tumnus adds Klon EQ".
    'Wampler Tumnus Deluxe': 9.1,
    // Conclusion: "the Morning Glory stays transparent".
    'JHS Morning Glory V4': 9.0,
    // Conclusion: "the M104 Distortion+ nails 70s crunch".
    'MXR M104 Distortion+': 8.9,
    // Conclusion: "the BD-2W refines the Blues Driver" — el mas caro.
    'Boss BD-2W Blues Driver Waza Craft': 8.8,
    // Citado en la tabla sin salir en el veredicto ni la conclusion.
    'MXR Phase 95': 8.7,
  },

  // --- Pedales de loop ---
  // Conclusion: "Start with the Ditto learn the basics, then upgrade to the RC-5
  // for full creative control ... while the RC-600 tops the pro range".
  'best-looper-pedals': {
    // Conclusion: "the simplest, best-selling looper" — el punto de entrada.
    'TC Electronic Ditto Looper': 9.8,
    // Conclusion: "the most powerful compact looper with rhythms, memory and MIDI sync".
    'Boss RC-5 Loop Station': 9.7,
    // Conclusion: "the RC-500 adds a second track and mic input".
    'Boss RC-500 Loop Station': 9.5,
    // Conclusion: "the RC-600 tops the pro range" — el mas caro.
    'Boss RC-600 Loop Station': 9.4,
    // Conclusion: "the X4 doubles loops in stereo".
    'TC Electronic Ditto X4 Looper': 9.2,
    // Conclusion: "the 1440 multiplies stereo memories".
    'Electro-Harmonix 1440 Stereo Looper': 9.1,
    // Conclusion: "the 720 simplifies stereo".
    'Electro-Harmonix 720 Stereo Looper': 9.0,
    // Conclusion: "shrinks 6 hi-fi minutes into a mini box".
    'MXR M303 Clone Looper': 8.9,
  },

  // --- Pedales multi-efectos ---
  // Conclusion: "Start with the GX-1 or ME-90 to learn, then step up to the Flex
  // Prime or HX Stomp". El HX Stomp es "the pro multi-effects".
  'best-multi-effects-pedals': {
    // Conclusion: "the pro multi-effects ... flagship Helix tone in a compact box".
    'Line 6 Helix HX Stomp': 9.8,
    // Conclusion: "the ME-90 and Flex Prime lead as the best direct-workflow
    // live options".
    'HeadRush Flex Prime': 9.5,
    'Boss ME-90': 9.4,
    // Conclusion: "bigger screens, capture workflows and workstation features".
    'Neural DSP Quad Cortex': 9.3,
    'Boss GT-1000CORE': 9.2,
    'Zoom G11': 9.1,
    'Mooer GE300': 9.0,
    // Conclusion: "the GX-1 rules as the most efficient budget portable".
    'Boss GX-1': 8.9,
  },

  // --- Plugins de restauracion de audio ---
  // Conclusion: "RX 12 is the industry standard for spectral repair ... For most
  // engineers, a combination of RX 12 ... and Acon Restoration Suite 2 ... covers
  // 90% of real-world problems".
  'best-audio-repair-plugins': {
    // Conclusion: "the industry standard for spectral repair".
    'iZotope RX 12 Standard': 9.8,
    // Conclusion: "covers the basics at a budget price".
    'Acon Digital Acon Restoration Suite 2': 9.5,
    // Conclusion: "Sonible smart:deess provides precise AI-powered de-essing".
    'Sonible smart:deess': 9.3,
    // Conclusion: "Zynaptiq Unveil rescues live recordings from bad rooms".
    'Zynaptiq Unveil': 9.2,
    // Conclusion: "tames resonances that traditional tools cannot touch".
    'Baby Audio Smooth Operator Pro': 9.1,
  },

  // --- DAW: guia general ---
  // Conclusion: "Pro Tools is required for professional studio work ... Upgrade to
  // Logic Pro (Mac) or Ableton Live (electronic) when you need more".
  'daw-guide': {
    // Conclusion: "required for professional studio work".
    'Avid Pro Tools Studio': 9.8,
    // Veredicto: "Ableton Live for electronic music and live performance".
    'Ableton Live 12 Suite': 9.6,
    // Conclusion: "Logic Pro (Mac) ... all-round Mac production".
    'Logic Pro': 9.5,
    // Veredicto: "FL Studio for beatmakers with lifetime updates".
    'FL Studio Producer Edition': 9.3,
    // Citados en la tabla sin rol propio en la conclusion.
    'Steinberg Cubase Pro 15': 9.1,
    'Reason Studios Reason 14': 9.0,
  },

  // --- Ableton Live vs Pro Tools ---
  // Conclusion: "both exceptional DAWs that excel in different areas". Pro Tools
  // es "the recording and mixing standard for commercial studios".
  'pro-daw': {
    // Conclusion: "the recording and mixing standard for commercial studios".
    'Avid Pro Tools Studio': 9.6,
    // Conclusion: "the ultimate creative tool for electronic music production".
    'Ableton Live 12 Suite': 9.4,
  },

  // --- Teclados y controladores MIDI ---
  // Conclusion: "the Nord Stage 4 88 is the flagship that covers stage, studio
  // and everything between". El KeyLab 61 equilibra el grupo de DAW.
  'best-keyboard': {
    // Conclusion: "the flagship" — el mas caro con diferencia.
    'Nord Stage 4 88': 9.8,
    // Conclusion: "the Arturia KeyLab 61 balances keys, pads, knobs, faders".
    'Arturia KeyLab Essential 61 MkIII': 9.5,
    // Conclusion: "the Yamaha P-225 is the home piano sweet spot".
    'Yamaha P-225': 9.4,
    // Conclusion: "the Roland FP-30X is the beginner value route".
    'Roland FP-30X': 9.3,
    // Conclusion: "wired deepest into Ableton Live".
    'Novation Launchkey 49 MK4': 9.2,
    // Conclusion: "the Roland GO:KEYS 3 plays on its own".
    'Roland GO:KEYS 3': 9.1,
    // Conclusion: "shrink the studio to a backpack at 25 mini keys each".
    'Akai MPK Mini MK4': 9.0,
    'Novation Launchkey Mini 25 MK4': 9.0,
    // Conclusion: "the cheapest serious route to 88 weighted keys".
    'M-Audio Hammer 88': 8.9,
    // Conclusion: "the premium Fatar keybed for composers inside Komplete".
    'Native Instruments Kontrol S61 MK3': 8.7,
  },

  // --- Plugins (guia general) ---
  // Conclusion: "Start with free plugins ... and upgrade to premium as you
  // identify what you need. FabFilter Pro-Q is the single best plugin investment".
  'best-plugins': {
    // Conclusion: "the single best plugin investment for mixing".
    'FabFilter Pro-Q 4': 9.8,
    // Conclusion: los paquetes que cubren un area completa.
    'FabFilter Total Bundle': 9.6,
    'iZotope Ozone 12 Advanced': 9.5,
    'Soundtoys 5.5 Bundle': 9.5,
    'Universal Audio UAD Ultimate 14': 9.4,
    'Native Instruments Komplete 26 Ultimate': 9.3,
    // Conclusion: "Start with free plugins ... as you identify what you need".
    'FabFilter Pro-C 3': 9.2,
    'Tokyo Dawn Labs TDR Kotelnikov GE': 9.1,
    'Celemony Melodyne 5': 9.0,
    // OJO: "Komplete 26 Definitivo" es el title_es del MISMO producto que
    // "Komplete 26 Ultimate" (id 123), asi que no lleva nota propia aqui.
  },

  // --- Monitores economicos (menos de 500 $) ---
  // Conclusion: "The JBL 305P MkII leads its class for ultra-tight spaces ...
  // The Kali LP-6 V2 adds boundary EQ room correction no other budget monitor
  // offers ... the Yamaha HS8 gives you the brutal honesty".
  'budget-monitors': {
    // Conclusion: "the Yamaha HS8 gives you the brutal honesty" — el tope de gama.
    'Yamaha HS8': 9.8,
    // Conclusion: "the Kali IN-8 V2 coaxial point source gets you there" — el
    // mas caro de los seis.
    'Kali Audio IN-8 V2': 9.5,
    // Conclusion: "adds boundary EQ room correction no other budget monitor offers".
    'Kali Audio LP-6 V2': 9.3,
    // Conclusion: "the DSP option with built-in tuning for rooms with bass buildup".
    'KRK Rokit 7 G5': 9.2,
    // Conclusion: "the Kali LP-UNF pair fits the space and the budget".
    'Kali Audio LP-UNF': 9.0,
    // Conclusion: "leads its class for ultra-tight spaces" — el mas barato.
    'JBL 305P MkII': 8.8,
  },

  // --- Micros de escenario ---
  // Conclusion: "the Shure SM58 is still the smartest buy in the world of live
  // sound". El SM57 entra como "keep an SM57 in the kit" para amplis y caja.
  'stage-mics': {
    // Conclusion: "the smartest buy in the world of live sound".
    'Shure SM58': 9.8,
    // Conclusion: "Keep an SM57 in the kit for guitar amps, snares and horns".
    'Shure SM57': 9.6,
    // Conclusion: "step up to the supercardioids" para escenarios grandes.
    'Sennheiser e945': 9.3,
    'Shure Beta 58A': 9.2,
    'Sennheiser e935': 9.1,
    // Conclusion: "the Audix OM7 is the secret weapon of pro FOH engineers".
    'Audix OM7': 9.0,
    // Conclusion: "the Telefunken M80 gives you condenser-like detail".
    'Telefunken M80': 8.9,
    // Conclusion: "the Electro-Voice ND86 is built specifically for large venues".
    'Electro-Voice ND86': 8.9,
    'AKG D5': 8.8,
    // Conclusion: "Cutting the cable? The Sennheiser EW-D".
    'Sennheiser EW-D Dual Wireless System': 8.7,
  },

  // --- Altavoces PA de 12 y 15 pulgadas ---
  // Conclusion: "The QSC K12.2 is the touring standard that professionals trust
  // worldwide"; el ZLX-12P-G2 es "the best budget speaker".
  'best-pa-speakers': {
    // Conclusion: "the touring standard that professionals trust worldwide".
    'QSC K12.2 Active PA Speaker': 9.8,
    // Conclusion: "offers premium sound quality with advanced DSP".
    'Yamaha DXR12mkII Active PA Speaker': 9.4,
    // Conclusion: "the ELX200-15P and PRX915 deliver the extra low-end and
    // headroom bigger stages demand" — el PRX915 es el mas caro.
    'JBL PRX915': 9.3,
    'EV ELX200-15P Active PA Speaker': 9.2,
    // Conclusion: "The EV ZLX-12P-G2 is the best budget speaker".
    'EV ZLX-12P-G2 Active PA Speaker': 9.1,
    // Conclusion: el budget everyday de 15 pulgadas segun el veredicto.
    'Mackie Thump215XT': 8.8,
  },

  // --- Subwoofers de estudio (menos de 700 $) ---
  // Conclusion: "The KRK S10.4 is the best do-it-all studio subwoofer".
  'studio-subwoofers': {
    // Conclusion: "the best do-it-all studio subwoofer".
    'KRK S10.4': 9.8,
    // Conclusion: "the pick if you already mix on HS-series monitors".
    'Yamaha HS8S': 9.5,
    // Conclusion: "brings full-range monitoring to tight desks with ARC X".
    'IK Multimedia iLoud Sub': 9.3,
    // Conclusion: "gives you the most output per dollar" — el mas barato.
    'Kali Audio WS-6.2': 9.1,
    // Conclusion: "the space-saving option at a lower price".
    'Adam T10S': 8.9,
  },

  // --- Mesas de mezcla digitales ---
  // Conclusion: "match the desk to the gig". No hay ganador unico: cada consola
  // "owns" un uso distinto.
  'best-digital-mixers': {
    // Conclusion: "the Midas M32R LIVE gives PRO preamps" — el mas caro.
    'Midas M32R LIVE': 9.8,
    // Conclusion: "the Behringer X32 Compact gives flagship buses cheap".
    'Behringer X32 Compact': 9.5,
    // Conclusion: "the Soundcraft Ui24R replaces the console" en rack.
    'Soundcraft Ui24R': 9.4,
    // Conclusion: "the Allen & Heath CQ-18T gives touchscreen auto-assist".
    'Allen & Heath CQ-18T': 9.3,
    // Conclusion: "the Behringer X Air XR18 owns budget hybrid live".
    'Behringer X Air XR18': 9.2,
    // Conclusion: "the Tascam Model 12 owns hands and podcasting".
    'Tascam Model 12': 9.1,
    // Conclusion: "the Korg SoundLink MW-1608 owns analog-feel mixing".
    'Korg SoundLink MW-1608': 9.0,
    // Citadas en la tabla sin rol asignado en la conclusion.
    'PreSonus StudioLive 32SC': 8.9,
    'Yamaha DM3S': 8.8,
    'Soundcraft Ui16': 8.7,
    'Behringer WING Compact': 8.7,
  },

  // --- Mesas de sonido en vivo ---
  // Conclusion: "The Yamaha MG16XU is the analog workhorse ... The Behringer
  // X32 Compact stays the versatility king ... the SQ-5 brings 96 kHz pro sound
  // to touring".
  'best-live-sound-mixers': {
    // Conclusion: "brings 96 kHz pro sound to touring" — la mas cara.
    'Allen & Heath SQ-5': 9.8,
    // Conclusion: "stays the versatility king with 17 motorized faders".
    'Behringer X32 Compact': 9.6,
    // Conclusion: "the Soundcraft Ui24R replaces the console with a 24-input rack".
    'Soundcraft Ui24R': 9.4,
    // Conclusion: "records the gig to SD" — el recorder-hybrid.
    'Tascam Model 12': 9.3,
    // Conclusion: "keeps hands on analog faders".
    'Korg SoundLink MW-1608': 9.2,
    // Conclusion: "the analog workhorse for bands that need real channels".
    'Yamaha MG16XU': 9.1,
    // Conclusion: "mixes from its touchscreen with auto gain".
    'Allen & Heath CQ-18T': 9.0,
    // Conclusion: "self-mixed touring bands go Soundcraft Ui24R rack over the XR18".
    'Behringer X Air XR18': 8.9,
    // Conclusion: "New here" — el Bose T8S para eventos acústicos.
    'Bose T8S ToneMatch': 8.8,
    'Yamaha DM3S': 8.7,
  },

  // --- Mesas analogicas ---
  // Conclusion: "The Yamaha MG10XU is the perfect entry-level analog mixer ...
  // The Mackie ProFX12v3 offers more channels ... The Signature 12 MTK captures
  // every channel over USB".
  'best-analog-mixers': {
    // Conclusion: "offers more channels, better preamps and superior effects".
    'Mackie ProFX12v3': 9.8,
    // Conclusion: "captures every channel over USB" — el live-recording pick.
    'Soundcraft Signature 12 MTK': 9.4,
    // Conclusion: el escalon profesional de la gama SSL.
    'SSL BiG SiX': 9.2,
    // Conclusion: la misma categoria de entrada que la MG10XU.
    'Allen & Heath ZEDi-10FX': 9.1,
    // Conclusion: "the perfect entry-level analog mixer" — el mas barato.
    'Yamaha MG10XU': 8.9,
  },

  // --- CQ-18T vs M32R LIVE ---
  // Conclusion: "For portability and automation, choose the CQ-18T; for
  // professional live sound with the Midas legacy, the M32R LIVE is the reference".
  'pro-mixers': {
    // Conclusion: "the M32R LIVE is the reference" con los previos Midas.
    'Midas M32R LIVE': 9.6,
    // Conclusion: "ideal for corporate AV ... at accessible price".
    'Allen & Heath CQ-18T': 9.1,
  },

  // --- Auriculares economicos (menos de 150 $) ---
  // Conclusion: "the HD 560S is the open-back winner: its linear tuning and
  // angled drivers make it the most accurate of the eight".
  'budget-headphones': {
    // Conclusion: "the most accurate of the eight".
    'Sennheiser HD 560S': 9.8,
    // Conclusion: "the proven classic" en cerrado.
    'Sony MDR-7506': 9.4,
    // Conclusion: "adds detachable cables and pads".
    'Shure SRH440A': 9.3,
    // Conclusion: "the isolation-first tracker".
    'Sennheiser HD 280 Pro II': 9.2,
    // Conclusion: "the flat and versatile middle ground".
    'Audio-Technica ATH-M40x': 9.1,
    // Conclusion: "the semi-open middle path" con cable profesional.
    'AKG K240 Studio': 9.0,
    // Conclusion: "the lightest open-back gateway".
    'Audio-Technica ATH-R30x': 8.9,
    // Conclusion: "more accuracy per dollar than anything else".
    'Samson SR850': 8.7,
  },

  // --- Micros para creadores (35 a 299 $) ---
  // Conclusion: "Under $70 the FIFINE AM8 is the one to take" y "the Shure MV7+
  // ... replaces both a microphone and an audio interface, which is the only
  // real argument that adds up".
  'mics-for-creators': {
    // Conclusion: "the only real argument that adds up" — el mas caro.
    'Shure MV7+': 9.8,
    // Veredicto: "the one to beat for beginners".
    'Samson Q2U USB/XLR Microphone': 9.7,
    // Conclusion: "a USB and XLR dynamic at $58 ... does not become obsolete".
    'FIFINE AmpliGame AM8 Dynamic USB Microphone': 9.4,
    // Conclusion: "wins on clean capture" en el tramo de 70 a 150 $.
    'Rode NT-USB Mini Studio Condenser Microphone': 9.3,
    // Veredicto: "wins if your priority is streaming software".
    'HyperX QuadCast 2': 9.2,
    // Veredicto: "the pick when you want a full production chain in the box".
    'Elgato Wave:3': 9.1,
    'FIFINE AmpliTank K688 Dynamic USB/XLR Microphone': 9.1,
    // Conclusion: "the budget entry point into the studio world" (solo XLR).
    'Audio-Technica AT2020': 9.0,
    // Veredicto: "handles hot sources" para voz en sala ruidosa.
    'Audio-Technica AT2040USB': 9.0,
    'Audio-Technica AT2020USB-X Cardioid Condenser USB Microphone': 8.9,
    'Rode PodMic USB': 8.9,
    'Rode XCM-50': 8.9,
    'Razer Seiren V3 Mini': 8.8,
    'TONOR TC-777 USB Microphone': 8.8,
    'Maono PM461 USB Microphone': 8.8,
    // Conclusion: "stays relevant only because its switchable polar pattern
    // is unique in this list, not because of its older 16-bit conversion".
    'Blue Yeti USB Microphone': 8.7,
  },

  // --- Montaje de monitores ---
  // Conclusion: "the Yamaha HS8 tells the truth down to 38 Hz" — abre la
  // cadena. Los soportes y el tratamiento son el escalon siguiente.
  'monitor-setup': {
    // Veredicto: "Start with the Yamaha HS8" — el punto de partida.
    'Yamaha HS8': 9.8,
    // Conclusion: "Lift either on K&M 26722" — el soporte nombrado.
    'K&M 26722 Monitor Stands (Each)': 9.6,
    // Conclusion: "keeps translating when the desk must hug the wall".
    'Focal Alpha 65 Evo': 9.5,
    // Conclusion: "decouple on the desk with the IsoAcoustics ISO-200".
    'IsoAcoustics ISO-200 (Pair)': 9.4,
    // Conclusion: "Then measure: SoundID Reference with its calibrated mic".
    'Sonarworks SoundID Reference': 9.3,
    // Conclusion: "the $79 MiniDSP UMIK-1 with REW" como alternativa.
    'MiniDSP UMIK-1': 9.2,
    // Conclusion: "is sticking to SAM-only territory" — con limitacion.
    'Genelec GLM Kit': 8.9,
    // Conclusion: "solves decoupling for $39.99".
    'Auralex MoPADs (4-Pack)': 8.9,
    // Conclusion: "carries the heavy iron at $599.99" — el mas caro.
    'Ultimate Support MS-100 (Pair)': 8.8,
  },
};
