// Estado REAL del mapa: parseo linea a linea desde la 484 hasta el cierre
const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const lineas = fs.readFileSync(BASE+'build-guides.js','utf8').split('\n');

let ini = lineas.findIndex(l => /^const TEST_SHOP_BTN = \{/.test(l));
// avanzar hasta la linea que sea solo "};"
let cierre = -1;
for (let i = ini+1; i < lineas.length; i++) {
  if (/^\};?\s*$/.test(lineas[i])) { cierre = i; break; }
}
console.log('mapa: lineas ' + (ini+1) + ' a ' + (cierre+1));

const ids = [];
for (let i = ini+1; i < cierre; i++) {
  const m = lineas[i].match(/^\s*(\d+):\s*\{/);
  if (m) ids.push(+m[1]);
}
console.log('entradas de nivel superior: ' + ids.length);

const set = new Set(ids);
console.log('duplicados: ' + (ids.length - set.size));

// cobertura
const arr = JSON.parse(fs.readFileSync(BASE+'data/products.json','utf8'));
const list = Array.isArray(arr)?arr:arr.products;
const byId = {}; list.forEach(p=>byId[p.id]=p);
const guides = JSON.parse(fs.readFileSync(BASE+'data/guides.json','utf8'));

const usados = new Set();
guides.forEach(g=>{
  (g.sections||[]).forEach(s=>(s.products||[]).forEach(p=>usados.add(p)));
  (g.featuredProducts||[]).forEach(p=>usados.add(p));
});
console.log('\nproductos en el sitio: ' + usados.size);
console.log('  con precio en el mapa: ' + [...usados].filter(id=>set.has(id)).length);
const sin = [...usados].filter(id=>!set.has(id));
console.log('  SIN precio en el mapa: ' + sin.length + '\n');

console.log('=== LOS ' + sin.length + ' SIN PRECIO ===');
sin.sort((a,b)=>a-b).forEach(id=>{
  const p = byId[id];
  console.log('  ' + String(id).padStart(4) + '  ' + ((p&&p.title)||'NO EN CATALOGO').padEnd(48) + (p?p.category:''));
});

// max id del mapa
console.log('\nid maximo en el mapa: ' + Math.max(...ids));
console.log('id maximo del catalogo: ' + Math.max(...list.map(p=>p.id)));