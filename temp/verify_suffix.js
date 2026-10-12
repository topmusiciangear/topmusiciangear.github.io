var fs = require('fs');
function chk(n, c) { console.log((c ? 'PASS' : 'FAIL') + ' ' + n); }

var ids = ['budget-interfaces', 'best-monitors-for-small-rooms', 'budget-headphones'];
ids.forEach(function(id) {
  ['.html', '_es.html'].forEach(function(lang) {
    var f = 'guides/' + id + lang;
    var h = fs.readFileSync(f, 'utf8');
    var title = (h.match(/<title>([^<]+)<\/title>/) || [])[1];
    console.log(f + ': ' + title);
  });
});