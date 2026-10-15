// 1) Unifica Squier Sonic Bronco Bass (536/680) -> 536
// 2) Elimina el fallback por NOMBRE de findProductGuides: con el duplicado unificado
//    ya no hace falta, y era la causa de que cada ficha dijera que estaba en las dos guias
const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';

// ---------- 1. unificar el Bronco ----------
const gf = BASE + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gf, 'utf8'));
let n = 0; const tocadas = [];
guides.forEach(g => {
  let c = 0;
  if ((g.featuredProducts || []).indexOf(680) > -1) { g.featuredProducts = g.featuredProducts.map(i => i === 680 ? 536 : i); c++; }
  (g.sections || []).forEach(s => {
    if ((s.products || []).indexOf(680) > -1) { s.products = s.products.map(i => i === 680 ? 536 : i); c++; }
  });
  if (c) { tocadas.push(g.id + ' (' + c + ')'); n += c; }
});
console.log('guias reorientadas 680 -> 536: ' + (tocadas.length ? tocadas.join(', ') : 'ninguna') + '  (' + n + ' referencias)');

const pf = BASE + 'data/products.json';
const P = JSON.parse(fs.readFileSync(pf, 'utf8'));
const arr = Array.isArray(P) ? P : P.products;
const i680 = arr.findIndex(p => p.id === 680);
if (i680 > -1) { console.log('borrando id 680: ' + arr[i680].title + ' ($' + arr[i680].price + ')'); arr.splice(i680, 1); }
fs.writeFileSync(gf, JSON.stringify(guides, null, 2), 'utf8');
fs.writeFileSync(pf, JSON.stringify(P, null, 2), 'utf8');
console.log('catalogo: ' + arr.length + ' productos');

const bf = BASE + 'build-guides.js';
let b = fs.readFileSync(bf, 'utf8');
const re680 = /\n\s*680:\s*\{[^\n]*\},\n/;
if (re680.test(b)) { b = b.replace(re680, '\n'); fs.writeFileSync(bf, b, 'utf8'); console.log('build-guides.js: entrada de precios del 680 eliminada'); }

// ---------- 2. quitar el fallback por nombre ----------
// app.js
const af = BASE + 'js/app.js';
let a = fs.readFileSync(af, 'utf8');
const iniApp = a.indexOf('    // Fallback: match productTable column titles');
const finApp = a.indexOf('  });\n  return out;\n}', iniApp);
if (iniApp > -1 && finApp > iniApp) {
  a = a.slice(0, iniApp) + a.slice(finApp);
  fs.writeFileSync(af, a, 'utf8');
  console.log('js/app.js: fallback por nombre eliminado');
} else console.log('!! no localize el bloque en app.js');

// app.min.js (la home carga el min, hay que sincronizar)
const mf = BASE + 'js/app.min.js';
let m = fs.readFileSync(mf, 'utf8');
const INI = 'const p="undefined"!=typeof products&&products?products.find(function(t){return t.id===e}):null;if(!p)return;';
const FIN = '{u(g);break}}});return';
const i2 = m.indexOf(INI);
const f2 = m.indexOf(FIN, i2);
if (i2 > -1 && f2 > i2) {
  m = m.slice(0, i2) + 'return;});return' + m.slice(f2 + FIN.length);
  fs.writeFileSync(mf, m, 'utf8');
  console.log('js/app.min.js: fallback por nombre eliminado');
} else console.log('!! no localize el bloque en app.min.js (i=' + i2 + ' f=' + f2 + ')');

// ---------- 3. verificar ----------
console.log('\n--- verificacion ---');
try { new Function(fs.readFileSync(af, 'utf8')); console.log('app.js    compila: OK'); } catch (e) { console.log('app.js    ERROR: ' + e.message); }
try { new Function(fs.readFileSync(mf, 'utf8')); console.log('app.min.js compila: OK'); } catch (e) { console.log('app.min.js ERROR: ' + e.message); }
const G2 = JSON.parse(fs.readFileSync(gf, 'utf8'));
const P2 = JSON.parse(fs.readFileSync(pf, 'utf8'));
const A2 = Array.isArray(P2) ? P2 : P2.products;
const rep = {};
A2.forEach(p => { (rep[p.title] = rep[p.title] || []).push(p.id); });
const dups = Object.entries(rep).filter(([, v]) => v.length > 1);
console.log('titulos duplicados: ' + dups.length + (dups.length ? ' -> ' + dups.map(d => d[0]).join(' ; ') : ''));
let huerf = 0;
G2.forEach(g => {
  const ids = [].concat(g.featuredProducts || []).concat(...(g.sections || []).map(s => s.products || []));
  [...new Set(ids)].forEach(id => { if (!A2.find(p => p.id === id)) { huerf++; console.log('   !! ' + g.id + ' -> id ' + id + ' inexistente'); } });
});
console.log('referencias a productos inexistentes: ' + huerf);
// ninguna guia depende ya del fallback
const normName = s => String(s || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
let soloNombre = 0;
G2.forEach(g => {
  const ids = new Set();
  [].concat(g.featuredProducts || [], g.products || []).concat(...(g.sections || []).map(s => s.products || [])).forEach(i => ids.add(i));
  const names = [];
  if (g.productTable) g.productTable.columns.forEach(c => { if (c.title) names.push(c.title); if (c.title_es) names.push(c.title_es); });
  (g.verdictProsCons || []).forEach(v => { if (v.name) names.push(v.name); if (v.name_es) names.push(v.name_es); });
  names.forEach(nm => {
    const t = normName(nm); if (!t || t.length < 4) return;
    A2.filter(p => normName(p.title) === t || (p.title_es && normName(p.title_es) === t)).forEach(p => { if (!ids.has(p.id)) soloNombre++; });
  });
});
console.log('guias que necesitan el fallback por nombre: ' + soloNombre);