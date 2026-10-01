// starter-studio: complete productTable with Price, Specs, etc.
const fs = require('fs');
const G = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const V = (value, value_es) => ({ value, value_es });
const W = (t) => ({ title: t, title_es: t });

const g = G.find(x => x.id === 'starter-studio');

// Add missing columns
['Price', 'Connectivity', 'Key Specs'].forEach(t => g.productTable.columns.push(W(t)));

// Add missing rows
const newRows = [
  { label: 'Price', values: [
    V('$189.99', '$189.99'),
    V('$99.00', '$99.00'),
    V('$149.00', '$149.00'),
    V('$249.00', '$249.00'),
    V('$299.00', '$299.00'),
    V('$249.00', '$249.00'),
    V('$99.00', '$99.00'),
    V('$399.00', '$399.00')
  ]},
  { label: 'Connectivity', values: [
    V('USB-C, 2x XLR/TRS combo, MIDI I/O', 'USB-C, 2x XLR/TRS combo, MIDI I/O'),
    V('XLR (balanced)', 'XLR (balanceado)'),
    V('3.5 mm TRS + 1/4" adapter', '3.5 mm TRS + adaptador 1/4"'),
    V('XLR, TRS, RCA', 'XLR, TRS, RCA'),
    V('USB-C, 2x XLR/TRS combo, MIDI I/O', 'USB-C, 2x XLR/TRS combo, MIDI I/O'),
    V('XLR (balanced)', 'XLR (balanceado)'),
    V('3.5 mm TRS + 1/4" adapter', '3.5 mm TRS + adaptador 1/4"'),
    V('XLR, TRS', 'XLR, TRS')
  ]},
  { label: 'Key Specs', values: [
    V('24-bit/192 kHz, Air mode, 56 dB gain', '24-bit/192 kHz, modo Air, 56 dB ganancia'),
    V('Cardioid, 150 Ω, 1–100 kHz response', 'Cardioide, 150 Ω, respuesta 1–100 kHz'),
    V('45 mm drivers, 15–28,000 Hz, 38 Ω', 'Drivers 45 mm, 15–28,000 Hz, 38 Ω'),
    V('7" Kevlar woofer, 1" tweeter, 145 W Class D', 'Woofer 7" Kevlar, tweeter 1", 145 W Clase D'),
    V('24-bit/192 kHz, Legacy 4K mode, SSL preamps', '24-bit/192 kHz, modo Legacy 4K, previos SSL'),
    V('1" gold-sputtered capsule, cardioid, self-noise 7 dB-A', 'Cápsula 1" gold-sputtered, cardioide, auto-ruido 7 dB-A'),
    V('40 mm drivers, 10–20,000 Hz, 63 Ω', 'Drivers 40 mm, 10–20,000 Hz, 63 Ω'),
    V('8" cone woofer, 1" dome tweeter, 120 W bi-amp', 'Woofer 8" cono, tweeter 1" cúpula, 120 W bi-amp')
  ]}
];
newRows.forEach(r => g.productTable.rows.push(r));

fs.writeFileSync('data/guides.json', JSON.stringify(G, null, 2));
console.log('starter-studio: columns=' + g.productTable.columns.length + ' rows=' + g.productTable.rows.length);
console.log('Row labels:', g.productTable.rows.map(r=>r.label).join(', '));
console.log('Row value counts:', g.productTable.rows.map(r => r.values.length).join(', '));