const fs = require('fs');
const f = 'data/guides.json';
const gs = JSON.parse(fs.readFileSync(f, 'utf8'));
const g = gs.find(x => x.id === 'best-studio-monitors-under-150');
console.log('before:', g.featuredProducts);
g.featuredProducts = [1048, 1052, 1043, 1049, 1042, 1046]; // CR4.5, Alesis, BX4, Truth, Eris, CR3.5
fs.writeFileSync(f, JSON.stringify(gs, null, 2));
console.log('after: ', g.featuredProducts);
