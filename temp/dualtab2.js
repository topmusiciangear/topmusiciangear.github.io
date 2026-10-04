const fs = require('fs');
['guides/portable-interfaces.html', 'guides/portable-interfaces_es.html'].forEach(f => {
  const h = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/' + f, 'utf8');
  const n = h.split('<table class="guide-comp-table"').length - 1;
  console.log(f, 'Ultra-Compacta:', h.includes('Ultra-Compacta'), 'tablas:', n);
});
const G = require('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
const g = G.find(x => x.id === 'portable-interfaces');
console.log('Ultra-Compacta en datos:', JSON.stringify(g).includes('Ultra-Compacta'));