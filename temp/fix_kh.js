const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'kh750-vs-7050c');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
swap('el otro, el conectar y usar de confianza en muchos estudios. Los enfrentamos cara a cara',
  'el otro, la opción de conectar y usar de confianza en muchos estudios. Aquí se enfrentan cara a cara');
swap('sin ruido de puerto, sin bombo de una sola nota, solo extensión honesta',
  'sin ruido de puerto, sin resonancia de una sola nota, solo extensión honesta');
swap('impulsado por 256W de amplificación clase D', 'impulsado por 256 W de amplificación en clase D');
swap('para trabajo estéreo y multicanales, mientras que', 'para trabajo estéreo y multicanal, mientras que');
swap('todo gestionado desde la app Neumann.Control, con control a través de tu red',
  'todo gestionado desde la app Neumann.Control a través de tu red');
swap('con cifras de distorsión que la mayoría de cajas ventiladas no puede tocar',
  'con cifras de distorsión que la mayoría de cajas ventiladas no puede igualar');
swap('Un amplificador clase D de 130W entrega', 'Un amplificador en clase D de 130 W entrega');
swap('la carcasa se construye, termina y mide en Iisalmi', 'la carcasa se construye, se finaliza y se mide en Iisalmi');
swap('El precio es el encadenamiento al ecosistema:', 'El precio es atarse al ecosistema:');
swap('nada que pueda fallar tras un ciclo de firmware', 'nada que pueda fallar tras una actualización de firmware');
swap('hace que la integración multicanal sea trivialmente fácil', 'hace que la integración multicanal sea muy fácil');
swap('encaja en flujos digitales con E/S AES3/S-PDIF', 'encaja en flujos digitales con E/S AES3/S/PDIF');
swap('Ambos son soberbios; simplemente creen religiones distintas', 'Ambos son soberbios; simplemente predican religiones distintas');
swap('>guía de los mejores subwoofers de estudio</a>', '>Mejores subwoofers de estudio por menos de $700</a>');
swap('>comparativas de monitores pro</a>', '>ADAM S3H vs Focal Trio11 Be: monitores de tres vías</a>');
swap('>guía de monitores para salas pequeñas</a>', '>Mejores monitores de estudio para salas pequeñas</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
