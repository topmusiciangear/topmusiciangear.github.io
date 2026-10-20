const fs = require('fs');
const products = JSON.parse(fs.readFileSync('data/products.json', 'utf8').replace(/^\ufeff/, ''));
const pList = Array.isArray(products) ? products : (products.products || []);
const guides = JSON.parse(fs.readFileSync('data/guides.json', 'utf8').replace(/^\ufeff/, ''));
const gList = Array.isArray(guides) ? guides : (guides.guides || []);

const urls = new Map();
function add(u, src) {
  if (!u || typeof u !== 'string') return;
  if (!/^https?:/i.test(u)) return;
  if (!urls.has(u)) urls.set(u, new Set());
  urls.get(u).add(src);
}

for (const p of pList) add(p.img, 'products.img#' + p.id);

for (const g of gList) {
  add(g.image, 'guides.image#' + g.id);
  // buscar <img src="..."> dentro de cualquier campo de texto
  const walk = (v, path) => {
    if (typeof v === 'string') {
      const re = /<img[^>]+src=["']([^"']+)["']/gi;
      let m;
      while ((m = re.exec(v))) add(m[1], 'guides.' + path + '#' + g.id);
    } else if (Array.isArray(v)) {
      v.forEach((x, i) => walk(x, path + '[' + i + ']'));
    } else if (v && typeof v === 'object') {
      for (const k of Object.keys(v)) walk(v[k], path + '.' + k);
    }
  };
  walk(g, '');
}

const list = [...urls.entries()];
const byHost = {};
for (const [u, srcs] of list) {
  let h = '?';
  try { h = new URL(u).host; } catch (e) { h = 'malformada'; }
  byHost[h] = (byHost[h] || 0) + 1;
}
console.log('URLs externas unicas:', list.length);
console.log(Object.entries(byHost).sort((a, b) => b[1] - a[1]).map(([h, n]) => n + ' ' + h).join('\n'));
fs.writeFileSync('temp/img_manifest.json', JSON.stringify(list.map(([u, s]) => ({ url: u, refs: [...s] })), null, 1));
console.log('-> temp/img_manifest.json');
