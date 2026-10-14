const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const gj = BASE + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gj, 'utf8'));

// Reescritura MANUAL de los titulos que pasan de 60 chars.
// Nada de recorte automatico: cortar a media frase deja basura tipo
// "Mejores auriculares cerrados de estudio para grabacion y." — se reescribe.
const NEW = {
  'tracking-headphones': {
    en: 'Best Closed-Back Headphones for Recording & Vocals',
    es: 'Mejores auriculares cerrados para grabar y aislar la voz'
  },
  'midi-controllers': { es: 'Mejores superficies de control DAW y bancos de faders' },
  'studio-subwoofers': { es: '5 mejores subwoofers de estudio por menos de $700' },
  'channel-strip-plugins': {
    en: 'Analog Emulation in the DAW: Best Channel Strip Plugins',
    es: 'Emulación analógica en el DAW: mejores plugins channel strip'
  },
  'acoustic-guitars-guide': { es: 'Mejores guitarras acústicas: Martin, Taylor y Gibson' },
  'vocal-plugins': { es: 'Mejores plugins vocales: cadena de procesamiento completa' },
  'beginner-guitar': { es: 'Mejores guitarras para principiantes: guía para empezar' },
  'best-electric-guitar': { es: 'Mejor guitarra eléctrica para cada guitarrista' },
  'apollo-vs-babyface': {
    en: 'Apollo Twin X vs Babyface Pro FS: Interface Duel',
    es: 'Apollo Twin X vs Babyface Pro FS: duelo de interfaces'
  },
  'rme-vs-motu': {
    en: 'Entry-Level vs Premium Interface: Is It Worth It?',
    es: 'Interfaz de gama de entrada vs premium: ¿vale la pena?'
  },
  'adam-vs-genelec': { es: 'Adam Audio vs Genelec: tweeter, sonido y valor' },
  'sm57-vs-md421': { es: 'SM57 vs MD 421 Kompakt: ¿mejor micro para amplis?' },
  're20-vs-sm7b': { es: 'EV RE20 vs Shure SM7B: duelo de mics de broadcast' },
  'blx288-vs-ewd': { es: 'Shure BLX288 vs Sennheiser EW-D: ¿cuál para directo?' },
  'player-strat-vs-pacifica': {
    en: 'Player Strat vs Yamaha Pacifica 112V: Which One?',
    es: 'Player Strat vs Yamaha Pacifica 112V: comparativa'
  },
  'martin-d28-vs-taylor-314': {
    en: 'Martin D-28 vs Taylor 314ce: Best Acoustic Pro?',
    es: 'Martin D-28 vs Taylor 314ce: ¿mejor acústica?'
  },
  'pro-tools-vs-cubase': {
    en: 'Pro Tools vs Cubase Pro: Recording & Mixing',
    es: 'Pro Tools vs Cubase Pro: grabación y mezcla'
  },
  'best-mic-for-guitar-amps': { es: 'Mejores micrófonos dinámicos para grabar amplis en casa' },
  'compact-rhythm-devices': { es: 'Mejores dispositivos de ritmo y samplers de bolsillo' },
  'best-practice-amps': { es: 'Mejores amplificadores de práctica para casa' },
  'best-pa-speakers': {
    en: 'Best 12" & 15" Powered PA Speakers for Live Sound',
    es: 'Mejores altavoces PA de 12 y 15 pulgadas para directo'
  },
  'best-analog-mixers': { es: 'Mejores mesas de mezcla analógicas: control directo' },
  'best-compact-mixers': { es: 'Mejores mezcladores digitales de rack con control tablet' },
  'xr18-vs-m32r': { es: 'Behringer XR18 vs Midas M32R LIVE: comparativa' },
  'xr18-vs-cq18t': { es: 'Behringer XR18 vs Allen & Heath CQ-18T: duelo' },
  'ableton-vs-logic': {
    en: 'Ableton Live vs Logic Pro: Workflow Differences',
    es: 'Ableton Live vs Logic Pro: diferencias de flujo'
  },
  'budget-bass-like-expensive': { es: 'Bajos con mejor relación calidad-precio que suenan premium' },
  'beginner-bass-guitars': { es: 'Mejores bajos para principiantes: guía para empezar' },
  'pro-headphones': {
    en: 'Audeze LCD-MX4 vs LCD-X: Planar Headphone Duel',
    es: 'Audeze LCD-MX4 vs LCD-X: comparativa de planares'
  },
  'pro-microphones': {
    en: 'Neumann U 87 Ai vs Lewitt LCT 1040: Tube vs Solid-State',
    es: 'Neumann U 87 Ai vs Lewitt LCT 1040: tubo vs estado sólido'
  },
  'pro-monitors': {
    en: 'ADAM S3H vs Focal Trio11 Be: Three-Way Monitors',
    es: 'ADAM S3H vs Focal Trio11 Be: monitores de tres vías'
  },
  'pro-interfaces': {
    en: 'Apollo X16 vs RME Fireface UFX III: DSP vs Routing',
    es: 'Apollo X16 vs RME Fireface UFX III: DSP vs ruteo'
  },
  'pro-guitars': {
    en: "Ultra II Stratocaster vs Les Paul Standard '60s",
    es: "Ultra II Stratocaster vs Les Paul Standard '60s"
  },
  'pro-basses': {
    en: 'Ultra II Precision Bass vs Music Man StingRay',
    es: 'Ultra II Precision Bass vs Music Man StingRay'
  },
  'pro-synths': {
    en: 'Moog Muse vs Prophet-10: Polyphonic Analog Synth Duel',
    es: 'Moog Muse vs Prophet-10: duelo de sints analógicos'
  },
  'pro-drum-machines': {
    en: 'Digitakt II vs MPC Live III: Sampling Machines',
    es: 'Digitakt II vs MPC Live III: muestreo y secuenciación'
  },
  'pro-plugins': {
    en: 'FabFilter vs Komplete: Surgical Tools or Ecosystem?',
    es: 'FabFilter vs Komplete: ¿bisturíes o ecosistema?'
  },
  'pro-live-sound': {
    en: 'Allen & Heath SQ-5 vs Behringer X32 Compact',
    es: 'Allen & Heath SQ-5 vs Behringer X32 Compact'
  },
  'pro-mixers': {
    en: 'Allen & Heath CQ-18T vs Midas M32R LIVE',
    es: 'Allen & Heath CQ-18T vs Midas M32R LIVE'
  },
  'pro-daw': {
    en: 'Ableton Live 12 Suite vs Pro Tools Studio',
    es: 'Ableton Live 12 Suite vs Pro Tools Studio'
  },
  'me90-vs-mx5': {
    en: 'Boss ME-90 vs HeadRush Flex Prime: Which One?',
    es: 'Boss ME-90 vs HeadRush Flex Prime: comparativa'
  },
  'nx912-vs-pxm12mp': { es: 'RCF NX 912-SMA vs EV PXM-12MP: ¿cuál cuña?' },
  'stream-controllers': { es: 'Alternativas a Stream Deck y mejores mezcladores' },
  'wireless-lapel-mics': { es: 'Mejores micrófonos de solapa inalámbricos' },
  'mics-for-creators': { es: 'Mejores micrófonos económicos para creadores' },
  'rodecaster-pro2-vs-dlz-creator': { es: 'RØDECaster Pro II vs DLZ Creator: ¿cuál gana?' },
  'stream-deck-plus-xl-vs-razer': {
    en: 'Elgato Stream Deck vs Razer Stream Controller',
    es: 'Elgato Stream Deck vs Razer Stream Controller'
  },
  'rode-wireless-pro-vs-dji-mic-2': { es: 'Rode Wireless PRO vs DJI Mic 3: comparativa' },
  'ew-iem-g4-twin-vs-psm300': {
    en: 'Sennheiser EW IEM G4 vs Shure PSM300: IEM Duel',
    es: 'Sennheiser EW IEM G4 vs Shure PSM300: duelo'
  },
  'ie900-vs-se846': { es: 'Sennheiser IE 900 vs Shure SE846 Gen 2' },
  'studio-subwoofers-setup': {
    en: 'Studio Subwoofer Setup: Position and Calibrate',
    es: 'Configurar un subwoofer de estudio: posición y calibración'
  },
  'kh750-vs-7050c': {
    en: 'Neumann KH 750 DSP vs Genelec 7050C: Subwoofer Duel',
    es: 'Neumann KH 750 DSP vs Genelec 7050C: duelo'
  },
  'best-in-ear-monitors': {
    en: 'Best In-Ear Monitors (IEM): Stage & Studio',
    es: 'Los mejores monitores In-Ear (IEM) para directo y estudio'
  },
  'wireless-intercom-systems': { es: 'Mejores intercomunicadores inalámbricos para eventos' },
  'best-5-string-basses': { es: 'Mejores bajos de 5 cuerdas por precio' },
  'p225-vs-fp30x': { es: 'Yamaha P-225 vs Roland FP-30X: comparativa' },
  'bridge-cast-x-vs-rodecaster-pro2': { es: 'Bridge Cast X vs RØDECaster Pro II: ¿cuál gana?' }
};

let n = 0, remaining = 0;
Object.keys(NEW).forEach(function (id) {
  const g = guides.find(x => x.id === id);
  if (!g) { console.log('[!!] no existe: ' + id); return; }
  const spec = NEW[id];
  if (spec.en) {
    if (g.title) { g.title = spec.en; n++; }
    if (g.titleTag) { g.titleTag = spec.en; n++; }
  }
  if (spec.es) {
    if (g.title_es) { g.title_es = spec.es; n++; }
    if (g.titleTag_es) { g.titleTag_es = spec.es; n++; }
  }
});

guides.forEach(function (g) {
  ['title', 'titleTag', 'title_es', 'titleTag_es'].forEach(function (k) {
    if (g[k] && g[k].length > 60) { remaining++; console.log('  PENDIENTE [' + g.id + '] ' + k + ' (' + g[k].length + '): ' + g[k]); }
  });
});

fs.writeFileSync(gj, JSON.stringify(guides, null, 2));
console.log('\ncampos reescritos: ' + n);
console.log('pendientes > 60: ' + remaining);