var fs = require('fs');
var src = fs.readFileSync('js/shop-buttons.js', 'utf8');
var lines = src.split(/\r?\n/);
var depth = 0, inStr = null, inLine = false, inBlock = false, prevZero = 0;
for (var i = 0; i < lines.length; i++) {
  var L = lines[i], j = 0;
  while (j < L.length) {
    var c = L[j], c2 = L.substr(j, 2);
    if (inLine) break;
    if (inBlock) { if (c2 === '*/') { inBlock = false; j += 2; continue; } j++; continue; }
    if (inStr) {
      if (c === '\\') { j += 2; continue; }
      if (c === inStr) inStr = null;
      j++; continue;
    }
    if (c2 === '//') { inLine = true; break; }
    if (c2 === '/*') { inBlock = true; j += 2; continue; }
    if (c === '"' || c === "'" || c === '`') { inStr = c; j++; continue; }
    if (c === '{' || c === '(') depth++;
    else if (c === '}' || c === ')') depth--;
    j++;
  }
  if (depth < 0) { console.log('NEGATIVE depth at line ' + (i + 1) + ': ' + L.trim().slice(0, 120)); break; }
  if (depth === 0 && i > 60) { console.log('depth 0 at line ' + (i + 1) + ': ' + L.trim().slice(0, 100)); }
}
console.log('FINAL DEPTH: ' + depth + ' | lines: ' + lines.length);
