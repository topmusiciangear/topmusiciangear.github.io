const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';

['best-headphones', 'starter-studio'].forEach(g => {
  const d = fs.readFileSync(BASE + 'guides/' + g + '.html', 'utf8');
  const i = d.indexOf('ATH-M20x');
  console.log('\n=== ' + g + ' :: ' + [...d.matchAll(/ATH-M20x/gi)].length + ' menciones ===');
  if (i < 0) { console.log('  no aparece'); return; }

  // ir hacia atras hasta el inicio de la tarjeta y hacia adelante hasta el desplegable
  const ini = d.lastIndexOf('guide-product-card', i);
  const fin = d.indexOf('shop-more-list', i);
  const card = d.slice(Math.max(0, ini), fin > 0 ? fin + 4000 : i + 8000);

  const pri = (card.match(/<a[^>]*class="shop-btn-primary"[^>]*>[\s\S]*?<\/a>/g) || []);
  console.log('  primarios en la tarjeta: ' + pri.length);
  pri.forEach((m, k) => {
    const txt = m.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    console.log('    ' + (k + 1) + '. ' + (/data-price=|data-pb-/.test(m) ? '[PRECIO] ' : '[      ] ') + txt.slice(0, 70));
  });

  const lista = card.match(/<div class="shop-more-list"[\s\S]*?<\/div>/);
  if (lista) {
    console.log('  desplegable:');
    [...lista[0].matchAll(/<a[^>]*data-store="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g)].forEach(m => {
      const txt = m[0].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
      console.log('    ' + m[1].padEnd(12) + (/data-price=|data-pb-/.test(m[0]) ? '[precio]' : '[      ]') + '  ' + txt.slice(0, 60));
    });
  } else console.log('  SIN desplegable');
});
