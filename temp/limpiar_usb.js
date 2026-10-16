const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const de = '>23 Best Budget XLR Microphones</a> guide has you covered';
const a = '>Best Budget XLR Microphones</a> guide has you covered';
const t0 = JSON.stringify(g);
if (!t0.includes(de)) { console.log('NO ENCONTRADO'); process.exit(1); }
(function rec(o) {
  if (typeof o === 'string') return o.split(de).join(a);
  if (Array.isArray(o)) return o.map(rec);
  if (o && typeof o === 'object') { Object.keys(o).forEach(k => { o[k] = rec(o[k]); }); }
  return o;
})(g);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
const t = JSON.stringify(JSON.parse(fs.readFileSync(F, 'utf8')));
console.log('"23 Best Budget": ' + (t.match(/23 Best Budget/g) || []).length + ' (debe ser 0)');
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
