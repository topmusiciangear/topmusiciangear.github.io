const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'best-samplers-drum-computers');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
swap('Autónomo o conectado, pads o teclas, con pantalla o sin ella — el sampler bueno se funde con tus hábitos. Si terminas temas en el sofá o de gira',
  'El sampler bueno se funde con tus hábitos. Si terminas temas en el sofá o de gira');
swap('los samplers de bolsillo bocetan ideas por menos de 300 $, las estaciones medias', 'los samplers de bolsillo bocetan ideas por menos de 300 €, las estaciones medias');
swap('la inclusión de conectividad de audio por USB-C solucióna las limitaciones de ruteo del pasado',
  'la inclusión de conectividad de audio por USB-C soluciona las limitaciones de encaminamiento del pasado');
swap('No hay pantalla táctil (todo se gestiona con encoders y botones)', 'No hay pantalla táctil (todo se gestiona con codificadores y botones)');
swap('Dieciséis perillas Q-Link motorizadas, cada una con su propia pantalla OLED', 'Dieciséis ruedas Q-Link motorizadas, cada una con su propia pantalla OLED');
swap('sus avanzadas opciones de ruteo analógico y digital serán excesivas', 'sus avanzadas opciones de encaminamiento analógico y digital serán excesivas');
swap('no por el ruido mediático (hype): si buscas hacer bocetos', 'no por el ruido mediático: si buscas hacer bocetos');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
