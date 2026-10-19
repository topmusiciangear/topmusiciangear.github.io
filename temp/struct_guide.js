const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));
const g = guides.find(x => x.id === 'best-headphones-for-mixing');

console.log('=== productTable ===');
console.log(JSON.stringify(g.productTable, null, 1));

console.log('\n=== verdictProsCons[0] ===');
console.log(JSON.stringify(g.verdictProsCons[0], null, 1));

console.log('\n=== secciones: headings ===');
(g.sections || []).forEach((s, i) => console.log(i + ': ' + s.heading));

console.log('\n=== faq ===');
console.log(JSON.stringify(g.faq, null, 1).substring(0, 1500));

console.log('\n=== other fields ===');
console.log(Object.keys(g).join(', '));
