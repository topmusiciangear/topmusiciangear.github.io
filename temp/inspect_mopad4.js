const fs = require('fs');
const raw = fs.readFileSync('data/guides.json', 'utf8');
const list = JSON.parse(raw);
const round = JSON.stringify(list, null, 2);
console.log('guides.json roundtrip igual:', raw === round, '| raw', raw.length, '| round', round.length, '| raw termina en \\n:', /\n$/.test(raw));

const g = list.find(x => x.id === 'monitor-setup');
console.log('\n--- columnas productTable ---');
g.productTable.columns.forEach((c, i) => console.log(i + ': ' + c.title + ' | ' + c.title_es));
console.log('\n--- filas (label / valores de la columna MoPAD) ---');
const idx = g.productTable.columns.findIndex(c => /MoPAD/i.test(c.title));
console.log('indice columna MoPAD:', idx);
for (const row of g.productTable.rows) {
  console.log('  ' + row.label + ' -> ' + (row.values ? row.values[idx] : JSON.stringify(row)));
}

const s = fs.readFileSync('build-guides.js', 'utf8');
const i = s.indexOf('\n  650: {');
console.log('\n--- TEST_SHOP_BTN 650 completo ---');
console.log(s.slice(i, s.indexOf('\n  },', i) + 5));
