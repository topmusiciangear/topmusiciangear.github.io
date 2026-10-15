// Arreglos puntuales en TEST_SHOP_BTN, uno a uno y con verificacion de ida y vuelta.
const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const F = BASE + 'build-guides.js';

// id -> que hacer
const ACCIONES = {
  // 449 Walrus Canvas Mono: existe en zZounds, precio verificado $149.99
  449: { url: 'https://www.zzounds.com/item--WLRCANVAS', precio: '$149.99' },
  // 422 Sennheiser HD 600: pagina real pero DESLISTADO -> link, sin precio
  422: { url: 'https://www.zzounds.com/item--SENHD600', quitarPrecio: true, oos: true },
  // 138 / 145: productreview-- es la pagina de RESENAS, no del producto
  138: { url: 'https://www.zzounds.com/prodsearch?form=search&q=Behringer+X32+Compact', oos: true },
  145: { url: 'https://www.zzounds.com/prodsearch?form=search&q=Behringer+XR18', oos: true },
  // 670 sE NEOM USB: item--SEENEOMUSB da 404 y zZounds no lo vende
  670: { url: 'https://www.zzounds.com/prodsearch?form=search&q=sE+Electronics+Neom', quitarPrecio: true, oos: true },
  // 430 FIFINE T669: no tiene URL de zZounds pero si precio -> dato falso
  430: { quitarPrecio: true }
};

function localizar(bloque, id) {
  const re = new RegExp('(^|\\n)(\\s*)' + id + ':\\s*\\{', 'm');
  const m = re.exec(bloque);
  if (!m) return null;
  const iniE = m.index + m[1].length;
  let d = 0, i = iniE;
  for (; i < bloque.length; i++) { if (bloque[i] === '{') d++; else if (bloque[i] === '}') { d--; if (!d) break; } }
  return { ini: iniE, fin: i + 1, texto: bloque.slice(iniE, i + 1) };
}

function parchear(ent, a) {
  let t = ent;

  // 1) precio de zZounds
  if (a.quitarPrecio) {
    t = t.replace(/(\s*)zzounds:\s*"[^"]*",?/g, (mm, sp) => sp);
  }
  if (a.precio) {
    // quita el anterior si habia y añade el nuevo
    t = t.replace(/(\s*)zzounds:\s*"[^"]*",?/g, '$1');
    const pm = t.match(/prices:\s*\{/);
    if (pm) {
      t = t.slice(0, pm.index + pm[0].length) + ' zzounds: "' + a.precio + '",' + t.slice(pm.index + pm[0].length);
    }
  }
  // limpia comas huerfanas antes de }
  t = t.replace(/,\s*\}/g, ' }').replace(/\{\s*,/g, '{ ');

  // 2) url
  if (a.url) {
    if (/urls:\s*\{/.test(t)) {
      if (/zzounds:\s*"[^"]*"/.test(t)) t = t.replace(/zzounds:\s*"[^"]*"/, 'zzounds: "' + a.url + '"');
      else t = t.replace(/urls:\s*\{/, 'urls: { zzounds: "' + a.url + '",');
    } else {
      t = t.replace(/(\{ )/, '$1urls: { zzounds: "' + a.url + '" }, ');
    }
  }

  // 3) oos
  if (a.oos) {
    const om = t.match(/oos:\s*\[([^\]]*)\]/);
    if (om) {
      if (!/zzounds/.test(om[1])) t = t.replace(om[0], 'oos: [' + om[1].trim().replace(/,$/, '') + ', "zzounds" ]');
    } else {
      t = t.replace(/(\s*\})$/, ' , oos: [ "zzounds" ] }').replace(/,\s*,/, ',');
      if (!/oos:/.test(t)) t = t.replace(/\}$/, ', oos: [ "zzounds" ] }');
    }
  }
  return t.replace(/\s+,/g, ',').replace(/,\s*,/g, ',');
}

let s = fs.readFileSync(F, 'utf8');
const ini = s.indexOf('const TEST_SHOP_BTN = {');
const finBloque = s.indexOf('\n};', ini);
let bloque = s.slice(ini, finBloque);

const cambios = [];
Object.keys(ACCIONES).map(Number).sort((a, b) => a - b).forEach(id => {
  const loc = localizar(bloque, id);
  if (!loc) { console.log('id ' + id + ': NO ENCONTRADO — se omite'); return; }
  console.log('\nid ' + id);
  console.log('  ANTES: ' + loc.texto.replace(/\s+/g, ' ').slice(0, 190));
  const nuevo = parchear(loc.texto, ACCIONES[id]);
  console.log('  DESPUES: ' + nuevo.replace(/\s+/g, ' ').slice(0, 190));
  bloque = bloque.slice(0, loc.ini) + nuevo + bloque.slice(loc.fin);
  cambios.push(id);
});

s = s.slice(0, ini) + bloque + s.slice(finBloque);
fs.writeFileSync(F, s, 'utf8');
console.log('\n\nparcheados: ' + cambios.length + ' entradas');

try { new Function(s); console.log('sintaxis: OK'); } catch (e) { console.log('SYNTAXIS ROTA: ' + e.message); }

// verificar que el mapa sigue teniendo las mismas entradas
const b2 = s.slice(s.indexOf('const TEST_SHOP_BTN = {'), s.indexOf('\n};', s.indexOf('const TEST_SHOP_BTN = {')));
const re = /^\s*(\d+):\s*\{/gm; const ids = new Set(); let m;
while ((m = re.exec(b2)) !== null) ids.add(+m[1]);
console.log('entradas en el mapa ahora: ' + ids.size);
[449, 422, 138, 145, 670, 430].forEach(id => console.log('  ' + id + ': ' + (ids.has(id) ? 'OK' : 'FALTA')));
