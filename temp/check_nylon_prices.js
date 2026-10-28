const fs = require('fs');

const files = ['guides/best-nylon-guitars-for-beginners.html', 'guides/best-nylon-guitars-for-beginners_es.html'];
const want = ['£319.00', '£129.00', '€209.00', '€289.00', '£249.00', '$229.00', 'item--ORTR121', 'gear4music.com/search?q=Ortega%20R121', 'andertons.co.uk/search.php?search_query=Ortega%20R121', 'CODC1M34'];
const bad = ['£299.00', '€284.00', '£152.00', '£179.00'];

for (const f of files) {
  const h = fs.readFileSync(f, 'utf8');
  console.log('\n' + f);
  const missing = want.filter(w => !h.includes(w));
  console.log('  presentes:', (want.length - missing.length) + '/' + want.length, missing.length ? '(faltan: ' + missing.join(', ') + ')' : '');
  const left = bad.filter(b => h.includes(b));
  console.log('  residuos viejos:', left.length ? left.join(', ') : 'ninguno');
  const i = h.indexOf('1059');
  console.log('  cfg 1059:', i < 0 ? 'NO ENCONTRADO' : h.slice(i, i + 340).replace(/\s+/g, ' '));
}
