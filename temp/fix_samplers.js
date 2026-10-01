// best-samplers-drum-computers: expand from 3 to 8 products
const fs = require('fs');
const G = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const P = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
const V = (value, value_es) => ({ value, value_es });
const W = (t) => ({ title: t, title_es: t });

const g = G.find(x => x.id === 'best-samplers-drum-computers');

const currentTitles = g.productTable.columns.map(c => c.title);
const newProducts = [
  'Elektron Digitakt II',
  'Akai MPC Live II',
  'Polyend Tracker',
  'Roland SP-404 MKII',
  'Native Instruments Maschine+'
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
  V('Modern sampling, sequencing, Overbridge', 'Sampling moderno, secuenciación, Overbridge'),
  V('Standalone MPC workflow, 16 GB', 'Flujo MPC standalone, 16 GB'),
  V('Tracker workflow, sampling, performance', 'Flujo tracker, sampling, directo'),
  V('Lo-fi sampling, effects, performance', 'Sampling lo-fi, efectos, directo'),
  V('Standalone + controller hybrid', 'Híbrido standalone + controlador')
]);
put('Type', [
  V('Sampler / Sequencer', 'Sampler / Secuenciador'),
  V('Standalone MPC / Sampler', 'MPC Standalone / Sampler'),
  V('Tracker / Sampler', 'Tracker / Sampler'),
  V('Sampler / Effects Processor', 'Sampler / Procesador Efectos'),
  V('Standalone Sampler / Controller', 'Sampler Standalone / Controlador')
]);
put('Tracks', [
  V('8 audio + 8 MIDI tracks', '8 audio + 8 MIDI pistas'),
  V('16 audio + 128 MIDI tracks', '16 audio + 128 MIDI pistas'),
  V('8 sample tracks', '8 pistas sample'),
  V('16 sample tracks', '16 pistas sample'),
  V('8 groups x 16 pads = 128 sounds', '8 grupos x 16 pads = 128 sonidos')
]);
put('Sample Memory', [
  V('1 GB + Overbridge streaming', '1 GB + streaming Overbridge'),
  V('16 GB internal', '16 GB interno'),
  V('8 GB internal', '8 GB interno'),
  V('16 GB internal (SD card)', '16 GB interno (SD card)'),
  V('16 GB internal', '16 GB interno')
]);
put('Sequencer', [
  V('64-step, parameter locks, trig conditions', '64 pasos, parameter locks, trig conditions'),
  V('128-track, 64-step, pad perform', '128-pista, 64-paso, perform pads'),
  V('Tracker pattern sequencer', 'Secuenciador patrón tracker'),
  V('16-step, pattern chaining', '16-paso, encadenado patrones'),
  V('64-step, scenes, lock snapshots', '64-paso, escenas, lock snapshots')
]);
put('Effects', [
  V('Per-track FX, master send/insert', 'FX por pista, master send/insert'),
  V('Per-pad FX, master bus', 'FX por pad, bus master'),
  V('Reverb, delay, chorus, filter', 'Reverb, delay, chorus, filtro'),
  V('12 effects per pattern, DJ FX', '12 efectos por patrón, DJ FX'),
  V('Per-group FX, master bus', 'FX por grupo, bus master')
]);
put('Audio I/O', [
  V('2 in / 4 out + Headphones', '2 in / 4 out + Auriculares'),
  V('2 in / 6 out + Headphones', '2 in / 6 out + Auriculares'),
  V('1 in / 2 out + Headphones', '1 in / 2 out + Auriculares'),
  V('2 in / 2 out + Headphones', '2 in / 2 out + Auriculares'),
  V('2 in / 2 out + Headphones', '2 in / 2 out + Auriculares')
]);
put('Connectivity', [
  V('USB, MIDI I/O, CV/Gate, Overbridge', 'USB, MIDI I/O, CV/Gate, Overbridge'),
  V('USB, MIDI I/O, CV/Gate, WiFi', 'USB, MIDI I/O, CV/Gate, WiFi'),
  V('USB, MIDI I/O, CV/Gate, SD', 'USB, MIDI I/O, CV/Gate, SD'),
  V('USB, MIDI I/O, SD card', 'USB, MIDI I/O, SD card'),
  V('USB, MIDI I/O, WiFi, Bluetooth', 'USB, MIDI I/O, WiFi, Bluetooth')
]);
put('Weight', [
  V('1.1 kg', '1.1 kg'),
  V('2.2 kg', '2.2 kg'),
  V('0.6 kg', '0.6 kg'),
  V('0.5 kg', '0.5 kg'),
  V('1.8 kg', '1.8 kg')
]);

