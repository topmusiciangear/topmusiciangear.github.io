// Verificar specifically HS8 (19) y Rokit (20), que son los que el usuario showed
const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const d = fs.readFileSync(BASE+'guides/best-monitors.html','utf8');

[[19,'Yamaha HS8'],[20,'KRK Rokit 7 G5']].forEach(([id,nombre])=>{
  const i = d.indexOf('openReviewModal('+id+')');
  if (i < 0) { console.log(id + ' ' + nombre + ': no encontrado'); return; }
  const card = d.slice(i, i+4200);
  console.log('\n=== ' + nombre + ' (id ' + id + ') ===');
  const pri = (card.match(/<a[^>]*class="shop-btn-primary"[^>]*>[\s\S]*?<\/a>/)||[])[0];
  if (pri) console.log('  PRIMARIO : ' + pri.replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim() + '   [precio: ' + (/data-price=/.test(pri)?'SI':'no') + ']');
  const lista = card.match(/<div class="shop-more-list"[\s\S]*?<\/div>/);
  if (lista) {
    const filas = [...lista[0].matchAll(/<a[^>]*data-store="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g)];
    console.log('  SECUNDARIO (' + filas.length + ' filas):');
    filas.forEach(m=>{
      const txt = m[0].replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim();
      console.log('    ' + m[1].padEnd(12) + (/data-price=|data-pb-/.test(m[0])?'[precio]':'[      ]') + '  ' + txt);
    });
  } else console.log('  (sin desplegable)');
});