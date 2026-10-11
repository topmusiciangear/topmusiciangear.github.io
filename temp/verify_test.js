var fs = require('fs');
var es = fs.readFileSync('deals_es.html', 'utf8');
var en = fs.readFileSync('deals.html', 'utf8');
['RC-20 Retro Color', 'K10.2', 'Squier Stratocaster Bundle', 'Warlow'].forEach(function (t) {
  console.log(t + ': es=' + (es.indexOf(t) >= 0) + ' en=' + (en.indexOf(t) >= 0));
});
console.log('PB badge: ' + (es.indexOf('Ahorra $70') >= 0));
console.log('zZ badge: ' + (es.indexOf('Ahorra $100') >= 0));
console.log('AMZ badge: ' + (es.indexOf('Ahorra $40') >= 0));
console.log('RV badge: ' + (es.indexOf('Ahorra €53.7') >= 0));
