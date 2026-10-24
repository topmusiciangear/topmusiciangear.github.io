// Inspección de best-monitors-for-small-rooms: secciones, enlaces ES, nombres con espacio inicial
const fs = require('fs');
const raw = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8');
const g = JSON.parse(raw);
const gu = g.find(x => x.id === 'best-monitors-for-small-rooms');

console.log('== sections products order ==');
gu.sections.forEach((s, i) => console.log(i, JSON.stringify(s.products || null), '|', (s.heading || '').slice(0, 70)));

console.log('== vpc order ==');
gu.verdictProsCons.map(v => v.name).forEach((n, i) => console.log(i, JSON.stringify(n)));

const lines = raw.split('\n');
const block = lines.slice(43066, 44380).join('\n');
console.log('== _es.html refs in guide block ==');
const re = /[^"]*_es\.html[^"]*/g;
let m, c = 0;
while ((m = re.exec(block)) && c < 40) {
  const ln = 43067 + block.slice(0, m.index).split('\n').length;
  console.log('L' + ln + ':', m[0].slice(0, 140));
  c++;
}
console.log('total _es.html in block:', (block.match(/_es\.html/g) || []).length);

console.log('== leading-space names in block ==');
['" LP-6 V2', '" LP-UNF', ' LP-6 V2', ' LP-UNF', 'Kali Audio LP-6 V2', 'Kali Audio LP-UNF'].forEach(p => console.log(JSON.stringify(p), (block.split(p).length - 1)));

// productTable rows: value counts
console.log('== productTable row value counts ==');
gu.productTable.rows.forEach(r => console.log(r.label, '→', (r.values || []).length));
