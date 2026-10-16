const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
['budget-interfaces', 'scarlett-vs-ssl', 'scarlett-vs-volt', 'portable-interfaces'].forEach(id => {
  const x = g.find(y => y.id === id);
  console.log(id + '\n  EN: ' + (x ? x.title : 'NO EXISTE') + '\n  ES: ' + (x ? x.title_es : ''));
});
const s = g.find(x => x.id === 'best-interface');
console.log('\nSEC0 cola raw:');
console.log(s.sections[0].content_es.slice(-500));
