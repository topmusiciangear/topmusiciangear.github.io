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
// Anchors SEC0 EN -> ES + titulos
swap('href=\\"/guides/budget-interfaces.html\\">Mejores interfaces de audio por menos de $300</a>',
  'href=\\"/guides/budget-interfaces_es.html\\">Mejores interfaces de audio por menos de $300</a>');
swap('href=\\"/guides/scarlett-vs-ssl.html\\">Scarlett 2i2 vs SSL 2+</a>',
  'href=\\"/guides/scarlett-vs-ssl_es.html\\">Scarlett 2i2 vs SSL 2+: ¿mejores previos para voces en casa?</a>');
swap('href=\\"/guides/budget-interfaces.html\\">Mejores interfaces económicas</a>',
  'href=\\"/guides/budget-interfaces_es.html\\">Mejores interfaces de audio por menos de $300</a>');
swap('href=\\"/guides/scarlett-vs-volt.html\\">Scarlett vs Volt</a>',
  'href=\\"/guides/scarlett-vs-volt_es.html\\">Scarlett 2i2 vs UA Volt 2: interfaz económica</a>');
swap('href=\\"/guides/scarlett-vs-ssl.html\\">Scarlett vs SSL</a>',
  'href=\\"/guides/scarlett-vs-ssl_es.html\\">Scarlett 2i2 vs SSL 2+: ¿mejores previos para voces en casa?</a>');
// Texto profundo
swap('hasta unidades rackmount profesionales', 'hasta unidades en rack profesionales');
swap('tiene suficientes entradas para la mayoría de grabación solista', 'tiene suficientes entradas para la mayoría de grabaciones solistas');
swap('previos baratos agregan ruido y distorsión', 'previos baratos añaden ruido y distorsión');
swap('El modo Vintage Mic Previo colorea la entrada', 'El previo Vintage colorea la entrada');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
