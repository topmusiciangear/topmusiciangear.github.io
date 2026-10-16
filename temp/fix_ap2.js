const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'american-pro-vs-les-paul');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
swap('son los dos modelos de guitarra eléctrica más icónicos de la historia',
  'son los dos modelos de guitarra eléctrica más icónicos de la historia.');
swap('Ideal para profesionales y stratocasteros de por vida.', 'Ideal para profesionales y amantes de la Strat de por vida.');
swap('El mástil atornillado de la Strat ofrece chasquido y articulación, mientras que el set-neck de la Les Paul proporciona sustain infinito y un tono más grueso y comprimido. El mástil atornillado de la Strat le da su característico chasquido y articulación. Las notas son definidas y separadas. El set-neck de la Les Paul le da sustain durante días y un tono más grueso y comprimido.',
  'El mástil atornillado de la Strat ofrece chasquido y articulación, con notas definidas y separadas, mientras que el set-neck de la Les Paul proporciona sustain durante días y un tono más grueso y comprimido.');
swap('Si sólo puedes comprar una, la Strat hace más cosas bien.', 'Si solo puedes comprar una, la Strat hace más cosas bien.');
swap('>guía de la mejor guitarra eléctrica</a>', '>Mejor guitarra eléctrica para cada guitarrista</a>');
swap('>guía de la mejor guitarra para principiantes</a>', '>Mejores guitarras eléctricas para principiantes: qué comprar</a>');
swap('>Mejor Guitarra Eléctrica para Grabación Casera</a>', '>Mejor guitarra eléctrica para cada guitarrista</a>');
swap('>Las Mejores Guitarras Fender para Cada Género</a>', '>Las mejores guitarras Fender para cada género</a>');
swap('>Player Strat vs Pacifica</a>', '>Player Strat vs Yamaha Pacifica 112V: comparativa</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
