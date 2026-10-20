// Lista las fotos que siguen dependiendo de una web externa y en que guias salen.
const fs = require('fs');
const pages = fs.readdirSync('guides').filter(f => f.endsWith('.html'));
const found = new Map();

for (const f of pages) {
  const s = fs.readFileSync('guides/' + f, 'utf8');
  const re = /<img[^>]+src="(https?:\/\/(?!topmusiciangear\.com)[^"]+\.(?:jpe?g|png|webp)[^"]*)"/gi;
  let m;
  while ((m = re.exec(s))) {
    if (!found.has(m[1])) found.set(m[1], new Set());
    found.get(m[1]).add(f);
  }
}

console.log('fotos externas pendientes: ' + found.size);
for (const [u, files] of found) {
  console.log('\n' + u);
  console.log('  paginas: ' + [...files].join(', '));
}

// productos afectados
const prods = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
for (const p of prods) {
  for (const key of ['img', 'image']) {
    const v = p[key];
    if (typeof v === 'string' && /^https?:\/\//.test(v)) {
      console.log('\nproducto id ' + p.id + ' (' + p.title + ') campo ' + key + ': ' + v);
    }
  }
}
const guides = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
for (const g of guides) {
  if (typeof g.image === 'string' && /^https?:\/\//.test(g.image)) {
    console.log('guia ' + g.id + ' image: ' + g.image);
  }
}
