const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
const s = g.find(x => x.id === 'starter-studio');

console.log('=== veredicto de los paneles G4M ===');
s.verdictProsCons.filter(v => /Squarewave/i.test(v.name)).forEach(v => {
  console.log('  ' + v.name);
  v.cons.forEach((c, i) => console.log('    EN cons[' + i + ']: ' + c));
  v.cons_es.forEach((c, i) => console.log('    ES cons[' + i + ']: ' + c));
});

console.log('\n=== donde queda "centimetre" / "centímetro" por todo el guia ===');
const t = JSON.stringify(s);
[...new Set(t.match(/[A-Za-zÁÉÍÓÚáéíóúñ ,.'-]{0,60}(?:centimetre|centímetro)[A-Za-zÁÉÍÓÚáéíóúñ ,.'-]{0,60}/gi) || [])]
  .forEach(x => console.log('  ...' + x.replace(/\\n/g, ' ').trim() + '...'));
