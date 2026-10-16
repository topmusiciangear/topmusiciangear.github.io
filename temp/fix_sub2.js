const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'best-live-subwoofers');
let S = JSON.stringify(gg);
function swap(de, a) {
  if (!S.includes(de)) { console.log('  FALLA ' + de.slice(0, 60)); return; }
  S = S.split(de).join(a);
  console.log('  ok ' + a.slice(0, 60));
}
swap('Un amplificador Class-D de 3600 vatios mueve un woofer de 18\\" de gran excursión',
  'Un amplificador en Clase D de 3.600 vatios alimenta un woofer de 18 pulgadas de gran excursión');
swap('Un amplificador Class-D de 2500 vatios de pico (1250W RMS) mueve un woofer de 18\\" con bobina interior/exterior de 4\\"',
  'Un amplificador en Clase D de 2.500 vatios de pico (1.250 W RMS) alimenta un woofer de 18 pulgadas con bobina interior/exterior de 4 pulgadas');
swap('Un amplificador Class-D de 2000 vatios de pico mueve el woofer 918SG de ferrita de 18\\" hasta 134 dB',
  'Un amplificador en Clase D de 2.000 vatios de pico alimenta el woofer 918SG de ferrita de 18 pulgadas hasta 134 dB');
swap('Su driver de 18\\" con bobina de 4\\" alcanza 136 dB',
  'Su driver de 18 pulgadas con bobina de 4 pulgadas alcanza 136 dB');
swap('>Mejores Altavoces PA Activos para Sonido en Vivo</a>', '>Mejores altavoces PA de 12 y 15 pulgadas para directo</a>');
swap('>Mejores Monitores de Piso Activos para Directo</a>', '>Mejores monitores de piso activos para directo</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
const t = JSON.stringify(g.find(x => x.id === 'best-live-subwoofers'));
console.log('restos Class-D de NNNN: ' + (t.match(/Class-D de \d{3,4} /g) || []).length);
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
