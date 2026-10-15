// Añadir precio amazon a la entrada 633 usando localizacion por llaves
const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/build-guides.js';
let s = fs.readFileSync(F, 'utf8');

const ini = s.indexOf('const TEST_SHOP_BTN = {');
const finBloque = s.indexOf('\n};', ini);
let bloque = s.slice(ini, finBloque);

const m = /(?:^|\n)(\s*)633:\s*\{/.exec(bloque);
if (!m) { console.log('633 no encontrada'); process.exit(1); }
const i0 = m.index + m[1].length;
let d = 0, fin = i0;
for (let j = i0; j < bloque.length; j++) { if (bloque[j] === '{') d++; else if (bloque[j] === '}') { d--; if (!d) { fin = j; break; } } }

let ent = bloque.slice(i0, fin + 1);
console.log('ANTES : ' + ent.replace(/\s+/g, ' ').slice(0, 160));

// insertar amazon como primer precio
const pm = ent.match(/prices:\s*\{/);
if (pm) {
  const pIni = pm.index + pm[0].length;
  if (!/amazon\s*:/.test(ent.slice(pm.index, ent.indexOf('}', pm.index)))) {
    ent = ent.slice(0, pIni) + ' amazon: "$199.00",' + ent.slice(pIni);
  }
}
console.log('DESPUES: ' + ent.replace(/\s+/g, ' ').slice(0, 160));

bloque = bloque.slice(0, i0) + ent + bloque.slice(fin + 1);
s = s.slice(0, ini) + bloque + s.slice(finBloque);
fs.writeFileSync(F, s, 'utf8');

console.log('\nmojibake: ' + (s.match(/â‚¬|Â£|Â°/g) || []).length + ' | euros: ' + (s.match(/€/g) || []).length);
try { new Function(s); console.log('sintaxis: OK'); } catch (e) { console.log('SINTAXIS ROTA: ' + e.message); }

const b2 = s.slice(s.indexOf('const TEST_SHOP_BTN = {'), s.indexOf('\n};', s.indexOf('const TEST_SHOP_BTN = {')));
const m2 = /(?:^|\n)(\s*)633:\s*\{/.exec(b2);
let d2 = 0, f2 = m2.index + m2[1].length;
for (let j = f2; j < b2.length; j++) { if (b2[j] === '{') d2++; else if (b2[j] === '}') { d2--; if (!d2) { f2 = j; break; } } }
console.log('\n633 final: ' + b2.slice(m2.index + m2[1].length, f2 + 1).replace(/\s+/g, ' '));
