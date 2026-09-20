const fs = require('fs');
const repo = 'C:/Users/Daniel/projects/topmusiciangear';

function load(p) { return JSON.parse(fs.readFileSync(repo + '/' + p, 'utf8')); }
const P = load('data/products.json');
const prods = Array.isArray(P) ? P : (P.products || []);
const G = load('data/guides.json');
const guides = Array.isArray(G) ? G : (G.guides || []);

console.log('===== 1) the EXACT products.json records for the 8 products the user wants in the new premium guide =====');
const want = [
  ['apollo x16 gen 2', 'Apollo x16 Gen 2 (candidate: MIGRATE to new guide)'],
  ['universal audio apollo twin x', 'Universal Audio Apollo Twin X (candidate UA rack/desktop)'],
  ['apollo x8p', 'Apollo x8p Gen 2 (user asked)'],
  ['neumann mt 48', 'Neumann MT 48'],
  ['mt 48', 'MT 48 alt'],
  ['rme babyface pro fs', 'RME Babyface Pro FS'],
  ['rme fireface ufx iii', 'RME Fireface UFX III'],
  ['apogee symphony i/o', 'Apogee Symphony I/O'],
  ['audient oria', 'Audient ORIA'],
  ['lynx aurora-n', 'Lynx Aurora-n'],
];
for (const [q, label] of want) {
  const hits = prods.filter(x => x && (x.title || '').toLowerCase().indexOf(q) >= 0);
  if (!hits.length) { console.log('  [' + label + '] NONE (q="' + q + '")'); continue; }
  for (const h of hits) {
    console.log('  [' + label + '] id=' + h.id + ' | "' + h.title + '" | cat=' + h.category +
      ' | price=' + JSON.stringify(h.price) + ' | badge=' + JSON.stringify(h.badge) +
      ' | img=' + JSON.stringify(h.img) +
      ' | stores=' + JSON.stringify((h.stores || h.hrefs || {})) +
      ' | prices=' + JSON.stringify(h.prices));
  }
}

console.log('\n===== 2) which guide TODAY embeds each of the UA/Apollo products (featuredProducts + verdictProsCons + productTable walk) =====');
for (const name of ['Apollo Twin X Gen 2', 'Apollo x16 Gen 2']) {
  const hits = [];
  for (const gr of guides) {
    if (!gr || !gr.id) continue;
    const c = JSON.stringify(gr).toLowerCase();
    if (c.indexOf(name.toLowerCase()) < 0) continue;
    // locate in featuredProducts[]
    const fpLocs = [];
    (gr.featuredProducts || []).forEach((f, i) => {
      const fname = (f && (f.name || f.title)) || '';
      if (fname.toLowerCase().indexOf(name.toLowerCase()) >= 0) fpLocs.push(i);
    });
    const fpHits = fpLocs.length ? 'featuredProducts@[' + fpLocs.join(',') + ']' : '';
    const vpLoc = (gr.verdictProsCons || []).findIndex(v => v && (v.name || '').toLowerCase().indexOf(name.toLowerCase()) >= 0);
    const vpS = vpLoc >= 0 ? 'verdictProsCons@' + vpLoc : '';
    const tb = (gr.productTable || []).filter(r => r && (r.name || r.title || '').toLowerCase().indexOf(name.toLowerCase()) >= 0).length;
    const tbS = tb ? 'productTableRows=' + tb : '';
    console.log('  guide id=' + gr.id + ' | "' + (gr.title || '').slice(0, 40) + '" | ' +
      [fpHits, vpS, tbS].filter(Boolean).join(' + ') || '(mentions in prose only)');
  }
}

console.log('\n===== 3) portable-interfaces: does it KEEP the 2 UA (does the user\'s claim match the LIVE guide)? Show featuredProducts names =====');
const pi = guides.find(x => x && x.id === 'portable-interfaces');
if (pi) {
  console.log('  featuredProducts=' + JSON.stringify((pi.featuredProducts || []).map(f => (f && (f.name || f.title)) || '?')));
  console.log('  verdictProsCons=' + JSON.stringify((pi.verdictProsCons || []).map(v => v && v.name)));
  console.log('  productTable rows=' + (pi.productTable || []).length + ' -> ' + JSON.stringify((pi.productTable || []).map(r => r && (r.name || r.title))));
}

console.log('\n===== 4) what image does the user want as the NEW guide cover? (= Apollo x16 Gen 2 product image) =====');
const x16 = prods.find(x => x && x.id === 182);
console.log('  x16(img)=' + JSON.stringify(x16 && x16.img));
console.log('  x16(img_ubi): any of img/img_es/env? -> ' + JSON.stringify((x16 && (x16.img_es || x16.img || x16.hero)) || null));
