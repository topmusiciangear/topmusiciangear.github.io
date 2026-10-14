const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const die = (m) => { console.log('!! ' + m); process.exit(1); };
const gj = BASE + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gj, 'utf8'));

const MAP = [
  // ---------------- best-daw-for-beginners (2) ----------------
  ['best-daw-for-beginners', 6, 'Reason 14: Hardware Cables Without the Hardware', 'Reason 14: cables de hardware sin el hardware'],
  ['best-daw-for-beginners', 7, 'Steinberg Cubase Pro 15: From First Sketch to Scored Arrangement', 'Steinberg Cubase Pro 15: del primer boceto al arreglo partiturado'],

  // ---------------- best-pa-speakers (3) ----------------
  ['best-pa-speakers', 4, 'Mackie Thump215XT: 1400W Peak and Four Voicing Modes', 'Mackie Thump215XT: 1400 W de pico y cuatro modos de voz'],
  ['best-pa-speakers', 5, 'EV ELX200-15P: Fifteen Inches That One Person Can Load', 'EV ELX200-15P: quince pulgadas que carga una sola persona'],
  ['best-pa-speakers', 6, 'JBL PRX915: 133 dB from a Box You Can Still Carry', 'JBL PRX915: 133 dB de una caja que todavía puedes cargar'],

  // ---------------- best-synthesizers (3) ----------------
  ['best-synthesizers', 5, 'Arturia MicroFreak: Curious Sound, Flat Keys', 'Arturia MicroFreak: sonido curioso, teclas planas'],
  ['best-synthesizers', 6, 'Behringer DeepMind 12: Twelve Analog Voices Behind the Pads', 'Behringer DeepMind 12: doce voces analógicas detrás de los pads'],
  ['best-synthesizers', 7, 'ASM Hydrasynth: 219 Wavetables and PolyTouch Aftertouch', 'ASM Hydrasynth: 219 wavetables y aftertouch polifónico PolyTouch'],

  // ---------------- pro-microphones (3) ----------------
  ['pro-microphones', 3, 'Austrian Audio OC818: Pattern Changes Without Remounting', 'Austrian Audio OC818: cambias de patrón sin desmontar'],
  ['pro-microphones', 4, 'Sennheiser e 906: Drape, Position, Done', 'Sennheiser e 906: colgar, colocar, listo'],
  ['pro-microphones', 5, 'Beyerdynamic M 201: Rejection as a Creative Tool', 'Beyerdynamic M 201: el rechazo como herramienta creativa'],

  // ---------------- pro-plugins (3) ----------------
  ['pro-plugins', 3, 'UA 1176 Collection: Three FET Revisions, Three Flavours', 'UA 1176 Collection: tres revisiones FET, tres sabores'],
  ['pro-plugins', 4, 'TDR Kotelnikov GE: Gain That Leaves No Fingerprints', 'TDR Kotelnikov GE: ganancia que no deja huellas'],
  ['pro-plugins', 5, 'iZotope RX 12: Repair Assistant as a Diagnostic Tool', 'iZotope RX 12: el Repair Assistant como herramienta de diagnóstico'],

  // ---------------- best-electric-guitars-2026 (3) ----------------
  ['best-electric-guitars-2026', 7, 'Strandberg Boden Essential 6: Comfort That Compounds Over Hours', 'Strandberg Boden Essential 6: comodidad que se acumula con las horas'],
  ['best-electric-guitars-2026', 8, 'Ibanez AZ2402 Prestige: Ten Voices, One Studio Guitar', 'Ibanez AZ2402 Prestige: diez voces, una guitarra de estudio'],
  ['best-electric-guitars-2026', 9, 'ESP E-II Eclipse DB: High Gain Without a Noise Floor', 'ESP E-II Eclipse DB: alta ganancia sin ruido de fondo'],

  // ---------------- best-guitar-home-office (2) ----------------
  ['best-guitar-home-office', 8, 'Donner HUSH-I EVO2: A Travel Guitar Built Around Headphones', 'Donner HUSH-I EVO2: una guitarra de viaje construida para auriculares'],
  ['best-guitar-home-office', 9, 'Lava ME 4: An Acoustic That Behaves Like a Tablet', 'Lava ME 4: una acústica que se comporta como una tableta'],

  // ---------------- ableton-vs-logic (2) ----------------
  ['ableton-vs-logic', 5, 'Ableton Live 12 Suite: The Performance-First Side of the Duel', 'Ableton Live 12 Suite: el lado orientado a la actuación del duelo'],
  ['ableton-vs-logic', 6, 'Logic Pro: The Self-Contained Mac Studio', 'Logic Pro: el estudio Mac autocontenido'],

  // ---------------- active-vs-passive-pa (2) ----------------
  ['active-vs-passive-pa', 6, 'JBL EON712: Why Self-Powered Boxes Win Solo Gigging', 'JBL EON712: por qué las cajas autopotenciadas ganan en gigs solistas'],
  ['active-vs-passive-pa', 7, 'JBL JRX215: The Case for Staying Passive', 'JBL JRX215: el argumento a favor de quedarse en pasivo'],

  // ---------------- pro-monitors (2) ----------------
  ['pro-monitors', 3, 'Neumann KH 120-II: German Nearfield in 5.25 Inches', 'Neumann KH 120-II: nearfield alemán en 5,25 pulgadas'],
  ['pro-monitors', 4, 'Dynaudio Core 7: Truth-Telling at Higher Output', 'Dynaudio Core 7: verdad a mayor volumen'],

  // ---------------- beat-making (2) ----------------
  ['beat-making', 6, 'Focusrite Scarlett 2i2 4th Gen: Fixing the Track Before the Beat', 'Focusrite Scarlett 2i2 4th Gen: arreglar la pista antes que el beat'],
  ['beat-making', 7, 'Beyerdynamic DT 770 Pro: Velour Pads for Late-Night Programming', 'Beyerdynamic DT 770 Pro: almohadillas de velour para programar de noche']
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
[...new Set(MAP.map(m => m[0]))].forEach(gid => {
  const g = guides.find(x => x.id === gid);
  const hs = g.sections.map(s => s.heading);
  if (new Set(hs).size !== hs.length) die('duplicados en ' + gid);
  if (!g.sections.every(s => !s.heading || s.heading_es)) die('heading_es falta en ' + gid);
  console.log('  ' + gid + ': ok');
});
fs.writeFileSync(gj, JSON.stringify(guides, null, 2));
console.log('\nBATCH 5 OK');