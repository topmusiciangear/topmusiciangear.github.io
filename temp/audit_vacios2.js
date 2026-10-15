// Parser correcto del mapa (entradas multilinea) + identificacion de los vacios reales
const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';

// ── parsear el mapa accommodating multilinea ──
const src = fs.readFileSync(BASE+'build-guides.js','utf8');
const lineas = src.split('\n');
const ini = lineas.findIndex(l=>/^const TEST_SHOP_BTN = \{/.test(l));
let fin=-1;
for(let i=ini+1;i<lineas.length;i++) if(/^\};?\s*$/.test(lineas[i])){fin=i;break;}

// recorrer caracter a caracter el bloque
const bloque = lineas.slice(ini+1, fin).join('\n');
const mapa = {};
const re = /(\d+):\s*\{/g;
let mm;
while((mm = re.exec(bloque)) !== null) {
  const id = +mm[1];
  // desde la llave abierta, contar hasta cerrar
  let depth = 0, i = mm.index + mm[0].length - 1, ini2 = i;
  for(; i < bloque.length; i++){
    if (bloque[i]==='{') depth++;
    else if (bloque[i]==='}'){ depth--; if(depth===0) break; }
  }
  const cuerpo = bloque.slice(mm.index + mm[0].length, i);
  const pm = cuerpo.match(/prices:\{([\s\S]*?)\}/);
  const nPrecios = pm ? (pm[1].match(/:/g)||[]).length : 0;
  mapa[id] = { precios: nPrecios, oos: /\boos:/.test(cuerpo), na: /\bna:/.test(cuerpo) };
}

console.log('entradas parseadas: ' + Object.keys(mapa).length);
console.log('con 0 precios:      ' + Object.values(mapa).filter(e=>e.precios===0).length);

// ── productos usados ──
const arr = JSON.parse(fs.readFileSync(BASE+'data/products.json','utf8'));
const list = Array.isArray(arr)?arr:arr.products;
const byId = {}; list.forEach(p=>byId[p.id]=p);
const guides = JSON.parse(fs.readFileSync(BASE+'data/guides.json','utf8'));
const usados = new Set();
guides.forEach(g=>{
  (g.sections||[]).forEach(s=>(s.products||[]).forEach(p=>usados.add(p)));
  (g.featuredProducts||[]).forEach(p=>usados.add(p));
});

console.log('\n=== LOS ' + [...usados].filter(id=>!mapa[id]).length + ' SIN ENTRADA EN EL MAPA ===');
[...usados].filter(id=>!mapa[id]).sort((a,b)=>a-b).forEach(id=>{
  console.log('  ' + String(id).padStart(4) + '  ' + byId[id].title);
});

console.log('\n=== ENTRADAS CON 0 PRECIOS (existen pero sin importes) ===');
Object.keys(mapa).filter(id=>mapa[id].precios===0).sort((a,b)=>a-b).forEach(id=>{
  const p = byId[id];
  if (!usados.has(id)) return;
  console.log('  ' + String(id).padStart(4) + '  ' + ((p&&p.title)||'?').padEnd(48) + (mapa[id].oos?'[oos] ':'') + (mapa[id].na?'[na] ':''));
});

// ── ahora los VACIOS REALES en el HTML, identificando el producto por su tarjeta ──
console.log('\n=== PRIMARIOS VACIOS EN EL HTML (id real del producto) ===');
const files = fs.readdirSync(BASE+'guides').filter(f=>f.endsWith('.html')&&!f.includes('_es'));
const vacios = {};
files.forEach(f=>{
  const d = fs.readFileSync(BASE+'guides/'+f,'utf8');
  // partir por tarjeta
  const tarjetas = [...d.matchAll(/openReviewModal\((\d+)\)/g)];
  [...d.matchAll(/<a[^>]*class="shop-btn-primary"[^>]*>[\s\S]*?<\/a>/g)].forEach(m=>{
    if (/data-price=|data-pb-|data-hu-/.test(m[0])) return;
    const txt = m[0].replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim();
    if (/Check price|Verificar precio/i.test(txt)) return;
    // id = el openReviewModal mas cercano ANTES
    let id = 0;
    for (const t of tarjetas) { if (t.index < m.index) id = +t[1]; else break; }
    const p = byId[id];
    const e = mapa[id];
    const key = id;
    vacios[key] = vacios[key] || { n:0, guia:f.replace('.html',''), titulo:p?p.title:'?', mapa: e? e.precios : 'NO EN MAPA' };
    vacios[key].n++;
  });
});
const entradas = Object.entries(vacios).sort((a,b)=>b[1].n-a[1].n);
console.log('productos distintos con primario vacio: ' + entradas.length);
console.log('total instancias: ' + entradas.reduce((s,x)=>s+x[1].n,0) + '\n');
entradas.slice(0,25).forEach(([id,v])=>{
  console.log('  id ' + String(id).padStart(4) + ' x' + String(v.n).padStart(3) + '  ' + v.titulo.padEnd(46) + 'mapa:' + v.mapa + '  (' + v.guia + ')');
});
if (entradas.length>25) console.log('  ... y ' + (entradas.length-25) + ' mas');