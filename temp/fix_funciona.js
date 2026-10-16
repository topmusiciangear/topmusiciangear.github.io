const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
let t0 = JSON.stringify(g);
const n = (t0.match(/funcióna/g) || []).length;
(function rec(o) {
  if (typeof o === 'string') return o.split('funcióna').join('funciona');
  if (Array.isArray(o)) return o.map(rec);
  if (o && typeof o === 'object') { Object.keys(o).forEach(k => { o[k] = rec(o[k]); }); }
  return o;
})(g);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('funcióna -> funciona: ' + n);
const t = JSON.stringify(JSON.parse(fs.readFileSync(F, 'utf8')));
console.log('restos: ' + (t.match(/funcióna/g) || []).length);
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
