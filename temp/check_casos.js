const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';

// buscar el producto por su ASIN/URL y ver el boton que le corresponde
function caso(guia, marca) {
  const d = fs.readFileSync(BASE+'guides/'+guia+'.html','utf8');
  const i = d.indexOf(marca);
  if (i < 0) { console.log('\n### ' + guia + ': "'+marca+'" no encontrado'); return; }
  // el boton mas cercano despues
  const despues = d.slice(i, i+6000);
  const pri = [...despues.matchAll(/<a[^>]*class="shop-btn-primary"[^>]*>[\s\S]*?<\/a>/g)];
  if (!pri.length) { console.log('\n### ' + guia + ' ('+marca+'): sin boton en 6000c'); return; }
  console.log('\n### ' + guia + '  (' + marca + ')');
  pri.slice(0,3).forEach((m,k)=>{
    const txt = m[0].replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim();
    console.log('   boton ' + (k+1) + ': ' + (/data-price=|data-pb-/.test(m[0])?'[PRECIO]':'[      ]') + ' ' + txt.slice(0,60));
  });
}

caso('budget-monitors','YAMAHA-HS8');
caso('best-monitors','YAMAHA-HS8');
caso('hs8-vs-rokit-7','ROKIT7G5');
caso('budget-headphones','ATHM50X');
caso('scarlett-vs-ssl','SCARLETT2I24');

// ¿quantos productos aparecen en una tarjeta real vs en una tabla VS?
console.log('\n\n=== ESTRUCTURA: donde viven los botones ===');
['budget-monitors','hs8-vs-rokit-7','scarlett-vs-ssl'].forEach(g=>{
  const d = fs.readFileSync(BASE+'guides/'+g+'.html','utf8');
  const cards = (d.match(/guide-product-card-title/g)||[]).length;
  const reviews = (d.match(/openReviewModal\(/g)||[]).length;
  const pri = (d.match(/class="shop-btn-primary"/g)||[]).length;
  const filas = (d.match(/data-store="/g)||[]).length;
  console.log('  ' + g.padEnd(24) + ' tarjetas:' + String(cards).padStart(3) +
    ' | openReviewModal:' + String(reviews).padStart(3) +
    ' | botones primario:' + String(pri).padStart(3) +
    ' | filas desplegable:' + String(filas).padStart(4));
});