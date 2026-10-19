const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));
const p = products.find(x => x.id === 424);
console.log('=== Neumann NDH 30 (id 424) ===');
console.log(JSON.stringify(p, null, 1));

// Texto que ya tiene en open-headphones
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));
const g = guides.find(x => x.id === 'open-headphones');
const sec = (g.sections || []).find(s => /NDH 30/i.test(s.heading || ''));
if (sec) {
  console.log('\n=== open-headphones :: ' + sec.heading + ' ===');
  console.log((sec.content || '').replace(/<[^>]+>/g, ''));
}
const vpc = (g.verdictProsCons || []).find(v => /NDH 30/i.test(v.name || ''));
if (vpc) {
  console.log('\n=== veredicto en open-headphones ===');
  console.log('pros:', vpc.pros, '|', vpc.pros_es);
  console.log('cons:', vpc.cons, '|', vpc.cons_es);
}
