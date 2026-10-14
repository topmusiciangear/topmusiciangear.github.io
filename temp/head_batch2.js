const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const die = (m) => { console.log('!! ' + m); process.exit(1); };
const gj = BASE + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gj, 'utf8'));

const MAP = [
  // ---------------- best-compact-mixers (8) ----------------
  ['best-compact-mixers', 1, 'Behringer X32 Rack: The IEM Standard, Now in 3U', 'Behringer X32 Rack: el estándar de los cascos, ahora en 3U'],
  ['best-compact-mixers', 2, 'Soundcraft Ui24R: A Browser Is the Only Screen You Need', 'Soundcraft Ui24R: un navegador es la única pantalla que necesitas'],
  ['best-compact-mixers', 3, 'Behringer WING Rack: 48 Channels and a Tilting Touchscreen', 'Behringer WING Rack: 48 canales y pantalla táctil abatible'],
  ['best-compact-mixers', 4, 'Allen & Heath SQ-Rack: Touring Audio With No Faders', 'Allen & Heath SQ-Rack: audio de gira sin faders'],
  ['best-compact-mixers', 5, 'Behringer XR18: A Full Band Recorded for Less Than the Board', 'Behringer XR18: una banda entera grabada por menos que la mesa'],
  ['best-compact-mixers', 6, 'Midas M32C: The Whole M32 With No Front Panel', 'Midas M32C: el M32 entero sin panel frontal'],
  ['best-compact-mixers', 7, 'Allen & Heath CQ-20B: The Stagebox That Mixes Itself', 'Allen & Heath CQ-20B: la caja de escenario que se mezcla sola'],
  ['best-compact-mixers', 8, 'PreSonus StudioLive SE 24R: Mixer and Stagebox in One Box', 'PreSonus StudioLive SE 24R: mezcladora y caja de escenario en una'],

  // ---------------- guitar-pedals (7) ----------------
  ['guitar-pedals', 2, 'Ibanez TS9: The Midrange That Refuses to Disappear', 'Ibanez TS9: los medios que se niegan a desaparecer'],
  ['guitar-pedals', 3, 'Boss DD-8: Eleven Delay Modes and 40 Seconds of Looper', 'Boss DD-8: once modos de delay y 40 segundos de looper'],
  ['guitar-pedals', 4, 'Dunlop GCB95 Crybaby: Put Your Foot Back in the Sentence', 'Dunlop GCB95 Crybaby: vuelve a poner el pie en la frase'],
  ['guitar-pedals', 5, 'TC Electronic Hall of Fame 2: Room Tone From the First Position', 'TC Electronic Hall of Fame 2: sala desde la primera posición'],
  ['guitar-pedals', 6, 'MXR Phase 95: Four Phase Voices in a Mini Housing', 'MXR Phase 95: cuatro fases en formato mini'],
  ['guitar-pedals', 7, 'Strymon BigSky MX: Sixteen Spaces That Stay Wide', 'Strymon BigSky MX: dieciséis espacios que no se cierran en mono'],
  ['guitar-pedals', 8, 'Electro-Harmonix Nano Small Stone: Phase With Two Knobs', 'Electro-Harmonix Nano Small Stone: fase con dos diales'],

  // ---------------- daw-guide (6) ----------------
  ['daw-guide', 2, 'Ableton Live 12 Suite: Clips That Become Tracks', 'Ableton Live 12 Suite: los clips se convierten en pistas'],
  ['daw-guide', 3, 'FL Studio Producer Edition: A Pattern Is the Starting Point', 'FL Studio Producer Edition: el patrón es el punto de partida'],
  ['daw-guide', 4, 'Avid Pro Tools Studio: Built Around the Edit, Not the Loop', 'Avid Pro Tools Studio: construido alrededor de la edición, no del loop'],
  ['daw-guide', 5, 'Steinberg Cubase Pro 15: Scoring and MixConsole in One', 'Steinberg Cubase Pro 15: partitura y MixConsole en uno'],
  ['daw-guide', 6, 'Logic Pro: The Whole Mac Studio in One Install', 'Logic Pro: todo el estudio Mac en una instalación'],
  ['daw-guide', 7, 'Reason 14: Cables on Screen, Patch Bay Included', 'Reason 14: cables a la vista, con patchbay incluida'],

  // ---------------- best-beginner-electric-guitar (6) ----------------
  ['best-beginner-electric-guitar', 5, 'Yamaha Pacifica 112V: Three Pickups, One First Year', 'Yamaha Pacifica 112V: tres pastillas, un primer año'],
  ['best-beginner-electric-guitar', 6, 'Squier Affinity Strat: Setup Matters More Than Specs', 'Squier Affinity Strat: el ajuste importa más que las specs'],
  ['best-beginner-electric-guitar', 7, 'Ibanez Gio GRG121DX: The Fixed-Bridge Shortcut to Riffs', 'Ibanez Gio GRG121DX: el atajo de puente fijo para riffs'],
  ['best-beginner-electric-guitar', 8, 'Epiphone Les Paul Special-II: The Cheap Way Into a Les Paul', 'Epiphone Les Paul Special-II: la vía barata a un Les Paul'],
  ['best-beginner-electric-guitar', 9, 'Jet Guitars JS-300: Roasted Maple Neck, Unfamiliar Name', 'Jet Guitars JS-300: mástil de maple tostado, nombre desconocido'],
  ['best-beginner-electric-guitar', 10, 'Enya Nova Go Sonic: A Guitar With Amp, Speaker and Backing Tracks', 'Enya Nova Go Sonic: una guitarra con amplificador, altavoz y pistas']
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

['best-compact-mixers', 'guitar-pedals', 'daw-guide', 'best-beginner-electric-guitar'].forEach(gid => {
  const g = guides.find(x => x.id === gid);
  const hs = g.sections.map(s => s.heading);
  const uniq = new Set(hs).size === hs.length;
  const esOk = g.sections.every(s => !s.heading || s.heading_es);
  const left = g.sections.filter(s => TPL.some(t => (s.heading || '').toLowerCase().includes(t.toLowerCase()))).length;
  console.log('  ' + gid + ': ' + hs.length + ' | unicos=' + uniq + ' | ES ok=' + esOk + ' | plantilla=' + left);
  if (!uniq || !esOk || left) die('fallo ' + gid);
});
fs.writeFileSync(gj, JSON.stringify(guides, null, 2));
console.log('\nBATCH 2 OK');