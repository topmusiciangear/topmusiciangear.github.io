const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const die = (m) => { console.log('!! ' + m); process.exit(1); };
const gj = BASE + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gj, 'utf8'));

// [guideId, indiceSeccion, headingEN, headingES]
const MAP = [
  // ---------------- starter-studio (10) ----------------
  ['starter-studio', 6, 'Sony MDR-7506: Closed-Back Truth When Monitors Stay Quiet', 'Sony MDR-7506: verdad cerrada cuando los monitores callan'],
  ['starter-studio', 7, 'Mogami Gold XLR: The Cable You Stop Debugging', 'Mogami Gold XLR: el cable que dejas de depurar'],
  ['starter-studio', 8, 'G4M Squarewave Panels: Killing Flutter Echo First', 'G4M Squarewave: el eco flutter que hay que atacar primero'],
  ['starter-studio', 9, 'Maono PD200X: One Mic, Two Exits, No Routing', 'Maono PD200X: un micro, dos salidas, sin enrutar'],
  ['starter-studio', 10, 'Behringer XM8500: The Live-Vocal Recipe, Cheaper', 'Behringer XM8500: la receta de voz en directo, más barata'],
  ['starter-studio', 11, 'SSL 2+ MKII: Console Character Without the Console', 'SSL 2+ MKII: carácter de mesa sin la mesa'],
  ['starter-studio', 12, 'Rode NT1 5th Generation: 4 dBA of Self-Noise', 'Rode NT1 5th Generation: 4 dBA de ruido propio'],
  ['starter-studio', 13, 'Aston Shield GN: Killing Plosives Mechanically', 'Aston Shield GN: los chasquidos resueltos a golpes'],
  ['starter-studio', 14, 'Yamaha HS8: Monitors That Refuse to Flatter You', 'Yamaha HS8: monitores que no te adulan'],
  ['starter-studio', 15, 'K&M 210/2: The Stand That Ends the Wobble', 'K&M 210/2: el soporte que acaba con el temblor'],

  // ---------------- mics-for-creators (10) ----------------
  ['mics-for-creators', 6, 'Shure MV7+: The Gain Knob That Fixes Itself', 'Shure MV7+: el botón de ganancia que se ajusta solo'],
  ['mics-for-creators', 7, 'Rode PodMic USB: Broadcast Tone Without an Interface', 'Rode PodMic USB: voz de radio sin interfaz'],
  ['mics-for-creators', 8, 'HyperX QuadCast 2: Four Patterns and a Lit Desktop', 'HyperX QuadCast 2: cuatro patrones y un escritorio que brilla'],
  ['mics-for-creators', 9, 'Elgato Wave:3: Built Around the Wave Link Software', 'Elgato Wave:3: construido alrededor del software Wave Link'],
  ['mics-for-creators', 10, 'Audio-Technica AT2020: The XLR-Only Reference', 'Audio-Technica AT2020: la referencia solo XLR'],
  ['mics-for-creators', 11, 'Samson Q2U: USB Now, XLR Later', 'Samson Q2U: USB ahora, XLR después'],
  ['mics-for-creators', 12, 'FIFINE AM8: A Dynamic That Ignores Keyboard Clicks', 'FIFINE AM8: un dinámico que ignora el teclado'],
  ['mics-for-creators', 13, 'Maono PM461: Just a Knob and a Mute Button', 'Maono PM461: solo un dial y un botón de silencio'],
  ['mics-for-creators', 14, 'TONOR TC-777: Plug-and-Play With No Drivers', 'TONOR TC-777: conectar y tocar, sin drivers'],
  ['mics-for-creators', 15, 'Blue Yeti: Three Capsules, Four Patterns', 'Blue Yeti: tres cápsulas, cuatro patrones'],

  // ---------------- portable-interfaces (9) ----------------
  ['portable-interfaces', 2, 'RME Babyface Pro FS: Drivers That Never Miss a Deadline', 'RME Babyface Pro FS: drivers que nunca fallan'],
  ['portable-interfaces', 3, 'Focusrite Scarlett 2i2 4th Gen: 69 dB of Gain and Air Mode', 'Focusrite Scarlett 2i2 4th Gen: 69 dB de ganancia y modo Air'],
  ['portable-interfaces', 4, 'Arturia MiniFuse 2 OTG: Recording Straight Into a Phone', 'Arturia MiniFuse 2 OTG: grabar directo en el móvil'],
  ['portable-interfaces', 5, 'SSL 2+ MKII: 4K Console Colour in a Backpack', 'SSL 2+ MKII: color de consola 4K en la mochila'],
  ['portable-interfaces', 6, 'Universal Audio Volt 2: Vintage Mode Without the Tube', 'Universal Audio Volt 2: modo vintage sin la válvula'],
  ['portable-interfaces', 7, 'Audient EVO 4: Smartgain Sets Levels While You Talk', 'Audient EVO 4: Smartgain ajusta el nivel mientras hablas'],
  ['portable-interfaces', 8, 'MOTU M2: The Full-Colour Meter Wins', 'MOTU M2: el medidor a color gana'],
  ['portable-interfaces', 9, 'Universal Audio Volt 276: The Volt 2 With a Built-In FET Compressor', 'Universal Audio Volt 276: el Volt 2 con compresor FET integrado'],
  ['portable-interfaces', 10, 'Audient iD14 MkII: Class-A Console Preamps, Bus-Powered', 'Audient iD14 MkII: preamplificadores de consola, alimentado por USB'],

  // ---------------- best-electric-guitar (9) ----------------
  ['best-electric-guitar', 4, 'Strandberg Boden Essential 6: 5.6 lb That Ends Neck Dive', 'Strandberg Boden Essential 6: 1,1 kg para que no te duela el hombro'],
  ['best-electric-guitar', 5, 'Ibanez AZ2402 Prestige: Ten Voices From One Switch', 'Ibanez AZ2402 Prestige: diez voces de un solo selector'],
  ['best-electric-guitar', 6, 'ESP E-II Eclipse DB: EMG Silence for Home Recording', 'ESP E-II Eclipse DB: el silencio de EMG para grabar en casa'],
  ['best-electric-guitar', 7, 'Yamaha Pacifica 112V: The HSS Workhorse for Demos', 'Yamaha Pacifica 112V: el todoterreno HSS para demos'],
  ['best-electric-guitar', 8, 'PRS SE Custom 24: Coil-Split Push-Pull Tones', 'PRS SE Custom 24: tonos con push-pull y coil-split'],
  ['best-electric-guitar', 9, "Squier Classic Vibe '50s Strat: Vintage Look, Synchronized Trem", "Squier Classic Vibe '50s Strat: look vintage, trémolo sincronizado"],
  ['best-electric-guitar', 10, 'Fender Player II Jazzmaster: Warm Offsets With a Floating Trem', 'Fender Player II Jazzmaster: offsets cálidos con trémolo flotante'],
  ['best-electric-guitar', 11, "Gibson Les Paul Standard '60s: The Burst That Never Sits Still", "Gibson Les Paul Standard '60s: el burst que nunca se queda quieto"],
  ['best-electric-guitar', 12, 'Enya Nova Go Sonic: A Carbon-Fibre Guitar With a Speaker', 'Enya Nova Go Sonic: una guitarra de fibra de carbono con altavoz']
];

