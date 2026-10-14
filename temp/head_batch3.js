const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const die = (m) => { console.log('!! ' + m); process.exit(1); };
const gj = BASE + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gj, 'utf8'));

const MAP = [
  // ---------------- best-shotgun-mics (2) ----------------
  ['best-shotgun-mics', 10, 'Rode NTG3: RF-Bias That Ignores Humidity', 'Rode NTG3: RF-Bias que ignora la humedad'],
  ['best-shotgun-mics', 11, 'Audio-Technica AT897: Eleven Inches, Weeks of Battery', 'Audio-Technica AT897: once centímetros y semanas de batería'],

  // ---------------- di-box (2) ----------------
  ['di-box', 5, 'Whirlwind IMP 2: The Transformer-Built Tour Box', 'Whirlwind IMP 2: la caja de gira construida con transformador'],
  ['di-box', 6, 'Walrus Canvas Mono: A DI That Fits on the Board', 'Walrus Canvas Mono: una DI que cabe en la pedalera'],

  // ---------------- 1 seccion ----------------
  ['open-headphones', 8, 'Audeze LCD-X: A Planar Reference That Withholds Flattery', 'Audeze LCD-X: una referencia planar que no te adula'],
  ['fender-guide', 5, "Gibson Les Paul Standard '60s: The Bolt-On Alternative", "Gibson Les Paul Standard '60s: la alternativa al bolt-on"],
  ['scarlett-vs-ssl', 4, 'SSL 2+ MKII: Analog Colour Behind the 4K Switch', 'SSL 2+ MKII: color analógico detrás del interruptor 4K'],
  ['ableton-vs-fl-studio', 4, 'FL Studio Producer: Loop to Arrangement in One Pass', 'FL Studio Producer: del loop al arreglo en una pasada'],
  ['best-headphones-for-mixing', 5, 'Sony MDR-7506: Trust Earned Through Translation', 'Sony MDR-7506: confianza ganada por traducción'],
  ['best-bass-amps', 6, 'Boss Katana-110 Bass: 60W, Four Bands and a Tracking-Ready DI', 'Boss Katana-110 Bass: 60 W, cuatro bandas y DI lista para grabar'],
  ['best-overdrive-distortion', 4, 'MXR Phase 95: Four Phasers Where One Pedal Used to Sit', 'MXR Phase 95: cuatro faser donde antes cabía un pedal'],
  ['best-live-sound-mixers', 7, 'Korg SoundLink MW-1608: Faders First, Recall Second', 'Korg SoundLink MW-1608: faders primero, recall después'],
  ['budget-pa-systems', 5, 'JBL EON712: A 1300W Box With dbx DriveRack Inside', 'JBL EON712: una caja de 1300 W con dbx DriveRack dentro'],
  ['precision-vs-jazz', 5, 'Fender Player II Jazz Bass: Where the J-Bass Debate Is Won', 'Fender Player II Jazz Bass: donde se gana el debate del J-Bass'],
  ['scarlett-vs-motu', 5, 'Focusrite Scarlett 2i2 4th Gen: The Approachable Card in a Two-Channel Duel', 'Focusrite Scarlett 2i2 4th Gen: la carta fácil en un duelo de dos canales'],
  ['me90-vs-mx5', 3, 'Boss ME-90: Knobs Instead of Menus', 'Boss ME-90: diales en lugar de menús'],
  ['stream-controllers', 4, 'Roland Bridge Cast X: Two Buses for Player and Stream', 'Roland Bridge Cast X: dos buses para jugadora y emisión'],
  ['wireless-lapel-mics', 8, 'DJI Mic 3: 32-Bit Float Backups on Every Link', 'DJI Mic 3: copias de 32 bits flotantes en cada enlace'],
  ['rode-wireless-pro-vs-dji-mic-2', 4, 'DJI Mic 3: Timecode for Multi-Camera Shoots', 'DJI Mic 3: timecode para rodajes multicámara'],

  // ---------------- best-interface (5) ----------------
  ['best-interface', 2, 'Focusrite Scarlett 2i2 4th Gen: 120 dB of Range on the Entry Tier', 'Focusrite Scarlett 2i2 4th Gen: 120 dB de rango en la gama de entrada'],
  ['best-interface', 3, 'SSL 2+ MKII: 64 dB and a 4K Channel Strip', 'SSL 2+ MKII: 64 dB y un canal 4K'],
  ['best-interface', 4, 'Universal Audio Apollo Twin X Gen 2: UAD Monitoring at Near-Zero Latency', 'Universal Audio Apollo Twin X Gen 2: monitorización UAD con latencia casi nula'],
  ['best-interface', 5, 'RME Babyface Pro FS: SteadyClock FS and the Long Haul', 'RME Babyface Pro FS: SteadyClock FS y la larga distancia'],
  ['best-interface', 6, 'MOTU M2: The Only Full-Colour Screen at This Price', 'MOTU M2: la única pantalla a color a este precio'],

  // ---------------- best-plugins (5) ----------------
  ['best-plugins', 2, 'FabFilter Total Bundle: Three Tools You Reach for Every Mix', 'FabFilter Total Bundle: tres herramientas en cada mezcla'],
  ['best-plugins', 3, 'iZotope Ozone 12 Advanced: Eight Mastering Stages in One Chain', 'iZotope Ozone 12 Advanced: ocho etapas de masterización en una cadena'],
  ['best-plugins', 4, 'Celemony Melodyne 5: Fixing Notes Without Flattening the Performance', 'Celemony Melodyne 5: arreglar notas sin aplanar la interpretación'],
  ['best-plugins', 5, 'Native Instruments Komplete 26: Strings, Synths and Scoring in One', 'Native Instruments Komplete 26: cuerdas, sintes y música de imagen en uno'],
  ['best-plugins', 6, 'TDR Kotelnikov GE: Bus Compression That Breathes', 'TDR Kotelnikov GE: compresión de bus que respira']
];

const TPL = ['A Closer Look', 'análisis detallado', 'In Depth', 'Deep Dive', 'Más de cerca'];
let done = 0;
MAP.forEach(([gid, idx, en, es]) => {
  const g = guides.find(x => x.id === gid);
  if (!g) die('guia no existe: ' + gid);
  const s = (g.sections || [])[idx];
  if (!s) die('seccion ' + idx + ' no existe en ' + gid);
  const cur = s.heading || s.h || '';
  if (!TPL.some(t => cur.toLowerCase().includes(t.toLowerCase()))) die('"' + cur + '" no es plantilla');
  s.heading = en; s.heading_es = es; done++;
});
console.log('encabezados reescritos: ' + done + '/' + MAP.length);
['best-interface', 'best-plugins'].forEach(gid => {
  const g = guides.find(x => x.id === gid);
  const hs = g.sections.map(s => s.heading);
  if (new Set(hs).size !== hs.length) die('duplicados en ' + gid);
  if (!g.sections.every(s => !s.heading || s.heading_es)) die('heading_es falta en ' + gid);
  const left = g.sections.filter(s => TPL.some(t => (s.heading || '').toLowerCase().includes(t.toLowerCase()))).length;
  console.log('  ' + gid + ': ' + hs.length + ' | unicos ok | ES ok | plantilla=' + left);
  if (left) die('queda plantilla en ' + gid);
});
fs.writeFileSync(gj, JSON.stringify(guides, null, 2));
console.log('\nBATCH 3 OK');