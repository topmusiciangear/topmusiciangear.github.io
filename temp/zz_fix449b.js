const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/build-guides.js';
let s = fs.readFileSync(F, 'utf8');

// 449: la coma falta entre andertons y zzounds (usar regex por si hay espacios raros)
const rx = /(\d{3}: \{ urls: \{ zzounds: "https:\/\/www\.zzounds\.com\/item--WLRCANVAS" \},[\s\S]*?andertons: "£139\.00")(\s+)(zzounds:)/;
if (rx.test(s)) {
  s = s.replace(rx, '$1,$2$3');
  console.log('449: coma insertada con regex');
} else {
  // fallback: buscar la entrada 449 y arreglar dentro
  const ini = s.indexOf('const TEST_SHOP_BTN = {');
  const bloque = s.slice(ini, s.indexOf('\n};', ini));
  const m = /(?:^|\n)(\s*)449:\s*\{/.exec(bloque);
  if (m) {
    const i0 = m.index + m[1].length;
    let d = 0, f = i0;
    for (let j = i0; j < bloque.length; j++) { if (bloque[j] === '{') d++; else if (bloque[j] === '}') { d--; if (!d) { f = j; break; } } }
    let ent = bloque.slice(i0, f + 1);
    console.log('  entrada 449 cruda: ' + JSON.stringify(ent));
    const ent2 = ent.replace(/(£139\.00")(\s+)(zzounds:)/, '$1,$2$3');
    console.log('  corregida         : ' + JSON.stringify(ent2));
    const nuevoBloque = bloque.slice(0, i0) + ent2 + bloque.slice(f + 1);
    s = s.slice(0, ini) + nuevoBloque + s.slice(ini + bloque.length);
    console.log('  aplicado por fallback');
  }
}

fs.writeFileSync(F, s, 'utf8');
console.log('euros: ' + (s.match(/€/g) || []).length + ' | libras: ' + (s.match(/£/g) || []).length +
  ' | mojibake: ' + (s.match(/â‚¬|Â£|Â°/g) || []).length);
try { new Function(s); console.log('sintaxis: OK'); } catch (e) { console.log('SYNTAXIS ROTA: ' + e.message); }
