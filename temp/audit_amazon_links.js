const fs = require('fs');
const products = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
let issues = 0;
for (const p of products) {
  const url = p.stores && p.stores.amazon;
  if (!url) continue;
  const isDp = /\/dp\/[A-Z0-9]{10}/.test(url);
  const isSearch = url.includes('amazon.com/s?k=');
  const hasTag = url.includes('tag=topmusicg-20');
  if (!isDp && !isSearch) {
    console.log('WARN unusual amazon url', p.id, p.title, url);
    issues++;
  }
  if (isDp && !hasTag) {
    console.log('MISSING TAG', p.id, p.title, url);
    issues++;
  }
  if (isSearch && !url.includes(encodeURIComponent(p.title.split(' ')[0]))) {
    // loose check
  }
}
console.log('Total products with amazon:', products.filter(p=>p.stores&&p.stores.amazon).length);
console.log('Issues:', issues);
