// best-grooveboxes: expand from 4 to 8 products
const fs = require('fs');
const G = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const P = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
const V = (value, value_es) => ({ value, value_es });
const W = (t) => ({ title: t, title_es: t });

const g = G.find(x => x.id === 'best-grooveboxes');

const currentTitles = g.productTable.columns.map(c => c.title);
const newProducts = [
  'Elektron Model:Samples',
  'Novation Circuit Rhythm',
  'Polyend Play',
  'Teenage Engineering OP-Z'
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
  V('Budget Elektron sampling/sequencing', 'Sampling/secuenciación Elektron presupuesto'),
  V('Sample-based groovebox, portable', 'Groovebox sample-based, portátil'),
  V('Playful grid sequencing, sampling', 'Secuenciación grid lúdica, sampling'),
  V('Ultra-portable, wireless, multimedia', 'Ultra-portátil, inalámbrico, multimedia')
]);
put('Sound Engine', [
  V('Sample playback + synthesis', 'Reproducción sample + síntesis'),
  V('Sample playback + synthesis', 'Reproducción sample + síntesis'),
  V('Sample playback + wavetable + FM', 'Reproducción sample + wavetable + FM'),
  V('Sample + FM + analog modeling', 'Sample + FM + modelado analógico')
]);
put('Tracks', [
  V('6 sample tracks + 6 MIDI', '6 pistas sample + 6 MIDI'),
  V('8 sample tracks + 8 MIDI', '8 pistas sample + 8 MIDI'),
  V('8 tracks (sample/synth)', '8 pistas (sample/synth)'),
  V('16 tracks (8 synth + 8 sample)', '16 pistas (8 synth + 8 sample)')
]);
put('Sequencer', [
  V('64-step, parameter locks, trig conditions', '64-paso, parameter locks, trig conditions'),
  V('32-step, probability, pattern chain', '32-paso, probabilidad, cadena patrones'),
  V('64-step, Euclidean, chance', '64-paso, Euclidiano, chance'),
  V('128-step, tape-style, chance', '128-paso, estilo cinta, chance')
]);
put('Effects', [
  V('Per-track FX, master send', 'FX por pista, master send'),
  V('Per-track FX, master', 'FX por pista, master'),
  V('Per-track FX, master, reverb/delay', 'FX por pista, master, reverb/delay'),
  V('Master FX, per-track send', 'Master FX, send por pista')
]);
put('Power', [
  V('USB-C', 'USB-C'),
  V('USB-C / Battery (6h)', 'USB-C / Bateria (6h)'),
  V('USB-C / Battery (5h)', 'USB-C / Bateria (5h)'),
  V('USB-C / Battery (8h)', 'USB-C / Bateria (8h)')
]);
put('Weight', [
  V('0.8 kg', '0.8 kg'),
  V('0.8 kg', '0.8 kg'),
  V('1.1 kg', '1.1 kg'),
  V('0.4 kg', '0.4 kg')
]);

