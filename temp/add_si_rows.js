const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const die = (m) => { console.log('!! ' + m); process.exit(1); };
const gj = BASE + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gj, 'utf8'));
const g = guides.find(x => x.id === 'streaming-interfaces');
const NCOL = g.productTable.columns.length;
if (NCOL !== 7) die('columnas inesperadas: ' + NCOL);
// Orden: Duo, Bridge X, EVO4, Volt276, PodTrak, Scarlett, URX44V
const mk = (enVals, esVals) => {
  if (enVals.length !== 7 || esVals.length !== 7) die('valores != 7');
  return { values: enVals.map((v, k) => ({ value: v, value_es: esVals[k] })) };
};
const rows = [
  { label: 'Loopback', label_es: 'Loopback', ...mk(
    ['Yes — hardware buses', 'Yes — hardware dual-bus', 'Yes — dedicated channels', 'No', 'Yes — built-in', 'Yes — stereo', 'Yes — Multi-Stream ×3'],
    ['Sí — buses por hardware', 'Sí — doble bus por hardware', 'Sí — canales dedicados', 'No', 'Sí — integrado', 'Sí — estéreo', 'Sí — Multi-Stream ×3']) },
  { label: 'Virtual USB Channels', label_es: 'Canales USB virtuales', ...mk(
    ['Yes — 7 assignable (4+3)', 'Yes — STREAM + PERSONAL', 'No — single device', 'No', 'No — 12-in/2-out', 'No — stereo only', 'Yes — MAIN/SUB buses'],
    ['Sí — 7 asignables (4+3)', 'Sí — STREAM + PERSONAL', 'No — un solo dispositivo', 'No', 'No — 12 entradas/2 salidas', 'No — solo estéreo', 'Sí — buses MAIN/SUB']) },
  { label: 'Dual USB', label_es: 'USB dual', ...mk(
    ['Yes — 2× USB-C', 'Yes — USB I + II', 'No', 'No', 'No', 'No', 'Yes — MAIN + SUB'],
    ['Sí — 2× USB-C', 'Sí — USB I + II', 'No', 'No', 'No', 'No', 'Sí — MAIN + SUB']) }
];
if (g.productTable.rows.some(r => ['Loopback', 'Virtual USB Channels', 'Dual USB'].includes(r.label))) die('filas ya existen');
g.productTable.rows.push(...rows);
fs.writeFileSync(gj, JSON.stringify(guides, null, 2));
console.log('filas tabla:', g.productTable.rows.length);
console.log('orden:', g.productTable.rows.map(r => r.label).join(' | '));
console.log('desalineadas:', g.productTable.rows.filter(r => r.values.length !== NCOL).length);
