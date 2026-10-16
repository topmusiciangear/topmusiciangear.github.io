const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'midi-controllers');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
swap('Faders motorizados, controles de transporte y encoders rotativos ponen', 'Faders motorizados, controles de transporte y codificadores rotativos ponen');
swap('obtienes faders motorizados físicos, encoders rotativos y botones de transporte', 'obtienes faders motorizados físicos, codificadores rotativos y botones de transporte');
swap('8 faders es el punto óptimo para la mayoría de los proyectos', '8 faders son el punto óptimo para la mayoría de los proyectos');
swap('funciona con cada DAW principal (Logic, Pro Tools, Ableton, Cubase, Studio One)',
  'funciona con cada DAW importante (Logic, Pro Tools, Ableton, Cubase, Studio One)');
swap('Verifica que el DAW soporte el controlador antes de comprar.', 'Verifica que tu DAW sea compatible con el controlador antes de comprar.');
swap('Puedo cerrar los ojos y mezclar por sensación', 'Puedes cerrar los ojos y mezclar por sensación');
swap('Encadena dos UF8s para 16 faders y tienes', 'Encadena dos UF8 para 16 faders y tienes');
swap('Si estás con presupuesto ajustado y quieres faders motorizados reales, por aquí debes empezar.',
  'Si estás con presupuesto ajustado y quieres faders motorizados reales, este es por donde debes empezar.');
swap('92 botones iluminados y una perilla de transporte', '92 botones iluminados y una rueda de transporte');
swap('como controlador de mezcladora en vivo para las mezcladoras digitales Behringer X32 y XR18',
  'como controlador de mesa de mezclas en vivo para las mesas digitales Behringer X32 y XR18');
swap('y los ángulos de visión de las tiras de escritura no son perfectos', 'y los ángulos de visión de las tiras de escritura no son perfectas');
swap('con pantalla IPS de 4,3 pulgadas, perilla de transporte con peso, 46 teclas', 'con pantalla IPS de 4,3 pulgadas, rueda de transporte con peso, 46 teclas');
swap('Para productores de home studio que quieren experimentar', 'Para productores de estudio casero que quieren experimentar');
swap('El SSL UF8 es la mejor opción superficie de control DAW para productores', 'El SSL UF8 es la mejor opción de superficie de control DAW para productores');
swap('>Mejores teclados: piano, synth y MIDI</a>', '>Mejores teclados y controladores MIDI: piano, synth y DAW</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
