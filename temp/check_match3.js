const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));
const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));
const aliases = require(B + 'temp/name_aliases.js');

const norm = s => (s || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]/g, '');

function resolve(name) {
  if (!name) return null;
  if (aliases[name]) {
    const a = products.find(p => p.title === aliases[name] || p.title_es === aliases[name]);
    if (a) return a;
  }
  const exact = products.find(p => p.title === name || p.title_es === name);
  if (exact) return exact;
  const n = norm(name);
  if (!n) return null;
  const cont = products.filter(p => norm(p.title).includes(n) || norm(p.title_es || '').includes(n));
  if (cont.length === 1) return cont[0];
  const rev = products.filter(p => n.includes(norm(p.title)) || (p.title_es && n.includes(norm(p.title_es))));
  if (rev.length === 1) return rev[0];
  return null;
}

const sinResolver = [];
const ids = new Set();
const vistos = new Set();

guides.forEach(g => {
  const nombres = new Set();
  (g.verdictProsCons || []).forEach(v => { if (v.name) nombres.add(v.name); });
  if (g.productTable && g.productTable.columns) g.productTable.columns.forEach(c => {
    if (c.title_es || c.title) nombres.add(c.title_es || c.title);
  });
  nombres.forEach(n => {
    if (vistos.has(n)) return;
    vistos.add(n);
    const p = resolve(n);
    if (p) ids.add(p.id);
    else sinResolver.push({ id: g.id, n });
  });
});

console.log('Productos del catalogo alcanzados desde las guias: ' + ids.size + ' / ' + products.length);
console.log('Nombres sin resolver: ' + sinResolver.length);
sinResolver.forEach(d => console.log('   ' + d.id + ' -> ' + d.n));

const noUsados = products.filter(p => !ids.has(p.id));
console.log('\nProductos del catalogo que NINGUNA guia menciona: ' + noUsados.length);
noUsados.slice(0, 40).forEach(p => console.log('   id=' + p.id + '  ' + p.title));
