// Parcheador robusto: localiza la entrada por conteo de llaves y edita dentro.
const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const F = BASE + 'build-guides.js';

const QUITAR_PRECIO = [430, 670];
const PONER_PRECIO = { 449: '$149.99' };
const URL = {
  138: 'https://www.zzounds.com/prodsearch?form=search&q=Behringer+X32+Compact',
  145: 'https://www.zzounds.com/prodsearch?form=search&q=Behringer+XR18',
  422: 'https://www.zzounds.com/item--SENHD600',
  449: 'https://www.zzounds.com/item--WLRCANVAS',
  670: 'https://www.zzounds.com/prodsearch?form=search&q=sE+Electronics+Neom'
};
const A_OOS = [138, 145, 422, 670];

function emparejar(t, i) {
  // devuelve el indice de la llave que cierra la que esta en i
  let d = 0;
  for (let j = i; j < t.length; j++) {
    if (t[j] === '{') d++;
    else if (t[j] === '}') { d--; if (!d) return j; }
  }
  return -1;
}
function quitarKey(obj, key) {
  let o = obj;
  const re = new RegExp('\\s*' + key + ':\\s*"[^"]*"\\s*,?', 'g');
  o = o.replace(re, '').replace(/,\s*\}/g, ' }').replace(/\{\s*,/g, '{ ');
  return o;
}

let s = fs.readFileSync(F, 'utf8');
const ini = s.indexOf('const TEST_SHOP_BTN = {');
const finBloque = s.indexOf('\n};', ini);
let bloque = s.slice(ini, finBloque);

const IDS = [138, 145, 422, 430, 449, 670];
IDS.forEach(id => {
  const re = new RegExp('(^|\\n)(\\s*)' + id + ':\\s*\\{', 'm');
  const m = re.exec(bloque);
  if (!m) { console.log(id + ': NO ENCONTRADA'); return; }
  const i0 = m.index + m[1].length;
  const llave = i0 + (m[0].length - m[1].length) - 1;
  const fin = emparejar(bloque, llave);
  let ent = bloque.slice(i0, fin + 1);

  const antes = ent.replace(/\s+/g, ' ').slice(0, 120);

  // ── precios ──
  const pm = ent.match(/prices:\s*\{/);
  if (pm) {
    const pIni = pm.index + pm[0].length - 1;
    const pFin = emparejar(ent, pIni);
    let prices = ent.slice(pIni, pFin + 1);
    if (QUITAR_PRECIO.includes(id)) prices = quitarKey(prices, 'zzounds');
    if (PONER_PRECIO[id]) prices = quitarKey(prices, 'zzounds').replace('}', ' zzounds: "' + PONER_PRECIO[id] + '" }');
    ent = ent.slice(0, pIni) + prices + ent.slice(pFin + 1);
  }

  // ── urls ──
  if (URL[id]) {
    const um = ent.match(/urls:\s*\{/);
    if (um) {
      const uIni = um.index + um[0].length - 1;
      const uFin = emparejar(ent, uIni);
      let urls = ent.slice(uIni, uFin + 1);
      if (/zzounds:\s*"/.test(urls)) urls = urls.replace(/zzounds:\s*"[^"]*"/, 'zzounds: "' + URL[id] + '"');
      else urls = urls.replace('{', '{ zzounds: "' + URL[id] + '",');
      ent = ent.slice(0, uIni) + urls + ent.slice(uFin + 1);
    } else {
      // insertar justo despues de la llave de la ENTRADA (la primera)
      const eIni = ent.indexOf('{');
      ent = ent.slice(0, eIni + 1) + ' urls: { zzounds: "' + URL[id] + '" },' + ent.slice(eIni + 1);
    }
  }

  // ── oos ──
  if (A_OOS.includes(id)) {
    const om = ent.match(/oos:\s*\[([^\]]*)\]/);
    if (om) {
      if (!/zzounds/.test(om[1])) ent = ent.replace(om[0], 'oos: [' + om[1].replace(/\s+$/, '') + ', "zzounds" ]');
    } else {
      const finE = ent.length - 1;
      ent = ent.slice(0, finE).replace(/,\s*$/, '') + ', oos: [ "zzounds" ] }';
    }
  }

  console.log('\nid ' + id);
  console.log('  antes : ' + antes);
  console.log('  ahora : ' + ent.replace(/\s+/g, ' ').slice(0, 200));
  bloque = bloque.slice(0, i0) + ent + bloque.slice(fin + 1);
});

s = s.slice(0, ini) + bloque + s.slice(finBloque);
fs.writeFileSync(F, s, 'utf8');

console.log('\neuros: ' + (s.match(/€/g) || []).length + ' | libras: ' + (s.match(/£/g) || []).length +
  ' | mojibake: ' + (s.match(/â‚¬|Â£|Â°/g) || []).length);
try { new Function(s); console.log('sintaxis: OK'); } catch (e) { console.log('SYNTAXIS ROTA: ' + e.message); }

const b2 = s.slice(s.indexOf('const TEST_SHOP_BTN = {'), s.indexOf('\n};', s.indexOf('const TEST_SHOP_BTN = {')));
const re2 = /^\s*(\d+):\s*\{/gm; const ids = new Set(); let m2;
while ((m2 = re2.exec(b2)) !== null) ids.add(+m2[1]);
console.log('entradas en el mapa: ' + ids.size);
