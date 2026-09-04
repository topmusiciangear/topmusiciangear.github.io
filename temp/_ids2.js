const p = require('../data/products.json');
console.log('--- Epiphone ---');
p.filter(x => /epiphone/i.test(x.title)).forEach(x => console.log(x.id, x.title, '|', x.price));
console.log('--- Yamaha C40 / classical / nylon ---');
p.filter(x => (/yamaha/i.test(x.title) && /c4|c5|classic|nylon|alliance/i.test(x.title)) || /cordoba|c40/i.test(x.title)).forEach(x => console.log(x.id, x.title, '|', x.price));
console.log('--- Les Paul ---');
p.filter(x => /les paul/i.test(x.title)).forEach(x => console.log(x.id, x.title, '|', x.price));
