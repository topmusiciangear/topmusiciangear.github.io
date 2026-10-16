const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'ew-iem-g4-twin-vs-psm300');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
swap('La respuesta rápida: ew iEM g4-Twin-e vs pSM300', 'La respuesta rápida: EW IEM G4-TWIN-E vs PSM300');
swap('Por qué el ew IEM G4-TWIN-E es el set pro de dos intérpretes', 'Por qué el EW IEM G4-TWIN-E es el set pro de dos intérpretes');
swap('para descubrir cuál justifica su precio', 'para descubrir cuál justifica su precio.');
swap('un enlace RF analógico ultrafiable hasta 300 ft y el escaneo', 'un enlace RF analógico ultrafiable hasta 100 m (300 ft) y el escaneo');
swap('y compras receptores P3R adicionales o un Twinpack cuando la banda crece.',
  'y puedes comprar receptores P3R adicionales o un Twinpack cuando la banda crece.');
swap('El transmisor SR IEM G4 de media unidad de rack alimenta dos bodypacks EK IEM G4 a la vez',
  'El transmisor SR IEM G4 de media unidad de rack alimenta dos petacas EK IEM G4 a la vez');
swap('las dos entradas combo XLR-3/4\\" permiten que la mesa', 'las dos entradas combo XLR/jack permiten que la mesa');
swap('con 1680 frecuencias selecciónables y hasta 16 canales', 'con 1680 frecuencias seleccionables y hasta 16 canales');
swap('Ambos bodypacks tienen sincronización IR para un emparejamiento rápido', 'Ambas petacas tienen sincronización IR para un emparejamiento rápido');
swap('y Audio Reference Companding entrega audio digital limpio de 24-bit con relación señal-ruido superior a 90 dB,',
  'y Audio Reference Companding entrega audio digital limpio de 24 bits con relación señal-ruido superior a 90 dB.');
swap('>guía de mejores altavoces PA</a>', '>Mejores altavoces PA de 12 y 15 pulgadas para directo</a>');
swap('>de mejores monitores de escenario</a>', '>Mejores monitores de piso activos para directo</a>');
swap('>de inalámbricos de escenario</a>', '>Mejores sistemas de micrófono inalámbricos para escenario</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
