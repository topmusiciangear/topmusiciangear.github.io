const fs = require('fs');
const guides = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const g = guides.find(x => x.id === 'monitor-setup');
const row = g.productTable.rows.find(r => r.label === 'Best For');
const kmCol = g.productTable.columns.findIndex(c => c.title.includes('K&M 26722'));
if (kmCol < 0) throw new Error('columna K&M no encontrada');

row.values[kmCol].value = 'Floor stands at ear level; rigid steel, 35 kg capacity';
row.values[kmCol].value_es = 'Soportes de suelo a la altura del oído; acero rígido, 35 kg de capacidad';

fs.writeFileSync('data/guides.json', JSON.stringify(guides, null, 2), 'utf8');
console.log('K&M Best For EN:', row.values[kmCol].value);
console.log('K&M Best For ES:', row.values[kmCol].value_es);
console.log('conclusion_es:', g.conclusion_es.replace(/<[^>]+>/g, '').trim());