const VD = (name, pros, cons, pros_es, cons_es) => ({ name, name_es: name, pros, cons, pros_es, cons_es });
g.verdictProsCons = [
  VD('Akai MPC One G2',
    ['Standalone MPC, no computer needed', '16 GB, WiFi, Bluetooth, touchscreen', '16 velocity pads, plugin synths', 'Great value for standalone'],
    ['Single stereo out', 'Fan noise', 'Menu diving'],
    ['MPC standalone, sin PC', '16 GB, WiFi, Bluetooth, táctil', '16 pads velocity, plugins sintes', 'Gran valor standalone'],
    ['Solo salida estéreo', 'Ruido ventilador', 'Menu diving']),
  VD('Roland TR-8S',
    ['ACB modeling + samples = versatile', 'SD card for user samples', 'Probability, sub-step, 6 assignable outs', 'Roland sound quality'],
    ['Complex menus', 'No battery', 'Plastic build'],
    ['Modelado ACB + samples = versátil', 'SD card samples usuario', 'Probabilidad, sub-paso, 6 salidas asignables', 'Calidad sonido Roland'],
    ['Menús complejos', 'Sin bateria', 'Construcción plástico']),
  VD('Elektron Digitakt II',
    ['8 audio + 8 MIDI tracks, Overbridge', 'Parameter locks, trig conditions = deep', '1 GB + streaming, CV/Gate', 'Elektron sequencer = best in class'],
    ['No touchscreen', 'Stereo out only', 'Steep learning curve'],
    ['8 audio + 8 MIDI pistas, Overbridge', 'Parameter locks, trig conditions = profundo', '1 GB + streaming, CV/Gate', 'Secuenciador Elektron = mejor clase'],
    ['Sin pantalla táctil', 'Solo salida estéreo', 'Curva aprendizaje pronunciada']),
  VD('Akai MPC Live II',
    ['16 audio tracks, 16 GB, battery', 'WiFi, Bluetooth, 7" touchscreen', '16 pads, standalone + controller', 'Speaker for sketching'],
    ['Heavy (2.2 kg)', 'Single stereo out', 'Expensive'],
    ['16 pistas audio, 16 GB, bateria', 'WiFi, Bluetooth, 7" táctil', '16 pads, standalone + controlador', 'Altavoz para bocetos'],
    ['Pesado (2.2 kg)', 'Solo salida estéreo', 'Caro']),
  VD('Polyend Tracker',
    ['Tracker workflow = unique creativity', '8 tracks, sampling, slicing, synthesis', 'SD card, USB-C, CV/Gate', 'Performance mode, chance ops'],
    ['Vertical screen unusual', 'No analog synth', 'Learning curve for trackers'],
    ['Flujo tracker = creatividad única', '8 pistas, sampling, slicing, síntesis', 'SD card, USB-C, CV/Gate', 'Modo directo, chance ops'],
    ['Pantalla vertical inusual', 'Sin synth analógico', 'Curva aprendizaje trackers']),
  VD('Roland SP-404 MKII',
    ['16 sample tracks, 16 GB SD', '12 FX per pattern + DJ FX looper', 'Skip back sampling, resample', 'Iconic lo-fi workflow'],
    ['No MIDI sequencing', 'Small screen', 'No velocity-sensitive pads'],
    ['16 pistas sample, 16 GB SD', '12 FX patrón + DJ FX looper', 'Skip back sampling, resample', 'Flujo lo-fi icónico'],
    ['Sin secuenciación MIDI', 'Pantalla pequeña', 'Pads sin velocity']),
  VD('Native Instruments Maschine+',
    ['Standalone + controller in one', '16 GB, WiFi, Bluetooth', '8 groups x 16 pads, lock snapshots', 'Massive factory library'],
    ['Expensive', 'Fan noise', 'Software ecosystem lock-in'],
    ['Standalone + controlador en uno', '16 GB, WiFi, Bluetooth', '8 grupos x 16 pads, lock snapshots', 'Librería fábrica masiva'],
    ['Caro', 'Ruido ventilador', 'Bloqueo ecosistema software'])
];

fs.writeFileSync('data/guides.json', JSON.stringify(G, null, 2));
console.log('best-samplers-drum-computers: cols=' + g.productTable.columns.length + ' rows=' + g.productTable.rows.length + ' verdict=' + g.verdictProsCons.length);
console.log('Products:', g.productTable.columns.map(c => c.title).join(', '));