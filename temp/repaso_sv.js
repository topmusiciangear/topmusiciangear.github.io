const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'scarlett-vs-volt');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
swap('ha sido el líder reconocido de las interfaces', 'ha sido la líder reconocida de las interfaces');
swap('La Volt 2 trae la experiencia en ingeniería analógica de Universal Audio', 'La Volt 2 trae la experiencia de ingeniería analógica de Universal Audio');
swap('que activa un circuito de emulación de tubo que añade saturación armónica que recuerda al clásico canal LA-610',
  'que activa un circuito de emulación de tubo con saturación armónica que recuerda al clásico canal LA-610');
swap('Activa ese interruptor y tus voces instantáneamente suenan más cálidas', 'Activa ese interruptor y tus voces suenan instantáneamente más cálidas');
swap('La Volt 2 también incluye el paquete UAD Spark, dándote acceso a la aclamada colección',
  'La Volt 2 también incluye el paquete UAD Spark, con acceso a la aclamada colección');
swap('La Scarlett 2i2 apunta a la transparencia — sus previos son limpios', 'La Scarlett 2i2 busca la transparencia: sus previos son limpios');
swap('ambas interfaces llevarán cómodamente a un principiante por sus primeros años de grabación',
  'ambas interfaces acompañarán cómodamente a un principiante durante sus primeros años de grabación');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
