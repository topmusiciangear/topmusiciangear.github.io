const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'best-interface');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
swap('La AXE I/O es la única interfaz aquí diseñada pensando exclusivamente en las cuerdas', 'La AXE I/O es la única interfaz aquí diseñada solo para guitarristas');
swap('Sus entradas de instrumento (Hi-Z) frontales alimentan un preamplificador con triple topología física', 'Sus entradas de instrumento (Hi-Z) frontales atacan un previo con triple circuito analógico');
swap('el circuito JFET inyecta la calidez armónica típica de los amplificadores de válvulas', 'el circuito JFET aporta la calidez armónica típica de los amplificadores de válvulas');
swap('Además trae dos entradas combo para micrófono/línea con alimentación Phantom', 'También trae dos entradas combo para micrófono/línea con alimentación phantom');
swap('Los añadidos específicos para guitarristas terminan de redondear el paquete: incorpora un práctico afinador visual en el chasis',
  'Los extras para guitarristas completan el paquete: incorpora un práctico afinador visual en el chasis');
swap('sin tocar el ratón de la computadora', 'sin tocar el ratón del ordenador');
swap('doble entrada para pedales de expresión o switches externos (ideales para controlar efectos de wah o volumen)',
  'doble entrada para pedales de expresión o conmutadores externos (ideales para controlar efectos de wah o volumen)');
swap('Además, incluye de fábrica las licencias de AmpliTube 5 SE, TONEX SE y Ableton Live Lite',
  'De serie incluye las licencias de AmpliTube 5 SE, TONEX SE y Ableton Live Lite');
swap('Por ~$399, es la mejor inversión de escritorio si tienes una guitarra de por medio, aunque resultará excesiva si tu único propósito es grabar voces',
  'Por ~$399, es la mejor inversión de escritorio si hay una guitarra de por medio, aunque resultará excesiva si tu único propósito es grabar voces');
swap('la Universal Audio Volt 2 o Audient EVO 4 viajan bien', 'la Universal Audio Volt 2 o la Audient EVO 4 son las que mejor viajan');
swap('La interfaz adecuada depende de cuántas entradas necesitas y si estás grabando o haciendo stream',
  'La interfaz adecuada depende de cuántas entradas necesitas y de si grabas o haces streaming');
swap('empieza con la AXE I/O: afinador, salida de reamp y software de amplis incluidos',
  'empieza con la AXE I/O: afinador, salida de reamp y software de amplificación incluidos');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('aplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
// destinos de los 5 botones de la conclusion existen?
['budget-interfaces', 'portable-interfaces', 'streaming-interfaces', 'scarlett-vs-ssl', 'starter-studio'].forEach(id =>
  console.log('  ' + id + ': ' + (g.some(x => x.id === id) ? 'existe' : 'NO EXISTE')));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
