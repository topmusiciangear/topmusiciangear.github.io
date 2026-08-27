var fs = require('fs');
var p = 'C:\\Users\\Daniel\\projects\\topmusiciangear\\data\\guides.json';
var raw = fs.readFileSync(p, 'utf8');
var data = JSON.parse(raw);

var fixed = 0;

data.forEach(function(g) {
  ['conclusion', 'conclusion_es'].forEach(function(field) {
    if (!g[field]) return;
    // Pattern A: remove commas between link buttons
    var before = g[field];
    g[field] = g[field].replace(/<\/a>,\s*<a href/g, '</a> <a href');
    if (g[field] !== before) {
      fixed++;
      console.log('Fixed: ' + g.id + ' (' + field + ')');
    }
  });
});

if (fixed > 0) {
  fs.writeFileSync(p, JSON.stringify(data, null, 2), 'utf8');
  console.log('\nTotal fixed: ' + fixed);
} else {
  console.log('No commas found to fix');
}
