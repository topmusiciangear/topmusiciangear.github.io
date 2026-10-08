const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
const P = JSON.parse(fs.readFileSync(DIR + 'data/products.json', 'utf8'));
const bg = fs.readFileSync(DIR + 'build-guides.js', 'utf8');
const G = JSON.parse(fs.readFileSync(DIR + 'data/guides.json', 'utf8'));
let fails = 0;
function hasStore(id, store, part) {
  const p = P.find(x => x.id === id);
  const u = p && p.stores && p.stores[store];
  const ok = !!u && (!part || u.includes(part));
  if (!ok) { fails++; console.log(`FAIL products.json ${id} [${store}]estimado '${part || ''}' got '${u}'`); }
  else console.log(`ok products.json ${id} [${store}]`);
}
function hasPrice(id, store, price) {
  const m = bg.match(new RegExp('  ' + id + ': \\{[\\s\\S]*?\\n  \\},?'));
  if (!m) { fails++; console.log(`FAIL TEST entry ${id} missing`); return; }
  // normalize \\u escapes the way JS would
  const norm = m[0].replace(/\\u00A3/g, '£').replace(/\\u20AC/g, '€');
  const ok = norm.includes(store + ': "' + price + '"');
  if (!ok) { fails++; console.log(`FAIL TEST ${id} [${store}] estimado '${price}'`); }
  else console.log(`ok TEST ${id} [${store}] = ${price}`);
}
// 1. HD490 (24): zzounds $499, G4M £355
hasPrice(24, 'zzounds', '$499.00'); hasPrice(24, 'gear4music', '£355.00');
// 2. DT990 (56): zzounds $150, G4M £138
hasPrice(56, 'zzounds', '$150.00'); hasPrice(56, 'gear4music', '£138.00');
// 3. R70xa (423): G4M £305
hasPrice(423, 'gear4music', '£305.00');
// 4. NDH30 (424): MS €545, Andertons £525 + URL
hasPrice(424, 'musicstore', '€545.00'); hasPrice(424, 'andertons', '£525.00');
hasStore(424, 'andertons', 'neumann-ndh30-open-back-studio-headphones');
// 5/6. open-headphones swap: 602 + 603 in featured, no Sundara/560S
const oh = G.find(x => x.id === 'open-headphones');
console.log(('ok open featured ' + JSON.stringify(oh.featuredProducts)).slice(0, 80));
if (JSON.stringify(oh).match(/Sundara|Hifiman|HD 560S/)) { fails++; console.log('FAIL open-headphones strays'); } else console.log('ok open-headphones no strays');
// 7. MKII photo + MS €499
hasStore(603, 'musicstore', 'REC0016806-000'); hasPrice(603, 'musicstore', '€499.00');
const p603 = P.find(x => x.id === 603);
if (p603.img !== 'https://r2.gear4music.com/media/115/1159848/1200/preview.jpg') { fails++; console.log('FAIL 603 img ' + p603.img); } else console.log('ok 603 img user photo');
// 8. DT900: zzounds $280, MS €239
hasPrice(602, 'zzounds', '$280.00'); hasPrice(602, 'musicstore', '€239.00');
// 9. K240 (604) in budget guide
const bh = G.find(x => x.id === 'budget-headphones');
if (!bh.featuredProducts.includes(604)) { fails++; console.log('FAIL budget missing 604'); } else console.log('ok budget has 604');
hasPrice(604, 'zzounds', '$89.00'); hasPrice(604, 'andertons', '£58.00'); hasPrice(604, 'gear4music', '£58.00');
// 10. HD280 (605): MS €89, Andertons £75 + URL + in budget guide
hasPrice(605, 'musicstore', '€89.00'); hasPrice(605, 'andertons', '£75.00');
hasStore(605, 'andertons', 'sennheiser-hd280-pro-headphones'); hasStore(605, 'musicstore', 'REC0012791-000');
if (!bh.featuredProducts.includes(605)) { fails++; console.log('FAIL budget missing 605'); } else console.log('ok budget has 605');
// 11. Focal 421: G4M £169 + /2BDG, zzounds $329, andertons £169
hasPrice(421, 'gear4music', '£169.00'); hasPrice(421, 'zzounds', '$329.00'); hasPrice(421, 'andertons', '£169.00');
hasStore(421, 'gear4music', '/2BDG'); hasStore(421, 'zzounds', 'FOLFOPROLISPRO'); hasStore(421, 'andertons', 'focal-listen-pro');
console.log(fails === 0 ? 'ALL DATA OK' : fails + ' FAILURES');
