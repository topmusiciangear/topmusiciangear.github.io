const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'budget-interfaces');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
// INTRO
swap('No necesitas gastar una fortuna para grabar con calidad profesional',
  'No necesitas gastar una fortuna para grabar con calidad profesional.');
// SEC0
swap('un filtro antipop y un cable superan un convertidor marginalmente mejor',
  'un filtro antipop y un cable aportan más que un convertidor marginalmente mejor');
// SEC1
swap('Las maquetas completas grabadas con aparatos así junto a equipos mayores siguen sonando profesionales',
  'Las maquetas completas grabadas con aparatos así al lado de equipos mayores siguen sonando profesionales');
// SEC2
swap('con una pantalla LCD a color que muestra medición real mientras tocas',
  'con una pantalla LCD a color que muestra una medición real mientras tocas');
swap('con interfaces de mandos a ciegas clavan los niveles', 'con interfaces con mandos a ciegas clavan los niveles');
swap('revisa el número de canales, la sensación del monitoreo directo', 'revisa el número de canales, la calidad del monitoreo directo');
// SEC3
swap('gira en torno a su modo Vintage Mic previo, que reconfigura', 'gira en torno a su previo Vintage Mic, que reconfigura');
swap('las tomas necesitan mucha menos EQ', 'las tomas necesitan mucha menos ecualización');
// SEC9
swap('Dos previos, 192kHz, hub USB-A trasero', 'Dos previos, 192 kHz, hub USB-A trasero');
swap('y la mejor suite de software bajo $150 — $149 de calle', 'y la mejor suite de software bajo $150: $149 de precio de calle');
swap('110dB de rango dinámico con MIDI DIN', '110 dB de rango dinámico con MIDI DIN');
swap('hasta 250mA directo de la interfaz', 'hasta 250 mA directamente de la interfaz');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
