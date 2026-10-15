// Que son exactamente los 314 primarios y las filas vacias
const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';

// ids del mapa con precios
const lineas = fs.readFileSync(BASE+'build-guides.js','utf8').split('\n');
const ini = lineas.findIndex(l=>/^const TEST_SHOP_BTN = \{/.test(l));
let fin=-1;
for(let i=ini+1;i<lineas.length;i++) if(/^\};?\s*$/.test(lineas[i])){fin=i;break;}
const mapa = {};   // id -> {precios, oos, na}
for(let i=ini+1;i<fin;i++){
  const m = lineas[i].match(/^\s*(\d+):\s*\{(.*)$/);
  if(!m) continue;
  const id = +m[1];
  const resto = m[2];
  const pm = resto.match(/prices:\{([^}]*)\}/);
  mapa[id] = {
    precios: pm ? pm[1].split(',').filter(x=>x.trim()).length : 0,
    oos: /oos:/.test(resto),
    na: /na:/.test(resto),
    urls: (resto.match(/urls:\{([^}]*)\}/)||[])[1] ? true : false
  };
}

// recorrer una pagina problema
const d = fs.readFileSync(BASE+'guides/budget-mics.html','utf8');
console.log('=== budget-mics: primarios vacios, con su id y estado en el mapa ===\n');

let n=0;
[...d.matchAll(/<a[^>]*class="shop-btn-primary"[^>]*>[\s\S]*?<\/a>/g)].forEach(m=>{
  if (/data-price=|data-pb-|data-hu-/.test(m[0])) return;
  const txt = m[0].replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim();
  if (/Check price|Verificar precio/i.test(txt)) return;
  // id hacia atras
  const antes = d.slice(Math.max(0,m.index-2600), m.index);
  const pm = [...antes.matchAll(/openReviewModal\((\d+)\)/g)];
  const id = pm.length ? +pm[pm.length-1][1] : 0;
  const e = mapa[id];
  n++;
  if (n<=18) {
    console.log('  id ' + String(id).padStart(4) + '  ' + (e ? ('precios:'+e.precios + (e.oos?' OOS':'') + (e.na?' NA':'') + (e.urls?' urls':'')) : 'NO EN MAPA').padEnd(24) + txt.slice(0,42));
  }
});
console.log('\n  total en esta pagina: ' + n);

// resumen global: estados en el mapa de los ids usados
const arr = JSON.parse(fs.readFileSync(BASE+'data/products.json','utf8'));
const list = Array.isArray(arr)?arr:arr.products;
const byId = {}; list.forEach(p=>byId[p.id]=p);
const guides = JSON.parse(fs.readFileSync(BASE+'data/guides.json','utf8'));
const usados = new Set();
guides.forEach(g=>{ (g.sections||[]).forEach(s=>(s.products||[]).forEach(p=>usados.add(p))); (g.featuredProducts||[]).forEach(p=>usados.add(p)); });

console.log('\n=== ESTADO DE LOS PRODUCTOS USADOS ===');
let sinPrecios=0, conPrecios=0, sinMapa=0, soloNa=0, soloOos=0;
[...usados].forEach(id=>{
  const e = mapa[id];
  if (!e) { sinMapa++; console.log('  SIN MAPA   ' + id + ' ' + byId[id].title); return; }
  if (e.precios===0) { sinPrecios++;
    console.log('  0 PRECIOS  ' + id + ' ' + byId[id].title + (e.oos?' [oos]':'') + (e.na?' [na]':''));
  } else conPrecios++;
});
console.log('\n  con precios:    ' + conPrecios);
console.log('  con 0 precios:  ' + sinPrecios);
console.log('  sin entrada:    ' + sinMapa);