const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = require(B + 'data/guides.json');
const src = fs.readFileSync(B + 'js/app.js', 'utf8');
const order = eval('(' + src.match(/const GUIDE_CATEGORY_ORDER = (\[[^\]]+\])/)[1] + ')');
const pinned = eval('(' + src.match(/const GUIDE_PINNED_FIRST = (\[[^\]]+\])/)[1] + ')');
function rank(g) {
  const pin = pinned.indexOf(g.id);
  if (pin > -1) return -1000 + pin;
  const c = order.indexOf(g.category);
  return c > -1 ? c : 999;
}
const sorted = guides.map((g, i) => ({ g, i, r: rank(g) })).sort((a, b) => a.r - b.r || a.i - b.i).map(x => x.g);
console.log('primeras 8:');
sorted.slice(0, 8).forEach((g, i) => console.log((i + 1) + '. ' + g.id + ' [' + g.category + ']'));
let last = -1, ok = true;
sorted.forEach((g, i) => {
  const r = rank(g);
  if (r < last) { ok = false; console.log('SALTO en ' + i + ': ' + g.id); }
  last = r;
});
console.log('monotono: ' + ok);
let cat = '';
sorted.forEach(g => {
  if (g.category !== cat) { cat = g.category; process.stdout.write(cat + ' | '); }
});
console.log('\ntotal: ' + sorted.length + ' guias');
const setA = new Set(guides.map(g => g.id)), setB = new Set(sorted.map(g => g.id));
console.log('mismo conjunto: ' + (setA.size === setB.size && [...setA].every(x => setB.has(x))));