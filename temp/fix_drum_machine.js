// best-drum-machine: expand from 3 to 8 products
const fs = require('fs');
const G = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const P = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
const V = (value, value_es) => ({ value, value_es });
const W = (t) => ({ title: t, title_es: t });

const g = G.find(x => x.id === 'best-drum-machine');

const currentTitles = g.productTable.columns.map(c => c.title);
const newProducts = [
  'Arturia DrumBrute Impact',
  'Korg Volca Beats',
  'Behringer RD-8',
  'Elektron Analog Rytm MKII',
  'Polyend Tracker'
];

newProducts.forEach(t => {
  if (!currentTitles.includes(t)) {
    g.productTable.columns.push(W(t));
    currentTitles.push(t);
  }
});

const rows = {};
g.productTable.rows.forEach(r => { rows[r.label] = r; });
const put = (label, arr) => rows[label].values.push(...arr);

put('Best For', [
  V('Analog drum machine, performance', 'Máquina bateria analógica, directo'),
  V('Budget analog kick/snare/hats', 'Kick/snare/hats analógico presupuesto'),
  V('808 clone, authentic Roland sound', 'Clon 808, sonido Roland auténtico'),
  V('High-end analog + sampling hybrid', 'Híbrido analógico + sampling alta gama'),
  V('Tracker workflow, sampling, performance', 'Flujo tracker, sampling, directo')
]);
put('Type', [
  V('Analog Drum Machine', 'Máquina Bateria Analógica'),
  V('Analog Drum Machine', 'Máquina Bateria Analógica'),
  V('Analog Drum Machine (808 clone)', 'Máquina Bateria Analógica (clon 808)'),
  V('Analog/Digital Hybrid', 'Híbrido Analógico/Digital'),
  V('Tracker / Sampler', 'Tracker / Sampler')
]);
put('Tracks', [
  V('10 tracks (8 synth + 1 sample + 1 FM)', '10 pistas (8 synth + 1 sample + 1 FM)'),
  V('6 analog tracks', '6 pistas analógicas'),
  V('16 tracks (11 analog + 5 sample)', '16 pistas (11 analógicas + 5 sample)'),
  V('12 analog + 8 sample tracks', '12 analógicas + 8 sample'),
  V('8 tracks (sample-based)', '8 pistas (basadas en samples)')
]);
put('Sound Engine', [
  V('Analog synthesis + PCM samples', 'Síntesis analógica + samples PCM'),
  V('Analog synthesis', 'Síntesis analógica'),
  V('Analog (808 circuit replica)', 'Analógico (réplica circuito 808)'),
  V('Analog circuits + digital sampling', 'Circuitos analógicos + sampling digital'),
  V('Sample playback + synthesis', 'Reproducción sample + síntesis')
]);
put('Sequencer', [
  V('64-step, polyrhythms, probability', '64 pasos, polirritmos, probabilidad'),
  V('16-step, motion sequence', '16 pasos, motion sequence'),
  V('64-step, pattern chaining', '64 pasos, encadenado patrones'),
  V('64-step, parameter locks, scenes', '64 pasos, parameter locks, escenas'),
  V('Tracker pattern sequencer', 'Secuenciador patrón tracker')
]);
put('Sample Storage', [
  V('128 MB user samples', '128 MB samples usuario'),
  V('None (synthesis only)', 'Ninguno (solo síntesis)'),
  V('7.5 MB samples', '7.5 MB samples'),
  V('1 GB + drive', '1 GB + disco'),
  V('8 GB internal', '8 GB interno')
]);
put('Effects', [
  V('Distortion, stutter, randomizer', 'Distorsión, stutter, aleatorizador'),
  V('None', 'Ninguno'),
  V('Compression, distortion', 'Compresión, distorsión'),
  V('Drive, compression, delay, reverb', 'Drive, compresión, delay, reverb'),
  V('Reverb, delay, chorus, filter', 'Reverb, delay, chorus, filtro')
]);
put('Connectivity', [
  V('USB, MIDI I/O, CV/Gate, Sync', 'USB, MIDI I/O, CV/Gate, Sync'),
  V('USB, MIDI I/O, Sync', 'USB, MIDI I/O, Sync'),
  V('USB, MIDI I/O, CV/Gate, Sync', 'USB, MIDI I/O, CV/Gate, Sync'),
  V('USB, MIDI I/O, CV/Gate, ADAT', 'USB, MIDI I/O, CV/Gate, ADAT'),
  V('USB, MIDI I/O, CV/Gate, SD card', 'USB, MIDI I/O, CV/Gate, SD card')
]);
put('Power', [
  V('9V DC', '9V DC'),
  V('9V DC / USB', '9V DC / USB'),
  V('9V DC', '9V DC'),
  V('12V DC', '12V DC'),
  V('USB-C', 'USB-C')
]);
put('Weight', [
  V('2.1 kg', '2.1 kg'),
  V('0.4 kg', '0.4 kg'),
  V('1.8 kg', '1.8 kg'),
  V('2.5 kg', '2.5 kg'),
  V('0.6 kg', '0.6 kg')
]);

