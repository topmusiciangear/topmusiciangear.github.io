const fs = require('fs');
const rows = JSON.parse(fs.readFileSync('temp/amazon_audit.json', 'utf8'));

const noLink = rows.filter(r => !r.asin);
console.log('products with NO amazon product link:', noLink.length);
const byCat = {};
for (const r of noLink) byCat[r.id] = 0;
const products = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
const catOf = {};
for (const p of products) catOf[p.id] = p.category || '?';
const tally = {};
for (const r of noLink) tally[catOf[r.id]] = (tally[catOf[r.id]] || 0) + 1;
console.log('por categoria:', JSON.stringify(tally, null, 0));

const excluded = noLink.filter(r => r.exclude);
console.log('de ellos, con amazon en excludeStores:', excluded.length);

const queries = noLink.filter(r => !r.exclude).map(r => ({ id: String(r.id), q: r.title }));
fs.writeFileSync('temp/amazon_queries_missing.json', JSON.stringify(queries, null, 1));
console.log('queries written:', queries.length);

if (process.argv[2] === 'list') {
  noLink.slice(0, 40).forEach(r => console.log('  ' + r.id + ' | ' + r.title));
}
