const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));
const superlux = products.filter(p => /superlux/i.test(p.title) || /superlux/i.test(p.brand || ''));
console.log('productos Superlux en el catalogo: ' + superlux.length);
superlux.forEach(p => console.log('  ' + p.id + ' | ' + p.title + ' | ' + Object.keys(p.stores || {}).join(',')));

// que marcas de monitores hay ya
const marcas = [...new Set(products.filter(p => p.category === 'monitors').map(p => p.brand))];
console.log('\nmarcas de monitores en el catalogo: ' + marcas.join(', '));
