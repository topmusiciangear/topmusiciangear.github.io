const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
const candidates = ['best-interface', 'budget-interfaces', 'portable-interfaces', 'premium-interfaces'];
const products = ['iD14', 'SSL 2', 'Scarlett 2i2', 'MOTU M2', 'Volt 276', 'Volt 2', 'MiniFuse', 'UMC1820', 'EVO 4'];
candidates.forEach(id => {
  const x = g.find(v => v.id === id);
  if (x) {
    const allText = JSON.stringify(x);
    const found = products.filter(p => allText.includes(p));
    console.log(id + ': ' + found.length + ' productos encontrados');
    if (found.length > 0) console.log('  ' + found.join(', '));
    if (id === 'budget-interfaces') {
      console.log('\nSecciones:');
      x.sections.forEach((s, i) => console.log('  [' + i + '] ' + s.heading + ' | products:' + JSON.stringify(s.products)));
      console.log('\nVerdict:', x.verdict);
    }
  }
});
