// Auditoria completa: ninguna foto de producto debe faltar ni depender de una web externa.
const fs = require('fs');
const path = require('path');

const problems = [];
const extImgs = new Map();

function checkLocal(rel, where) {
  if (!rel) return false;
  const f = rel.startsWith('../') ? rel.slice(3) : rel.replace(/^\//, '');
  if (!fs.existsSync(f)) { problems.push('NO EXISTE ' + rel + ' (' + where + ')'); return false; }
  return true;
}

// 1) productos
const products = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
let sinFoto = 0, extProd = 0, okProd = 0;
for (const p of products) {
  const img = p.img || '';
  if (!img) { sinFoto++; problems.push('SIN FOTO: producto ' + p.id + ' ' + p.title); continue; }
  if (/^https?:/.test(img)) { extProd++; problems.push('EXTERNA: producto ' + p.id + ' ' + p.title + ' -> ' + img); continue; }
  if (checkLocal(img, 'producto ' + p.id)) okProd++;
}
console.log('PRODUCTOS ' + products.length + ': locales ' + okProd + ' | externas ' + extProd + ' | sin foto ' + sinFoto);

// 2) guias (datos)
const guides = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
let gExt = 0, gOk = 0;
for (const g of guides) {
  const img = g.image || '';
  if (!img) continue;
  if (/^https?:/.test(img)) { gExt++; problems.push('EXTERNA: guia ' + g.id + ' -> ' + img); }
  else if (checkLocal(img, 'guia ' + g.id)) gOk++;
}
console.log('GUIAS ' + guides.length + ': foto local ' + gOk + ' | externas ' + gExt);

// 3) ofertas
for (const file of ['data/deals.json', 'data/manual-deals.json']) {
  const raw = JSON.parse(fs.readFileSync(file, 'utf8'));
  const list = Array.isArray(raw) ? raw : raw.deals;
  let ext = 0, ok = 0;
  for (const d of list) {
    const img = d.img || '';
    if (!img) { problems.push('SIN FOTO: oferta ' + d.title + ' (' + file + ')'); continue; }
    if (/^https?:/.test(img)) { ext++; problems.push('EXTERNA: oferta ' + d.title + ' -> ' + img); }
    else if (checkLocal(img, 'oferta ' + d.title)) ok++;
  }
  console.log(file + ': ' + list.length + ' ofertas | locales ' + ok + ' | externas ' + ext);
}

// 4) paginas generadas
const pages = ['index.html', 'deals.html', 'deals_es.html', 'index_es.html']
  .filter(f => fs.existsSync(f))
  .concat(fs.readdirSync('guides').filter(f => f.endsWith('.html')).map(f => 'guides/' + f));
let pageImgs = 0, pageLocal = 0, pageBroken = 0;
for (const f of pages) {
  const s = fs.readFileSync(f, 'utf8');
  const re = /<img[^>]+src="([^"]+)"/g;
  let m;
  while ((m = re.exec(s))) {
    const u = m[1];
    pageImgs++;
    if (/^https?:/.test(u)) {
      if (!extImgs.has(u)) extImgs.set(u, new Set());
      extImgs.get(u).add(f);
    } else if (!u.startsWith('data:')) {
      pageLocal++;
      const rel = u.startsWith('../') ? u.slice(3) : u.replace(/^\//, '').split('?')[0];
      if (!fs.existsSync(rel)) { pageBroken++; problems.push('NO EXISTE ' + u + ' (' + f + ')'); }
    }
  }
}
console.log('PAGINAS ' + pages.length + ': imgs ' + pageImgs + ' | locales ' + pageLocal + ' | rotas ' + pageBroken + ' | URLs externas distintas ' + extImgs.size);

// 5) externas que quedan en las paginas (deben ser solo iconos/logos, no fotos de producto)
if (extImgs.size) {
  console.log('\nEXTERNAS QUE QUEDAN EN HTML:');
  for (const [u, files] of extImgs) {
    console.log('  ' + u.slice(0, 110) + '  [' + [...files].slice(0, 3).join(', ') + (files.size > 3 ? ' +' + (files.size - 3) : '') + ']');
  }
}

console.log('\nPROBLEMAS: ' + problems.length);
problems.slice(0, 20).forEach(p => console.log('  - ' + p));
