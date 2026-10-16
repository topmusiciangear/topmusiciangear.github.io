const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const bg = fs.readFileSync(B + 'build-guides.js', 'utf8');
try { new Function(bg); console.log('SYNTAX OK'); }
catch (e) {
  console.log('ERROR: ' + e.message);
  const m = e.message.match(/position (\d+)/);
  // fallback: binary search the error by halves
  let lo = 0, hi = bg.length, bad = hi;
  const lines = bg.split('\n');
  // find first bad line via incremental parse
  let acc = '';
  for (let i = 0; i < lines.length; i++) {
    acc += lines[i] + '\n';
    try { new Function(acc); }
    catch (e2) {
      if (/Unexpected token|Unexpected end|missing/.test(e2.message)) {
        // could be incomplete; check if it parses with more lines — report first suspect
        console.log('First suspect line: ' + (i + 1) + ': ' + lines[i].substring(0, 200));
        if (i > 0) console.log('Prev line ' + i + ': ' + lines[i - 1].substring(0, 200));
        break;
      }
    }
  }
}
