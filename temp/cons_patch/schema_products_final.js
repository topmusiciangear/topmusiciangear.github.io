const fs = require('fs');
const R = 'C:/Users/Daniel/projects/topmusiciangear';
const G = JSON.parse(fs.readFileSync(R + '/data/guides.json', 'utf8'));
const GS = Array.isArray(G) ? G : (G.guides || []);
const g = GS.find(x => x && x.id === 'portable-interfaces');

console.log('=== portable-interfaces sections[].products — RAW type per element ===');
(g.sections || []).forEach((s, si) => {
  const ps = s && s.products;
  console.log('-- sections[' + si + '] products TYPE=' + (Array.isArray(ps) ? 'array[' + ps.length + ']' : typeof ps) + ' | first elem sample:');
  const sample = Array.isArray(ps) ? ps[0] : ps;
  console.log('   typeof=' + (sample === null ? 'null' : typeof sample) + ' | ' + JSON.stringify(sample).slice(0, 300));
});

console.log('\n=== does build-guides.js read sections[].products as numeric ids or as matching title strings? (grep resolve) ===');
const src = fs.readFileSync(R + '/build-guides.js', 'utf8');
const idx = src.indexOf('s.products');
console.log('  s.products context:\n' + src.slice(Math.max(0, idx - 600), idx + 900));
