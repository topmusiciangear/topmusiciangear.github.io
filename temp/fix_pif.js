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
// INTRO
swap('funcionar de manera confiable donde sea', 'funcionar de manera fiable donde sea');
swap('backstage en un concierto', 'tras el escenario en un concierto');
// SEC0
swap('una fuente de poder externa', 'una fuente de alimentación externa');
// SEC1
swap('compactas y confiables', 'compactas y fiables');
// SEC2
swap('rara vez se portan como un control', 'rara vez se comportan como un estudio');
swap('amplían el ruteo', 'amplían el encaminamiento');
// SEC3
swap('The caja conviene a cantantes', 'La caja conviene a cantantes');
// SEC4
swap('The concesión llega en el margen', 'La concesión llega en el margen');
// SEC5
swap('The SSL 2+ MKII traslada', 'La SSL 2+ MKII traslada');
// SEC7
swap('The EVO 4 acorta ese baile', 'La EVO 4 acorta ese baile');
swap('The concesión es el techo', 'La concesión es el techo');
// SEC9
swap('tres presets que doma picos', 'tres presets que doman picos');
// CONCLUSION + anchors
swap('compactas y suficientemente confiables', 'compactas y suficientemente fiables');
swap('>Mejor interfaz de audio para grabación casera</a>', '>Mejor interfaz de audio: guía completa para grabación casera</a>');
swap('>Scarlett 2i2 vs UA Volt 2: duelo de interfaz</a>', '>Scarlett 2i2 vs UA Volt 2: interfaz económica</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
