const fs = require('fs');
for (const f of ['guides/beginner-bass-guitars_es.html', 'guides/beginner-bass-guitars.html']) {
  const h = fs.readFileSync(f, 'utf8');
  console.log('=== ' + f + ' ===');
  console.log('old V5:', (h.match(/Sire Marcus Miller V5(?!R)/g) || []).length,
    '| "V5R 4 Cuerdas":', h.includes('V5R 4 Cuerdas'),
    '| "V5R 4-String":', h.includes('V5R 4-String'),
    '| caballo de batalla:', /caballo de batalla/i.test(h));
  const i = h.indexOf('guide-verdict-name');
  const seg = h.slice(h.indexOf('Sire Marcus Miller V5R') - 200, h.indexOf('Sire Marcus Miller V5R') + 200);
  console.log('V5R context:', seg.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').slice(0, 220));
}
