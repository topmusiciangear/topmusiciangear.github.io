const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'best-reverb-delay');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
swap('La reverberación y el delay son los efectos de tiempo más esenciales. Probados a fondo en estudio y en vivo',
  'La reverberación y el delay son los efectos de tiempo más esenciales, probados a fondo en estudio y en vivo.');
swap('convierten cualquier pedal en una banda de acompañamiento. MIDI TRS para sincronizar con cualquier sistema.',
  'convierten cualquier pedal en una banda de acompañamiento, con MIDI TRS para sincronizar con cualquier sistema.');
swap('Si solo cabe un delay en una pedalera llena, este compacto todoterreno es en el que confío.',
  'Si solo cabe un delay en una pedalera llena, este compacto todoterreno es el de confianza.');
swap('que encajan en la mezcla con apenas EQ.', 'que encajan en la mezcla con apenas ecualización.');
swap('Es para quienes disfrutan trasteando delays y programan sonidos por tema.', 'Es para quienes disfrutan cacharreando delays y programan sonidos por tema.');
swap('Looper estéreo de 60 segundos, 99 presets, UI a color, MIDI y expresión', 'Looper estéreo de 60 segundos, 99 presets, pantalla a color, MIDI y expresión');
swap('Solo prepárate para más curva de aprendizaje que con pedales', 'Solo prepárate para una curva de aprendizaje mayor que con pedales');
swap('tap tempo y freeze cubren el directo, con fuente 9V incluida.', 'tap tempo y freeze cubren el directo, con fuente de 9 V incluida.');
swap('junto a motores tape, analógicos y digitales con tap tempo y app para voces extra.',
  'junto a motores tape, analógicos y digitales con tap tempo y app para algoritmos extra.');
swap('modos Live/Preset, bypass true o trails con spillover', 'modos Live/Preset, true bypass o trails con spillover');
swap('127 memorias, trucos Hold/Warp/Twist, MIDI TRS, estéreo, 3xAA o adaptador.',
  '127 memorias, trucos Hold/Warp/Twist, MIDI TRS, estéreo, 3 pilas AA o adaptador.');
swap('>Mejores Pedales de Efectos para Guitarra</a>', '>Mejores pedales de efectos para guitarra: guía completa</a>');
swap('>Mejores Pedales de Overdrive y Distorsión para Guitarra</a>', '>Mejores pedales de overdrive y distorsión para guitarra</a>');
swap('>Mejores Pedales de Loop para Guitarra</a>', '>Mejores pedales de loop para guitarra</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
