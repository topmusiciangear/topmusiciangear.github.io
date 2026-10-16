const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'pro-live-sound');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
swap('La ingeniería premium británica contra el valor y dominio de mercado alemán',
  'La ingeniería premium británica contra el valor y el dominio del mercado de Behringer.');
swap('y la calidad de audio prístina por la que Allen & Heath es famoso en el sonido de giras.',
  'y la calidad de audio impecable por la que Allen & Heath es famoso en el sonido de giras.');
swap('pantalla táctil capacitiva de 7 pulgadas con control gestual intuitivo, 8 teclas suaves y 8 perillas asignables.',
  'pantalla táctil capacitiva de 7 pulgadas con control gestual intuitivo, 8 teclas suaves y 8 ruedas asignables.');
swap('La arquitectura de mezcla FPGA de 96kHz de Allen & Heath ofrece', 'La arquitectura de mezcla FPGA de 96 kHz de Allen & Heath ofrece');
swap('El SQ-5 es la elección de los profesionales de gira que se niega a comprometer el sonido.',
  'El SQ-5 es la elección de los profesionales de gira que se niegan a comprometer el sonido.');
swap('17 faders motorizados de 100mm en 4 capas', '17 faders motorizados de 100 mm en 4 capas');
swap('automatización de escenas y capacidades de enrutamiento extensas.', 'automatización de escenas y capacidades de encaminamiento extensas.');
swap('haciendo que la mezcla digital profesional sea accesible para cada lugar, iglesia y banda.',
  'haciendo que la mezcla digital profesional sea accesible para cada recinto, iglesia y banda.');
swap('>Mejores Mezcladores de Sonido en Vivo para Bandas y Eventos</a>', '>Mejores mezcladores de sonido para bandas y eventos</a>');
swap('>Mejores Altavoces PA Activos para Sonido en Vivo</a>', '>Mejores altavoces PA de 12 y 15 pulgadas para directo</a>');
swap('>Altavoces Activos vs Pasivos</a>', '>Altavoces activos vs pasivos: ¿cuál es mejor para ti?</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
