const fs = require('fs');
const path = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
let c = fs.readFileSync(path, 'utf8');
let obj = JSON.parse(c);
const g = obj.find(x => x.id === 'best-monitors');

// 1. Restaurar 'Kali Audio' a productos que lo necesitan
g.verdictProsCons = g.verdictProsCons.map(v => {
  if (v.name === ' LP-6 V2') v.name = 'Kali Audio LP-6 V2';
  if (v.name === ' IN-8 V2') v.name = 'Kali Audio IN-8 V2';
  if (v.name === ' IN-UNF') v.name = 'Kali Audio IN-UNF';
  if (v.name === ' LP-UNF') v.name = 'Kali Audio LP-UNF';
  if (v.name_es === ' LP-6 V2') v.name_es = 'Kali Audio LP-6 V2';
  if (v.name_es === ' IN-8 V2') v.name_es = 'Kali Audio IN-8 V2';
  if (v.name_es === ' IN-UNF') v.name_es = 'Kali Audio IN-UNF';
  if (v.name_es === ' LP-UNF') v.name_es = 'Kali Audio LP-UNF';
  return v;
});

// 2. Remover WS-6.2 de todo
g.verdictProsCons = g.verdictProsCons.filter(v => !v.name.includes('WS-6.2') && !v.name_es.includes('WS-6.2'));
g.faq = g.faq.filter(f => !f.q.includes('WS-6.2') && !f.q_es.includes('WS-6.2') && !f.a.includes('WS-6.2') && !f.a_es.includes('WS-6.2'));
g.featuredProducts = g.featuredProducts.filter(id => id !== 300);
g.productTable.columns = g.productTable.columns.filter(c => !(c.title && c.title.includes('WS-6.2')) && !(c.title_es && c.title_es.includes('WS-6.2')));

// 3. Completar filas con specs para Focal Shape 65 (columna 12, índice 11)
const cols = g.productTable.columns.length;
const focalSpecs = [
  { value: 'Focal Shape 65 nearfield mixing', value_es: 'Mezcla nearfield Focal Shape 65' },
  { value: '2-way active', value_es: 'Biamplificado de 2 vias' },
  { value: '6.5" Flax cone', value_es: '6,5" cono Flax' },
  { value: '1" inverted dome', value_es: '1" cupula invertida' },
  { value: '80W Class AB', value_es: '80W Clase AB' },
  { value: '40 Hz - 35 kHz', value_es: '40 Hz - 35 kHz' },
  { value: '108 dB', value_es: '108 dB' },
  { value: '33 x 21 x 27 cm', value_es: '33 x 21 x 27 cm' }
];

g.productTable.rows.forEach((row, i) => {
  if (row.values.length === cols - 1) {
    row.values.push(focalSpecs[i]);
  }
});

fs.writeFileSync(path, JSON.stringify(obj, null, 2));
console.log('Fixes POST-BUILD aplicados');