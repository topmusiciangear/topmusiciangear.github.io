var fs = require('fs');
var es = fs.readFileSync('deals_es.html', 'utf8');
console.log('pct left: ' + (es.split('deal-percent').length - 1) + ' (only CSS allowed)');
console.log('UF8: ' + (es.indexOf('UF8 DAW Controller') >= 0) + ' ParaDI: ' + (es.indexOf('Para Acoustic') >= 0));
console.log('old price line: ' + (es.indexOf('deal-old-price') >= 0) + ' badges: ' + (es.split('deal-badge').length - 1));
