const fs = require('fs');
const f = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const guides = JSON.parse(fs.readFileSync(f, 'utf8'));
const g = guides.find(x => x.id === 'budget-bass-like-expensive');
g.description = 'The best budget basses that sound like expensive ones: Squier Classic Vibe, Sire Marcus Miller V5, Yamaha TRBX304 and Fender Player II, with shop prices.';
g.description_es = 'Squier Classic Vibe, Sire Marcus Miller V5, Yamaha TRBX304 y Fender Player II: los bajos economicos que mejor suenan, con precios de tienda.';
fs.writeFileSync(f, JSON.stringify(guides, null, 2));
console.log('EN (' + g.description.length + '): ' + g.description);
console.log('ES (' + g.description_es.length + '): ' + g.description_es);