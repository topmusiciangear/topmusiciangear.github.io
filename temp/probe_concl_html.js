const fs = require('fs');
const en = fs.readFileSync('guides/best-nylon-guitars-for-beginners.html', 'utf8');
const es = fs.readFileSync('guides/best-nylon-guitars-for-beginners_es.html', 'utf8');
for (const [label, h, needles] of [
  ['EN', en, ['amplifies nylon', 'actually fits', 'GA35TCE', 'sin discusión', 'estudiantes que empiezan', 'Margen dinámico']],
  ['ES', es, ['amplifica el nylon', 'de verdad les encaja', 'sin discusión', 'estudiantes que empiezan', 'Margen dinámico limitado', 'tapa maciza', 'Tapa maciza']]
]) {
  console.log('===', label);
  for (const n of needles) console.log('  ', n, '->', h.split(n).length - 1);
}
// show EN conclusion block
const i = en.indexOf('conclusion');
console.log('\nEN conclusion area:');
const k = en.indexOf('<div class="guide-conclusion');
console.log(k >= 0 ? en.slice(k, k + 900).replace(/\s+/g, ' ') : 'no guide-conclusion div');
