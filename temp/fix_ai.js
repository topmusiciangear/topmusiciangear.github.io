const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'ai-tools-plugins');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
swap('En 2026, cada desarrollador importante ha integrado aprendizaje automático', 'Hoy, cada desarrollador importante ha integrado aprendizaje automático');
swap('y luego recomienda módulos específicos —EQ, compresor, moldeador de transientes— con parámetros',
  'y luego recomienda módulos específicos (EQ, compresor, moldeador de transitorios) con parámetros');
swap('Carga MIXVAULT en cualquier pista, bus o mezcla completa, presionas ANALYZE para obtener',
  'Carga MIXVAULT en cualquier pista, bus o mezcla completa, pulsas ANALYZE para obtener');
swap('La función de monitorización de loudness es asi que smart:limit sea útil para mastering.',
  'La función de monitorización de loudness es lo que hace que smart:limit sea útil para mastering.');
swap('y luego configura ataque, release y umbral para mantener la sensación natural de tu mezcla mientras alcanzan niveles de loudness competitivos.',
  'y luego configura ataque, release y umbral para mantener la sensación natural de tu mezcla mientras alcanza niveles de loudness competitivos.');
swap('>Mejores Plugins de Sidechain y Modulación Rítmica </a>', '>Mejores plugins de sidechain y modulación rítmica</a>');
swap('>Mejores Plugins para Beatmaking </a>', '>Mejores plugins para beatmakers: lo-fi, hip-hop y urbano</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
