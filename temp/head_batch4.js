const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const die = (m) => { console.log('!! ' + m); process.exit(1); };
const gj = BASE + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gj, 'utf8'));

const MAP = [
  // ---------------- beginner-guitar (5) ----------------
  ['beginner-guitar', 3, 'Fender CN-60S: Nylon Strings on a Steel-String Neck', 'Fender CN-60S: cuerdas de nailon en un mástil de cuerda de acero'],
  ['beginner-guitar', 5, 'Yamaha Pacifica 112V: One Pickup Layout for a First Year', 'Yamaha Pacifica 112V: una sola pastilla para todo el primer año'],
  ['beginner-guitar', 6, 'Squier Affinity Strat: The Shape You Already Know', 'Squier Affinity Strat: la forma que ya conoces'],
  ['beginner-guitar', 7, 'Epiphone Les Paul Special-I: Thick Chords at 5.5 lb', 'Epiphone Les Paul Special-I: acordes gruesos a 2,5 kg'],
  ['beginner-guitar', 8, 'Enya Nova Go Sonic: The Guitar That Forgets It Needs an Amp', 'Enya Nova Go Sonic: la guitarra que olvida que necesita amplificador'],

  // ---------------- fix-clipping-scarlett (4) ----------------
  ['fix-clipping-scarlett', 6, 'Shure SM7B: Off-Axis Rejection Before Gain', 'Shure SM7B: rechazo fuera de eje antes que ganancia'],
  ['fix-clipping-scarlett', 7, 'Universal Audio Apollo Twin X Gen 2: Auto-Gain Ends the Level Chase', 'Universal Audio Apollo Twin X Gen 2: Auto-Gain acaba con la carrera de niveles'],
  ['fix-clipping-scarlett', 8, 'Electro-Voice RE20: Variable-D Keeps Proximity Under Control', 'Electro-Voice RE20: el Variable-D controla el efecto de proximidad'],
  ['fix-clipping-scarlett', 9, 'Audient iD14 MkII: Class-A Gain and Two Headphone Outputs', 'Audient iD14 MkII: ganancia Clase A y dos salidas de auriculares'],

  // ---------------- best-digital-mixers (4) ----------------
  ['best-digital-mixers', 3, 'Behringer XR18: Mixing From Where the Audience Stands', 'Behringer XR18: mezclar desde donde está el público'],
  ['best-digital-mixers', 4, 'Soundcraft Ui24R: Twenty-Four Channels in a Rack, Mixed by Phone', 'Soundcraft Ui24R: veinticuatro canales en rack, mezclados desde el móvil'],
  ['best-digital-mixers', 5, 'PreSonus StudioLive 32SC: 32 Channels and 16 FlexMixes', 'PreSonus StudioLive 32SC: 32 canales y 16 FlexMixes'],
  ['best-digital-mixers', 6, 'Yamaha DM3S: 22 Channels Behind a 9-Inch Touchscreen', 'Yamaha DM3S: 22 canales detrás de una pantalla táctil de 9 pulgadas'],

  // ---------------- best-instrument-mics (4) ----------------
  ['best-instrument-mics', 7, 'Sennheiser e 906: Mounts Flush, No Stand Required', 'Sennheiser e 906: se monta al ras, sin pie'],
  ['best-instrument-mics', 8, 'Beyerdynamic M 201: Hypercardioid Discipline in Loud Rooms', 'Beyerdynamic M 201: disciplina hipercardioide en salas ruidosas'],
  ['best-instrument-mics', 9, 'Audix D6: Kick Weight Without the EQ Marathon', 'Audix D6: golpe de bombo sin la maratón de EQ'],
  ['best-instrument-mics', 10, 'Shure Beta 52A: Stage-Proof Kick with a Presence Peak', 'Shure Beta 52A: bombo a prueba del escenario con pico de presencia'],

  // ---------------- best-ribbon-mics (4) ----------------
  ['best-ribbon-mics', 5, 'sE Voodoo VR2: An Active Ribbon That Needs 48V', 'sE Voodoo VR2: una cinta activa que necesita 48V'],
  ['best-ribbon-mics', 6, 'Beyerdynamic M 160: A Ribbon With a Direction', 'Beyerdynamic M 160: una cinta con dirección'],
  ['best-ribbon-mics', 7, 'Coles 4038: Seventy Years of BBC Warmth', 'Coles 4038: setenta años de calidez de la BBC'],
  ['best-ribbon-mics', 8, 'Royer R-121: Built for Guitar Cabs, Forgiving on Placement', 'Royer R-121: pensada para cajas de guitarra, indulgente al colocarla'],

  // ---------------- best-in-ear-monitors (4) ----------------
  ['best-in-ear-monitors', 4, 'Sennheiser IE 900: One Driver, No Crossover Artefacts', 'Sennheiser IE 900: un solo transductor, sin artefactos de cruce'],
  ['best-in-ear-monitors', 5, 'Shure SE846 Gen 2: Four Drivers and Four Swappable Voicings', 'Shure SE846 Gen 2: cuatro transductores y cuatro voces intercambiables'],
  ['best-in-ear-monitors', 6, 'Xvive U4: Leaving the Wedge Behind at Under 5 ms', 'Xvive U4: dejar el wedge atrás con menos de 5 ms'],
  ['best-in-ear-monitors', 7, 'Phenyx PTM-10: A Metal Transmitter for a First Wireless Rig', 'Phenyx PTM-10: transmisor de metal para tu primer sistema inalámbrico'],

  // ---------------- live-sound-pa (3) ----------------
  ['live-sound-pa', 3, 'JBL PRX ONE: Mixer, Array and Sub in One Column', 'JBL PRX ONE: mezcladora, array y sub en una columna'],
  ['live-sound-pa', 4, 'Yamaha DXR12mkII: FIR-X Tuning for Open-Air Throw', 'Yamaha DXR12mkII: afinación FIR-X para aire libre'],
  ['live-sound-pa', 5, 'JBL EON712: Mixer, EQ and Feedback Killer in One Box', 'JBL EON712: mezcladora, EQ y eliminador de feedback en una caja'],

  // ---------------- best-mic-for-podcasting (3) ----------------
  ['best-mic-for-podcasting', 2, 'Shure SM58: The Vocal Mic That Survives Everything', 'Shure SM58: el micro de voz que sobrevive a todo'],
  ['best-mic-for-podcasting', 3, 'Rode PodMic: Broadcast Warmth Without the Broadcast Budget', 'Rode PodMic: calidez de radio sin el presupuesto de radio'],
  ['best-mic-for-podcasting', 5, 'Behringer XM8500: The Whole Argument for Starting Cheap', 'Behringer XM8500: todo el argumento para empezar barato'],

  // ---------------- best-daw-for-beginners (3) ----------------
  ['best-daw-for-beginners', 5, 'FL Studio Producer: Momentum Beats Theory for Beginners', 'FL Studio Producer: el impulso le gana a la teoría al empezar']
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
const affected = [...new Set(MAP.map(m => m[0]))];
affected.forEach(gid => {
  const g = guides.find(x => x.id === gid);
  const hs = g.sections.map(s => s.heading);
  const uniq = new Set(hs).size === hs.length;
  const esOk = g.sections.every(s => !s.heading || s.heading_es);
  const left = g.sections.filter(s => TPL.some(t => (s.heading || '').toLowerCase().includes(t.toLowerCase()))).length;
  console.log('  ' + gid + ': ' + hs.length + ' | unicos=' + uniq + ' | ES=' + esOk + ' | plantilla=' + left);
  if (!uniq || !esOk) die('fallo ' + gid);
});
fs.writeFileSync(gj, JSON.stringify(guides, null, 2));
console.log('\nBATCH 4 OK');