const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'pro-monitors');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
swap('Focal trio11 be', 'Focal Trio11 Be');
swap('Dos de los mejores monitores de estudio de midfield disponibles hoy. El tweeter de cinta plegada S-ART de ADAM y rango medio híbrido DCH contra el exquisito tweeter de berilio de Focal con modo Focus',
  'Dos de los mejores monitores de estudio de campo medio disponibles hoy: el tweeter de cinta plegada S-ART de ADAM y rango medio híbrido DCH contra el exquisito tweeter de berilio de Focal con modo Focus.');
swap('que ofrece una respuesta transitoria y detalle excepcionales con prácticamente cero distorsión',
  'que ofrece una respuesta transitoria y un detalle excepcionales con prácticamente cero distorsión');
swap('ADAM por la velocidad de su tweeter de cinta y corrección DSP de sala; Focal para versatilidad y detalle de agudos',
  'ADAM por la velocidad de su tweeter de cinta y la corrección DSP de sala; Focal por la versatilidad y el detalle de agudos');
swap('Con woofers HexaCone duales de 7\\", driver de rango medio DCH (Dome/Cone Hybrid) de 4\\", tweeter de cinta plegada S-ART y 1350W de potencia pico',
  'Con woofers HexaCone duales de 7 pulgadas, driver de rango medio DCH (Dome/Cone Hybrid) de 4 pulgadas, tweeter de cinta plegada S-ART y 1.350 W de potencia pico');
swap('te permite ajustar los monitores precisamente a tu sala', 'te permite ajustar los monitores con precisión a tu sala');
swap('este insignia conmutable es difícil de superar', 'este buque insignia conmutable es difícil de superar');
swap('con tweeter de berilio de una pulgada, medio de cinco y grave de diez pulgadas', 'con tweeter de berilio de una pulgada, medio de cinco pulgadas y grave de diez pulgadas');
swap('El truco Focus lo pasa a emulación de dos vías', 'El truco Focus lo convierte en una emulación de dos vías');
swap('representan dos enfoques diferentes para el monitoreo profesional de midfield', 'representan dos enfoques diferentes para el monitoreo profesional de campo medio');
swap('>Mejores Monitores de estudio Económicos</a>', '>Mejores monitores de estudio por menos de $500</a>');
swap('>Mejores Monitores de estudio</a>', '>Mejores monitores de estudio: guía completa para cada sala</a>');
swap('>Mejor Configuración de Monitores y Calibración de Sala</a>', '>Cómo configurar monitores de estudio para que suene igual</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
