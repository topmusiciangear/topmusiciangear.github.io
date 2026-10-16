const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'fx-plugins');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
swap('Los efectos son asi que las mezclas cobren vida y desarrollen su propia identidad',
  'Los efectos son lo que hace que las mezclas cobren vida y desarrollen su propia identidad.');
swap('El delay es un instrumento rítmico, no sólo un eco.', 'El delay es un instrumento rítmico, no solo un eco.');
swap('Un plugin con un estado por defecto fácil y controles visibles', 'Un plugin con un preset inicial fácil y controles visibles');
swap('Uso algo de Soundtoys en literalmente cada mezcla.', 'Hay algo de Soundtoys en literalmente cada mezcla.');
swap('un efecto creativo de una sola perilla que no puedes conseguir', 'un efecto creativo de una sola rueda que no puedes conseguir');
swap('compatibilidad NKS y un proceso sencillo.', 'compatibilidad NKS y un manejo sencillo.');
swap('El ruteo de modulación deja que una banda controle otra', 'El encaminamiento de modulación deja que una banda controle otra');
swap('esto lo comprime en seis knobs de mezcla.', 'esto lo comprime en seis ruedas de mezcla.');
swap('Cada módulo se mezcla con un solo knob, así el carácter', 'Cada módulo se mezcla con una sola rueda, así el carácter');
swap('se vuelven gestos de un knob que puedes disparar en vivo.', 'se vuelven gestos de una rueda que puedes disparar en vivo.');
swap('cuando puedes ver y multibanda exactamente lo que estás rompiendo', 'cuando puedes ver y tratar por bandas exactamente lo que estás rompiendo');
swap('con dado Generate que aleatoriza musicalmente', 'con el botón Generate que aleatoriza musicalmente');
swap('y pegamento Lift-Off (compresión más mid-side más EQ)', 'y cohesión Lift-Off (compresión más mid-side más ecualización)');
swap('>Mejores Plugins de Mezcla Que Hacen una Diferencia Real</a>', '>Mejores plugins para producción musical: guía completa</a>');
swap('>Mejores Plugins de Mezcla y Masterización</a>', '>Mejores plugins de mezcla y masterización</a>');
swap('>Mejores Plugins de Channel Strip y Emulación de Consola</a>', '>Emulación analógica en el DAW: mejores plugins channel strip</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
