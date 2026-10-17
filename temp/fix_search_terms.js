const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
let bg = fs.readFileSync(B + 'build-guides.js', 'utf8');
const antes = (bg.match(/encodeURIComponent\(p\.title \|\| ''\)/g) || []).length;
const antes2 = (bg.match(/encodeURIComponent\(p\.title \|\| p\.name \|\| ''\)/g) || []).length;
console.log('encodeURIComponent(p.title || \'\') -> ' + antes);
console.log('encodeURIComponent(p.title || p.name || \'\') -> ' + antes2);
bg = bg.split("encodeURIComponent(p.title || p.name || '')").join("encodeURIComponent(searchTerm(p.title || p.name))");
bg = bg.split("encodeURIComponent(p.title || '')").join("encodeURIComponent(searchTerm(p.title))");
const despues = (bg.match(/encodeURIComponent\(p\.title/g) || []).length;
console.log('quedan encodeURIComponent(p.title sin searchTerm: ' + despues);
fs.writeFileSync(B + 'build-guides.js', bg, 'utf8');
// comprobar que no queda ninguno sin searchTerm
const malos = [...bg.matchAll(/encodeURIComponent\(p\.title[^)]*\)/g)].map(m => m[0]).filter(s => s.indexOf('searchTerm') < 0);
console.log('sin searchTerm: ' + malos.length + (malos.length ? ' -> ' + JSON.stringify(malos.slice(0, 5)) : ''));
// la funcion searchTerm debe estar definida antes de getResolvedStores
const iDef = bg.indexOf('function searchTerm(');
const iUso = bg.indexOf('searchTerm(product.title)');
console.log('searchTerm definida @' + iDef + ' | primer uso @' + iUso + ' -> ' + (iDef > -1 && iUso > iDef ? 'OK' : 'REVISAR'));