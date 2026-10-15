// ¿Estan el Apollo Twin X Gen 2 y el Neumann TLM 102 en el catalogo? ¿Con que precios?
const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const arr = JSON.parse(fs.readFileSync(BASE + 'data/products.json', 'utf8'));
const list = Array.isArray(arr) ? arr : arr.products;
const byId = {}; list.forEach(p => byId[p.id] = p);

console.log('=== BUSCANDO EN EL CATALOGO ===\n');
[['Apollo Twin X', /apollo\s*twin/i], ['TLM 102', /tlm\s*102/i], ['Neumann', /neumann/i]]
  .forEach(([nombre, rx]) => {
    const hits = list.filter(p => rx.test(p.title));
    console.log(nombre + ': ' + hits.length);
    hits.forEach(p => console.log('   id ' + String(p.id).padStart(3) + '  ' + p.title.padEnd(34) + '$' + p.price +
      '  | tiendas: ' + Object.keys(p.stores || {}).length));
    console.log('');
  });

// entrada del mapa de cada uno
const src = fs.readFileSync(BASE + 'build-guides.js', 'utf8');
const ini = src.indexOf('const TEST_SHOP_BTN = {');
const bloque = src.slice(ini, src.indexOf('\n};', ini));
function emp(t, i) { let d = 0; for (let j = i; j < t.length; j++) { if (t[j] === '{') d++; else if (t[j] === '}') { d--; if (!d) return j; } } return -1; }
function entrada(id) {
  const m = new RegExp('(?:^|\\n)(\\s*)' + id + ':\\s*\\{').exec(bloque);
  if (!m) return '(sin entrada)';
  const i0 = m.index + m[1].length;
  return bloque.slice(i0, emp(bloque, i0 + (m[0].length - m[1].length) - 1) + 1).replace(/\s+/g, ' ');
}
[182, 16].forEach(id => { if (byId[id]) { console.log('mapa id ' + id + ': ' + entrada(id).slice(0, 200)); } });
list.filter(p => /apollo/i.test(p.title)).forEach(p => console.log('mapa ' + p.id + ': ' + entrada(p.id).slice(0, 200)));

// ── los tres niveles con la estructura propuesta ──
console.log('\n\n=== LOS TRES NIVELES SEGUN TU TABLA ===\n');
const NIV = {
  'Nivel 1': [['Scarlett 2i2', 15], ['NT1 Signature', 297], ['ATH-M20x', 609], ['K&M 210/2', 58], ['paneles', 170], ['Rokit 5 x2', [633, 2]]],
  'Nivel 2': [['SSL 2+ MKII', 18], ['NT1 5th Gen', 3], ['ATH-M50x', 25], ['K&M 210/2', 58], ['paneles', 170], ['JBL 305P x2', [116, 2]]],
  'Nivel 3': [['Apollo Twin X', 'APOLLO'], ['TLM 102', 'TLM'], ['MDR-7506', 26], ['K&M 210/2', 58], ['paneles', 170], ['Rokit 7 x2', [20, 2]]]
};
const DICHO = { 'Nivel 1': null, 'Nivel 2': 930, 'Nivel 3': null };

Object.entries(NIV).forEach(([n, items]) => {
  let s = 0; let falta = [];
  console.log('■ ' + n);
  items.forEach(([nombre, v]) => {
    if (typeof v === 'string') { falta.push(nombre); console.log('   ' + nombre.padEnd(14) + '>>> PRODUCTO NO ENCONTRADO EN EL CATALOGO'); return; }
    const c = Array.isArray(v) ? byId[v[0]].price * v[1] : byId[v].price;
    s += c;
    console.log('   ' + nombre.padEnd(14) + (Array.isArray(v) ? 'x' + v[1] + '  ' : '    ') + '$' + c);
  });
  console.log('   ' + '-'.repeat(30));
  console.log('   TOTAL'.padEnd(18) + '$' + s.toFixed(2).replace(/\.00$/, '') + (falta.length ? '   (incompleto)' : ''));
  if (DICHO[n]) console.log('   tu cifra dice $' + DICHO[n] + '  ->  ' + (s <= DICHO[n] ? 'cuadra' : 'FALTAN $' + Math.round(s - DICHO[n])));
  console.log('');
});
