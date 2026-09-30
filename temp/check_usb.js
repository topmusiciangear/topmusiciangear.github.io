const fs = require('fs');
const G = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
['budget-usb-mics', 'usb-mics', 'budget-mics'].forEach(id => {
  const g = G.find(x => x.id === id);
  console.log('== ' + id);
  console.log(' s0 products=' + JSON.stringify(g.sections[0].products) + (g.sections[0].skipMedia ? ' SKIP' : ''));
  console.log(' verdicts: ' + g.verdictProsCons.map(v => v.name + '(p' + v.pros.length + '/c' + v.cons.length + ')').join(' | '));
});
