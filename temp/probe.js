const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const p = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));
['Headless', 'NX', 'Donner', 'HUSH', 'Traveler', 'Lava', 'GS Mini']
  .forEach(q => {
    const h = p.filter(x => (x.title || '').toLowerCase().includes(q.toLowerCase()));
    console.log('\n"' + q + '" -> ' + h.length);
    h.slice(0, 5).forEach(x => console.log('   id=' + x.id + ' "' + x.title + '"  score=' + x.score));
  });
