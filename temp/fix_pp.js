const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'pro-plugins');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
swap('El FabFilter Total Bundle es el bundle de referencia para mezcla', 'El FabFilter Total Bundle es el paquete de referencia para mezcla');
swap('Pro-Q 4 sólo se usa en más mezclas profesionales', 'Pro-Q 4 solo se usa en más mezclas profesionales');
swap('Kontakt 8 es el sampler que se usa en todos lados con más de 55 GB', 'Kontakt 8 es el sampler que se usa en todas partes con más de 55 GB');
swap('>Mejores Plugins de Mezcla Que Hacen una Diferencia Real</a>', '>Mejores plugins para producción musical: guía completa</a>');
swap('>Mejores Plugins de Mezcla y Masterización</a>', '>Mejores plugins de mezcla y masterización</a>');
swap('>Mejores Plugins de Efectos Creativos</a>', '>Mejores plugins de efectos creativos para producción</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
