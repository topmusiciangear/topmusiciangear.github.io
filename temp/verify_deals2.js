var fs = require('fs');
var es = fs.readFileSync('deals_es.html', 'utf8');
var en = fs.readFileSync('deals.html', 'utf8');
function count(s, t) { return s.split(t).length - 1; }
console.log('search input es: ' + (es.indexOf('id="dealsSearch"') >= 0) + ' en: ' + (en.indexOf('id="dealsSearch"') >= 0));
console.log('placeholder es: ' + (es.indexOf('Buscar ofertas por producto') >= 0));
console.log('filter js: ' + (es.indexOf('dealsGrid') >= 0));
console.log('broken empty img: ' + count(es, 'img src=""') + ' (must be 0)');
console.log('K10.2 siid url: ' + (es.indexOf('siid%3D195217') >= 0 || es.indexOf('siid=195217') >= 0));
console.log('Squier left: ' + count(es, 'Squier Stratocaster Bundle'));
console.log('Warlow present: ' + (es.indexOf('Warlow') >= 0) + ' | RC-20: ' + (es.indexOf('RC-20 Retro Color') >= 0));
