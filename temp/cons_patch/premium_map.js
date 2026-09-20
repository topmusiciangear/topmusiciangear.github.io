const P = require('../../data/products.json');
const G = require('../../data/guides.json');
const prods = Array.isArray(P) ? P : (P.products || []);
const guides = Array.isArray(G) ? G : (G.guides || []);

console.log('=== 1) find Apollo Twin X Gen 2 / Apollo x16 Gen 2 / premium 7 in products.json (by title) ===');
const want = ['apollo twin x gen 2', 'apollo x16 gen 2', 'apollo x8p', 'apollo x8p gen 2',
  'neumann mt 48', 'mt 48', 'rme babyface pro fs', 'babyface pro fs', 'rme fireface ufx iii',
  'ufx iii', 'apogee symphony i/o', 'symphony i/o', 'audient oria', 'oria', 'lynx aurora-n', 'aurora-n'];
for (const q of want) {
  const hits = prods.filter(x => x && (x.title || '').toLowerCase().includes(q));
  console.log('[' + q + '] -> ' + hits.length);
  for (const h of hits) {
    console.log('   id=' + h.id + ' | title="' + h.title + '" | cat=' + h.category +
      ' | price=' + h.price + ' | badge=' + h.badge +
      ' | img=' + JSON.stringify(h.img) +
      ' | stores=' + JSON.stringify(h.stores) +
      ' | has desc_es=' + !!(h.desc_es));
  }
}

console.log('\n=== 2) In guides.json: WHICH guide embeds each Apollo currently? (walk featuredProducts array) ===');
for (const gr of guides) {
  if (!gr || !gr.id) continue;
  const fp = gr.featuredProducts;
  if (!Array.isArray(fp) || !fp.length) continue;
  const ua = fp.filter(f => f && typeof f === 'object' &&
    (JSON.stringify(f).toLowerCase().indexOf('apollo') >= 0));
  if (ua.length) {
    console.log('guide id=' + gr.id + ' -> embeds UA featuredProducts=' + ua.length);
    for (const u of ua) {
      console.log('   ' + JSON.stringify({ name: u.name, prices: u.prices, hrefs: u.hrefs, img: u.img }));
    }
  }
}

console.log('\n=== 3) verdictProsCons of portable-interfaces (does it list the 2 Apollo?) ===');
const pi = guides.find(x => x && x.id === 'portable-interfaces');
if (pi) {
  console.log((pi.verdictProsCons || []).map(v => v.name).join(' | '));
  console.log('productTable cols:', JSON.stringify((pi.productTable || []).map(r => r.name || r.Label)));
}

console.log('\n=== 4) What does "pro-interfaces" guide embed? (the closest premium one, cat=production) ===');
const prI = guides.find(x => x && x.id === 'pro-interfaces');
if (prI) {
  console.log('title: ' + prI.title);
  console.log('featuredProducts:', (prI.featuredProducts || []).length);
  for (const f of (prI.featuredProducts || [])) console.log('   ' + JSON.stringify({ name: f.title || f.name, prices: f.prices, hrefs: f.hrefs, img: f.img }));
  console.log('productTable cols:', JSON.stringify((prI.productTable || []).map(r => r.name || r.Label || r.title)));
}
