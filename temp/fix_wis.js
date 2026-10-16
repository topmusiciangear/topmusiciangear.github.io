const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'wireless-intercom-systems');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
swap('Cómo elegir un sistema de Intercomunicación inalámbrico', 'Cómo elegir un sistema de intercomunicación inalámbrico');
swap('¿Es el Hollyland SOLIDCOM C1 el mejor Intercomunicador True-Wireless sin Bodypacks?',
  '¿Es el Hollyland SOLIDCOM C1 el mejor intercomunicador true-wireless sin petacas?');
swap('¿Es el Hollyland SOLIDCOM C1 Pro el mejor Intercom Push-to-Talk para Producciones Largas?',
  '¿Es el Hollyland SOLIDCOM C1 Pro el mejor intercom push-to-talk para producciones largas?');
swap('¿Es el Hollyland SOLIDCOM SE PRO el mejor Intercom inalámbrico para Equipos Grandes?',
  '¿Es el Hollyland SOLIDCOM SE PRO el mejor intercom inalámbrico para equipos grandes?');
swap('el técnico de monitores, el ingeniero de FOH (Front of House) y el road manager necesitan comunicarse',
  'el técnico de monitores, el ingeniero de FOH y el jefe de gira necesitan comunicarse');
swap('Cifras como 1000 pies (300m) o 1312 pies (400m) se dan siempre', 'Cifras como 300 m (1000 pies) o 400 m (1312 pies) se dan siempre');
swap('y DECT 6.0 o la banda de 1.9GHz atraviesan un set', 'y DECT 6.0 o la banda de 1,9 GHz atraviesan un set');
swap('mejor que cualquier gadget de 2.4GHz.', 'mejor que cualquier gadget de 2,4 GHz.');
swap('Cada auricular de 168g es una estación independiente', 'Cada auricular de 168 g es una estación independiente');
swap('Ofrece comunicación bidireccional hasta 1000 pies (300m) por DECT 6.0', 'Ofrece comunicación bidireccional hasta 300 m (1000 pies) por DECT 6.0');
swap('El audio de banda ancha de 150Hz–7kHz mantiene las voces claras', 'El audio de banda ancha de 150 Hz–7 kHz mantiene las voces claras');
swap('así que el costo depende de cuántas personas deban ir conectadas', 'así que el coste depende de cuántas personas deban ir conectadas');
swap('y el alcance de 1100 pies (350m) con comunicación full-duplex', 'y el alcance de 350 m (1100 pies) con comunicación full-duplex');
swap('Se comunica por una conexión de 1.9GHz con hasta 1312 pies (400m) en línea de vista',
  'Se comunica por una conexión de 1,9 GHz con hasta 400 m (1312 pies) en línea de vista');
swap('se completa con una salida de auriculares de 3,5mm para que cada miembro', 'se completa con una salida de auriculares de 3,5 mm para que cada miembro');
swap('con hasta 1000 pies (300m) por DECT 6.0, emparejamiento instantáneo', 'con hasta 300 m (1000 pies) por DECT 6.0, emparejamiento instantáneo');
swap('el SE PRO soporta hasta 11 usuarios en un enlace de 1.9GHz, con auriculares',
  'el SE PRO soporta hasta 11 usuarios en un enlace de 1,9 GHz, con auriculares');
swap('>Mejores Sistemas de Micrófono Inalámbricos</a>', '>Mejores sistemas de micrófono inalámbricos para escenario</a>');
swap('>Micrófonos de Solapa Inalámbricos</a>', '>Mejores micrófonos de solapa inalámbricos</a>');
swap('>Mejores Sistemas de PA</a>', '>Mejores sistemas PA para sonido en vivo: guía completa</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
