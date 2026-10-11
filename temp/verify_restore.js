var fs = require('fs');
var es = fs.readFileSync('deals_es.html', 'utf8');
['RC-20 Retro Color', 'K12.2', 'UF8', 'Para Acoustic'].forEach(function (t) {
  console.log(t + ': ' + (es.indexOf(t) >= 0));
});
