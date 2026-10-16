const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'mics-for-creators');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
// Anchors SEC0 EN -> ES + titulos
swap('href=\\"/guides/usb-mics.html\\">Mejores Micrófonos USB para Streaming</a>',
  'href=\\"/guides/usb-mics_es.html\\">Mejores micrófonos USB para streaming</a>');
swap('href=\\"/guides/budget-usb-mics.html\\">Mejores Micrófonos USB económicos por menos de $100</a>',
  'href=\\"/guides/budget-usb-mics_es.html\\">Mejores micrófonos USB por menos de $110</a>');
swap('href=\\"/guides/best-microphone.html\\">Guía Completa de Mejores Micrófonos</a>',
  'href=\\"/guides/best-microphone_es.html\\">Mejor micrófono para voces y grabación casera: guía completa</a>');
// SEC1 profundo
swap('Un brazo de micrófono y filtro pop son accesorios esenciales', 'Un brazo de micrófono y un filtro pop son accesorios esenciales');
swap('(sonidos duros de "P" y "B") que pueden causar distorsión', '(los golpes de "P" y "B") que pueden causar distorsión');
swap('puede reducir el eco de sala significativamente', 'puede reducir notablemente el eco de la sala');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
