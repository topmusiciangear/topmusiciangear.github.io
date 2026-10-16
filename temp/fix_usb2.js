const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'usb-mics');
let S = JSON.stringify(gg);
let n = 0;
function swap(de, a) {
  if (!S.includes(de)) { console.log('  FALLA ' + de.slice(0, 60)); return; }
  S = S.split(de).join(a); n++;
  console.log('  ok ' + a.slice(0, 60));
}
swap('Para opciones económicas por menos de 100 $,', 'Para opciones económicas por menos de $100,');
swap('>guía de Micrófonos USB Económicos</a>', '>guía de micrófonos USB económicos</a>');
swap('Reemplaza al Yeti y Yeti X en nuestra tabla porque resuelve el mismo problema \\"un cable, gran sonido\\" con internals más limpios',
  'Sustituye al Yeti y al Yeti X en nuestra tabla porque resuelve lo mismo ("un cable, gran sonido") con una electrónica interna más limpia');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
