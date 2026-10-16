const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'studio-furniture');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
swap('¿Es el Aston Microphones Shield GN pop filter adecuado para tu estudio?', '¿Es el Aston Microphones Shield GN el filtro antipop adecuado para tu estudio?');
swap('¿Es el SSL UF8 DAW controller adecuado para tu flujo de trabajo?', '¿Es el SSL UF8 el controlador DAW adecuado para tu flujo de trabajo?');
swap('La mala ergonomía provoca fatiga y malas decisiones',
  'La mala ergonomía provoca fatiga y malas decisiones.');
swap('La gestión de cables no es opciónal.', 'La gestión de cables no es opcional.');
swap('el jirafa telescópico se extiende suave y los bloqueos siguen bloqueados', 'el brazo jirafa telescópico se extiende suave y los bloqueos siguen bloqueados');
swap('Cambiar las jirafas inestables tras perder una voz perfecta por una que cedía resulta definitivo.',
  'Cambiar las jirafas inestables tras perder una voz perfecta por una que cedía resulta decisivo.');
swap('se mantiene exactamente donde lo colocas—sin caerse con el tiempo', 'se mantiene exactamente donde lo colocas — sin caerse con el tiempo');
swap('Mezclar con un mouse es como pintar con un ladrillo.', 'Mezclar con un ratón es como pintar con un ladrillo.');
swap('>guía de controladores MIDI</a>', '>Mejores superficies de control DAW y bancos de faders</a>');
swap('>Mejor Configuración de Monitores y Calibración de Sala</a>', '>Cómo configurar monitores de estudio para que suene igual</a>');
swap('>Mejores Monitores de estudio</a>', '>Mejores monitores de estudio: guía completa para cada sala</a>');
swap('>Mejores Monitores de estudio Económicos</a>', '>Mejores monitores de estudio por menos de $500</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
