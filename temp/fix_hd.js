const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'hd490-pro-vs-dt990');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
swap('son dos de los auriculares abiertos más capaces para mezclar',
  'son dos de los auriculares abiertos más capaces para mezclar.');
swap('se maneja fácil desde una interfaz de audio, laptop o teléfono', 'se maneja fácil desde una interfaz de audio, un portátil o un teléfono');
swap('El pico de agudos alrededor de 8-10kHz es famoso, dando una sensación exagerada de detalle útil para detectar problemas',
  'El pico de agudos alrededor de 8-10 kHz es famoso y da una sensación exagerada de detalle, útil para detectar problemas');
swap('mientras que el sonido en forma de V de los DT 990 Pro requiere aprender su firma sonora para evitar errores de mezcla. Con los HD 490 Pro Plus, escuchas exactamente lo que hay en la pista. Las mezclas hechas con ellos se traducen',
  'mientras que el sonido en forma de V de los DT 990 Pro requiere aprender su firma sonora para evitar errores de mezcla. Las mezclas hechas con ellos se traducen');
swap('Para precisión de mezcla pura, Los Sennheiser HD 490 Pro Plus son la mejor herramienta',
  'Para precisión de mezcla pura, los Sennheiser HD 490 Pro Plus son la mejor herramienta');
swap('Si sólo puedes comprar uno, elige los HD 490 Pro Plus si mezclas', 'Si solo puedes comprar uno, elige los HD 490 Pro Plus si mezclas');
swap('>guía de los mejores auriculares de estudio</a>', '>Mejores auriculares de estudio: guía completa</a>');
swap('>Mejores Auriculares de estudio para Mezcla y Seguimiento</a>', '>Mejores auriculares de estudio: guía completa</a>');
swap('>Mejores Auriculares Abiertos para Mezcla</a>', '>Mejores auriculares abiertos: guía completa</a>');
swap('>DT 770 Pro vs DT 990 Pro</a>', '>DT 770 Pro vs DT 990 Pro: ¿cerrados o abiertos para mezclar?</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
