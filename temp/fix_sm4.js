const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'scarlett-vs-motu');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
swap('Previolificadores y calidad de sonido: ¿cuál suena mejor?', 'Preamplificadores y calidad de sonido: ¿cuál suena mejor?');
swap('y toman enfoques completamente diferentes al mismo precio',
  'y toman enfoques completamente diferentes al mismo precio.');
swap('Los previos de la Scarlett 2i2 son limpios, transparentes y confiables — la 4ª Gen ofrece 120dB de rango',
  'Los previos de la Scarlett 2i2 son limpios, transparentes y fiables: la 4.ª Gen ofrece 120 dB de rango');
swap('con menor jitter y mejor imagen estéreo. pero los previos en sí son comparables',
  'con menor jitter y mejor imagen estéreo. Pero los previos en sí son comparables');
swap('tiene anillos LED halo alrededor de las perillas de ganancia que cambian', 'tiene anillos LED halo alrededor de las ruedas de ganancia que cambian');
swap('La Scarlett tiene una perilla de monitor mix dedicada;', 'La Scarlett tiene una rueda de monitor mix dedicada;');
swap('pero la perilla física de la Scarlett es más rápida de ajustar', 'pero la rueda física de la Scarlett es más rápida de ajustar');
swap('pero el enrutamiento de loopback de la MOTU es más flexible.', 'pero el encaminamiento de loopback de la MOTU es más flexible.');
swap('o prefieres el control físico de perilla para monitor mix.', 'o prefieres el control físico de rueda para monitor mix.');
swap('además de un modo Air para dar aire a la señal y enrutamiento Loopback pensado', 'además de un modo Air para dar aire a la señal y encaminamiento Loopback pensado');
swap('la Scarlett es la recomendación más sencilla por su confiabilidad probada y configuración sencilla.',
  'la Scarlett es la recomendación más sencilla por su fiabilidad probada y configuración sencilla.');
swap('>Mejor Interfaz de Audio para Grabación Casera</a>', '>Mejor interfaz de audio: guía completa para grabación casera</a>');
swap('>Mejor Kit de Home Studio</a>', '>Construyendo tu home studio: 3 niveles para cada presupuesto</a>');
swap('>Scarlett 2i2 vs SSL 2+</a>', '>Scarlett 2i2 vs SSL 2+: ¿mejores previos para voces en casa?</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
