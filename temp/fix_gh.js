const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'best-guitar-home-office');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
swap('Trabajar desde casa, lo último que quieres es una guitarra que llene la sala de ruido.',
  'Si trabajas desde casa, lo último que quieres es una guitarra que llene la sala de ruido.');
swap('guitarras silenciosas headless como la Donner HUSH-I EVO2', 'guitarras silenciosas sin clavijero como la Donner HUSH-I EVO2');
swap('guitarras de viaje ultra-portables de Traveler', 'guitarras de viaje ultraportátiles de Traveler');
swap('Parece un accesorio de ciencia ficción, sin cabeza, un marco fino en lugar de cuerpo',
  'Parece un accesorio de ciencia ficción, sin clavijero, un marco fino en lugar de cuerpo');
swap('Con unas 4,5 libras de peso, es bastante ligera', 'Con unos 2 kg de peso, es bastante ligera');
swap('en una guitarra de solo 28 pulgadas de largo y menos de 3 libras.', 'en una guitarra de solo 28 pulgadas de largo y menos de 1,4 kg.');
swap('Para músicos de home office que quieren sonido acústico auténtico', 'Para músicos que trabajan desde casa y quieren sonido acústico auténtico');
swap('te permite conectar a un amplificador o mezcladora por la salida', 'te permite conectar a un amplificador o mesa de mezclas por la salida');
swap('Lava ME 4: una acústica que se comporta como una tableta', 'Lava ME 4: una acústica que se comporta como una tableta');
swap('Una acústica que se comporta como una tablet con cuerdas.', 'Una acústica que se comporta como una tableta con cuerdas.');
swap('>guía de la mejor guitarra eléctrica</a>', '>Mejor guitarra eléctrica para cada guitarrista</a>');
swap('>Mejores Guitarras Acústicas</a>', '>Mejores guitarras acústicas para principiantes: qué comprar</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