const TPL = ['A Closer Look', 'análisis detallado', 'In Depth', 'Deep Dive', 'Más de cerca'];
let done = 0;
MAP.forEach(([gid, idx, en, es]) => {
  const g = guides.find(x => x.id === gid);
  if (!g) die('guia no existe: ' + gid);
  const s = (g.sections || [])[idx];
  if (!s) die('seccion ' + idx + ' no existe en ' + gid);
  const cur = s.heading || s.h || '';
  if (!TPL.some(t => cur.toLowerCase().includes(t.toLowerCase()))) {
    die('"' + cur + '" no es un encabezado de plantilla (ya cambiado?)');
  }
  s.heading = en;
  s.heading_es = es;
  done++;
});
console.log('encabezados reescritos: ' + done + '/' + MAP.length);

// verificacion de unicidad en las 4 guias
['starter-studio', 'mics-for-creators', 'portable-interfaces', 'best-electric-guitar'].forEach(gid => {
  const g = guides.find(x => x.id === gid);
  const hs = g.sections.map(s => s.heading);
  const uniq = new Set(hs).size === hs.length;
  const esOk = g.sections.every(s => !s.heading || s.heading_es);
  const tplLeft = g.sections.filter(s => TPL.some(t => (s.heading || '').toLowerCase().includes(t.toLowerCase()))).length;
  console.log('  ' + gid + ': ' + hs.length + ' secciones | unicos=' + uniq + ' | heading_es completo=' + esOk + ' | plantilla restante=' + tplLeft);
  if (!uniq || !esOk || tplLeft) die('fallo en ' + gid);
});

fs.writeFileSync(gj, JSON.stringify(guides, null, 2));
console.log('\nBATCH 1 OK');