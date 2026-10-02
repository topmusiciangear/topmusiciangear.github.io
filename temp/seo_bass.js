const fs = require('fs');
const G = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const P = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));

// 1. Ratings (verified 02/10/2026)
const r531 = P.find(x => x.id === 531);
r531.rating = 4.5; r531.reviews = 49;
const r532 = P.find(x => x.id === 532);
r532.rating = 4.6; r532.reviews = 16;
fs.writeFileSync('data/products.json', JSON.stringify(P, null, 2));

// 2. Guide fixes
const g = G.find(x => x.id === 'best-bass-home-office');
g.titleTag = '10 Basses for Home Office & Travel (2026 Comparison)';
g.description = '10 desk-friendly basses for home offices compared: EHB1000 leads headless, Minion cheapest at $219.99. Specs, prices and verdict.';
g.description_es = '10 bajos de escritorio comparados: EHB1000 lidera, Minion el más barato a $219.99. Specs, precios y veredicto. (comparativa 2026)';
const xt = g.verdictProsCons.find(v => v.name === 'Steinberger Spirit XT-2 Bass');
xt.cons[2] = 'Fret edges and factory setup may need attention';
xt.cons_es[2] = 'Trastes y ajuste de fábrica pueden pedir atención';
const ub = g.verdictProsCons.find(v => v.name === 'Kala U-Bass Solid Body');
ub.cons[1] = 'Small tuners take getting used to';
ub.cons_es[1] = 'Clavijas pequeñas piden acostumbrarse';

// 3. Incoming links
['beginner-bass-guitars', 'best-bass-practice-amps', 'fender-bass-guide'].forEach(id => {
  const o = G.find(x => x.id === id);
  if (o && o.relatedGuides && !o.relatedGuides.includes('best-bass-home-office')) o.relatedGuides.push('best-bass-home-office');
});
fs.writeFileSync('data/guides.json', JSON.stringify(G, null, 2));
const gg = JSON.parse(fs.readFileSync('data/guides.json', 'utf8')).find(x => x.id === 'best-bass-home-office');
console.log('titleTag: ' + gg.titleTag.length + 'ch | desc: ' + gg.description.length + 'ch | desc_es: ' + gg.description_es.length + 'ch');
