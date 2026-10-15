const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(BASE + 'data/guides.json', 'utf8'));
const P = JSON.parse(fs.readFileSync(BASE + 'data/products.json', 'utf8'));
const arr = Array.isArray(P) ? P : P.products;
const byId = {}; arr.forEach(p => byId[p.id] = p);

const g = guides.find(x => x.id === 'budget-mics');
console.log('budget-mics featuredProducts: ' + JSON.stringify(g.featuredProducts));
console.log('  -> titles: ' + g.featuredProducts.map(i => byId[i] ? byId[i].title : i + '?').join(' | '));
console.log('\n¿668 (AT2020USB-XP) está en featured? ' + (g.featuredProducts.indexOf(668) > -1));
console.log('¿668 está en la tabla (por nombre)? ' + g.productTable.columns.map(c => c.title).filter(t => t.indexOf('AT2020USB-XP') > -1));
const dup = arr.filter(p => p.title.indexOf('AT2020USB-XP') > -1);
console.log('\nProductos en catalogo con ese nombre: ' + dup.map(p => p.id + ' ' + p.title).join(' | '));
console.log('\nverdicts con ese nombre: ' + g.verdictProsCons.filter(v => v.name.indexOf('AT2020USB-XP') > -1).map(v => v.name));