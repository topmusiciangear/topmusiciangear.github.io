const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'stream-controllers');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
swap('El sonido del streaming es 90% enrutamiento, y el equipo de esta lista convierte ese enrutamiento en algo',
  'El sonido del streaming es 90% encaminamiento, y el equipo de esta lista convierte ese encaminamiento en algo');
swap('para que los espectadores escuchen una mezcla limpia en lugar de un pegote embarrado.',
  'para que los espectadores escuchen una mezcla limpia en lugar de una mezcla embarrada.');
swap('se coloca junto a lo que ya tengas y te da botones y diales para todo.', 'se coloca junto a lo que ya tengas y te da botones y ruedas para todo.');
swap('Ahora mismo es el #1 Best Seller en controladores de estaciones de trabajo de audio digital',
  'Ahora mismo es el n.º 1 en ventas en controladores de estaciones de trabajo de audio digital');
swap('Ocho teclas LCD, cuatro diales hápticos y una tira táctil fina quedan', 'Ocho teclas LCD, cuatro ruedas hápticas y una tira táctil fina quedan');
swap('OBS, Twitch, Discord, domótica, hay muchos plugins, y el soporte de multiacciones',
  'con plugins para OBS, Twitch, Discord y domótica, y el soporte de multiacciones');
swap('El previo Revolution entrega 76dB de ganancia, que es bastante', 'El previo Revolution entrega 76 dB de ganancia, que es bastante');
swap('Ahora la parte de la que tengo que hablarte con franqueza: el software.', 'Ahora la parte delicada: el software.');
swap('Es exactamente lo que encontrarás en las reseñas de usuarios si te pones a rebuscar, y no voy a ocultarlo.',
  'Es exactamente lo que encontrarás en las reseñas de usuarios si te pones a rebuscar, y no hay que ocultarlo.');
swap('El número estrella son los 80dB de ganancia ultrabaja en ruido', 'El número estrella son los 80 dB de ganancia ultrabaja en ruido');
swap('También tienes conversión de 24-bit/96kHz, silenciado táctil', 'También tienes conversión de 24 bits/96 kHz, silenciado táctil');
swap('Con 135dB de rango dinámico, los picos fuertes no llegan a distorsionar', 'Con 135 dB de rango dinámico, los picos fuertes no llegan a distorsionar');
swap('Roland Bridge Cast X: dos buses para jugadora y emisión', 'Roland Bridge Cast X: dos buses para juego y emisión');
swap('El inconveniente es su enfoque jugón:', 'El inconveniente es su enfoque al gaming:');
swap('Solo Windows, los usuarios de macOS, abstenerse, no hay sampler', 'Solo Windows: los usuarios de macOS deberán abstenerse, no hay sampler');
swap('Por unos ~$189 con stock en tiendas grandes, sigue siendo', 'Por unos $189 con stock en tiendas grandes, sigue siendo');
swap('y ~$595 de dinero pro.', 'y $595 de dinero pro.');
swap('tras cuatro previos Onyx80, nueve faders de 100mm y una táctil', 'tras cuatro previos Onyx80, nueve faders de 100 mm y una táctil');
swap('puedes ecualizar, recuperar FX y cambiar el ruteo desde el móvil', 'puedes ecualizar, recuperar FX y cambiar el encaminamiento desde el móvil');
swap('>RØDECaster Pro II vs Mackie DLZ Creator</a>', '>RØDECaster Pro II vs DLZ Creator: ¿cuál gana?</a>');
swap('>guía de mejores interfaces de audio</a>', '>Mejor interfaz de audio: guía completa para grabación casera</a>');
swap('>mejores micrófonos USB</a>', '>Mejores micrófonos USB para streaming</a>');
swap('>mejores micrófonos para pódcasting</a>', '>Mejores micrófonos para podcast: guía completa</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
