const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';

function buscar(guia, etiqueta) {
  const d = fs.readFileSync(BASE + 'guides/' + guia, 'utf8');
  console.log('\n### ' + guia);
  ['£170.00','£159.00','€199.00','$260.00','£179.00','£195.00','€219.00','media/91/911020','media/132/1325063','_gcl_aw'].forEach(s => {
    const n = (d.split(s).length - 1);
    console.log('  ' + s.padEnd(20) + n);
  });
  // donde queda _gcl_aw
  let i = -1;
  while ((i = d.indexOf('_gcl_aw', i + 1)) > -1) {
    console.log('    _gcl_aw en: ...' + d.slice(Math.max(0, i - 110), i + 30).replace(/\s+/g, ' ') + '...');
    if (i > 200000) break;
  }
}
buscar('beginner-bass-guitars.html', '');
buscar('best-bass-home-office.html', '');

// Montage: fila de Music Store
console.log('\n\n### Yamaha Montage M8x — Music Store');
['best-synthesizers.html','best-stage-keyboards.html'].forEach(f => {
  const d = fs.readFileSync(BASE + 'guides/' + f, 'utf8');
  const cfg = d.match(/640:\s*\{[\s\S]*?\},|639:\s*\{[\s\S]*?\n\s{4}\},/);
  const tiene = d.includes('"639": {') || d.includes('639:{');
  console.log(f + ': la entrada 639 esta embebida = ' + tiene);
  console.log('   ¿aparece "No disponible"? ' + /No disponible/.test(d));
  console.log('   ¿aparece "Not Available"? ' + /Not Available/.test(d));
  const ms = (d.match(/musicstore[^"]{0,40}"[^"]*":\s*"[^"]*"/g) || []).slice(0, 2);
  console.log('   refs musicstore: ' + ms.length);
});