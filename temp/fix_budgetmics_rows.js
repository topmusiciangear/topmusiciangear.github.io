// budget-mics: add Frequency Response + Max SPL rows (all values verified
// against manufacturer specs; "Not published" where makers publish none).
const fs = require('fs');
const G = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const g = G.find(x => x.id === 'budget-mics');
const V = (value, value_es) => ({ value, value_es });
const NP = V('Not published', 'No publicado');
const FR = [
  '40 Hz – 19 kHz', '50 Hz – 15 kHz', '50 Hz – 20 kHz', '20 Hz – 20 kHz',
  '40 Hz – 15 kHz', '50 Hz – 18 kHz', '50 Hz – 14 kHz', '50 Hz – 15 kHz',
  '50 Hz – 16 kHz', '50 Hz – 15 kHz', '50 Hz – 16 kHz', '50 Hz – 15 kHz',
  '50 Hz – 15 kHz', '40 Hz – 16 kHz', '20 Hz – 20 kHz', '20 Hz – 20 kHz',
  '40 Hz – 18 kHz', '20 Hz – 20 kHz', '50 Hz – 16 kHz', '40 Hz – 18 kHz',
  '40 Hz – 18 kHz', '70 Hz – 20 kHz', 'Close 30 Hz – 17 kHz'
].map(s => V(s, s));
const SPL = [
  NP, NP, V('>140 dB', '>140 dB'), V('130 dB (150 dB w/ pad)', '130 dB (150 dB con pad)'),
  NP, NP, V('127 dB', '127 dB'), NP,
  NP, V('148 dB', '148 dB'), NP, NP,
  NP, V('>130 dB', '>130 dB'), V('142 dB', '142 dB'), V('144 dB', '144 dB'),
  V('136 dB', '136 dB'), V('148 dB (158 dB w/ pad)', '148 dB (158 dB con pad)'), NP, NP,
  NP, V('147 dB', '147 dB'), V('>140 dB', '>140 dB')
];
if (FR.length !== 23 || SPL.length !== 23) throw new Error('count');
if (g.productTable.columns.length !== 23) throw new Error('cols');
const idx = g.productTable.rows.findIndex(r => r.label === 'Polar Pattern');
g.productTable.rows.splice(idx + 1, 0,
  { label: 'Frequency Response', label_es: 'Respuesta de frecuencia', values: FR },
  { label: 'Max SPL', label_es: 'SPL máximo', values: SPL }
);
fs.writeFileSync('data/guides.json', JSON.stringify(G, null, 2));
const gg = JSON.parse(fs.readFileSync('data/guides.json', 'utf8')).find(x => x.id === 'budget-mics');
console.log('rows: ' + gg.productTable.rows.map(r => r.label + '(' + r.values.length + ')').join(' | '));
