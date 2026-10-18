const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';

// ---- A. ultimas 3 menciones de Eris E4.5 ----
const rg = B + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(rg, 'utf8'));
const g = guides.find(x => x.id === 'best-home-studio-speakers');
const fixes = [
  ['The PreSonus Eris E4.5 is quoted at 55 Hz to 20 kHz. The Mackie CR4.5 reaches 55 Hz.',
   'The Mackie CR4.5 is quoted at 55 Hz to 20 kHz and the M-Audio BX4 at 69 Hz.'],
  ['El PreSonus Eris E4.5 está citado como 55 Hz a 20 kHz. El Mackie CR4.5 llega a 55 Hz.',
   'El Mackie CR4.5 está citado como 55 Hz a 20 kHz y el M-Audio BX4 como 69 Hz.'],
  ['the extra thirty dollars for the Eris E4.5 buys you a 4.5-inch driver instead of a 3.5-inch one',
   'the extra thirty dollars buys you a 4.5-inch driver instead of a 3.5-inch one']
];
let n = 0;
const rec = o => {
  if (typeof o === 'string') { let t = o; for (const [a, b] of fixes) if (t.includes(a)) { t = t.split(a).join(b); n++; } return t; }
  if (Array.isArray(o)) return o.map(rec);
  if (o && typeof o === 'object') { const s = {}; for (const k of Object.keys(o)) s[k] = rec(o[k]); return s; }
  return o;
};
const c = rec(g);
Object.keys(c).forEach(k => { g[k] = c[k]; });
fs.writeFileSync(rg, JSON.stringify(guides, null, 2), 'utf8');
console.log('A. Eris E4.5 restantes -> ' + ((JSON.stringify(g).match(/Eris E4\.5/g) || []).length) + ' (sustituciones: ' + n + ')');

// ---- B. ENLACES AMAZON INCORRECTOS ----
const rp = B + 'data/products.json';
const products = JSON.parse(fs.readFileSync(rp, 'utf8'));
const get = id => products.find(x => x.id === id);

const cambios = [];

// B1. AcouFoam: marca propia de Gear4music, no existe en Amazon. Quitar enlace.
const acou = get(173);
if (acou.stores.amazon) {
  delete acou.stores.amazon;
  cambios.push('173 AcouFoam 6: QUITADO enlace Amazon (era B0002E4Z8M = Shure SM7B). La marca es Gear4music, producto propio. Tiendas ahora: ' + Object.keys(acou.stores).join(','));
}

// B2. Fender Player II Precision Bass: no hay ASIN verificable. Quitar enlace y dejar el ASIN en la Strat.
const bass = get(441);
const strat = get(440);
if (bass.stores.amazon) {
  const asin = (bass.stores.amazon.match(/\/dp\/([A-Z0-9]{10})/) || [])[1];
  delete bass.stores.amazon;
  cambios.push('441 Fender Player II Precision Bass: QUITADO enlace Amazon (compartia B0D2LN4K8S con la Strat, precio $849 vs $2299). Tiendas: ' + Object.keys(bass.stores).join(','));
}

// B3. Melodyne: no hay ASIN verificable para ninguna de las dos entradas. Quitar ambos.
[120, 1032].forEach(id => {
  const m = get(id);
  if (m.stores.amazon) { delete m.stores.amazon; cambios.push(id + ' ' + m.title + ': QUITADO enlace Amazon (era B08BS686X5 en ambas). Tiendas: ' + Object.keys(m.stores).join(',')); }
});

fs.writeFileSync(rp, JSON.stringify(products, null, 2), 'utf8');
console.log('\nB. ENLACES CORREGIDOS: ' + cambios.length);
cambios.forEach(x => console.log('  - ' + x));

// ---- C. DUPLICADO SENNHEISER e906: fusionar 634 en 210 ----
const rg2 = B + 'data/guides.json';
const gs = JSON.parse(fs.readFileSync(rg2, 'utf8'));
const p210 = products.find(x => x.id === 210);
const p634 = products.find(x => x.id === 634);
const nuevas = Object.assign({}, p634.stores, p210.stores); // 210 manda
const guardadas = Object.keys(p634.stores).filter(k => !p210.stores[k]);
p210.stores = nuevas;
if (guardadas.length) cambios.push('210 Sennheiser e 906: tiendas absorvidas de 634 -> ' + guardadas.join(','));
fs.writeFileSync(rp, JSON.stringify(products, null, 2), 'utf8');

// repuntar guias que usan 634 a 210 y borrar 634
let repuntadas = 0;
gs.forEach(gd => {
  (gd.sections || []).forEach(s => {
    if ((s.products || []).includes(634)) { s.products = s.products.map(x => x === 634 ? 210 : x); repuntadas++; }
  });
  if ((gd.featuredProducts || []).includes(634)) { gd.featuredProducts = gd.featuredProducts.map(x => x === 634 ? 210 : x); repuntadas++; }
});
fs.writeFileSync(rg2, JSON.stringify(gs, null, 2), 'utf8');

// borrar 634 del catalogo
const prods = JSON.parse(fs.readFileSync(rp, 'utf8'));
const i634 = prods.findIndex(x => x.id === 634);
prods.splice(i634, 1);
fs.writeFileSync(rp, JSON.stringify(prods, null, 2), 'utf8');
console.log('\nC. DUPLICADO e906:');
console.log('   referencias repuntadas 634 -> 210: ' + repuntadas);
console.log('   id 634 eliminado del catalogo. Productos: ' + prods.length);
console.log('   210 Sennheiser e 906 tiendas: ' + Object.keys(p210.stores).join(','));

// ---- D. comprobacion final de ASINs duplicados ----
const mapa = {};
prods.forEach(p => { const a = (p.stores || {}).amazon; if (!a) return; const m = a.match(/\/dp\/([A-Z0-9]{10})/); if (m) (mapa[m[1]] = mapa[m[1]] || []).push(p.id + ' ' + p.title); });
const repes = Object.entries(mapa).filter(([, l]) => l.length > 1);
console.log('\nD. ASIN duplicados que quedan: ' + repes.length);
repes.forEach(([a, l]) => console.log('   ' + a + ' -> ' + l.join(' || ')));
