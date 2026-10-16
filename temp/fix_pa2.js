const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'best-pa-speakers');
let S = JSON.stringify(gg);
function swap(de, a) {
  if (!S.includes(de)) { console.log('  FALLA ' + de.slice(0, 60)); return; }
  S = S.split(de).join(a);
  console.log('  ok ' + a.slice(0, 60));
}
swap('El EV ZLX-12P-G2 es la mejor opción económica. El QSC K12.2 es el estándar de gira.',
  'El EV ZLX-12P-G2 es la mejor opción económica, el QSC K12.2 es el estándar de gira');
swap('<strong>El QSC K12.2 es el altavoz activo más confiable en audio profesional.</strong>',
  '<strong>El QSC K12.2 es el altavoz activo más fiable en audio profesional.</strong>');
swap('<strong>La Yamaha DXR12mkII combina componentes premium con DSP avanzado para una calidad de sonido excepcional.</strong>',
  '<strong>La Yamaha DXR12mkII combina componentes premium con DSP avanzado para una calidad de sonido excepcional.</strong>');
swap('Para sistemas de 15\\", el ELX200-15P y el PRX915 aportan los graves extra',
  'Para sistemas de 15 pulgadas, el ELX200-15P y el PRX915 aportan los graves extra');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
const t = JSON.stringify(g.find(x => x.id === 'best-pa-speakers'));
console.log('restos 15\\": ' + (t.match(/15\\"/g) || []).length);
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
