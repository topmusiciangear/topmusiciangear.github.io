const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'guitar-pedals');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
swap('Estos cuatro pedales más un afinador te dan un pedalboard completo por debajo de $500',
  'Estos cuatro pedales te dan un pedalboard completo por debajo de $500');
swap('como Strymon Timeline ($449) e Eventide H9 Max ($500) suenan', 'como Strymon Timeline ($449) y Eventide H9 Max ($500) suenan');
swap('conmuta con buffered bypass y porta el linaje TS808 tras décadas', 'conmuta con buffered bypass y con el linaje TS808 tras décadas');
swap('con consumo de 1 mA a 9 voltios por pila y bypass hardwire.', 'con consumo de 1 mA a 9 voltios por pila y bypass cableado.');
swap('Las salas secas aplanan las baladas y dejan las mareas worship sin halo.', 'Las salas secas aplanan las baladas y dejan los ambientes worship sin halo.');
swap('true bypass y led para laterales oscuros.', 'true bypass y led para escenarios oscuros.');
swap('los menús hondos y el ruteo estéreo premian la preparación', 'los menús hondos y el encaminamiento estéreo premian la preparación');
swap('El minimalismo es todo el argumento y la única pega — sin knob de profundidad, sin estéreo, sin presets.',
  'El minimalismo es todo el argumento y la única pega: sin rueda de profundidad, sin estéreo, sin presets.');
swap('href=\\"/guides/best-overdrive-distortion.html\\">Mejores pedales de overdrive</a>',
  'href=\\"/guides/best-overdrive-distortion_es.html\\">Mejores pedales de overdrive y distorsión para guitarra</a>');
swap('href=\\"/guides/best-reverb-delay.html\\">Mejores pedales de reverb y delay</a>',
  'href=\\"/guides/best-reverb-delay_es.html\\">Mejores pedales de reverberación y delay para guitarra</a>');
swap('href=\\"/guides/best-looper-pedals.html\\">Mejores pedales looper</a>',
  'href=\\"/guides/best-looper-pedals_es.html\\">Mejores pedales de loop para guitarra</a>');
swap('href=\\"/guides/best-reverb-delay.html\\">Mejores pedales de reverb</a>',
  'href=\\"/guides/best-reverb-delay_es.html\\">Mejores pedales de reverberación y delay para guitarra</a>');
swap('href=\\"/guides/best-reverb-delay.html\\">Mejores pedales de delay</a>',
  'href=\\"/guides/best-reverb-delay_es.html\\">Mejores pedales de reverberación y delay para guitarra</a>');
swap('>mejores pedales de overdrive y distorsión</a>', '>Mejores pedales de overdrive y distorsión para guitarra</a>');
swap('>mejores pedales de reverb y delay</a>', '>Mejores pedales de reverberación y delay para guitarra</a>');
swap('>mejores pedales looper</a>', '>Mejores pedales de loop para guitarra</a>');
swap('>mejores pedales multi-efectos</a>', '>Mejores pedales Multi-Efectos para guitarra</a>');
swap('>TS9 vs BD-2</a>', '>TS9 vs BD-2: ¿mejor overdrive para tu equipo?</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
