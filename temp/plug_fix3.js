const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));
const T = id => products.find(p => p.id === id).title;
const repairs = [
  ['Arturia V Collection 11 Pro Pro', T(1015)],
  ['Synchro Arts Synchro Arts RePitch 2 Standard', T(1040)],
  ['Softube Softube Amp Room Marshall Suite', T(1023)],
  ['Synchro Arts Synchro Arts Revoice Pro 5', T(1036)]
];
const branches = [
  ['Synchro Arts RePitch 2 Standard', T(1040)],
  ['Synchro Arts Revoice Pro 5', T(1036)],
  ['Synchro Arts Revoice Pro', T(1036)],
  ['Synchro Arts RePitch 2', T(1040)],
  ['Softube Amp Room: Marshall Suite', T(1023)],
  ['Softube Amp Room Marshall Suite', T(1023)],
  ['Arturia V Collection 11 Pro', T(1015)],
  ['V Collection 11 Pro', T(1015)],
  ['V Collection 11', T(1015)]
];
branches.sort((a, b) => b[0].length - a[0].length);
const esc = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const rx = new RegExp(branches.map(b => esc(b[0])).join('|'), 'g');
const repOf = {};
branches.forEach(([t, r]) => { if (!(t in repOf)) repOf[t] = r; });
let total = 0;
guides.forEach(g => {
  const metas = [];
  let s = JSON.stringify(g);
  repairs.forEach(([a, b]) => { s = s.split(a).join(b); });
  s = s.replace(/"metaDesc(_es)?":"((?:[^"\\]|\\.)*)"/g, m => {
    metas.push(m);
    return '"metaDesc§§":"%%META' + (metas.length - 1) + '%%"';
  });
  let c = 0;
  s = s.replace(rx, m => { c++; return repOf[m]; });
  s = s.replace(/"metaDesc§§":"%%META(\d+)%%"/g, (m, i) => metas[Number(i)]);
  const g2 = JSON.parse(s);
  Object.keys(g).forEach(k => delete g[k]);
  Object.assign(g, g2);
  if (c > 0) { console.log(g.id + ': ' + c + ' toques'); total += c; }
});
fs.writeFileSync(B + 'data/guides.json', JSON.stringify(guides, null, 2), 'utf8');
console.log('TOTAL: ' + total);
