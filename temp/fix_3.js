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
swap('es el que duplica el presupuesto', 'es el que triplica el presupuesto', 'duplica->triplica (2)');
swap('quiere que la voz esté presente sin meter EQ, el circuito 4K lo hace en hardware', 'quiere que la voz quede al frente sin tocar el EQ, el circuito 4K lo hace en hardware', 'meter EQ');
swap('HIGH TRIM te da una inclinación de agudos para corregir', 'HIGH TRIM te da un ajuste de agudos para corregir', 'inclinacion');
swap('Es el montaje que duplica el presupuesto', 'Es el montaje que triplica el presupuesto', 'conclusion triplica');
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('total: ' + n);
