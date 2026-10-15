const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/guides/';

['best-monitors-for-small-rooms.html', 'best-monitors-for-small-rooms_es.html'].forEach(f => {
  const d = fs.readFileSync(BASE + f, 'utf8');
  console.log('\n=== ' + f + ' ===');

  const partes = d.split('<div class="verdict-product-name">').slice(1);
  let malos = 0;
  partes.forEach(b => {
    const nombre = b.slice(0, b.indexOf('</div>')).trim();
    const pros = ((b.split('verdict-pros-list')[1] || '').split('</ul>')[0].match(/<li>/g) || []).length;
    const cons = ((b.split('verdict-cons-list')[1] || '').split('</ul>')[0].match(/<li>/g) || []).length;
    const bien = pros >= 4 && cons >= 4;
    if (!bien) { malos++; console.log('  FALTA  ' + nombre + '  pros=' + pros + ' cons=' + cons); }
  });
  console.log('  veredictos            : ' + partes.length);
  console.log('  con 4 pros + 4 contras: ' + (partes.length - malos) + '/' + partes.length);
  console.log('  mojibake              : ' + (d.match(/â‚¬|Â£|Â°/g) || []).length);
  console.log('  celdas vacias tabla   : ' +
    [...(d.match(/<table[\s\S]*?<\/table>/) || [''])[0].matchAll(/<td[^>]*>([\s\S]*?)<\/td>/g)]
      .map(m => m[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim())
      .filter(t => t === '' || t === '-').length);
});
