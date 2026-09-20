const fs = require('fs');
const dir = 'C:/Users/Daniel/projects/topmusiciangear';

function load(f) {
  return require(dir + '/' + f);
}

console.log('========== A) does guides.json portable-interfaces embed ANY apollo/twin x? (exact field walk) ==========');
const guides = load('data/guides.json');
const arrG = Array.isArray(guides) ? guides : (guides.guides || []);
const pi = arrG.find(x => x && x.id === 'portable-interfaces');
console.log('portable-interfaces exists:', !!pi);
if (pi) {
  console.log('featuredProducts:', JSON.stringify(pi.featuredProducts));
  console.log('productTable isArray:', Array.isArray(pi.productTable));
}
// Also: any guide id containing "interfac" whose productTable mentions apollo
console.log('\nGuides mentioning "universal audio" in any string field (top 40 chars of that field):');
for (const gN of arrG) {
  if (!gN || !gN.id) continue;
  for (const k of Object.keys(gN)) {
    const v = gN[k];
    if (typeof v === 'string' && v.toLowerCase().indexOf('universal audio') >= 0) {
      console.log('  [' + gN.id + '].' + k + ' = "' + v.slice(0, 50) + '"');
    }
  }
}

console.log('\n========== B) products.json: EVERY product that has a UA/Apollo-ish name OR image OR blog mention ==========');
const pp = load('data/products.json');
const arrP = Array.isArray(pp) ? pp : (pp.products || (pp.data || []));
console.log('products.json count: ' + arrP.length);
const fl = arrP.map ? arrP.map : null;
for (const x of (arrP || [])) {
  if (!x) continue;
  const blob = JSON.stringify(x).toLowerCase();
  if (blob.indexOf('apollo') >= 0 || blob.indexOf('universal audio') >= 0) {
    console.log('  MATCH: id=' + x.id + ' name=' + x.name + ' | keys=' + Object.keys(x).join(','));
    console.log('      prices=' + JSON.stringify(x.prices));
    console.log('      full=' + JSON.stringify(x).slice(0, 700));
  }
}

console.log('\n========== C) how does build-guides.js/featuredProducts link a product to a guide? (schema of featuredProducts) ==========');
// find sample featuredProducts with structure on a known guide
const anyG = arrG.find(x => x && Array.isArray(x.featuredProducts) && x.featuredProducts.length);
if (anyG) {
  console.log('sample guide: ' + anyG.id);
  console.log(JSON.stringify(anyG.featuredProducts[0], null, 1).slice(0, 1200));
} else {
  console.log('(no guide uses featuredProducts array)');
}

console.log('\n========== D) guide images/cover strategy: where are cover images stored? ==========');
// collect image/cover fields referencing UA or 'gear4music' r2
const imgs = new Set();
for (const x of (arrP || [])) {
  if (!x) continue;
  for (const k of ['image', 'img', 'cover', 'cover_img', 'hero_img']) {
    const v = x[k];
    if (typeof v === 'string') imgs.add(k + '=' + v);
  }
}
console.log('distinct image-grep-able product covers (first 15):');
[...imgs].slice(0, 15).forEach(s => console.log('  ' + s));
