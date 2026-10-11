var fs = require('fs');
var es = fs.readFileSync('deals_es.html', 'utf8');
var en = fs.readFileSync('deals.html', 'utf8');
console.log('Warlow es/en: ' + (es.indexOf('Warlow') >= 0) + '/' + (en.indexOf('Warlow') >= 0) + ' (must be false)');
console.log('guide links es: ' + (es.split('deal-guide-link').length - 1) + ' | label: ' + (es.indexOf('Ver guía:') >= 0));
console.log('guide links en: ' + (en.split('deal-guide-link').length - 1) + ' | label: ' + (en.indexOf('Find in guide:') >= 0));
var g = fs.readFileSync('guides/best-digital-pianos.html', 'utf8');
console.log('RP107 zz link in guide: ' + (g.indexOf('ROLRP107') >= 0));
