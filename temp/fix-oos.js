var fs = require('fs');
var c = fs.readFileSync('build-guides.js', 'utf8');
var oosIds = [22,34,39,57,59,64,66,67,92,100,101,102,104,116,119,125,138,139,145,148,150,151,154,157,162,166,201,209,215,216,231,260,271,275,303,304,330,338,354,355,372,396,399,402,403,436];
var changed = 0;
var lines = c.split('\n');
oosIds.forEach(function(id) {
  var re = new RegExp('^\\s*' + id + ':');
  for (var i = 0; i < lines.length; i++) {
    if (re.test(lines[i])) {
      var line = lines[i];
      var oosMatch = line.match(/,oos:\[([^\]]*)\]/);
      if (oosMatch) {
        var arr = oosMatch[1].split(',').map(function(s) { return s.trim().replace(/['"]/g, ''); });
        var filtered = arr.filter(function(s) { return s !== 'zzounds'; });
        if (filtered.length === 0) {
          lines[i] = line.replace(/,\s*oos:\s*\[[^\]]*\]/, '');
        } else {
          lines[i] = line.replace(/oos:\s*\[[^\]]*\]/, 'oos:[' + filtered.map(function(s){return '"'+s+'"';}).join(',') + ']');
        }
        changed++;
      }
      break;
    }
  }
});
fs.writeFileSync('build-guides.js', lines.join('\n'));
console.log('Removed zzounds OOS from', changed, 'products');

// Verify
var c2 = fs.readFileSync('build-guides.js', 'utf8');
var remaining = 0;
oosIds.forEach(function(id) {
  var re = new RegExp('^\\s*' + id + ':.*oos:\\[', 'm');
  if (re.test(c2)) remaining++;
});
console.log('Remaining OOS entries:', remaining);
