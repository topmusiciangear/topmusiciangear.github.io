// AUDITORIA FINAL DE PRECIOS — 314 paginas, primario + secundario
const fs = require('fs');
const https = require('https');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';

const files = fs.readdirSync(BASE+'guides').filter(f=>f.endsWith('.html') && !f.includes('_es'));
const esFiles = fs.readdirSync(BASE+'guides').filter(f=>f.endsWith('_es.html'));

// ═══ el mapa de TEST_SHOP_BTN ═══
const lineas = fs.readFileSync(BASE+'build-guides.js','utf8').split('\n');
const ini = lineas.findIndex(l=>/^const TEST_SHOP_BTN = \{/.test(l));
let fin=-1;
for(let i=ini+1;i<lineas.length;i++) if(/^\};?\s*$/.test(lineas[i])){fin=i;break;}
const enMapa = new Set();
const preciosPorId = {};
for(let i=ini+1;i<fin;i++){
  const m = lineas[i].match(/^\s*(\d+):\s*\{/);
  if (m) {
    enMapa.add(+m[1]);
    const pm = lineas[i].match(/prices:\{([^}]*)\}/);
    preciosPorId[+m[1]] = pm ? pm[1] : '';
  }
}

// ═══ productos del sitio ═══
const arr = JSON.parse(fs.readFileSync(BASE+'data/products.json','utf8'));
const list = Array.isArray(arr)?arr:arr.products;
const byId = {}; list.forEach(p=>byId[p.id]=p);
const guides = JSON.parse(fs.readFileSync(BASE+'data/guides.json','utf8'));
const usados = new Set();
guides.forEach(g=>{
  (g.sections||[]).forEach(s=>(s.products||[]).forEach(p=>usados.add(p)));
  (g.featuredProducts||[]).forEach(p=>usados.add(p));
});

// ═══ recorrer HTML ═══
let priTot=0, priOk=0, priCheck=0, priVacio=0;
let secTot=0, secOk=0, secCheck=0, secVacio=0;
const priVacioIds = new Set(), secVacioIds = new Set();
let desplegables = 0, desplegablesSinFilas = 0, conMas = 0;

function recorrer(dir, archivos, etiqueta){
  archivos.forEach(f=>{
    const d = fs.readFileSync(dir+f,'utf8');

    // ── PRIMARIOS ──
    [...d.matchAll(/<a[^>]*class="shop-btn-primary"[^>]*>[\s\S]*?<\/a>/g)].forEach(m=>{
      priTot++;
      if (/data-price=|data-pb-|data-hu-/.test(m[0])) { priOk++; return; }
      const txt = m[0].replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim();
      if (/Check price|Verificar precio/i.test(txt)) { priCheck++; return; }
      // id del producto: buscar hacia atras el openReviewModal
      const antes = d.slice(Math.max(0,m.index-2500), m.index);
      const pm = [...antes.matchAll(/openReviewModal\((\d+)\)/g)];
      if (pm.length) priVacioIds.add(+pm[pm.length-1][1]);
      priVacio++;
    });

    // ── DESPLEGABLES ──
    [...d.matchAll(/<div class="shop-more-list"([\s\S]*?)<\/div>/g)].forEach(l=>{
      desplegables++;
      const filas = [...l[0].matchAll(/<a[^>]*data-store="([^"]+)"[^>]*>[\s\S]*?<\/a>/g)];
      if (!filas.length) { desplegablesSinFilas++; return; }
      filas.forEach(m=>{
        secTot++;
        if (/data-price=|data-pb-|data-hu-/.test(m[0])) { secOk++; return; }
        const txt = m[0].replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim();
        if (/Check price|Verificar precio/i.test(txt)) { secCheck++; return; }
        secVacio++;
        secVacioIds.add(m[1]);
      });
    });
    if (/shop-btn-more/.test(d)) conMas++;
  });
}

recorrer(BASE+'guides/', files, 'EN');
recorrer(BASE+'guides/', esFiles, 'ES');

const pct=(a,b)=>b?Math.round(a/b*100):0;

console.log('='.repeat(72));
console.log('  AUDITORIA FINAL DE PRECIOS — ' + (files.length+esFiles.length) + ' paginas');
console.log('='.repeat(72));

console.log('\n  MAPA DE PRECIOS');
console.log('    entradas totales:          ' + enMapa.size);
console.log('    productos en el sitio:      ' + usados.size);
console.log('    SIN entrada en el mapa:     ' + [...usados].filter(id=>!enMapa.has(id)).length);
[...usados].filter(id=>!enMapa.has(id)).sort((a,b)=>a-b).forEach(id=>{
  const p = byId[id];
  console.log('      ' + String(id).padStart(4) + '  ' + ((p&&p.title)||'NO EN CATALOGO'));
});

console.log('\n  BOTON PRIMARIO');
console.log('    total:            ' + priTot);
console.log('    con precio:       ' + priOk + '  (' + pct(priOk,priTot) + '%)');
console.log('    "Check price":    ' + priCheck + '  (politica: Amazon/Reverb sin precio propio)');
console.log('    VACIOS (bug?):    ' + priVacio + '  (' + pct(priVacio,priTot) + '%)');
if (priVacio) [...priVacioIds].sort((a,b)=>a-b).forEach(id=>{
  const p = byId[id];
  console.log('      id ' + String(id).padStart(4) + ' ' + ((p&&p.title)||'?').padEnd(46) + (enMapa.has(id)?'EN EL MAPA':'no en el mapa'));
});

console.log('\n  BOTON SECUNDARIO (desplegable)');
console.log('    total:            ' + secTot);
console.log('    con precio:       ' + secOk + '  (' + pct(secOk,secTot) + '%)');
console.log('    "Check price":    ' + secCheck + '  (politica)');
console.log('    VACIOS (bug?):    ' + secVacio + '  (' + pct(secVacio,secTot) + '%)');
Object.entries([...secVacioIds].reduce((a,s)=>(a[s]=(a[s]||0)+1,a),{})).sort((a,b)=>b[1]-a[1])
  .forEach(([k,v])=>console.log('      ' + String(v).padStart(4) + 'x  ' + k));

console.log('\n  DESPLEGABLES');
console.log('    paginas con boton "Comparar en N tiendas": ' + conMas);
console.log('    desplegables totales:                       ' + desplegables);
console.log('    desplegables VACIOS:                         ' + desplegablesSinFilas);

console.log('\n  INTEGRIDAD');
console.log('    sin precio por falta de entrada en el mapa:  ' + [...usados].filter(id=>!enMapa.has(id)).length + ' productos');
console.log('    ese % del primario:                         ' + pct([...usados].filter(id=>!enMapa.has(id)).length, usados.size) + '%');