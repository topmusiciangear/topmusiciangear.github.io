// Plan de arreglo: que ningun boton de zZounds lleve a la portada ni a un 404
const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';

const ids = JSON.parse(fs.readFileSync(BASE + 'temp/zz_search_urls.json', 'utf8'));
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

const filas = Object.values(ids).map(v => {
  const id = v.titulo ? Object.keys(ids).find(k => ids[k] === v) : null;
  return v;
});

console.log('id     resultados  precioZz  na/oos actual           -> accion');
console.log('-'.repeat(88));
let conPrecio = 0;
const plan = [];
Object.entries(ids).forEach(([k, v]) => {
  const id = +k;
  const e = entrada(id);
  const zz = e ? ((e.match(/zzounds:\s*"([^"]+)"/) || [])[1] || '') : '';
  const tieneNa = e ? /na:\s*\[([^\]]*)\]/.exec(e) : null;
  const tieneOos = e ? /oos:\s*\[([^\]]*)\]/.exec(e) : null;
  const estado = tieneNa ? 'na:[' + tieneNa[1].trim() + ']'
    : tieneOos ? 'oos:[' + tieneOos[1].trim() + ']' : '(ninguna)';
  const accion = v.resultados > 0 ? 'buscar URL real / search' : 'marcar na (no lo venden)';
  if (zz) conPrecio++;
  plan.push({ id, titulo: v.titulo, resultados: v.resultados, zz, accion, entrada: e });
  console.log(String(id).padStart(5) + '  ' + String(v.resultados).padStart(9) + '  ' +
    (zz ? ('$' + zz).padEnd(9) : '—'.padEnd(9)) + ' ' + estado.padEnd(24) + ' -> ' + accion);
});

console.log('\n  con precio zZounds en el mapa (se quitaria): ' + conPrecio);
fs.writeFileSync(BASE + 'temp/zz_plan.json', JSON.stringify(plan.map(p => ({
  id: p.id, titulo: p.titulo, resultados: p.resultados, zz: p.zz, accion: p.accion
})), null, 1), 'utf8');
