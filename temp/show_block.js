var fs = require('fs');
var args = process.argv.slice(2);
var file = 'js/shop-buttons.js';
var ids = args.filter(function(a) { return /^\d+$/.test(a); });
if (args.length && !/^\d+$/.test(args[args.length - 1])) file = args[args.length - 1];
var t = fs.readFileSync(file, 'utf8');
console.log('--- file: ' + file + ' (' + t.length + ' bytes) ---');
ids.forEach(function(id) {
  var re = new RegExp('(?:^|\\n)\\s*' + id + ': \\{');
  var m = re.exec(t);
  if (!m) { console.log(id + ': NOT FOUND'); return; }
  var start = m.index + 1, depth = 0, i = m.index;
  for (; i < t.length; i++) {
    if (t[i] === '{') depth++;
    else if (t[i] === '}') { depth--; if (depth === 0) { i++; break; } }
  }
  while (i < t.length && t[i] !== ',') i++;
  console.log('=== id ' + id + ' ===');
  console.log(t.slice(start, i + 1));
});
