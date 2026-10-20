const fs = require('fs');
const path = require('path');
const DATA = path.join(__dirname, '..', 'data');
const guides = JSON.parse(fs.readFileSync(path.join(DATA, 'guides.json'), 'utf8'));
const products = JSON.parse(fs.readFileSync(path.join(DATA, 'products.json'), 'utf8'));

const byId = {};
for (const p of products) if (p.id) byId[p.id] = p;

function name(p) {
  if (!p) return '???';
  return p.title_es || p.title || '???';
}

const out = [];
for (const g of guides) {
  const ids = [];
  for (const s of (g.sections || [])) {
    for (const pid of (s.products || [])) {
      if (typeof pid === 'number' && !ids.includes(pid)) ids.push(pid);
    }
  }
  out.push({
    id: g.id,
    title: g.title_es || g.title || '',
    products: ids.map(i => name(byId[i])),
  });
}

fs.writeFileSync(path.join(__dirname, 'guides_dump.json'), JSON.stringify(out, null, 2), 'utf8');
console.log('Guides:', out.length);
console.log(out.map(g => g.id + ' | ' + g.title + ' | ' + g.products.join(' ; ')).join('\n'));
