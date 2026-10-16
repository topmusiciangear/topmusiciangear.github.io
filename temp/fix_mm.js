const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'me90-vs-mx5');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
swap('ME-90 vs flex prime — ¿cómo se comparan estos multiefectos?', 'ME-90 vs Flex Prime: ¿cómo se comparan estos multiefectos?');
swap('Boss ME-90: diales en lugar de menús', 'Boss ME-90: ruedas en lugar de menús');
swap('El pedal favorece a quienes valoran la continuidad con los pedaleros clásicos de la marca',
  'El pedal favorece a quienes valoran la continuidad con los pedales clásicos de la marca');
swap('>Mejores Pedales Multiefectos para Guitarra</a>', '>Mejores pedales Multi-Efectos para guitarra</a>');
swap('>Mejores Pedales de Efectos para Guitarra</a>', '>Mejores pedales de efectos para guitarra: guía completa</a>');
swap('>Mejores Pedales de Reverberación y Delay para Guitarra</a>', '>Mejores pedales de reverberación y delay para guitarra</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
