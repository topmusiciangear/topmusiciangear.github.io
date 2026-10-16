const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'best-multi-effects-pedals');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
swap('Un pedal multiefectos reemplaza toda una pedalera. Tras probar algunos de los modelos más populares',
  'Un pedal multiefectos reemplaza toda una pedalera, tras probar algunos de los modelos más populares.');
swap('La carga de respuestas a impulso deja usar tus capturas de pantalla favoritas para noches directo a PA',
  'La carga de respuestas a impulso deja usar tus IR favoritas para noches directo a PA');
swap('Ideal para equipos de viaje, músicos de versiones y home studios que doblan como directo.',
  'Ideal para equipos de viaje, músicos de versiones y estudios caseros que doblan como directo.');
swap('Perillas en vez de menús: el camino del ME-90', 'Ruedas en vez de menús: el camino del ME-90');
swap('Si odias los menús y prefieres perillas bajo los pies, el ME-90 te resulta familiar',
  'Si odias los menús y prefieres ruedas bajo los pies, el ME-90 te resulta familiar');
swap('Asegúrate de que te adapta el flujo en pantalla táctil', 'Asegúrate de que te adaptas al flujo en pantalla táctil');
swap('Un sistema completo de escenario, pantalla grande y ruteo profundo:', 'Un sistema completo de escenario, pantalla grande y encaminamiento profundo:');
swap('Nube por WiFi, integración de plugins y USB cubren', 'Nube por wifi, integración de plugins y USB cubren');
swap('El ME-90 y el Flex Prime lideran como mejores opciones de flujo directo para el directo:',
  'El ME-90 y el Flex Prime lideran como mejores opciones de flujo directo para directo:');
swap('>Mejores Pedales de Efectos para Guitarra</a>', '>Mejores pedales de efectos para guitarra: guía completa</a>');
swap('>Mejores Pedales de Reverberación y Delay para Guitarra</a>', '>Mejores pedales de reverberación y delay para guitarra</a>');
swap('>Mejores Pedales de Loop para Guitarra</a>', '>Mejores pedales de loop para guitarra</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
