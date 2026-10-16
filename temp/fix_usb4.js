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
swap('La misma promesa de \\"un cable, gran sonido\\" que un condensador USB de escritorio clásico, pero con interiores más limpios y un preamp APHEX interno en lugar de una etapa XLR desmontable',
  'La misma promesa de «un cable, gran sonido» que un condensador USB de escritorio clásico, pero con una electrónica más limpia y un previo APHEX interno en lugar de una etapa XLR desmontable');
swap('te da una perilla de mezcla real para combinar micrófono y audio del ordenador',
  'te da una rueda de mezcla real para combinar micrófono y audio del ordenador');
swap('El <strong>sE Electronics NEOM USB</strong> va más allá con tres perillas analógicas independientes: Ganancia, Volumen de Auriculares y Mezcla de Reproducción.',
  'El <strong>sE Electronics NEOM USB</strong> va más allá con tres ruedas analógicas independientes: ganancia, volumen de auriculares y mezcla de reproducción.');
swap('sin problemas de ganancia, ve por el <strong>Shure MV7+</strong>',
  'sin problemas de ganancia, apuesta por el <strong>Shure MV7+</strong>');
swap('Y si quieres gastar lo mínimo sin quedarte atado, el <strong>Samson Q2U</strong> te da USB hoy y un XLR para cuando estés listo a comprar una interfaz',
  'Y si quieres gastar lo mínimo sin atarte, el <strong>Samson Q2U</strong> te da USB hoy y un XLR para cuando estés listo para comprar una interfaz');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