const VD = (name, pros, cons, pros_es, cons_es) => ({ name, name_es: name, pros, cons, pros_es, cons_es });
g.verdictProsCons = [
  VD('Roland TR-6S',
    ['6 ACB analog models + samples', 'Compact, battery or USB powered', 'Probability, sub-step, groove', 'Great value for Roland sound'],
    ['Only 6 tracks', 'Small screen', 'No analog outputs (digital only)'],
    ['6 modelos ACB analógicos + samples', 'Compacto, bateria o USB', 'Probabilidad, sub-paso, groove', 'Gran valor por sonido Roland'],
    ['Solo 6 pistas', 'Pantalla pequeña', 'Sin salidas analógicas (solo digital)']),
  VD('Akai MPC One G2',
    ['Standalone MPC workflow, no computer needed', '16 GB storage, WiFi, Bluetooth', 'Touchscreen, 16 velocity pads', 'Plugin synths (Mellotron, etc.)'],
    ['Single stereo out (no multitrack audio)', 'Fan can be audible', 'Menu diving for deep edit'],
    ['Flujo MPC standalone, sin PC', '16 GB, WiFi, Bluetooth', 'Pantalla táctil, 16 pads velocity', 'Sintetizadores plugins (Mellotron, etc.)'],
    ['Solo salida estéreo (sin multitrack audio)', 'Ventilador audible', 'Menu diving edición profunda']),
  VD('Roland TR-8S',
    ['11 ACB models + 400+ samples', 'SD card for user samples', 'Probability, sub-step, last step', 'Stereo outs + 6 assignable outs'],
    ['Complex menu system', 'No battery option', 'Plastic build'],
    ['11 modelos ACB + 400+ samples', 'SD card samples usuario', 'Probabilidad, sub-paso, last step', 'Salidas estéreo + 6 asignables'],
    ['Sistema menús complejo', 'Sin opción bateria', 'Construcción plástico']),
  VD('Arturia DrumBrute Impact',
    ['10 analog tracks, distinct character', 'Performance-focused: roller, looper, random', 'CV/Gate for modular integration', 'Great price for analog'],
    ['No sample playback', 'Fixed analog voices (no editing)', 'No MIDI over USB (only DIN)'],
    ['10 pistas analógicas, carácter distinto', 'Enfoque directo: roller, looper, random', 'CV/Gate integración modular', 'Gran precio para analógico'],
    ['Sin reproducción samples', 'Voces analógicas fijas (sin edición)', 'Sin MIDI por USB (solo DIN)']),
  VD('Korg Volca Beats',
    ['Authentic analog kick/snare/hats', 'Tiny, battery, super portable', '16-step sequencer, motion sequence', 'Insanely affordable'],
    ['Only 6 tracks', 'No MIDI over USB', 'Limited sound palette'],
    ['Kick/snare/hats analógico auténtico', 'Pequeño, bateria, ultra-portable', 'Secuenciador 16 pasos, motion sequence', 'Increíblemente asequible'],
    ['Solo 6 pistas', 'Sin MIDI por USB', 'Paleta sonora limitada']),
  VD('Behringer RD-8',
    ['Faithful 808 circuit replica', 'Analog filter, wave designer', '64-step sequencer, pattern chain', 'Fraction of vintage 808 price'],
    ['Build quality not Roland-level', 'No USB (MIDI DIN only)', 'Can be noisy'],
    ['Réplica fiel circuito 808', 'Filtro analógico, wave designer', 'Secuenciador 64 pasos, cadena patrones', 'Fracción precio 808 vintage'],
    ['Calidad construcción no nivel Roland', 'Sin USB (solo MIDI DIN)', 'Puede ser ruidoso']),
  VD('Elektron Analog Rytm MKII',
    ['12 analog + 8 sample tracks = best of both', 'Parameter locks, scenes, performance mode', 'Overbridge = DAW integration', 'Legendary sound quality'],
    ['Very expensive', 'Steep learning curve', 'Large footprint'],
    ['12 analógicas + 8 sample = lo mejor ambos mundos', 'Parameter locks, escenas, modo directo', 'Overbridge = integración DAW', 'Calidad sonido legendaria'],
    ['Muy caro', 'Curva aprendizaje pronunciada', 'Huella grande']),
  VD('Polyend Tracker',
    ['Tracker workflow = unique creative approach', '8 tracks, sampling, slicing, synthesis', 'SD card, USB-C, CV/Gate', 'Performance mode, chance operations'],
    ['Vertical screen orientation unusual', 'No analog synthesis', 'Learning curve if new to trackers'],
    ['Flujo tracker = enfoque creativo único', '8 pistas, sampling, slicing, síntesis', 'SD card, USB-C, CV/Gate', 'Modo directo, operaciones chance'],
    ['Orientación pantalla vertical inusual', 'Sin síntesis analógica', 'Curva aprendizaje si nuevo en trackers'])
];

fs.writeFileSync('data/guides.json', JSON.stringify(G, null, 2));
console.log('best-drum-machine: cols=' + g.productTable.columns.length + ' rows=' + g.productTable.rows.length + ' verdict=' + g.verdictProsCons.length);
console.log('Products:', g.productTable.columns.map(c => c.title).join(', '));