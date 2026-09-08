const fs = require('fs');
const g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const p = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
const a = Array.isArray(p) ? p : (p.products || []);
const byId = i => a.find(v => v.id === i);

const q = g.find(x => x.id === 'best-guitar-home-office');
console.log('TITLE:', q.title);
console.log('featured:', JSON.stringify(q.featuredProducts));
console.log('sections:');
(q.sections || []).forEach((s, i) => console.log('  sec' + i + ':', JSON.stringify((s.products || []).map(id => id + '=' + (byId(id) ? byId(id).title : '??')))));
console.log('productTable title:', q.productTable ? q.productTable.title : '(none)');
if (q.productTable) {
  console.log('  cols:', q.productTable.columns.length, (q.productTable.columns || []).map(c => c.title).join(' | '));
  console.log('  rows:', q.productTable.rows.length, 'valuesPerRow:', q.productTable.rows[0] ? q.productTable.rows[0].values.length : 0);
}
console.log('verdictProsCons length:', Array.isArray(q.verdictProsCons) ? q.verdictProsCons.length : 'n/a');

// check TEST_SHOP_BTN coverage for section products
const sIds = [...new Set((q.sections || []).flatMap(s => s.products || []))];
console.log('section product ids:', JSON.stringify(sIds));
sIds.forEach(id => {
  const x = byId(id);
  console.log('  ' + id + ': ' + (x ? x.title : '??'));
});
// verify money strings / stale mentions in prose (products mentioned by name but not in catalog)
const txt = JSON.stringify(q.sections.map(s => s.content).join(' '));
['Donner HUSH-I EVO2', 'Taylor GS Mini', 'Yamaha Pacifica 112V', 'Yamaha SLG200S', 'Yamaha SLG200N', 'Traveler Ultra-Light', 'Enya Nova Go Sonic', 'Lava ME 4'].forEach(n => {
  console.log('  prose mention "' + n + '":', (txt.match(new RegExp(n.replace(/[.*+?^$}{()|[\]\\-]/g, '\\$&'), 'g')) || []).length);
});
// leftover "$X/ea" or "(each)" price-with-ratio anomalies in verdicts
const rt = JSON.stringify(q.verdictProsCons);
console.log('verdict "$N" count:', (rt.match(/\$\d[\d.,]*/g) || []).length);
console.log('verdict "each" count:', (rt.match(/each/gi) || []).length);