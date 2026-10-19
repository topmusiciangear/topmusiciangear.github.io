const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));
['U 87', 'C414', 'TLM 103', 'WA-8000', 'Sphere', 'sE2200', 'LCT 440', 'NT1 Signature', 'AT2020',
 'DT 770', 'HD 490', 'LCD-X', 'HD 600', 'NDH 30', 'M50x', 'R70xa', 'SR850', 'MDR-7506', 'DT 990', 'K371', 'M20x']
  .forEach(q => {
    const h = products.filter(p => (p.title || '').toLowerCase().includes(q.toLowerCase()));
    console.log('"' + q + '" -> ' + h.map(p => 'id' + p.id + ' "' + p.title + '" [' + p.score + ']').join('  ||  '));
  });
