const fs = require('fs');
const h = fs.readFileSync('guides/best-nylon-guitars-for-beginners_es.html', 'utf8');
for (const needle of ['tapa sólida', 'Tapa sólida', '50.8 mm', 'se siente rápido', 'electro-clásica']) {
  let i = -1;
  console.log('\n#####', needle);
  while ((i = h.indexOf(needle, i + 1)) >= 0) {
    console.log('  ...' + h.slice(Math.max(0, i - 220), i + 120).replace(/\s+/g, ' ') + '...');
  }
}
const e = fs.readFileSync('guides/best-nylon-guitars-for-beginners.html', 'utf8');
console.log('\n##### EN punchy');
let j = -1;
while ((j = e.indexOf('punchy', j + 1)) >= 0) console.log('  ...' + e.slice(Math.max(0, j - 220), j + 120).replace(/\s+/g, ' ') + '...');
console.log('\n##### EN 50.8');
j = -1;
while ((j = e.indexOf('50.8', j + 1)) >= 0) console.log('  ...' + e.slice(Math.max(0, j - 160), j + 90).replace(/\s+/g, ' ') + '...');
