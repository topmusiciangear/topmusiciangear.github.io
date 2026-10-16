const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
let n = 0;
function swap(de, a, et) {
  const t0 = JSON.stringify(g);
  if (!t0.includes(de)) { console.log('  FALLA ' + et); return; }
  const c = t0.split(de).length - 1;
  (function rec(o) {
    if (typeof o === 'string') return o.split(de).join(a);
    if (Array.isArray(o)) return o.map(rec);
    if (o && typeof o === 'object') { Object.keys(o).forEach(k => { o[k] = rec(o[k]); }); }
    return o;
  })(g);
  n += c; console.log('  ok (' + c + ')  ' + et);
}
swap('>Best Grooveboxes</a>', '>Top Compact Rhythm Devices & Pocket Samplers</a>', 'anchor corto EN');
swap('>Mejores Grooveboxes</a>', '>Mejores dispositivos de ritmo y samplers de bolsillo</a>', 'anchor corto ES');
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
