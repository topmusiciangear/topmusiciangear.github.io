const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const gj = BASE + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gj, 'utf8'));
const g = guides.find(x => x.id === 'budget-bass-like-expensive');
g.description = 'The best budget basses that sound expensive: Squier Classic Vibe, Yamaha BB434, G&L Tribute L-2000, Sire Marcus Miller V5 and Fender Player II.';
fs.writeFileSync(gj, JSON.stringify(guides, null, 2));
console.log('desc EN (' + g.description.length + '): ' + g.description);