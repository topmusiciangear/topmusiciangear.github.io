const fs = require('fs');
const f = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const guides = JSON.parse(fs.readFileSync(f, 'utf8'));
const g = guides.find(x => x.id === 'budget-bass-like-expensive');
g.description_es = 'Squier Classic Vibe, Sire Marcus Miller V5, Yamaha TRBX304 y Fender Player II: los mejores bajos económicos que suenan como caros, con precios de tienda.';
fs.writeFileSync(f, JSON.stringify(guides, null, 2));
console.log('desc ES (' + g.description_es.length + '): ' + g.description_es);
console.log('desc EN (' + g.description.length + '): ' + g.description);