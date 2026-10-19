const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const overrides = require(B + 'temp/score_overrides.js');
const aliases = require(B + 'temp/name_aliases.js');
const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));

const norm = s => (s || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]/g, '');
function findProduct(name) {
  if (!name) return null;
  if (aliases[name]) { const a = products.find(p => p.title === aliases[name] || p.title_es === aliases[name]); if (a) return a; }
  const exact = products.find(p => p.title === name || p.title_es === name);
  if (exact) return exact;
  const n = norm(name);
  const cont = products.filter(p => norm(p.title).includes(n) || norm(p.title_es || '').includes(n));
  if (cont.length === 1) return cont[0];
  const rev = products.filter(p => n.includes(norm(p.title)) || (p.title_es && n.includes(norm(p.title_es))));
  return rev.length === 1 ? rev[0] : null;
}

// Traza: quien escribe cada producto de best-monitors
const objetivo = ['Genelec 8351B SAM 3-Way Coaxial Studio Monitor', 'Neumann KH 80 DSP', 'Genelec 8010A', 'JBL 305P MkII', 'Genelec 8030C'];
objetivo.forEach(t => {
  const p = products.find(x => x.title === t);
  const escritores = [];
  for (const [gid, map] of Object.entries(overrides)) {
    for (const [name, sc] of Object.entries(map)) {
      const q = findProduct(name);
      if (q && q.title === t) escritores.push(gid + ' (as "' + name + '" -> ' + sc + ')');
    }
  }
  console.log('\n' + t + '  [score actual ' + p.score + ']');
  escritores.forEach(e => console.log('   escrito por: ' + e));
  if (!escritores.length) console.log('   NADIE lo escribe');
});
