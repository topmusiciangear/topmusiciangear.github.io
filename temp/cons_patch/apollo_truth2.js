const dir = 'C:/Users/Daniel/projects/topmusiciangear';
const prods = require(dir + '/data/products.json');
const P = Array.isArray(prods) ? prods : (prods.products || []);
const gs = require(dir + '/data/guides.json');
const G = Array.isArray(gs) ? gs : (gs.guides || []);

console.log('=== UA / Apollo products in products.json (by title) ===');
for (const x of P) {
  if (!x) continue;
  const t = String(x.title || '').toLowerCase();
  const d = String(x.desc || '').toLowerCase();
  if (t.indexOf('apollo') >= 0 || d.indexOf('apollo') >= 0 || (x.brand && String(x.brand).toLowerCase().indexOf('universal audio') >= 0)) {
    console.log('  id=' + x.id +
      ' | title="' + x.title + '"' +
      ' | cat=' + x.category +
      ' | prices=' + JSON.stringify(x.prices) +
      ' | img=' + JSON.stringify(x.img) +
      ' | badges/oos: oos=' + JSON.stringify(x.oos) + ' badge=' + JSON.stringify(x.badge));
  }
}

console.log('\n=== Which guides EMBED one of the Apollo ids? (featuredProducts / productTable / verdictProsCons walking) ===');
for (const gr of G) {
  if (!gr || !gr.id) continue;
  const hits = [];
  const walk = (o, path) => {
    if (!o || typeof o !== 'object') return;
    if (Array.isArray(o)) { o.forEach((v, i) => walk(v, path + '[' + i + ']')); return; }
    for (const k of Object.keys(o)) {
      const v = o[k];
      if (typeof v === 'string' && /apollo (twin x|x16)/i.test(v)) hits.push(path + '.' + k + '="' + v.slice(0, 40) + '"');
      else walk(v, path + '.' + k);
    }
  };
  walk(gr, gr.id);
  if (hits.length) {
    console.log('\n--- guide ' + gr.id + ' | title="' + gr.title + '" | cat=' + gr.category);
    hits.slice(0, 6).forEach(h => console.log('    ' + h));
  }
}

console.log('\n=== featuredProducts linkage schema (wire format in guides.json) ===');
const sample = G.find(x => x && x.featuredProducts && x.featuredProducts.length);
if (sample) {
  console.log('sample guide: ' + sample.id);
  console.log(JSON.stringify(sample.featuredProducts[0], null, 1).slice(0, 900));
} else {
  console.log('(none)');
}
