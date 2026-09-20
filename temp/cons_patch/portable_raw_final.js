const fs = require('fs');
const R = 'C:/Users/Daniel/projects/topmusiciangear/data';
const G = JSON.parse(fs.readFileSync(R + '/guides.json', 'utf8'));
const GS = Array.isArray(G) ? G : (G.guides || []);
const g = GS.find(x => x && x.id === 'portable-interfaces');
const g2 = GS.find(x => x && x.id === 'premium-interfaces');

console.log('=== portable-interfaces RAW keys ===');
console.log(JSON.stringify(Object.keys(g), null, 1));

console.log('\n=== portable-interfaces sections[] — FULL RAW products arrays ===');
(g.sections || []).forEach((s, i) => {
  const ps = s && s.products;
  console.log('-- sections[' + i + '] .h=' + JSON.stringify(s && s.h) + ' .products(' + (Array.isArray(ps) ? ps.length : 'n/a') + ') RAW:');
  console.log(JSON.stringify(ps, null, 1));
});

console.log('\n=== verdictProsCons RAW (portable) ===');
console.log(JSON.stringify(g.verdictProsCons, null, 1));

console.log('\n=== does portable have an "image"/cover field? ===');
console.log('  image=' + JSON.stringify(g.image));
console.log('  img=' + JSON.stringify(g.img));
console.log('  cover=' + JSON.stringify(g.cover));

console.log('\n=== guides.json exists as premium-interfaces ALREADY? ===');
console.log('  premium-interfaces found=' + (g2 ? 'YES' : 'no'));
console.log('  total guides = ' + GS.length);
console.log('  guide ids = ' + GS.map(x => x && x.id).join(', '));
