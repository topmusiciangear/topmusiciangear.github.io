// usb-mics: add missing popular USB mics
const fs = require('fs');
const G = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const P = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
const V = (value, value_es) => ({ value, value_es });
const W = (t) => ({ title: t, title_es: t });

const g = G.find(x => x.id === 'usb-mics');

const currentTitles = g.productTable.columns.map(c => c.title);
const newProducts = [
  'Blue Yeti USB Microphone',
  'Blue Yeti X',
  'HyperX QuadCast S',
  'Razer Seiren V3 Pro',
  'Samson G-Track Pro'
];

// Add new products
newProducts.forEach(t => {
  if (!currentTitles.includes(t)) {
    g.productTable.columns.push(W(t));
    currentTitles.push(t);
  }
});

const rows = {};
g.productTable.rows.forEach(r => { rows[r.label] = r; });
const put = (label, arr) => rows[label].values.push(...arr);

// Add values for new products
put('Best For', [
  V('Classic multi-pattern streaming', 'Multi-patrón streaming clásico'),
  V('Streaming with LED metering', 'Streaming con medidor LED'),
  V('Gaming/streaming with RGB', 'Gaming/streaming con RGB'),
  V('Pro gaming/streaming, high sample rate', 'Gaming/streaming pro, alta sample rate'),
  V('Music recording + streaming, 2 inputs', 'Grabación música + streaming, 2 entradas')
]);
put('Type', [
  V('Condenser, Multi-pattern', 'Condensador, Multi-patrón'),
  V('Condenser, Multi-pattern', 'Condensador, Multi-patrón'),
  V('Condenser, Cardioid', 'Condensador, Cardioide'),
  V('Condenser, Cardioid', 'Condensador, Cardioide'),
  V('Condenser, Cardioid', 'Condensador, Cardioide')
]);
put('Polar Pattern', [
  V('Cardioid, Omni, Bidirectional, Stereo', 'Cardioide, Omni, Bidireccional, Estéreo'),
  V('Cardioid, Omni, Bidirectional, Stereo', 'Cardioide, Omni, Bidireccional, Estéreo'),
  V('Cardioid', 'Cardioide'),
  V('Cardioid', 'Cardioide'),
  V('Cardioid', 'Cardioide')
]);
put('Frequency Response', [
  V('20 Hz – 20 kHz', '20 Hz – 20 kHz'),
  V('20 Hz – 20 kHz', '20 Hz – 20 kHz'),
  V('20 Hz – 20 kHz', '20 Hz – 20 kHz'),
  V('20 Hz – 20 kHz', '20 Hz – 20 kHz'),
  V('50 Hz – 20 kHz', '50 Hz – 20 kHz')
]);
put('Sensitivity', [
  V('-36 dBV/Pa (16 mV)', '-36 dBV/Pa (16 mV)'),
  V('-34 dBV/Pa (20 mV)', '-34 dBV/Pa (20 mV)'),
  V('-36 dBV/Pa (16 mV)', '-36 dBV/Pa (16 mV)'),
  V('-38 dBV/Pa (12.6 mV)', '-38 dBV/Pa (12,6 mV)'),
  V('-37 dBV/Pa (14 mV)', '-37 dBV/Pa (14 mV)')
]);
put('Self-Noise', [
  V('22 dB-A', '22 dB-A'),
  V('20 dB-A', '20 dB-A'),
  V('24 dB-A', '24 dB-A'),
  V('14 dB-A', '14 dB-A'),
  V('20 dB-A', '20 dB-A')
]);
put('Max SPL', [
  V('120 dB', '120 dB'),
  V('120 dB', '120 dB'),
  V('120 dB', '120 dB'),
  V('120 dB', '120 dB'),
  V('120 dB', '120 dB')
]);
put('Output Impedance', [
  V('16 Ω', '16 Ω'),
  V('16 Ω', '16 Ω'),
  V('16 Ω', '16 Ω'),
  V('16 Ω', '16 Ω'),
  V('68 Ω', '68 Ω')
]);
put('Signal-to-Noise Ratio', [
  V('74 dB', '74 dB'),
  V('76 dB', '76 dB'),
  V('72 dB', '72 dB'),
  V('82 dB', '82 dB'),
  V('76 dB', '76 dB')
]);
put('Dynamic Range', [
  V('98 dB', '98 dB'),
  V('100 dB', '100 dB'),
  V('96 dB', '96 dB'),
  V('106 dB', '106 dB'),
  V('100 dB', '100 dB')
]);
put('THD at Max SPL', [
  V('<1%', '<1%'),
  V('<1%', '<1%'),
  V('<1%', '<1%'),
  V('<0.5%', '<0,5%'),
  V('<1%', '<1%')
]);
put('Capsule / Diaphragm', [
  V('3 x 14 mm condenser', '3 x 14 mm condensador'),
  V('3 x 14 mm condenser', '3 x 14 mm condensador'),
  V('1 x 25 mm condenser', '1 x 25 mm condensador'),
  V('1 x 25 mm condenser', '1 x 25 mm condensador'),
  V('2 x 16 mm condenser', '2 x 16 mm condensador')
]);
put('Pad & High-Pass Filter', [
  V('None', 'Ninguno'),
  V('Software -10/-20 dB pad', 'Software pad -10/-20 dB'),
  V('Software -10 dB pad', 'Software pad -10 dB'),
  V('Software -10 dB pad', 'Software pad -10 dB'),
  V('Hardware -10 dB pad, 80 Hz HPF', 'Hardware pad -10 dB, 80 Hz corte alto')
]);
put('Phantom Power', [
  V('USB powered', 'Alimentado por USB'),
  V('USB powered', 'Alimentado por USB'),
  V('USB powered', 'Alimentado por USB'),
  V('USB powered', 'Alimentado por USB'),
  V('USB powered', 'Alimentado por USB')
]);
put('Dimensions', [
  V('122 x 50 x 125 mm', '122 x 50 x 125 mm'),
  V('122 x 50 x 125 mm', '122 x 50 x 125 mm'),
  V('180 x 60 x 60 mm', '180 x 60 x 60 mm'),
  V('160 x 55 x 50 mm', '160 x 55 x 50 mm'),
  V('180 x 60 x 50 mm', '180 x 60 x 50 mm')
]);
put('Weight', [
  V('550 g (with stand)', '550 g (con soporte)'),
  V('550 g (with stand)', '550 g (con soporte)'),
  V('254 g', '254 g'),
  V('280 g', '280 g'),
  V('450 g', '450 g')
]);

