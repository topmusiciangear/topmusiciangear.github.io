const fs = require('fs');
const f = 'js/app.min.js';
const c = fs.readFileSync(f, 'utf8');
const old = "if (s.zzounds) {s.zzounds";
if (c.indexOf(old) < 0) { console.log('NOT FOUND'); process.exit(1); }
const nw = "if (s.zzounds && !s.zzounds.startsWith('https://www.anrdoezrs.net/click-101857888-10439229')) {s.zzounds";
fs.writeFileSync(f, c.replace(old, nw));
try {
  new Function(fs.readFileSync(f, 'utf8'));
  console.log('patched + syntax OK');
} catch (e) {
  console.log('SYNTAX ERROR', e.message);
}