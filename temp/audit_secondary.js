// AUDIT DE LOS BOTONES SECUNDARIOS (filas del desplegable)
const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const d = fs.readFileSync(BASE + 'guides/budget-mics.html', 'utf8');

console.log('=== CLASES DE BOTON EN LA PAGINA ===');
const clases = {};
[...d.matchAll(/<a[^>]*class="([^"]*shop[^"]*)"/g)].forEach(m => { clases[m[1]] = (clases[m[1]]||0)+1; });
Object.entries(clases).sort((a,b)=>b[1]-a[1]).forEach(([k,v])=>console.log('  ' + String(v).padStart(4) + 'x  ' + k));

console.log('\n=== ¿HAY DESPLEGABLE (boton "Comparar en N tiendas")? ===');
const mas = (d.match(/Comparar en/g)||[]).length;
console.log('  veces que aparece "Comparar en": ' + mas);
const more = (d.match(/shop-btn-more/g)||[]).length;
console.log('  elementos shop-btn-more: ' + more);

// volcar un boton secundario completo si existe
const row = d.match(/<a[^>]*class="[^"]*shop-btn-row[^"]*"[^>]*>[\s\S]*?<\/a>/);
console.log('\n=== EJEMPLO DE FILA DEL DESPLEGABLE ===');
if (row) console.log(row[0].slice(0,600));
else {
  // buscar cualquier boton que no sea primary
  const otros = [...d.matchAll(/<a[^>]*class="(shop-[^"]*)"[^>]*>([\s\S]*?)<\/a>/g)];
  console.log('  (sin shop-btn-row). Otros tipos: ' + [...new Set(otros.map(m=>m[1]))].join(', '));
  if (otros.length) console.log('\n  ejemplo:\n  ' + otros[0][0].slice(0,500));
}

// donde se generan las filas en build-guides.js
console.log('\n=== EN build-guides.js: donde se pintan las filas ===');
const s = fs.readFileSync(BASE+'build-guides.js','utf8').split('\n');
s.forEach((l,i)=>{
  if (/rowUrl\(|rowsHtml|moreBtn|shop-btn-more|dropdownRows|dispNotes/.test(l) && i>6080 && i<6200) {
    console.log('  ' + (i+1) + ': ' + l.trim().slice(0,130));
  }
});