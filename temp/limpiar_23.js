const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
let n = 0; const fallos = [];
function swap(de, a, et) {
  const t0 = JSON.stringify(g);
  if (!t0.includes(de)) { fallos.push(et); return; }
  const c = t0.split(de).length - 1;
  (function rec(o) {
    if (typeof o === 'string') return o.split(de).join(a);
    if (Array.isArray(o)) return o.map(rec);
    if (o && typeof o === 'object') { Object.keys(o).forEach(k => { o[k] = rec(o[k]); }); }
    return o;
  })(g);
  n += c; console.log('  ok (' + c + ')  ' + et);
}

swap('23 Best Budget XLR Microphones Under $200 ', 'Best Budget XLR Microphones Under $200', '1) snippet budget-mics (con espacio final)');
swap('Our 23 Best Budget XLR Microphones guide has you covered', 'Our Best Budget XLR Microphones guide has you covered', '2) intro budget-usb-mics');
swap('>23 Best Budget Microphones Under $200: XLR</a>', '>Best Budget XLR Microphones Under $200</a>', '3) anchor en best-ribbon-mics');

fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\nreemplazos: ' + n + (fallos.length ? '  FALLAN: ' + fallos.join(', ') : ''));
const t = JSON.stringify(g);
console.log('"23 Best Budget": ' + (t.match(/23 Best Budget/g) || []).length + ' (debe ser 0)');
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
