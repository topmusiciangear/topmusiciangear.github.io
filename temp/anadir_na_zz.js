// zZounds no tiene el Eris Studio 5 (solo el Eris 5BT Gen 2, otro producto)
// -> marcar la fila como "No disponible" con na
const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/build-guides.js';
let s = fs.readFileSync(F, 'utf8');

const ini = s.indexOf('const TEST_SHOP_BTN = {');
const finBloque = s.indexOf('\n};', ini);
let bloque = s.slice(ini, finBloque);

const re = /(?:^|\n)(\s*)684:\s*\{/;
const m = re.exec(bloque);
if (!m) { console.log('no encontrada'); process.exit(1); }
const i0 = m.index + m[1].length;
let d = 0, fin = i0;
for (let j = i0; j < bloque.length; j++) { if (bloque[j] === '{') d++; else if (bloque[j] === '}') { d--; if (!d) { fin = j; break; } } }

let ent = bloque.slice(i0, fin + 1);
console.log('ANTES: ' + ent);

if (!/\bna:\s*\[/.test(ent)) {
  // insertar na antes del cierre
  ent = ent.replace(/\}\s*$/, ', na: [ "zzounds" ] }');
}

console.log('DESPUES: ' + ent);
bloque = bloque.slice(0, i0) + ent + bloque.slice(fin + 1);
s = s.slice(0, ini) + bloque + s.slice(finBloque);
fs.writeFileSync(F, s, 'utf8');

console.log('\nmojibake: ' + (s.match(/â‚¬|Â£|Â°/g) || []).length + ' | euros: ' + (s.match(/€/g) || []).length);
try { new Function(s); console.log('sintaxis: OK'); } catch (e) { console.log('SINTAXIS ROTA: ' + e.message); }
