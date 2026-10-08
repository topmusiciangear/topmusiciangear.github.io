const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(DIR + 'data/guides.json', 'utf8'));
const samp = guides.find(x => x.title === 'Best Samplers & Beat Making: Complete Guide');

const C = (en, es) => ({ title: en, title_es: es || en });
const V = (en, es) => ({ value: en, value_es: es || en });
samp.productTable = {
  title: 'Best Samplers & Beat-Making Machines Compared in This Guide',
  title_es: 'Los mejores samplers y máquinas de beats comparados en esta guía',
  columns: [
    C('Akai MPC One G2'), C('Elektron Digitakt II'), C('Akai MPC Live III'),
    C('Roland SP-404MKII'), C('Native Instruments Maschine+'),
    C('Teenage Engineering EP-133 K.O. II'), C('Akai MPC Key 37'),
    C('Roland Aira Compact P-6'), C('Novation Circuit Rhythm'), C('Akai MPC X SE')
  ],
  rows: [
    { label: 'Best For', label_es: 'Ideal para', values: [
      V('Song production and deep editing at best entry value', 'Producción de canciones y edición honda al mejor valor de entrada'),
      V('Deep stereo sound design and complex rhythms', 'Diseño estéreo profundo y ritmos complejos'),
      V('Mobile production with Stems and 3D expression', 'Producción móvil con Stems y expresión 3D'),
      V('Live performance, resampling and lo-fi beats', 'Directo, resampling y beats lo-fi'),
      V('Standalone integration for NI ecosystem fans', 'Integración autónoma para fans del ecosistema NI'),
      V('Fast pocket sketching and punch-in performance FX', 'Bocetos rápidos de bolsillo y punch-in en vivo'),
      V('Keyboard-centric beatmakers and synth control', 'Beat-makers de teclado y control de sintes'),
      V('Micro-sampling, granular soundscapes and travel', 'Micro-sampling, paisajes granulares y viaje'),
      V('Grid-based intuitive sampling and DAWless jams', 'Sampling intuitivo en rejilla y jams DAWless'),
      V('Flagship studio centerpiece and hardware routing', 'Pieza central insignia y ruteo hardware')
    ]},
    { label: 'Estimated Price', label_es: 'Precio estimado', values: [
      V('$799'), V('$999'), V('$1,699'), V('$499'), V('$999'), V('$299'), V('$799'), V('$269'), V('$399'), V('$2,499')
    ]},
    { label: 'Type', label_es: 'Tipo', values: [
      V('Standalone Workstation', 'Estación autónoma'),
      V('Stereo Drum Computer / Groovebox', 'Caja de ritmos estéreo / Groovebox'),
      V('Portable Standalone Workstation', 'Estación autónoma portátil'),
      V('Creative Sampler / Effector', 'Sampler creativo / Efectos'),
      V('Standalone Groovebox / Controller', 'Groovebox autónoma / Controlador'),
      V('Pocket Sampler / Composer', 'Sampler de bolsillo / Compositor'),
      V('Standalone Keyboard Workstation', 'Estación autónoma de teclado'),
      V('Ultra-Portable Granular Sampler', 'Sampler granular ultraportátil'),
      V('Standalone Sample Groovebox', 'Groovebox de samples autónoma'),
      V('Premium Standalone Studio Hub', 'Hub de estudio autónomo premium')
    ]},
    { label: 'Tracks', label_es: 'Pistas', values: [
      V('32 plugin + 16 stereo audio', '32 de plugin + 16 de audio estéreo'),
      V('16 stereo audio or MIDI', '16 de audio estéreo o MIDI'),
      V('32 plugin + 16 stereo audio', '32 de plugin + 16 de audio estéreo'),
      V('160 samples per project', '160 samples por proyecto'),
      V('8 groups x 16 pads', '8 grupos x 16 pads'),
      V('4 groups x 99 patterns', '4 grupos x 99 patrones'),
      V('8 plugin + 8 stereo audio', '8 de plugin + 8 de audio estéreo'),
      V('48 samples (8 banks x 6 pads)', '48 samples (8 bancos x 6 pads)'),
      V('8 monophonic audio tracks', '8 pistas de audio monofónicas'),
      V('32 plugin + 16 stereo audio', '32 de plugin + 16 de audio estéreo')
    ]},
    { label: 'Sample Memory', label_es: 'Memoria de samples', values: [
      V('4 GB RAM / 64 GB storage', '4 GB RAM / 64 GB almacenamiento'),
      V('400 MB RAM / 20 GB storage', '400 MB RAM / 20 GB almacenamiento'),
      V('8 GB RAM / 128 GB storage', '8 GB RAM / 128 GB almacenamiento'),
      V('16 GB internal + SD card', '16 GB internos + tarjeta SD'),
      V('4 GB RAM / 32 GB + 64 GB SD', '4 GB RAM / 32 GB + SD de 64 GB'),
      V('128 MB internal (999 slots)', '128 MB internos (999 slots)'),
      V('2 GB RAM / 32 GB storage', '2 GB RAM / 32 GB almacenamiento'),
      V('285 s mono total (140 s stereo)', '285 s mono total (140 s estéreo)'),
      V('228 s per pack + microSD', '228 s por pack + microSD'),
      V('4 GB RAM / 48 GB + SATA bay', '4 GB RAM / 48 GB + bahía SATA')
    ]},
    { label: 'Sequencer', label_es: 'Secuenciador', values: [
      V('Linear arranger / step', 'Arreglo lineal / pasos'),
      V('128-step with p-locks and Euclidean', '128 pasos con p-locks y euclidiano'),
      V('Linear arranger / step / clip matrix', 'Arreglo lineal / pasos / matriz de clips'),
      V('Real-time loop / TR-REC step', 'Loop en vivo / pasos TR-REC'),
      V('Pattern / clip-based', 'Por patrones / clips'),
      V('Multi-track step / real-time', 'Multipista por pasos / en vivo'),
      V('Linear arranger / step / clip matrix', 'Arreglo lineal / pasos / matriz de clips'),
      V('64-step with probability and sub-steps', '64 pasos con probabilidad y sub-pasos'),
      V('32-step grid with micro-timing', 'Rejilla de 32 pasos con micro-timing'),
      V('Linear arranger / step / clip matrix', 'Arreglo lineal / pasos / matriz de clips')
    ]},
    { label: 'Effects', label_es: 'Efectos', values: [
      V('MPC FX rack insert chains', 'Cadenas de inserción MPC FX'),
      V('Overdrive, bit reduction, delay, reverb, chorus, master comp', 'Overdrive, reducción de bits, delay, reverb, chorus, comp master'),
      V('MPC3 Pro FX pack, XYFX', 'Pack MPC3 Pro FX, XYFX'),
      V('41 multi-FX + 17 input FX (Vinyl Sim, DJFX, Vocoder)', '41 multi-FX + 17 de entrada (Vinyl Sim, DJFX, Vocoder)'),
      V('Factory FX (Raum, Phasis and more)', 'FX de fábrica (Raum, Phasis y más)'),
      V('6 master FX + 12 punch-in FX', '6 master FX + 12 punch-in FX'),
      V('MPC FX rack insert chains', 'Cadenas de inserción MPC FX'),
      V('Granular engine, 20 MFX, Vinyl Sim', 'Motor granular, 20 MFX, Vinyl Sim'),
      V('Grid FX, delay and reverb sends', 'Grid FX, envíos de delay y reverb'),
      V('Full MPC premium FX suite', 'Suite premium completa MPC FX')
    ]},
    { label: 'Audio I/O', label_es: 'Audio E/S', values: [
      V('2x 1/4" in, 2x 1/4" out, headphone', '2x 1/4" entrada, 2x 1/4" salida, auriculares'),
      V('2x 1/4" in, 2x 1/4" out, headphone', '2x 1/4" entrada, 2x 1/4" salida, auriculares'),
      V('2x XLR/TRS combo in, RCA in, 6x 1/4" out, headphone', '2x XLR/TRS combo entrada, RCA entrada, 6x 1/4" salida, auriculares'),
      V('2x 1/4" in, mic/guitar in, 2x 1/4" out, 2x headphones', '2x 1/4" entrada, micro/guitarra entrada, 2x 1/4" salida, 2x auriculares'),
      V('2x 1/4" in, mic in, 2x 1/4" out, headphone', '2x 1/4" entrada, micro entrada, 2x 1/4" salida, auriculares'),
      V('1x 3.5 mm stereo in/out, onboard mic', '1x 3,5 mm estéreo entrada/salida, micro integrado'),
      V('2x 1/4" in, 2x 1/4" out, pedals, headphone', '2x 1/4" entrada, 2x 1/4" salida, pedales, auriculares'),
      V('1x 3.5 mm in, 1x 3.5 mm out/headphone', '1x 3,5 mm entrada, 1x 3,5 mm salida/auriculares'),
      V('2x 1/4" in, 2x 1/4" out, headphone', '2x 1/4" entrada, 2x 1/4" salida, auriculares'),
      V('2x XLR/TRS combo in, 2x 1/4" in, phono in, 8x 1/4" out, 2x headphones', '2x XLR/TRS combo entrada, 2x 1/4" entrada, phono entrada, 8x 1/4" salida, 2x auriculares')
    ]},
    { label: 'Connectivity', label_es: 'Conectividad', values: [
      V('USB-C, MIDI I/O, WiFi, Bluetooth', 'USB-C, MIDI E/S, WiFi, Bluetooth'),
      V('USB (Overbridge), MIDI In/Out/Thru', 'USB (Overbridge), MIDI entrada/salida/thru'),
      V('USB-C, MIDI I/O, CV/Gate, WiFi, Bluetooth', 'USB-C, MIDI E/S, CV/Gate, WiFi, Bluetooth'),
      V('USB-C audio/MIDI, MIDI I/O, SD slot', 'USB-C audio/MIDI, MIDI E/S, slot SD'),
      V('USB-A/B, MIDI I/O, WiFi, Link', 'USB-A/B, MIDI E/S, WiFi, Link'),
      V('USB-C, MIDI I/O, sync I/O', 'USB-C, MIDI E/S, sync E/S'),
      V('USB-A/B, MIDI I/O, WiFi, Bluetooth, CV/Gate', 'USB-A/B, MIDI E/S, WiFi, Bluetooth, CV/Gate'),
      V('USB-C audio/MIDI, MIDI I/O, sync I/O', 'USB-C audio/MIDI, MIDI E/S, sync E/S'),
      V('USB-C, MIDI In/Out/Thru, sync out', 'USB-C, MIDI entrada/salida/thru, sync salida'),
      V('2x USB-A, USB-B, 2x MIDI in, 4x MIDI out, 8x CV/Gate', '2x USB-A, USB-B, 2x MIDI entrada, 4x MIDI salida, 8x CV/Gate')
    ]},
    { label: 'Weight', label_es: 'Peso', values: [
      V('2.1 kg'), V('1.48 kg'), V('3.9 kg'), V('1.1 kg'), V('2.5 kg'),
      V('0.62 kg'), V('4.0 kg'), V('0.30 kg'), V('0.78 kg'), V('5.6 kg')
    ]}
  ]
};
// fix weight ES decimals (2.1 kg -> 2,1 kg)
samp.productTable.rows.find(r => r.label === 'Weight').values.forEach(v => { v.value_es = v.value.replace('.', ','); });

// SP-404MKII velocity con fix (pads ARE velocity-sensitive)
const sp = samp.verdictProsCons.find(v => v.name === 'Roland SP-404MKII');
sp.cons[2] = 'No song mode for full arrangements';
sp.cons_es[2] = 'Sin modo canción para arreglos completos';

// ---------- compact table: string values -> {value, value_es} ----------
const cmp = guides.find(x => x.id === 'compact-rhythm-devices');
cmp.productTable.rows.forEach(r => {
  r.values = r.values.map((v, i) => ({ value: v, value_es: (r.values_es && r.values_es[i]) || v }));
  delete r.values_es;
});

fs.writeFileSync(DIR + 'data/guides.json', JSON.stringify(guides, null, 2));
console.log('samplers cols:', samp.productTable.columns.length, 'rows:', samp.productTable.rows.length);
console.log('compact rows fixed:', cmp.productTable.rows.length);
