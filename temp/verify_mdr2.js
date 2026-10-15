const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
['k371-vs-mdr7506', 'best-headphones'].forEach(g => {
  const d = fs.readFileSync(BASE + 'guides/' + g + '.html', 'utf8');
  const occ = [...d.matchAll(/SNYMDR7506/g)];
  console.log('\n=== ' + g + ' :: ' + occ.length + ' apariciones ===');
  occ.slice(0, 2).forEach((m, k) => {
    const ctx = d.slice(Math.max(0, m.index - 200), m.index + 120);
    console.log('  --- contexto ' + (k + 1) + ' ---');
    console.log('  ' + ctx.replace(/\s+/g, ' '));
  });
  // el desplegable de la tarjeta: localizar el titulo del producto
  const t = d.indexOf('MDR-7506');
  if (t > 0) {
    const seg = d.slice(t, t + 9000);
    const lista = seg.match(/<div class="shop-more-list"[\s\S]*?<\/div>/);
    if (lista) {
      console.log('  filas del desplegable:');
      [...lista[0].matchAll(/data-store="([^"]+)"/g)].forEach(m => console.log('    ' + m[1]));
    }
  }
});
