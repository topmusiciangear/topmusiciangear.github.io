const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
const h = fs.readFileSync(DIR + 'guides/best-live-subwoofers.html', 'utf8');
console.log('local HTML has TS18S section:', h.includes('Chest-Thump per Dollar'));
console.log('local HTML has EON718S section:', h.includes('Touring Default'));
const sb = fs.readFileSync(DIR + 'js/shop-buttons.js', 'utf8');
console.log('shop-buttons has 631:', sb.includes('631:'));
console.log('shop-buttons has 630:', /[^0-9]630:/.test(sb));
const p = require(DIR + 'data/products.json');
[630, 631].forEach(id => {
  const x = p.find(y => y.id === id);
  console.log(id, '| stores:', JSON.stringify(x.stores), '| price:', x.price);
});
