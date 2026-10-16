const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'portable-interfaces');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
swap('<a class=\\"guide-link-btn\\" href=\\"/guides/best-interface.html\\">Guía de mejores interfaces de audio</a>',
  '<a class=\\"guide-link-btn\\" href=\\"/guides/best-interface_es.html\\">Mejor interfaz de audio: guía completa para grabación casera</a>');
swap('<a class=\\"guide-link-btn\\" href=\\"/guides/best-interface.html\\">Mejores interfaces de audio</a>',
  '<a class=\\"guide-link-btn\\" href=\\"/guides/best-interface_es.html\\">Mejor interfaz de audio: guía completa para grabación casera</a>');
swap('/guides/budget-interfaces.html\\">Mejores interfaces económicas</a>',
  '/guides/budget-interfaces_es.html\\">Mejores interfaces de audio por menos de $300</a>');
swap('/guides/scarlett-vs-volt.html\\">Scarlett 2i2 vs UA Volt 2</a>',
  '/guides/scarlett-vs-volt_es.html\\">Scarlett 2i2 vs UA Volt 2: interfaz económica</a>');
swap('/guides/audient-vs-motu.html\\">Audient iD14 vs MOTU M2</a>',
  '/guides/audient-vs-motu_es.html\\">Audient iD14 vs MOTU M2: duelo de interfaces USB-C</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
