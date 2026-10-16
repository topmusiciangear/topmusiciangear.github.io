const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const s = g.find(x => x.id === 'starter-studio');
let n = 0;
function swap(de, a, et) {
  const t0 = JSON.stringify(s);
  if (!t0.includes(de)) { console.log('  FALLA ' + et); return; }
  const c = t0.split(de).length - 1;
  (function rec(o) {
    if (typeof o === 'string') return o.split(de).join(a);
    if (Array.isArray(o)) return o.map(rec);
    if (o && typeof o === 'object') { Object.keys(o).forEach(k => { o[k] = rec(o[k]); }); }
    return o;
  })(s);
  n += c; console.log('  ok (' + c + ')  ' + et);
}
swap('quieres que la voz esté presente sin meter EQ', 'quieres que la voz quede al frente sin tocar el EQ', 'meter EQ');
swap('<strong>HIGH TRIM</strong> te da una inclinación de agudos', '<strong>HIGH TRIM</strong> te da un ajuste de agudos', 'inclinacion');
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('total: ' + n + '  mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
