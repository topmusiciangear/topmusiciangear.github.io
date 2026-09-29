const fs = require('fs');
const products = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
let withAmz = 0, noAmz = 0;
const domains = {};
const patterns = {};
for (const p of products) {
  const u = p.stores && p.stores.amazon;
  if (!u) { noAmz++; continue; }
  withAmz++;
  let host = 'none';
  try { host = new URL(u).host; } catch (e) { host = 'UNPARSEABLE'; }
  domains[host] = (domains[host] || 0) + 1;
  let shape = 'OTHER';
  if (/\/dp\/[A-Z0-9]{10}/.test(u)) shape = '/dp/ASIN';
  else if (/\/gp\/product\//.test(u)) shape = '/gp/product/';
  else if (/\/s\?k=/.test(u)) shape = '/s?k= SEARCH';
  else if (/\/product\//.test(u)) shape = '/product/';
  patterns[shape] = (patterns[shape] || 0) + 1;
}
console.log('total products: ' + products.length);
console.log('with amazon link: ' + withAmz);
console.log('without amazon link: ' + noAmz);
console.log('\nDOMAINS:'); Object.entries(domains).sort((a, b) => b[1] - a[1]).forEach(([k, v]) => console.log('  ' + String(v).padStart(4) + '  ' + k));
console.log('\nURL SHAPES:'); Object.entries(patterns).sort((a, b) => b[1] - a[1]).forEach(([k, v]) => console.log('  ' + String(v).padStart(4) + '  ' + k));
