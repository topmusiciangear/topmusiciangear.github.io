var t = require('fs').readFileSync('temp/fix_preview.txt', 'utf8').split('\n');
var want = ['acoustic-guitars-guide', 'budget-interfaces', 'sm57-vs-sm58', 'blx288-vs-ewd', 'best-daw-for-beginners', 'active-vs-passive-pa', 'starter-studio', 'scarlett-vs-ssl'];
for (var i = 0; i < t.length; i++) {
  for (var w = 0; w < want.length; w++) {
    if (t[i].indexOf(want[w]) > -1) {
      console.log(t[i].trim());
      console.log((t[i + 1] || '').trim());
      console.log('---');
    }
  }
}