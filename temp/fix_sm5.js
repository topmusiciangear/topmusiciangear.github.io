const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'sidechain-modulation-plugins');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
swap('ShaperBox 3 es probablemente el toolkit de modulación rítmica más versátil que existe.',
  'ShaperBox 3 es probablemente la caja de herramientas de modulación rítmica más versátil que existe.');
swap('Puedes encadenar múltiples formas de modulación, usar XY pads para actuaciones en directo',
  'Puedes encadenar múltiples formas de modulación, usar pads XY para actuaciones en directo');
swap('Un solo knob reduce el audio a la mitad de su velocidad original', 'Una sola rueda reduce el audio a la mitad de su velocidad original');
swap('solo insertas el plugin, ajustas el knob y obtienes el efecto.', 'solo insertas el plugin, ajustas la rueda y obtienes el efecto.');
swap('cualquier cosa que necesite esa amplitud stereo analógica.', 'cualquier cosa que necesite esa amplitud estéreo analógica.');
swap('>Mejores Herramientas IA para Producción Musical </a>', '>Mejores herramientas IA para producción musical</a>');
swap('>Mejores Plugins para Beatmaking </a>', '>Mejores plugins para beatmakers: lo-fi, hip-hop y urbano</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