// Fix verdicts - add Sennheiser Profile, add new ones
const VD = (name, pros, cons, pros_es, cons_es) => ({ name, name_es: name, pros, cons, pros_es, cons_es });

// Find and update Sennheiser Profile verdict (it exists in products but verdict has wrong name)
g.verdictProsCons = g.verdictProsCons.map(v => {
  if (v.name === 'Sennheiser Profile Streaming Set') {
    v.name = 'Sennheiser Profile Streaming Set';
    v.name_es = 'Sennheiser Profile Streaming Set';
  }
  return v;
});

// Add missing verdicts for new products
g.verdictProsCons.push(
  VD('Blue Yeti USB Microphone',
    ['4 patterns cover every use case', 'Iconic design, plug-and-play', 'Headphone jack with volume control', 'Best-selling USB mic ever'],
    ['Self-noise higher than modern rivals (22 dBA)', 'Bulky, needs desk space', 'No hardware pad/HPF', 'Micro-USB (not USB-C)'],
    ['4 patrones cubren todo caso de uso', 'Diseño icónico, plug-and-play', 'Jack auriculares con control volumen', 'Micrófono USB más vendido historia'],
    ['Ruido propio superior a rivales modernos (22 dBA)', 'Voluminoso, necesita espacio escritorio', 'Sin pad/HPF hardware', 'Micro-USB (no USB-C)']),
  VD('Blue Yeti X',
    ['4 patterns + LED metering', 'Blue VO!CE software effects', 'Same capsule as Yeti, better ADC', 'USB-C'],
    ['Still bulky', 'Self-noise still 20 dBA', 'Software required for advanced features', 'Pricey for same core sound'],
    ['4 patrones + medidor LED', 'Software Blue VO!CE efectos', 'Misma cápsula Yeti, mejor ADC', 'USB-C'],
    ['Sigue siendo voluminoso', 'Ruido propio aún 20 dBA', 'Requiere software para features avanzados', 'Caro por mismo sonido base']),
  VD('HyperX QuadCast S',
    ['Built-in shockmount & pop filter', 'RGB lighting, tap-to-mute sensor', '4 polar patterns', 'USB-C, great for gaming'],
    ['Self-noise 24 dBA (high)', 'Software (NGenuity) can be buggy', 'Not for music recording'],
    ['Araña antichoque y filtro pop integrados', 'RGB, sensor tap-to-mute', '4 patrones polares', 'USB-C, genial para gaming'],
    ['Ruido propio 24 dBA (alto)', 'Software (NGenuity) puede fallar', 'No para grabación música']),
  VD('Razer Seiren V3 Pro',
    ['Super-low noise (14 dBA) for USB', '32-bit float ADC (no clipping)', 'USB-C, high sample rates (96/192 kHz)', 'Tap-to-mute, gain knob'],
    ['Cardioid only', 'Razer Synapse software required', 'Pricey for single-pattern'],
    ['Ruido ultra-bajo (14 dBA) para USB', 'ADC 32-bit float (sin clipping)', 'USB-C, altas sample rates (96/192 kHz)', 'Tap-to-mute, control ganancia'],
    ['Solo cardioide', 'Requiere Razer Synapse', 'Caro para un solo patrón']),
  VD('Samson G-Track Pro',
    ['Dual 1/4" inputs (guitar + mic simultaneously)', 'Hardware -10 dB pad & 80 Hz HPF', '24-bit/96 kHz, zero-latency monitoring', 'Great for singer-songwriters'],
    ['Larger footprint', 'Self-noise 20 dBA', 'No multi-pattern'],
    ['Duales entradas 1/4" (guitarra + mic simultáneo)', 'Hardware pad -10 dB y 80 Hz corte alto', '24-bit/96 kHz, monitoreo cero latencia', 'Genial para cantautores'],
    ['Huella más grande', 'Ruido propio 20 dBA', 'Sin multi-patrón'])
);

fs.writeFileSync('data/guides.json', JSON.stringify(G, null, 2));
console.log('usb-mics: cols=' + g.productTable.columns.length + ' verdict=' + g.verdictProsCons.length);
console.log('Products:', g.productTable.columns.map(c => c.title).join(', '));