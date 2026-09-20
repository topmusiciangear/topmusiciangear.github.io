const fs = require('fs');

function load(p) {
  const d = JSON.parse(fs.readFileSync(p, 'utf8'));
  return { file: p, data: d, arr: Array.isArray(d) ? d : (d.guides || d.products || []) };
}

const G = load('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
const P = load('C:/Users/Daniel/projects/topmusiciangear/data/products.json');

console.log('=== 1) products.json: exact shape of first 2 records (all keys + sample) ===');
for (const r of P.arr.slice(0, 2)) {
  console.log(JSON.stringify(r, null, 1).slice(0, 2200));
  console.log('------');
}

console.log('\n=== 2) Does ANY product record (any field) mention "apollo" / "twin x" / "x16" / "MT 48"? ===');
let foundBlob = 0;
for (const r of P.arr) {
  const b = JSON.stringify(r).toLowerCase();
  if (b.indexOf('apollo') >= 0 || b.indexOf('twin x') >= 0 || b.indexOf('mt 48') >= 0) {
    foundBlob++;
    console.log(' id=' + r.id + ' name=' + r.name + ' blobContainsApollo');
  }
}
console.log('blob-matches:', foundBlob, '| total products:', P.arr.length);

console.log('\n=== 3) guides.json: featuredProducts for best-interface & pro-interfaces (do they EMBED full product objects w/ prices+hrefs+image?) ===');
for (const id of ['best-interface', 'pro-interfaces', 'portable-interfaces', 'apollo-vs-babyface']) {
  const g = G.arr.find(x => x && x.id === id);
  if (!g) { console.log('--- ' + id + ': MISSING ---'); continue; }
  const fp = g.featuredProducts || [];
  console.log('--- ' + id + ': featuredProducts len=' + fp.length);
  for (const f of fp.slice(0, 12)) {
    if (!f) continue;
    console.log('   name=' + (f.name || '?') + ' | keys=' + Object.keys(f).join(','));
    if (f.name && String(f.name).toLowerCase().indexOf('apollo') >= 0) {
      console.log('   >>> FULL:' + JSON.stringify(f));
    }
  }
}
