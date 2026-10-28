const fs = require('fs');
const p = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
const arr = Array.isArray(p) ? p : (p.products || []);
const needles = ['CN-60S', 'GA35TCE', 'GC1CE', 'Alba', 'C1 3/4', 'Academy 12e-N', 'CG122MSH'];
for (const n of needles) {
  const found = arr.filter(x => (x.title || '').toLowerCase().includes(n.toLowerCase()));
  found.forEach(x => {
    const scale = (x.facts || []).find(f => /scale|escala/i.test((f.label && f.label.en) || ''));
    console.log(x.id + ' | ' + x.title + '  => scale fact: ' + (scale ? scale.value : 'NONE'));
  });
}
