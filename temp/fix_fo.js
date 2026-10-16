const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'fabfilter-vs-ozone');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
swap('Decisión de paquete de plugins: FabFilter u ozone 12', 'Decisión de paquete de plugins: FabFilter u Ozone 12');
swap('representan dos filosofías de procesamiento de audio', 'representan dos filosofías de procesamiento de audio.');
swap('Cuando los plugins de serie te pelean en vez de fluir', 'Cuando los plugins de serie te frenan en vez de fluir');
swap('proporciona control sobre la información de graves.', 'proporciona control sobre el contenido de graves.');
swap('FabFilter pone el control manual total en las manos con interfaces visuales excepcionales, mientras que iZotope ofrece sugerencias de IA que aceleran tu proceso de masterización. FabFilter pone el control total en las manos. Cada parámetro es ajustable',
  'FabFilter pone el control manual total en tus manos con interfaces visuales excepcionales, mientras que iZotope ofrece sugerencias de IA que aceleran tu proceso de masterización. Cada parámetro es ajustable');
swap('el FabFilter Total Bundle es la mejor opción inversión que puedes hacer', 'el FabFilter Total Bundle es la mejor inversión que puedes hacer');
swap('>guía de los mejores plugins</a>', '>Mejores plugins para producción musical: guía completa</a>');
swap('>Mejores Plugins de Mezcla Que Hacen una Diferencia Real</a>', '>Mejores plugins para producción musical: guía completa</a>');
swap('>Mejores Plugins de Mezcla y Masterización</a>', '>Mejores plugins de mezcla y masterización</a>');
swap('>Mejores Plugins de Mezcla Vocal que Realmente Funcionan</a>', '>Mejores plugins vocales: cadena de procesamiento completa</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
