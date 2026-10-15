// Borra los 11 huerfanos + sus entradas de precios + la oferta activa del 665 + su historial
const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const IDS = [220, 221, 223, 224, 327, 514, 516, 665, 667, 668, 669];
const log = [];

/* 1) products.json */
const FP = B + 'data/products.json';
const p = JSON.parse(fs.readFileSync(FP, 'utf8'));
const antes = p.length;
const borrados = p.filter(x => IDS.includes(x.id)).map(x => x.id + ' ' + x.title);
const p2 = p.filter(x => !IDS.includes(x.id));
fs.writeFileSync(FP, JSON.stringify(p2, null, 2) + '\n', 'utf8');
log.push('products.json: ' + antes + ' -> ' + p2.length + ' (' + borrados.length + ' fuera)');

/* 2) TEST_SHOP_BTN en build-guides.js */
const FB = B + 'build-guides.js';
let s = fs.readFileSync(FB, 'utf8');
const ini = s.indexOf('const TEST_SHOP_BTN = {');
const finBloque = s.indexOf('\n};', ini);
let bloque = s.slice(ini, finBloque);
let quitadas = 0;
IDS.forEach(id => {
  const re = new RegExp('(?:^|\\n)(\\s*)' + id + ':\\s*\\{');
  const m = re.exec(bloque);
  if (!m) { log.push('  mapa: ' + id + ' sin entrada (nada que quitar)'); return; }
  const i0 = m.index + m[1].length;
  let d = 0, fin = i0;
  for (let j = i0; j < bloque.length; j++) {
    if (bloque[j] === '{') d++;
    else if (bloque[j] === '}') { d--; if (!d) { fin = j; break; } }
  }
  // quitar tambien la coma colgante y el salto de linea
  let fin2 = fin + 1;
  if (bloque[fin2] === ',') fin2++;
  if (bloque[fin2] === '\n') fin2++;
  bloque = bloque.slice(0, i0) + bloque.slice(fin2);
  quitadas++;
});
s = s.slice(0, ini) + bloque + s.slice(finBloque);
fs.writeFileSync(FB, s, 'utf8');
log.push('TEST_SHOP_BTN: ' + quitadas + ' entradas fuera');
try { new Function(s); log.push('sintaxis build-guides.js: OK'); }
catch (e) { log.push('SINTAXIS ROTA: ' + e.message); }

/* 3) deals.json: la oferta activa del Vocaster One */
const FD = B + 'data/deals.json';
const deals = JSON.parse(fs.readFileSync(FD, 'utf8'));
const d2 = deals.filter(x => x.product_id !== 665);
fs.writeFileSync(FD, JSON.stringify(d2, null, 2) + '\n', 'utf8');
log.push('deals.json: ' + deals.length + ' -> ' + d2.length + ' (fuera la del Vocaster One £69)');

/* 4) price-history.json */
const FH = B + 'data/price-history.json';
const ph = JSON.parse(fs.readFileSync(FH, 'utf8'));
let qh = 0;
IDS.forEach(id => { if (ph[String(id)] !== undefined) { delete ph[String(id)]; qh++; } });
fs.writeFileSync(FH, JSON.stringify(ph, null, 2) + '\n', 'utf8');
log.push('price-history.json: ' + qh + ' claves fuera (220, 224, 514, 665)');

console.log(log.join('\n'));
console.log('\nBorrados del catalogo:');
borrados.forEach(b => console.log('  - ' + b));

/* CONTROL */
const p3 = JSON.parse(fs.readFileSync(FP, 'utf8'));
const raw = fs.readFileSync(FP, 'utf8');
console.log('\n=== CONTROL ===');
console.log('  productos: ' + p3.length);
console.log('  queda algun id huerfano: ' + IDS.filter(id => p3.some(x => x.id === id)).join(', '));
console.log('  mojibake products.json: ' + (raw.match(/â‚¬|Â£|Â°/g) || []).length);
const mapa = new Function('return ' + s.slice(ini + 'const TEST_SHOP_BTN = '.length, s.indexOf('\n};', ini) + 2))();
console.log('  entradas mapa: ' + Object.keys(mapa).length);
console.log('  ids huerfanos aun en mapa: ' + IDS.filter(id => mapa[id]).join(', '));
