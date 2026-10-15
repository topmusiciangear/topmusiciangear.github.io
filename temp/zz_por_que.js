const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';

const arr = JSON.parse(fs.readFileSync(BASE + 'data/products.json', 'utf8'));
const list = Array.isArray(arr) ? arr : arr.products;
const byId = {}; list.forEach(p => byId[p.id] = p);

const src = fs.readFileSync(BASE + 'build-guides.js', 'utf8');
const ini = src.indexOf('const TEST_SHOP_BTN = {');
const bloque = src.slice(ini, src.indexOf('\n};', ini));

function entrada(id) {
  const re = new RegExp('(^|\\n)(\\s*)' + id + ':\\s*\\{', 'm');
  const m = re.exec(bloque);
  if (!m) return null;
  const iniE = m.index + m[1].length;
  let d = 0, i = iniE;
  for (; i < bloque.length; i++) { if (bloque[i] === '{') d++; else if (bloque[i] === '}') { d--; if (!d) break; } }
  return bloque.slice(iniE, i + 1);
}

const IDS = [422, 170, 413, 32, 8, 344, 480, 170, 648, 649, 430, 439];
console.log('=== POR QUE 42 PRODUCTOS CAEN EN LA PORTADA ===\n');
IDS.forEach(id => {
  const p = byId[id];
  const e = entrada(id);
  console.log('id ' + id + '  ' + (p ? p.title : '?'));
  console.log('   products.json stores.zzounds : ' + ((p && p.stores && p.stores.zzounds) ? 'SI -> ' + p.stores.zzounds.replace('https://www.zzounds.com', '') : 'NO TIENE'));
  console.log('   excludeStores                : ' + JSON.stringify((p && p.excludeStores) || []));
  console.log('   mapa                         : ' + (e ? e.replace(/\s+/g, ' ').slice(0, 200) : '(sin entrada)'));
  console.log('');
});
