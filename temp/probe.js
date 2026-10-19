const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));

const iguales = guides.filter(g => g.title === g.title_es);
console.log('Guias donde title === title_es: ' + iguales.length + ' de ' + guides.length);
iguales.slice(0, 12).forEach(g => console.log('   ' + g.id + '  ->  ' + g.title));

console.log('\nEjemplos de title / title_es con (Pros & Cons) en EN:');
guides.filter(g => /\(Pros & Cons\)/.test(g.title)).slice(0, 10).forEach(g => {
  console.log('   EN: ' + g.title);
  console.log('   ES: ' + g.title_es);
  console.log('   --');
});
