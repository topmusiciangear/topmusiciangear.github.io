const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'best-electric-guitars-2026');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
swap('Squier debut series stratocaster:', 'Squier Debut Series Stratocaster:');
swap('Squier affinity series stratocaster:', 'Squier Affinity Series Stratocaster:');
swap('Yamaha pacifica 112v:', 'Yamaha Pacifica 112V:');
swap('Squier classic vibe \'50s stratocaster:', 'Squier Classic Vibe \'50s Stratocaster:');
swap('Squier sonic mustang:', 'Squier Sonic Mustang:');
swap('PRS SE custom 24:', 'PRS SE Custom 24:');
swap('Dejar este tipo de guitarra a principiantes totales logra acordes limpios antes', 'Poner este tipo de guitarra en manos de principiantes totales logra acordes limpios antes');
swap('Su escala de 24\\" significa menor tensión de cuerdas', 'Su escala de 24 pulgadas significa menor tensión de cuerdas');
swap('Valorada en este campo 2026 como buque insignia HH moderno', 'Valorada en esta selección 2026 como buque insignia HH moderno');
swap('>Mejor Guitarra Eléctrica para Principiantes</a>', '>Mejores guitarras eléctricas para principiantes: qué comprar</a>');
swap('>Player Strat vs Pacifica</a>', '>Player Strat vs Yamaha Pacifica 112V: comparativa</a>');
swap('>American Pro II vs Les Paul \'60s</a>', '>American Pro II vs Les Paul \'60s: duelo de guitarras pro</a>');
swap('>Mejor Guitarra Eléctrica para Grabación Casera</a>', '>Mejor guitarra eléctrica para cada guitarrista</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
