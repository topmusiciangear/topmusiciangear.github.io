const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'budget-mics');
let S = JSON.stringify(gg);
function swap(de, a) {
  if (!S.includes(de)) { console.log('  FALLA ' + de.slice(0, 60)); return; }
  S = S.split(de).join(a);
  console.log('  ok ' + a.slice(0, 60));
}
swap('>Guía de micrófonos USB económicos</a>', '>guía de micrófonos USB económicos</a>');
swap('>a K&M 210/2 mic stand</a>', '>a un soporte K&M 210/2</a>');
swap('<strong>Súmale:</strong> trae pinza y estuche pero no cable', '<strong>Además:</strong> trae pinza y estuche pero no cable');
swap('>un soporte K&M 210/2</a> La rejilla esférica ya es un filtro antipop', '>un soporte K&M 210/2</a>. La rejilla esférica ya es un filtro antipop');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