const VD = (name, pros, cons, pros_es, cons_es) => ({ name, name_es: name, pros, cons, pros_es, cons_es });
g.verdictProsCons = [
  VD('Elektron Model:Cycles',
    ['Elektron sequencing at entry price', '6 FM tracks, parameter locks', 'CV/Gate out for modular', 'Compact, USB-C powered'],
    ['No sampling (FM only)', 'No touchscreen', 'Small screen'],
    ['Secuenciación Elektron precio entrada', '6 pistas FM, parameter locks', 'CV/Gate out modular', 'Compacto, USB-C'],
    ['Sin sampling (solo FM)', 'Sin pantalla táctil', 'Pantalla pequeña']),
  VD('Novation Circuit Tracks',
    ['8 tracks, sample + synth, polyphonic', 'Built-in battery, 4h portable', 'Probability, mutate, pattern chain', 'Great value, fun workflow'],
    ['No velocity-sensitive pads', 'Limited sound design vs Elektron', 'No CV/Gate'],
    ['8 pistas, sample + synth, polifónico', 'Bateria integrada, 4h portátil', 'Probabilidad, mutate, cadena patrones', 'Gran valor, flujo divertido'],
    ['Pads sin velocity', 'Diseño sonido limitado vs Elektron', 'Sin CV/Gate']),
  VD('Roland TR-8S',
    ['ACB analog + samples = best of both', 'SD card, probability, sub-step', '6 assignable outs', 'Roland sound quality'],
    ['Complex menus', 'No battery', 'Plastic build'],
    ['ACB analógico + samples = lo mejor ambos', 'SD card, probabilidad, sub-paso', '6 salidas asignables', 'Calidad sonido Roland'],
    ['Menús complejos', 'Sin bateria', 'Construcción plástico']),
  VD('Roland TR-6S',
    ['6 ACB models + samples, compact', 'Battery or USB powered', 'Probability, sub-step, groove', 'Great value for Roland sound'],
    ['Only 6 tracks', 'Small screen', 'Digital outs only'],
    ['6 modelos ACB + samples, compacto', 'Bateria o USB', 'Probabilidad, sub-paso, groove', 'Gran valor sonido Roland'],
    ['Solo 6 pistas', 'Pantalla pequeña', 'Solo salidas digitales']),
  VD('Elektron Model:Samples',
    ['Elektron sequencing + sampling, cheap', '6 sample tracks, parameter locks', 'CV/Gate, Overbridge ready', 'Sample slicing, timestretch'],
    ['No synthesis (sampling only)', 'Small screen', 'Mono outs'],
    ['Secuenciación Elektron + sampling barato', '6 pistas sample, parameter locks', 'CV/Gate, Overbridge ready', 'Sample slicing, timestretch'],
    ['Sin síntesis (solo sampling)', 'Pantalla pequeña', 'Salidas mono']),
  VD('Novation Circuit Rhythm',
    ['Sample-based, 8 tracks, battery', 'Probability, mutate, slice', 'MicroSD for samples', 'Fun, immediate workflow'],
    ['No velocity pads', 'No synth engine', 'No CV/Gate'],
    ['Basado en samples, 8 pistas, bateria', 'Probabilidad, mutate, slice', 'MicroSD para samples', 'Divertido, flujo inmediato'],
    ['Pads sin velocity', 'Sin motor síntesis', 'Sin CV/Gate']),
  VD('Polyend Play',
    ['8 tracks, sample + wavetable + FM', '64-step Euclidean, chance ops', 'Battery, 5h, USB-C', 'Playful grid = instant inspiration'],
    ['No velocity pads', 'No CV/Gate', 'Newer platform'],
    ['8 pistas, sample + wavetable + FM', '64-paso Euclidiano, chance ops', 'Bateria, 5h, USB-C', 'Grid lúdico = inspiración instantánea'],
    ['Pads sin velocity', 'Sin CV/Gate', 'Plataforma nueva']),
  VD('Teenage Engineering OP-Z',
    ['16 tracks, tape-style sequencer', 'Tiny, battery 8h, wireless', 'Multimedia: video, lights, DMX', 'Unique creative instrument'],
    ['Tiny keys/pads', 'No velocity', 'Steep learning curve', 'Expensive for size'],
    ['16 pistas, secuenciador estilo cinta', 'Pequeño, bateria 8h, inalámbrico', 'Multimedia: video, luces, DMX', 'Instrumento creativo único'],
    ['Teclas/pads minúsculos', 'Sin velocity', 'Curva aprendizaje pronunciada', 'Caro para tamaño'])
];

fs.writeFileSync('data/guides.json', JSON.stringify(G, null, 2));
console.log('best-grooveboxes: cols=' + g.productTable.columns.length + ' rows=' + g.productTable.rows.length + ' verdict=' + g.verdictProsCons.length);
console.log('Products:', g.productTable.columns.map(c => c.title).join(', '));