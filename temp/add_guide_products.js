const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));
const g = guides.find(x => x.id === 'best-headphones-for-mixing');

// --- 1) Tabla: anadir Audeze MM-500 (col 0) y Neumann NDH 30 (col 1) ---
g.productTable.columns.unshift({ title: 'Audeze MM-500', title_es: 'Audeze MM-500' });
g.productTable.columns.splice(1, 0, { title: 'Neumann NDH 30', title_es: 'Neumann NDH 30' });

// Ordenar filas: MM-500, HD 490, NDH 30, HD 600, DT 990, DT 770, M50x, MDR-7506
const orden = ['Audeze MM-500', 'Sennheiser HD 490 Pro Plus', 'Neumann NDH 30',
  'Sennheiser HD 600', 'Beyerdynamic DT 990 Pro', 'Beyerdynamic DT 770 Pro',
  'Audio-Technica ATH-M50x', 'Sony MDR-7506'];

g.productTable.rows.forEach(r => {
  const get = (nombre) => {
    const i = g.productTable.columns.findIndex(c => c.title === nombre);
    return i === -1 ? null : r.values[i];
  };
  const vals = orden.map(n => get(n) || { value: '—', value_es: '—' });
  r.values = vals;
});

// --- 2) Valores por fila ---
const filas = {
  'Best For': ['Flagship reference mixing', 'Modern reference mixing', 'Neutral studio mixing',
    'Sweet-spot flat mixing reference', 'Open-back budget mixing', 'Closed-back mixing & tracking',
    'Portable all-purpose mixing', 'Broadcast editing & tracking'],
  'Type': ['Open-back', 'Open-back', 'Open-back', 'Open-back', 'Open-back', 'Closed-back', 'Closed-back', 'Closed-back'],
  'Driver Size': ['90 mm planar', '38 mm', '38 mm', '42 mm', '45 mm', '45 mm', '45 mm', '40 mm'],
  'Impedance': ['18 Ω', '130 Ω', '—', '300 Ω', '250 Ω', '80 Ω', '38 Ω', '63 Ω'],
  'Sensitivity': ['100 dB', '105 dB', '114 dB', '97 dB', '96 dB', '96 dB', '99 dB', '106 dB'],
  'Frequency Response': ['5 Hz – 50 kHz', '5 Hz – 36 kHz', '5 Hz – 30 kHz', '12 Hz – 40 kHz', '5 Hz – 35 kHz', '5 Hz – 35 kHz', '15 Hz – 28 kHz', '10 Hz – 20 kHz'],
  'Cable': ['Dual mini-XLR to 6.35 mm', 'Detachable (2 included)', 'Single-sided, 3 m', 'Detachable (single-sided)', '3 m coiled, fixed', '3 m straight, fixed', 'Detachable (3 included)', '3 m coiled, fixed'],
  'Weight': ['495 g', '260 g', '330 g', '260 g', '250 g', '270 g', '285 g', '230 g'],
};

g.productTable.rows.forEach(r => {
  const key = filas[r.label];
  if (!key) return;
  r.values = orden.map((n, i) => ({ value: key[i], value_es: key[i] }));
});

console.log('Tabla actualizada: ' + g.productTable.columns.length + ' columnas, ' + g.productTable.rows.length + ' filas');
fs.writeFileSync(B + 'data/guides.json', JSON.stringify(guides, null, 2), 'utf8');
console.log('Escrito (tabla).');
