const fs = require('fs');

const guides = Array.isArray(require('../../data/guides.json'))
  ? require('../../data/guides.json')
  : (require('../../data/guides.json').guides || []);
const rawProds = require('../../data/products.json');
const prods = Array.isArray(rawProds) ? rawProds : (rawProds.products || []);

console.log('=== A) every guide whose JSON blob mentions "apollo twin x" OR "apollo x16" ===');
for (const x of guides) {
  if (!x || !x.id) continue;
  const blob = JSON.stringify(x).toLowerCase();
  const hT = blob.indexOf('apollo twin x') >= 0;
  const h16 = blob.indexOf('apollo x16') >= 0;
  if (hT || h16) {
    console.log('guide ' + x.id + ' | title="' + x.title + '" | twinX=' + hT + ' | x16=' + h16);
    // locate which sub-fields mention them
    const locs = [];
    if (chk(x, 'Apollo Twin X')) locs.push('featuredProducts');
    if (chk(x, 'Apollo x16')) locs.push('featuredProducts');
    console.log('   note: manual field check below');
  }
}
function chk(guide, needle) {
  return JSON.stringify(guide.featuredProducts || []).toLowerCase().indexOf(needle.toLowerCase()) >= 0;
}

console.log('\n=== B) UA products in products.json (name contains "apollo" or "universal audio") ===');
for (const x of prods) {
  const n = (x.name || '').toLowerCase();
  if (n.indexOf('apollo') < 0 && n.indexOf('universal audio') < 0) continue;
  console.log('id=' + x.id +
    ' | name=' + x.name +
    ' | cat=' + x.category +
    ' | prices=' + JSON.stringify(x.prices || null) +
    ' | hrefs=' + JSON.stringify(x.hrefs || null) +
    ' | img=' + JSON.stringify(x.img || x.image || null) +
    ' | cover=' + JSON.stringify(x.cover || null));
}

console.log('\n=== C) product->guide linkage: how does the site know a product belongs to a guide? ===');
// Look at how build-guides renders: check a known cross-link (featuredProducts entries carry {id})
const pi = guides.find(x => x && x.id === 'portable-interfaces');
console.log('portable-interfaces.featuredProducts[0] =', JSON.stringify((pi.featuredProducts || [])[0] || null));
console.log('portable-interfaces.productTable[0]    =', JSON.stringify((pi.productTable || [])[0] || null));
console.log('one verdictProsCons entry:', JSON.stringify((pi.verdictProsCons || [])[0] || null).slice(0, 1200));
