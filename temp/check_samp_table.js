const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
const en = fs.readFileSync(DIR + 'guides/best-samplers-drum-computers.html', 'utf8');
// find comparison table block
const ti = en.indexOf('Compared in This Guide');
console.log('table title present:', ti >= 0);
const tableStart = en.indexOf('<table', Math.max(0, ti - 2000));
console.log('table tag near title:', tableStart >= 0);
if (tableStart >= 0) {
  const chunk = en.slice(tableStart, tableStart + 3000);
  const ths = (chunk.match(/<th/g) || []).length;
  const tds = (chunk.match(/<td/g) || []).length;
  console.log('th count:', ths, '| td count:', tds);
  console.log(chunk.slice(0, 900).replace(/\n/g, ' '));
}
// current guides.json table
const g = JSON.parse(fs.readFileSync(DIR + 'data/guides.json', 'utf8'));
const d = g.find(x => x.title === 'Best Samplers & Beat Making: Complete Guide');
console.log('json cols:', d.productTable.columns.length, '| rows:', d.productTable.rows.length);
d.productTable.rows.forEach(r => console.log(' -', r.label, '| values:', r.values.length));
