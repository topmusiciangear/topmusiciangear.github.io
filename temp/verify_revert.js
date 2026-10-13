const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const EXPECT = 'https://r2.gear4music.com/media/106/1068690/1200/preview.jpg';
let fail = 0;

['guides/rodecaster-pro2-vs-bridgecast-x.html', 'guides/rodecaster-pro2-vs-bridgecast-x_es.html'].forEach(function (p) {
  const h = fs.readFileSync(BASE + p, 'utf8');
  const checks = [
    ['og:image', (h.match(/property="og:image" content="([^"]+)"/) || [])[1]],
    ['twitter:image', (h.match(/name="twitter:image" content="([^"]+)"/) || [])[1]]
  ];
  const hero = (h.match(/<img src="([^"]+)"[^>]*alt="[^"]*(?:vs|¿cuál)[^"]*"/) || [])[1];
  if (hero) checks.push(['hero portada', hero]);
  const ld = h.match(/<script type="application\/ld\+json">[\s\S]*?<\/script>/) || [];
  const first = ld[0] || '';
  const ldImg = (first.match(/"image"\s*:\s*"([^"]+)"/) || [])[1];
  if (ldImg) checks.push(['JSON-LD articulo', ldImg]);

  console.log('=== ' + p + ' ===');
  checks.forEach(function (c) {
    const ok = c[1] === EXPECT;
    if (!ok) fail++;
    console.log('  ' + (ok ? 'OK  ' : '[!!] ') + c[0].padEnd(18) + c[1]);
  });
  // el Bridge Cast X debe seguir con SU foto en las cards
  console.log('  Bridge Cast X card (1038820): ' + (h.match(/1038820/g) || []).length + ' usos');
  console.log('  RØDECaster card (1068690): ' + (h.match(/1068690/g) || []).length + ' usos');
  console.log('');
});
console.log(fail === 0 ? 'TODAS LAS COMPROBACIONES OK' : 'FALLOS: ' + fail);
process.exit(fail === 0 ? 0 : 1);