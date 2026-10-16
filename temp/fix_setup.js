const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const de = 'Depende de tu setup. El <strong>Shure MV7+</strong>';
const t0 = JSON.stringify(g);
console.log(t0.includes(de) ? 'encontrado x' + (t0.split(de).length - 1) : 'FALLA');
(function rec(o) {
  if (typeof o === 'string') return o.split(de).join('Depende de tu equipo. El <strong>Shure MV7+</strong>');
  if (Array.isArray(o)) return o.map(rec);
  if (o && typeof o === 'object') { Object.keys(o).forEach(k => { o[k] = rec(o[k]); }); }
  return o;
})(g);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
