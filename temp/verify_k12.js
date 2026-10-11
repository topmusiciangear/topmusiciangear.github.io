var fs = require('fs');
var es = fs.readFileSync('deals_es.html', 'utf8');
console.log('K12.2: ' + (es.indexOf('K12.2') >= 0) + ' | badge: ' + (es.indexOf('Ahorra $100') >= 0));
