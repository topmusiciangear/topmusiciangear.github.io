const fs = require('fs');
const h = fs.readFileSync('guides/fender-bass-guide.html', 'utf8');
const he = fs.readFileSync('guides/fender-bass-guide_es.html', 'utf8');
const checks = [
  ['review Ultra II EN', h.includes('The Modern Flagship')],
  ['review Ultra II ES', he.includes('el insignia moderno')],
  ['review CV60s EN', h.includes('Vintage Spec, Beginner Price')],
  ['review CV60s ES', he.includes('specs vintage, precio de principiante')],
  ['review Affinity EN', h.includes('Two Pickups, Starter Money')],
  ['review Affinity ES', he.includes('dos pastillas, dinero de principiante')],
  ['7 tarjetas producto', (h.match(/class="guide-product-card"/g) || []).length === 7],
  ['7 tarjetas ES', (he.match(/class="guide-product-card"/g) || []).length === 7],
  ['ya no "Compare 5 more stores"', !h.includes('Compare 5 more stores')],
  ['veredicto Ultra II EN', h.includes('pro session and touring')],
  ['veredicto Ultra II ES', he.includes('sesiones profesionales y gira')],
  ['veredicto Affinity EN', h.includes('lowest-cost route to both Fender voices')],
  ['conclusion flagship EN', h.includes('compound-radius neck for players who need one instrument')],
  ['conclusion flagship ES', he.includes('un solo instrumento para cualquier sala')],
  ['sin heading repetido', new Set([...h.matchAll(/<h2[^>]*>([^<]+)<\/h2>/g)].map(m => m[1])).size === [...h.matchAll(/<h2[^>]*>([^<]+)<\/h2>/g)].length]
];
let ok = 0;
checks.forEach(([n, v]) => { if (v) ok++; console.log((v ? 'OK  ' : 'FALLO ') + n); });
console.log(ok + '/' + checks.length);
console.log('\nH2 EN:');
[...h.matchAll(/<h2[^>]*>([^<]+)<\/h2>/g)].forEach(m => console.log(' - ' + m[1]));