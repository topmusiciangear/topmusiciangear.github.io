const fs = require('fs');
const g = fs.readFileSync('guides/best-beginner-electric-guitar.html', 'utf8');
// localizar la card del producto por su nombre y sus 5 filas
const nameIdx = [...g.matchAll(/Squier Sonic Stratocaster HT/g)].map(m => m.index);
console.log('apariciones del nombre:', nameIdx.length);
for (const i of nameIdx) {
  const before = g.slice(Math.max(0, i - 400), i);
  const after = g.slice(i, i + 9000);
  const rows = [...after.matchAll(/data-store="([a-z0-9]+)"/g)].map(m => m[1]);
  if (!rows.length) continue;
  console.log('\n--- card en pos ' + i + ' filas: ' + [...new Set(rows)].join(', '));
  for (const m of after.matchAll(/<a data-store="([a-z0-9]+)"[\s\S]{0,2600}?<\/a>/g)) {
    const store = m[1];
    const pr = (m[0].match(/data-price='([^']+)'/) || [])[1] || 'SIN PRECIO';
    const href = decodeURIComponent((m[0].match(/href="([^"]+)"/) || [])[1] || '').replace(/&amp;/g, '&');
    const art = (href.match(/art-([A-Z0-9]+)-/) || [])[1] || (href.match(/item--([A-Z0-9]+)/) || [])[1] || (href.match(/\/dp\/([A-Z0-9]+)/) || [])[1] || '';
    const clean = href.replace(/^https?:\/\//, '').slice(0, 58);
    console.log('   ' + store.padEnd(11) + pr.padEnd(10) + (art ? art + '  ' : '') + clean);
  }
  break;
}
