var fs = require('fs');
var p = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
var t = fs.readFileSync(p, 'utf8');
var start = t.indexOf('"slug":"premium-interfaces"');
var es_start = t.indexOf('"slug":"portable-interfaces"');
console.log('premium at ' + start + '  portable at ' + es_start);
// find bounds: object boundaries around each
function objBounds(t, from) {
  var open = t.indexOf('{', from);
  var depth = 0, i = open, inStr = false, esc = false;
  for (; i < t.length; i++) {
    var c = t[i];
    if (esc) { esc = false; continue; }
    if (inStr) { if (c === '\\') esc = true; else if (c === '"') inStr = false; continue; }
    if (c === '"') inStr = true;
    else if (c === '{') depth++;
    else if (c === '}') { depth--; if (depth === 0) return { s: open, e: i + 1 }; }
  }
  return null;
}
var pb = objBounds(t, start);
var eb = objBounds(t, es_start);
fs.writeFileSync('C:/Users/Daniel/projects/topmusiciangear/temp/cons_patch/premium_obj.json', t.slice(pb.s, pb.e), 'utf8');
fs.writeFileSync('C:/Users/Daniel/projects/topmusiciangear/temp/cons_patch/portable_obj.json', t.slice(eb.s, eb.e), 'utf8');
console.log('wrote premium ' + (pb.e - pb.s) + ' bytes; portable ' + (eb.e - eb.s) + ' bytes');
