const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';

function ctx(file, needle, before, after) {
  const h = fs.readFileSync(BASE + file, 'utf8');
  const i = h.indexOf(needle);
  if (i === -1) return 'NO ENCONTRADO';
  return h.substr(Math.max(0, i - (before || 120)), (before || 120) + needle.length + (after || 120)).replace(/\s+/g, ' ');
}

console.log('=== deals.html ===');
console.log(ctx('deals.html', 'All rights reserved', 220, 160));
console.log('\n=== deals_es.html ===');
console.log(ctx('deals_es.html', 'All rights reserved', 220, 160));
console.log('\n=== build-guides.js (footer de las guias) ===');
console.log(ctx('build-guides.js', 'All rights reserved', 320, 200));

console.log('\n=== cuantas paginas generadas lo contienen ===');
let n = 0, total = 0;
fs.readdirSync(BASE + 'guides').forEach(function (f) {
  if (!f.endsWith('.html')) return;
  total++;
  if (fs.readFileSync(BASE + 'guides/' + f, 'utf8').indexOf('All rights reserved') > -1) n++;
});
console.log('  ' + n + ' de ' + total + ' paginas de guides/');

console.log('\n=== existe _update_v4hash.js? ===');
console.log('  ' + fs.existsSync(BASE + '_update_v4hash.js'));