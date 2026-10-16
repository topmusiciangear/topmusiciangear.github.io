const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'katana-vs-dsl');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
swap('El arma secreta es la atenuación de potencia 25W y 0,5W, que te permite', 'El arma secreta es la atenuación de potencia 25 W y 0,5 W, que te permite');
swap('El Katana 50 Gen 3 gana en versatilidad, peso y precio con efectos incorporados, mientras que el DSL40CR gana en sensación, dinámica y saturación de tubo auténtica. El Katana gana en versatilidad, peso y precio. Sus efectos incorporados te permiten cubrir géneros sin un pedalboard. El modo de 0,5W lo hace viable para la práctica en casa. El DSL40CR gana en sensación, dinámica y saturación de válvulas auténtica que responde a la dinámica de la púa de maneras que el modelado no puede replicar del todo.',
  'El Katana 50 Gen 3 gana en versatilidad, peso y precio: sus efectos incorporados te permiten cubrir géneros sin un pedalboard, y el modo de 0,5 W lo hace viable para la práctica en casa. El DSL40CR gana en sensación, dinámica y saturación de válvulas auténtica que responde a la dinámica de la púa de maneras que el modelado no puede replicar del todo.');
swap('Ubica el Katana 50 Gen 3 y el DSL40CR frente al mercado de amplificadores más amplio en nuestra guía de amplificadores de guitarra y bajo Una es la potencia',
  'Sitúa el Katana 50 Gen 3 y el DSL40CR frente al mercado de amplificadores más amplio en nuestra guía de amplificadores de guitarra y bajo. Una es la potencia');
swap('>guía de amplificadores de guitarra y bajo</a>', '>Mejores amplificadores de guitarra y bajo: guía completa</a>');
swap('>Mejores Amplificadores de Guitarra y Bajo</a>', '>Mejores amplificadores de guitarra y bajo: guía completa</a>');
swap('>Mejor Guitarra Eléctrica para Grabación Casera</a>', '>Mejor guitarra eléctrica para cada guitarrista</a>');
swap('>Blues Junior vs AC30</a>', '>Blues Junior vs AC30: ¿mejor combo de válvulas?</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
