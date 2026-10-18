const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const rg = B + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(rg, 'utf8'));
const g = guides.find(x => x.id === 'best-home-studio-speakers');
const T = g.productTable;

// 1) Renombrar columna
const colIdx = T.columns.findIndex(c => c.title_es === 'SPL máx. (dB)');
if (colIdx >= 0) {
  T.columns[colIdx].title = 'Max SPL (Peak)';
  T.columns[colIdx].title_es = 'SPL máx. (dB, Peak)';
}

// 2) Actualizar valores: todos son claims de fabricante (Peak), normalizar formato
const nuevos = [
  { value: '96 dB (Peak, @ 1 m)', value_es: '96 dB (Peak, @ 1 m)' },       // CR4.5 - estimado
  { value: '98 dB (Peak, @ 1 m)', value_es: '98 dB (Peak, @ 1 m)' },       // Eris 3.5 2nd Gen - OFICIAL
  { value: '100 dB (Peak, @ 1 m)', value_es: '100 dB (Peak, @ 1 m)' },     // BX4 - claim fabricante
  { value: '94 dB (Peak, @ 1 m)', value_es: '94 dB (Peak, @ 1 m)' },       // CR3.5 - estimado
  { value: '101 dB (Peak, @ 1 m)', value_es: '101 dB (Peak, @ 1 m)' },     // Truth 3.5 BT - claim fabricante
  { value: '~95 dB (Peak, @ 1 m)', value_es: '~95 dB (Peak, @ 1 m)' }      // R1280T - estimado
];

const rowIdx = T.rows.findIndex(r => r.label_es === 'SPL máx. (dB)');
if (rowIdx >= 0) {
  T.rows[rowIdx].values.forEach((v, i) => {
    v.value = nuevos[i].value;
    v.value_es = nuevos[i].value_es;
  });
}

fs.writeFileSync(rg, JSON.stringify(guides, null, 2), 'utf8');
console.log('Columna renombrada y valores normalizados a Peak @ 1 m');
console.log('');
T.rows[rowIdx].values.forEach((v, i) => console.log('  '+T.columns[i].title_es+': '+v.value_es));