const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'jbl-vs-kali');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
swap('son los monitores de estudio económicos más comentados',
  'son los monitores de estudio económicos más comentados.');
swap('El controlador de baja frecuencia rediseñado con un imán más grande', 'El driver de baja frecuencia rediseñado con un imán más grande');
swap('extiende la vida útil del surround del controlador, haciendo', 'extiende la vida útil del surround del driver, haciendo');
swap('fueron diseñados para resolver problemas reales de home studio.', 'fueron diseñados para resolver problemas reales de estudio casero.');
swap('compensa la proximidad de paredes, esquinas y escritorios con tres interruptores dip', 'compensa la proximidad de paredes, esquinas y escritorios con tres interruptores DIP');
swap('La disposición de la guía de onda y el controlador crea una sensación', 'La disposición de la guía de onda y el driver crea una sensación');
swap('La revisión V2 añadió una nueva guía de onda', 'La versión V2 añadió una nueva guía de onda');
swap('para el propietario típico de un home studio.', 'para el propietario típico de un estudio casero.');
swap('los Kali LP-6 V2 son la compra más inteligente con su compensación de límites que marca',
  'los Kali LP-6 V2 son la compra más inteligente con su compensación Boundary que marca');
swap('Mira dónde se sitúan la 305P MkII y la LP-6 V2 en el mercado', 'Mira dónde se sitúan el 305P MkII y el LP-6 V2 en el mercado');
swap('Los Kali traen compensación de límites e imágenes estéreo destacadas', 'Los Kali traen compensación Boundary e imagen estéreo destacada');
swap('>guía de los mejores monitores de estudio</a>', '>Mejores monitores de estudio: guía completa para cada sala</a>');
swap('>Mejores Monitores de estudio</a>', '>Mejores monitores de estudio: guía completa para cada sala</a>');
swap('>Mejores Monitores de estudio Económicos</a>', '>Mejores monitores de estudio por menos de $500</a>');
swap('>Mejores Monitores de estudio para Salas Pequeñas</a>', '>Mejores monitores de estudio para salas pequeñas</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
