var fs = require('fs');
var es = fs.readFileSync('deals_es.html', 'utf8');
console.log('UF8 card: ' + (es.indexOf('UF8 DAW Controller') >= 0));
