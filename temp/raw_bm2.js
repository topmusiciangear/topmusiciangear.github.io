const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
const s = g.find(x => x.id === 'best-microphone');
const i = s.sections[0].content_es.indexOf('Salta a la Comparativa');
console.log('SEC0 cola: ' + s.sections[0].content_es.slice(i - 100, i + 200));
console.log('\nTitulos destino conclusion:');
['budget-mics', 'usb-mics', 'stage-mics', 'best-condenser-mics', 'sm57-vs-sm58'].forEach(id => {
  const x = g.find(y => y.id === id);
  console.log('  ' + id + ' :: ' + (x ? x.title_es : 'NO EXISTE'));
});
