const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'compact-rhythm-devices');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
swap('FM con presupuesto de mandos: Model:Cycles', 'FM con mandos para presupuestos ajustados: Model:Cycles');
swap('pero exigen memorizar bastantes atajos de menú; por contra, las grooveboxes', 'pero exigen memorizar bastantes atajos de menú; en cambio, las grooveboxes');
swap('vinculadas a los revolucionarios parameter locks y trig conditions por el precio', 'vinculadas a los revolucionarios parameter locks y trigs condicionales por el precio');
swap('y ofrece doce efectos por pista junto a nueve master.', 'y ofrece doce efectos por pista junto a nueve efectos master.');
swap('motores de síntesis digital integrados y micrófono en un peso de tan solo 350 gramos',
  'motores de síntesis digital integrados y micrófono, en un peso de tan solo 350 gramos');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
