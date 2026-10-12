var fs = require('fs');
var es = fs.readFileSync('deals_es.html', 'utf8');
console.log('es 8% off: ' + (es.indexOf('8% off</span>') >= 0));
