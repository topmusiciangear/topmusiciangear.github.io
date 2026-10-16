const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'm50x-vs-dt770');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
swap('son los dos auriculares cerrados más populares en estudios de grabación de todo el mundo',
  'son los dos auriculares cerrados más populares en estudios de grabación de todo el mundo.');
swap('Los controladores de 45mm ofrecen un sonido contundente', 'Los drivers de 45 mm ofrecen un sonido contundente');
swap('En grabaciones de banda completa junto a supraaurales más planos, la diferencia en fatiga resulta enorme.',
  'En grabaciones de banda completa junto a circumaurales más planos, la diferencia en fatiga resulta enorme.');
swap('Comprueba la carga de 80 Ohm con tu interfaz y el estado', 'Comprueba la impedancia de 80 ohmios con tu interfaz y el estado');
swap('Los M50x tienen un sonido emocionante más indulgente que hace que todo suene mejor',
  'Los M50x tienen un sonido emocionante más tolerante que hace que todo suene mejor');
swap('mientras que los DT 770 Pro son más analíticos con un pico de agudos que expone fallas durante la edición.',
  'mientras que los DT 770 Pro son más analíticos con un pico de agudos que expone fallos durante la edición.');
swap('Los M50x son más indulgentes: sus graves y agudos potenciados', 'Los M50x son más tolerantes: sus graves y agudos potenciados');
swap('su pico de agudos expone fallas, superior para edición crítica.', 'su pico de agudos expone fallos, superior para edición crítica.');
swap('Ubica la ATH-M50x y la DT 770 Pro frente a la competencia', 'Sitúa al ATH-M50x y al DT 770 Pro frente a la competencia');
swap('>guía de los mejores auriculares de estudio</a>', '>Mejores auriculares de estudio: guía completa</a>');
swap('>Mejores Auriculares de estudio para Mezcla y Seguimiento</a>', '>Mejores auriculares de estudio: guía completa</a>');
swap('>Mejores Auriculares Cerrados para Mezcla y Grabación</a>', '>Mejores auriculares cerrados para grabar y aislar la voz</a>');
swap('>DT 770 Pro vs DT 990 Pro</a>', '>DT 770 Pro vs DT 990 Pro: ¿cerrados o abiertos para mezclar?</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
