const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const arr = JSON.parse(fs.readFileSync(BASE+'data/products.json','utf8'));
const list = Array.isArray(arr)?arr:arr.products;
const guides = JSON.parse(fs.readFileSync(BASE+'data/guides.json','utf8'));
const build = fs.readFileSync(BASE+'build-guides.js','utf8');

// extraer los ids del mapa TEST_SHOP_BTN
const m = build.match(/const TEST_SHOP_BTN = \{([\s\S]*?)\n\};/);
if (!m) { console.log('NO ENCONTRADO el mapa'); process.exit(1); }
const cuerpo = m[1];
const idsEnMapa = new Set([...cuerpo.matchAll(/^\s*(\d+):\s*\{/gm)].map(x=>+x[1]));
console.log('ids en TEST_SHOP_BTN: ' + idsEnMapa.size);

// productos que aparecen en guias (de las tarjetas)
const enGuias = new Set();
guides.forEach(g=>{
  (g.sections||[]).forEach(s=>(s.products||[]).forEach(p=>enGuias.add(p)));
  (g.featuredProducts||[]).forEach(p=>enGuias.add(p));
});
console.log('productos usados en guias: ' + enGuias.size);

// cuantos de esos tienen entrada en el mapa
const conPrecio = [...enGuias].filter(id=>idsEnMapa.has(id));
const sinPrecio = [...enGuias].filter(id=>!idsEnMapa.has(id));
console.log('  con entrada en el mapa: ' + conPrecio.length);
console.log('  SIN entrada en el mapa: ' + sinPrecio.length);

// budget-mics en concreto
const bm = guides.find(g=>g.id==='budget-mics');
const bmIds = new Set();
(bm.sections||[]).forEach(s=>(s.products||[]).forEach(p=>bmIds.add(p)));
console.log('\nbudget-mics usa ' + bmIds.size + ' productos:');
[...bmIds].sort((a,b)=>a-b).forEach(id=>{
  const p = list.find(x=>x.id===id);
  console.log('  ' + String(id).padStart(4) + ' ' + (idsEnMapa.has(id)?'CON PRECIO':'sin precio') + '  ' + (p?p.title:''));
});
console.log('\n  ninguno con precio: ' + [...bmIds].every(id=>!idsEnMapa.has(id)));

// comprobar si los ids del mapa que SI existen corresponden a plugins
console.log('\n=== de que categorias son los ids con precio? ===');
const cat = {};
[...idsEnMapa].forEach(id=>{
  const p = list.find(x=>x.id===id);
  const c = p ? p.category : 'NO EN CATALOGO';
  cat[c] = (cat[c]||0)+1;
});
Object.entries(cat).sort((a,b)=>b[1]-a[1]).slice(0,12).forEach(([k,v])=>console.log('  ' + String(v).padStart(4) + 'x ' + k));