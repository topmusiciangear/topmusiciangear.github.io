var fs = require('fs');
var targets = process.argv[2].split(',');
var all = [];
for (var i = 1; i <= 6; i++) {
  all = all.concat(JSON.parse(fs.readFileSync('temp/deepaudit/findings' + i + '.json', 'utf8')));
}
all.forEach(function (g) {
  if (targets.indexOf(g.id) < 0) return;
  console.log('\n==========' + g.id + ' (status ' + g.status + ') ==========');
  (g.issues || []).forEach(function (iss) {
    var s = (iss.severity || '?').charAt(0);
    console.log('[' + s + '][' + iss.type + '] ' + (iss.path || '-'));
    console.log('  snip: ' + JSON.stringify(iss.snippet));
    if (iss.fix) console.log('  fix:  ' + JSON.stringify(iss.fix));
    if (iss.note) console.log('  note: ' + JSON.stringify(iss.note));
  });
});