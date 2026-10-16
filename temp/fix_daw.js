const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'daw-guide');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
swap('pero algunas DAWs son mejor para tareas específicas que otras.', 'pero algunas DAWs son mejores para tareas específicas que otras.');
swap('por su secuenciador por pasos y flujo por patrones. con su secuenciador de pasos y flujo basado en patrones.',
  'por su secuenciador por pasos y flujo por patrones.');
swap('así que los portátiles justos pueden ir justos en proyectos grandes', 'así que los portátiles modestos pueden ir justos en proyectos grandes');
swap('donde instrumentos y efectos se conectan como cacharros, con ruteo CV y soporte RE', 'donde instrumentos y efectos se conectan como cacharros, con encaminamiento CV y soporte RE');
swap('porque rutear sin fin ralentiza decisiones cuando aprietan las entregas', 'porque encaminar sin fin ralentiza las decisiones cuando aprietan las entregas');
swap('href=\\"/guides/best-daw-for-beginners.html\\">Guía de mejores DAWs</a>', 'href=\\"/guides/best-daw-for-beginners_es.html\\">Mejor DAW para principiantes</a>');
swap('href=\\"/guides/best-daw-for-beginners.html\\">Best DAW for beginners</a>', 'href=\\"/guides/best-daw-for-beginners_es.html\\">Mejor DAW para principiantes</a>');
swap('href=\\"/guides/ableton-vs-logic.html\\">Ableton vs Logic Pro</a>', 'href=\\"/guides/ableton-vs-logic_es.html\\">Ableton Live vs Logic Pro: diferencias de flujo</a>');
swap('href=\\"/guides/best-daw-for-beginners.html\\">Mejor DAW</a>', 'href=\\"/guides/best-daw-for-beginners_es.html\\">Mejor DAW para principiantes</a>');
swap('href=\\"/guides/best-daw-for-beginners.html\\">Mejor DAW para principiantes</a>', 'href=\\"/guides/best-daw-for-beginners_es.html\\">Mejor DAW para principiantes</a>');
swap('href=\\"/guides/ableton-vs-fl-studio.html\\">Ableton vs FL Studio</a>', 'href=\\"/guides/ableton-vs-fl-studio_es.html\\">Ableton Live vs FL Studio: ¿cuál es mejor para ti?</a>');
swap('href=\\"/guides/pro-tools-vs-cubase.html\\">Pro Tools vs Cubase</a>', 'href=\\"/guides/pro-tools-vs-cubase_es.html\\">Pro Tools vs Cubase Pro: grabación y mezcla</a>');
swap('>mejores DAWs para principiantes</a>', '>Mejor DAW para principiantes</a>');
swap('>Ableton vs FL Studio</a>', '>Ableton Live vs FL Studio: ¿cuál es mejor para ti?</a>');
swap('>Ableton vs Logic Pro</a>', '>Ableton Live vs Logic Pro: diferencias de flujo</a>');
swap('>Pro Tools vs Cubase</a>', '>Pro Tools vs Cubase Pro: grabación y mezcla</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
