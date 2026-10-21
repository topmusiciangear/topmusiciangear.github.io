const fs = require('fs');
const s = fs.readFileSync('build-guides.js', 'utf8');
const i = s.indexOf('650:');
console.log('--- TEST_SHOP_BTN 650 ---');
console.log(s.slice(i, i + 400).split('\n').slice(0, 4).join('\n'));

const guides = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const g = guides.find(x => x.id === 'monitor-setup');
console.log('\n--- monitor-setup: featuredProducts ---');
console.log(JSON.stringify(g.featuredProducts));
for (const [i2, sec] of (g.sections || []).entries()) {
  const j = JSON.stringify(sec);
  if (/mopad/i.test(j) || (sec.products || []).includes(650)) {
    console.log('\nseccion ' + i2 + ' products=' + JSON.stringify(sec.products));
    console.log('heading: ' + sec.heading);
    console.log('heading_es: ' + sec.heading_es);
    console.log('body: ' + (sec.body || '').slice(0, 700));
    console.log('body_es: ' + (sec.body_es || '').slice(0, 700));
  }
}
console.log('\n--- conclusion / verdict con MoPAD ---');
for (const k of ['conclusion', 'conclusion_es', 'verdict', 'verdict_es']) {
  if (g[k] && /mopad/i.test(g[k])) console.log(k + ': ' + g[k].slice(0, 600));
}
console.log('\n--- productTable filas con MoPAD ---');
for (const row of (g.productTable || [])) {
  const j = JSON.stringify(row);
  if (/mopad/i.test(j)) console.log(JSON.stringify(row, null, 1));
}
console.log('\n--- faq con MoPAD ---');
for (const f of (g.faq || [])) {
  const j = JSON.stringify(f);
  if (/mopad/i.test(j)) console.log(JSON.stringify(f, null, 1));
}
