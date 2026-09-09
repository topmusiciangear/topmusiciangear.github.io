var f = require('fs').readFileSync('data/guides.json', 'utf8');
var si = f.indexOf('"id": "best-microphone"');
var ei = f.indexOf('"id": "best-monitors"', si);
var seg = f.slice(si, ei);
function count(tag, s) {
  var n = 0, i = -1;
  while ((i = seg.indexOf(s, i + 1)) >= 0) n++;
  console.log(tag, '=>', n);
}
count('concl EN', 'Dynamic mics like the SM57 and SM58 are indestructible workhorses for amps, drums, and live vocals.');
count('concl ES', 'Los dinámicos como el SM57 y SM58 son trabajadores indestructibles para amplificadores, batería y voces en vivo.');
count('faq_a3_es line', '"faq_a3_es": "Los USB tienen un convertidor digital integrado — te conectas directo a tu ordenador sin necesidad de interfaz. Los XLR requieren una interfaz de audio con phantom (para condensadores). XLR ofrece mejor calidad de sonido, escalabilidad y funciones profesionales. USB es más simple y asequible para principiantes."\n    },');
var q = seg.indexOf('"faq_q3"');
console.log('around faq_q3:', JSON.stringify(seg.slice(q - 30, q + 60)));