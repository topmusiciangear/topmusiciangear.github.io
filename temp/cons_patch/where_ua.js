const fs = require('fs');
const pr = require('../../data/products.json');
const prods = Array.isArray(pr) ? pr : (pr.products || []);
const g = require('../../data/guides.json');
const guides = Array.isArray(g) ? g : (g.guides || []);

console.log('=== 1) Search ALL guides.data for "Apollo x16" and "Apollo Twin X" (where do they live) ===');
for (const guide of guides) {
  if (!guide || !guide.id) continue;
  const blob = JSON.stringify(guide).toLowerCase();
  const has16 = blob.indexOf('apollo x16') >= 0;
  const hasTwin = blob.indexOf('apollo twin x') >= 0;
  if (has16 || hasTwin) {
    console.log('guide id=' + guide.id + ' | has x16=' + has16 + ' | has TwinX=' + hasTwin);
  }
}

console.log('\n=== 2) products.json: every UA product + its category + prices/hrefs ===');
for (const x of prods) {
  if (!x || !x.name) continue;
  const n = x.name.toLowerCase();
  if (n.indexOf('apollo') >= 0 || n.indexOf('universal audio') >= 0) {
    console.log('id=' + x.id + ' | name=' + x.name + ' | cat=' + x.category +
      ' | prices=' + JSON.stringify(x.prices || null) +
      ' | hrefs=' + JSON.stringify(x.hrefs || null) +
      ' | image=' + JSON.stringify(x.image || null) +
      ' | guideId?=' + JSON.stringify(x.guideId || x.guide || null));
  }
}

console.log('\n=== 3) portable-interfaces guide: does it embed UA anywhere (productTable/sections/faq/verdict)? ===');
const pi = guides.find(x => x && x.id === 'portable-interfaces');
if (pi) {
  const keys = Object.keys(pi);
  console.log('keys:', keys.join(', '));
  const blob = JSON.stringify(pi).toLowerCase();
  console.log('has "apollo twin x" in portable-interfaces blob:', blob.indexOf('apollo twin x') >= 0);
  console.log('has "apollo x16" in portable-interfaces blob:', blob.indexOf('apollo x16') >= 0);
}

console.log('\n=== 4) all distinct product name->guide links: which field maps a product to a guide? ===');
const sample = prods[0] || {};
console.log('product keys:', Object.keys(sample).join(', '));
// find products that have a "guideId"-like field
const withLink = prods.filter(x => x && (x.guideId || x.guide || x.guides));
console.log('products with guide-link field:', withLink.length);
for (const x of withLink.slice(0, 10)) {
  console.log('  id=' + x.id + ' name=' + x.name + ' -> ' + JSON.stringify(x.guideId || x.guide || x.guides));
}
