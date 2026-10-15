const fs = require('fs'), path = require('path');
const raiz = 'C:/Users/Daniel/projects/topmusiciangear/guides/';

const ESPERADO = {
  675: /r2\.gear4music\.com\/media\/26\/260432/,
  595: /cf1\.zzounds\.com.*CavernsFace/,
  667: /r2\.gear4music\.com\/media\/112\/1126877/,
  358: /cf1\.zzounds\.com.*at875r_1_sq.*1200by1200/
};

const fallos = [];
Object.keys(ESPERADO).forEach(id => {
  let en = 0, mal = 0;
  fs.readdirSync(raiz).filter(f => f.endsWith('.html')).forEach(f => {
    const d = fs.readFileSync(path.join(raiz, f), 'utf8');
    if (!d.includes('openReviewModal(' + id + ')')) return;
    const m = d.indexOf('openReviewModal(' + id + ')');
    // buscar la img mas cercana hacia atras y hacia delante
    const zone = d.slice(Math.max(0, m - 3000), m + 3000);
    const imgs = [...zone.matchAll(/https:\/\/[^"' ]+\.(?:jpg|jpeg|png|webp)/gi)].map(x => x[0]);
    const buena = imgs.some(u => ESPERADO[id].test(u));
    if (buena) en++; else { mal++; fallos.push({ id, f, imgs: [...new Set(imgs)] }); }
  });
  console.log('  id ' + id.padStart(4) + '  tarjetas OK: ' + en + '   incorrectas: ' + mal);
});

if (fallos.length) {
  console.log('\n=== FALLOS ===');
  fallos.forEach(x => console.log('  ' + x.id + ' en ' + x.f + '\n     ' + x.imgs.join('\n     ')));
} else console.log('\n  Las 4 imagenes nuevas estan en las tarjetas, EN y ES.');
