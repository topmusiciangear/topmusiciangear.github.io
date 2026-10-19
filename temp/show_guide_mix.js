const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));
const g = guides.find(x => x.id === 'best-headphones-for-mixing');

console.log('=== VEREDICTO ===');
console.log(g.verdict);
console.log('\n=== CONCLUSION ===');
console.log(g.conclusion);

console.log('\n=== SECCIONES ===');
(g.sections || []).forEach((s, i) => {
  console.log('\n--- [' + i + '] ' + s.heading + ' ---');
  const txt = (s.content || '').replace(/<[^>]+>/g, '').trim();
  console.log(txt.substring(0, 700));
});
