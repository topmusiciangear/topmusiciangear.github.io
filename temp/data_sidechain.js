const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(BASE+'data/guides.json','utf8'));
const P = JSON.parse(fs.readFileSync(BASE+'data/products.json','utf8'));
const arr = Array.isArray(P) ? P : P.products;
const b = fs.readFileSync(BASE+'build-guides.js','utf8');

console.log('=== TODAS LAS FILAS de sidechain-modulation-plugins.comparison ===');
const c = guides.find(g=>g.id==='sidechain-modulation-plugins').comparison;
console.log('headers: ' + JSON.stringify(c.headers));
c.rows.forEach((r,i) => {
  console.log('\n  [' + i + '] ' + r.label + ' / ' + r.label_es);
  ['val','val2','val3','val4','val5'].forEach(k => { if (r[k] !== undefined) console.log('       ' + k.padEnd(5) + ' = ' + JSON.stringify(r[k])); });
});

console.log('\n\n=== FICHA de los 2 productos que deben entrar ===');
[389, 390].forEach(id => {
  const p = arr.find(x=>x.id===id);
  console.log('\n--- id ' + id + ': ' + p.title);
  console.log('  price $' + p.price + ' | cat ' + p.category);
  console.log('  desc: ' + p.desc);
  console.log('  desc_es: ' + p.desc_es);
  console.log('  stores: ' + Object.keys(p.stores||{}).join(', '));
  Object.keys(p.stores||{}).forEach(k => console.log('     ' + k + ': ' + p.stores[k]));
  const m = b.match(new RegExp('(^|\\n)\\s*' + id + ':\\s*\\{[\\s\\S]*?\\n\\s*\\},', 'm'));
  console.log('  TEST_SHOP_BTN: ' + (m ? m[0].trim().replace(/\s+/g,' ') : 'NO TIENE'));
});

console.log('\n\n=== texto de la guia que menciona los productos equivocados ===');
const g = guides.find(x=>x.id==='sidechain-modulation-plugins');
const texto = JSON.stringify({ v: g.verdict, ve: g.verdict_es, c: g.conclusion, ce: g.conclusion_es, i: g.intro, ie: g.intro_es, fs: g.featuredSnippet });
['RC-20', 'Transit'].forEach(p => {
  const n = (texto.match(new RegExp(p, 'g')) || []).length;
  console.log('  "' + p + '" aparece ' + n + ' veces en verdict/conclusion/intro/snippet');
});