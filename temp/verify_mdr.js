// Verificar el MDR-7506 en la guia donde aparece
const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const guias = ['k371-vs-mdr7506', 'best-headphones', 'budget-headphones'];

guias.forEach(g => {
  const d = fs.readFileSync(BASE + 'guides/' + g + '.html', 'utf8');
  const i = d.indexOf('SNYMDR7506');
  if (i < 0) { console.log(g + ': no aparece'); return; }
  const card = d.slice(Math.max(0, i - 5000), i + 1500);
  console.log('\n=== ' + g + ' ===');
  const pri = (card.match(/<a[^>]*class="shop-btn-primary"[^>]*>[\s\S]*?<\/a>/g) || []);
  pri.forEach((m, k) => {
    const txt = m.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    if (/Buy at|Comprar en|shop-btn-primary/.test(txt))
      console.log('  primario: ' + (/data-price=|data-pb-/.test(m) ? '[PRECIO] ' : '[      ] ') + txt.slice(0, 70));
  });
  const lista = card.match(/<div class="shop-more-list"[\s\S]*?<\/div>/);
  if (lista) {
    console.log('  desplegable:');
    [...lista[0].matchAll(/<a[^>]*data-store="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g)].forEach(m => {
      const txt = m[0].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
      console.log('    ' + m[1].padEnd(12) + (/data-price=|data-pb-/.test(m[0]) ? '[precio]' : '[      ]') + '  ' + txt.slice(0, 65));
    });
  } else console.log('  (sin desplegable en este recorte)');
});
