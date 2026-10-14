const fs = require('fs');
const files = ['starter-studio', 'mics-for-creators', 'portable-interfaces', 'best-electric-guitar'];
let ok = 0, tot = 0;
files.forEach(id => {
  ['guides/' + id + '.html', 'guides/' + id + '_es.html'].forEach(f => {
    const h = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/' + f, 'utf8');
    const a = !h.includes('A Closer Look');
    const b = !h.includes('análisis detallado');
    tot += 2; if (a) ok++; if (b) ok++;
    if (!a || !b) console.log('  FALLO ' + f + (a ? '' : ' (EN)') + (b ? '' : ' (ES)'));
  });
});
console.log('sin plantilla: ' + ok + '/' + tot);
// muestra de encabezados nuevos
const h = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/guides/starter-studio.html', 'utf8');
console.log('\nEjemplo EN:');
[...h.matchAll(/<h2[^>]*>([^<]+)<\/h2>/g)].slice(0, 8).forEach(m => console.log('  - ' + m[1]));