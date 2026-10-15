const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/build-guides.js';
let s = fs.readFileSync(F, 'utf8');

// 449: falta la coma antes de zzounds
const malo = 'andertons: "£139.00" zzounds: "$149.99" }';
const bueno = 'andertons: "£139.00", zzounds: "$149.99" }';
if (s.includes(malo)) { s = s.replace(malo, bueno); console.log('449: coma corregida'); }
else console.log('449: patron no encontrado');

// 422: limpiar " } , oos"
s = s.replace(/\}\s+\]/g, '} ]').replace(/\}\s+,\s*oos:/g, ' }, oos:');

fs.writeFileSync(F, s, 'utf8');

console.log('euros: ' + (s.match(/€/g) || []).length + ' | libras: ' + (s.match(/£/g) || []).length +
  ' | mojibake: ' + (s.match(/â‚¬|Â£|Â°/g) || []).length);
try { new Function(s); console.log('sintaxis: OK'); } catch (e) { console.log('SYNTAXIS ROTA: ' + e.message); }

const ini = s.indexOf('const TEST_SHOP_BTN = {');
const bloque = s.slice(ini, s.indexOf('\n};', ini));
function emparejar(t, i) { let d = 0; for (let j = i; j < t.length; j++) { if (t[j] === '{') d++; else if (t[j] === '}') { d--; if (!d) return j; } } return -1; }
function ent(id) {
  const re = new RegExp('(^|\\n)(\\s*)' + id + ':\\s*\\{', 'm'); const m = re.exec(bloque);
  if (!m) return '(NO)';
  const i0 = m.index + m[1].length; const f = emparejar(bloque, i0 + (m[0].length - m[1].length) - 1);
  return bloque.slice(i0, f + 1).replace(/\s+/g, ' ');
}
console.log('\n--- estado final ---');
[138, 145, 422, 430, 449, 670].forEach(id => console.log('\n' + ent(id).slice(0, 300)));
