const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'xr18-vs-m32r');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
swap('la app gratuita para tableta pone ecualización, dinámica, efectos y ruteo bajo tus dedos.',
  'la app gratuita para tableta pone ecualización, dinámica, efectos y encaminamiento bajo tus dedos.');
swap('y el USB multipista permite grabar cada presentación para prueba virtual después.',
  'y el USB multipista permite grabar cada presentación para la prueba de sonido virtual después.');
swap('Ajusta monitores desde el escenario en la prueba y esa libertad deja la banda más compacta.',
  'Ajusta monitores desde el escenario en la prueba y esa libertad hace que la banda suene más compacta.');
swap('Mezcla teatro donde la grabación dual en tarjeta salva una toma tras un fallo informático.',
  'En teatro, donde la grabación dual en tarjeta salva una toma tras un fallo informático.');
swap('¿Vale la pena el costo extra del M32R LIVE sobre el XR18?', '¿Vale la pena el coste extra del M32R LIVE sobre el XR18?');
swap('El M32R te da la experiencia Midas PREMIUM completa.', 'El M32R te da la experiencia Midas premium completa.');
swap('>Mejores Mezcladores de Sonido en Vivo para Bandas y Eventos</a>', '>Mejores mezcladores de sonido para bandas y eventos</a>');
swap('>Mejores Mezcladores Digitales para Bandas y Sonido en Vivo</a>', '>Mejores mezcladores digitales: guía completa</a>');
swap('>Mejores Mezcladores Compactos para Bandas y Home Studios</a>', '>Mejores mezcladores Digitales de rack con control tablet</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
