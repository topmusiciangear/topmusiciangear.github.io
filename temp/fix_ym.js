const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'yamaha-mg-vs-behringer-xenyx');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
swap('Ambas ofrecen una excelente relación calidad-precio, pero se adaptan a prioridades distintas',
  'Ambas ofrecen una excelente relación calidad-precio, pero se adaptan a prioridades distintas.');
swap('4 envíos auxiliares — dándote flexibilidad de enrutamiento profesional para bandas más grandes.',
  '4 envíos auxiliares que te dan flexibilidad de encaminamiento profesional para bandas más grandes.');
swap('audio USB 24-bit/192kHz y los previos D-PRE', 'audio USB de 24 bits/192 kHz y los previos D-PRE');
swap('El EQ gráfico de 7 bandas con sistema de detección de feedback FBQ es ideal', 'El EQ gráfico de 7 bandas con sistema de detección de acoples FBQ es ideal');
swap('las reverberaciones y delays suenan más naturales. pero la X1222USB te da características',
  'las reverberaciones y delays suenan más naturales. Pero la X1222USB te da características');
swap('Si necesitas la mayor versatilidad por tu dinero, la X1222USB poca le hace competencia.',
  'Si necesitas la mayor versatilidad por tu dinero, la X1222USB tiene poca competencia.');
swap('la serie Yamaha MG es la mejor opción inversión.', 'la serie Yamaha MG es la mejor inversión.');
swap('ofreciendo compresión, EQ gráfico y detección de feedback.', 'ofreciendo compresión, EQ gráfico y detección de acoples.');
swap('>Mejores Mezcladores Analógicos para Bandas y Sonido en Vivo</a>', '>Mejores mesas de mezcla analógicas: control directo</a>');
swap('>Mejores Mezcladores Compactos para Bandas y Home Studios</a>', '>Mejores mezcladores Digitales de rack con control tablet</a>');
swap('>Mejores Mezcladores de Sonido en Vivo para Bandas y Eventos</a>', '>Mejores mezcladores de sonido para bandas y eventos</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
