var fs = require('fs');
var es = fs.readFileSync('deals_es.html', 'utf8');
console.log('DT990 169: ' + (es.indexOf('€169') >= 0 || es.indexOf('$169') >= 0));
console.log('HD600 269.9: ' + (es.indexOf('269.9') >= 0));
console.log('MDR98: ' + (es.indexOf('$98') >= 0));
