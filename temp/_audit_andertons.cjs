const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const products = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'products.json'), 'utf8'));
const bj = fs.readFileSync(path.join(ROOT, 'build-guides.js'), 'utf8');
const m = bj.match(/const TEST_SHOP_BTN = \{([\s\S]*?)\n\s*\};function shopButtonsTest/);
if (!m) { console.error('NO MATCH TEST_SHOP_BTN'); process.exit(1); }
const cfg = new Function('return ({' + m[1] + '});')();

const rows = [];
for (const p of products) {
  const c = cfg[p.id] || {};
  const pr = (c.prices && c.prices['andertons']) || null;
  const url = (p.stores && p.stores['andertons']) || null;
  const oos = (c.oos || []).includes('andertons');
  const na = (c.na || []).includes('andertons');
  rows.push({ id: p.id, title: p.title, price: pr, url, oos, na });
}

const withAny = rows.filter(r => r.price || r.url || r.oos || r.na);
const priceNoUrl = rows.filter(r => r.price && !r.url && !r.oos && !r.na);
const urlNoPrice = rows.filter(r => r.url && !r.price && !r.oos && !r.na);
const both = rows.filter(r => r.price && r.url && !r.oos && !r.na);
const oosList = withAny.filter(r => r.oos);
const naList = withAny.filter(r => r.na);
const priceOnlyButOos = rows.filter(r => r.price && r.oos);
const urlOnlyButOos = rows.filter(r => r.url && r.oos);

console.log('TOTAL productos:', products.length);
console.log('Con algo de Andertons (price/url/oos/na):', withAny.length);
console.log('');
console.log('=== A) PRECIO SIN URL (price en TEST_SHOP_BTN, sin stores.andertons en products.json) ===', priceNoUrl.length);
for (const r of priceNoUrl) console.log(`  ${r.id}\t${r.title}\t${r.price}`);
console.log('');
console.log('=== B) URL SIN PRECIO (stores.andertons en products.json, sin price andertons en TEST_SHOP_BTN) ===', urlNoPrice.length);
for (const r of urlNoPrice) console.log(`  ${r.id}\t${r.title}\t${r.url}`);
console.log('');
console.log('=== C) PRECIO + URL (ambos presentes; falta validar que la URL no esté muerta como KRK) ===', both.length);
for (const r of both) console.log(`  ${r.id}\t${r.title}\t${r.price}\t${r.url}`);
console.log('');
console.log('=== D) PRECIO presente pero andertons en oos (precio innecesario) ===', priceOnlyButOos.length);
for (const r of priceOnlyButOos) console.log(`  ${r.id}\t${r.title}\t${r.price}`);
console.log('');
console.log('=== E) oos / na ===', 'oos:', oosList.length, 'na:', naList.length);
for (const r of oosList) console.log(`  oos ${r.id}\t${r.title}`);
for (const r of naList) console.log(`  na  ${r.id}\t${r.title}`);