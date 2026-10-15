const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const MARCA = 'AUTATHM20X';

['best-headphones', 'starter-studio'].forEach(g => {
  const d = fs.readFileSync(BASE + 'guides/' + g + '.html', 'utf8');
  const occ = [...d.matchAll(new RegExp(MARCA, 'gi'))];
  console.log('\n=== ' + g + ' :: ' + occ.length + ' ocurrencias ===');
  occ.forEach((m, k) => {
    // subir hasta el <a data-store= del desplegable, o el boton primario
    const ini = Math.max(
      d.lastIndexOf('<div class="shop-more-list"', m.index),
      d.lastIndexOf('shop-btn-primary', m.index)
    );
    const fin = d.indexOf('</a>', m.index);
    const frag = d.slice(ini, fin + 4);
    const txt = frag.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    console.log('  #' + (k + 1) + ' ' + (/data-price=|data-pb-/.test(frag) ? '[PRECIO]' : '[      ]'));
    console.log('      ' + txt.slice(0, 150));
  });
});
