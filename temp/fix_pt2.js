const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'pro-tools-vs-cubase');
let S = JSON.stringify(gg);
function swap(de, a) {
  if (!S.includes(de)) { console.log('  FALLA ' + de.slice(0, 60)); return; }
  S = S.split(de).join(a);
  console.log('  ok ' + a.slice(0, 60));
}
swap('para grabación, edición y compatibilidad de sesiones.</strong> Pro Tools sigue siendo el DAW que los estudios profesionales esperan. Su edición',
  'para grabación, edición y compatibilidad de sesiones.</strong> Su edición');
swap('hasta convertirse en un DAW de producción completo con mejor notación.</strong> Pro Tools conserva un flujo de trabajo de máquina de cinta familiar para los ingenieros formados en consolas analógicas. Cubase evolucionó desde sus raíces en la composición MIDI hasta convertirse en un DAW de producción completo. Pro Tools tiene mejor edición',
  'hasta convertirse en un DAW de producción completo.</strong> Pro Tools tiene mejor edición');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
