const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'best-wireless-iems');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
swap('La mejor alternativa al pSM 300: Sennheiser XSW IEM', 'La mejor alternativa al PSM 300: Sennheiser XSW IEM');
swap('Mezcla monitores en un lateral viendo a una cantante pasar de cuñas', 'Mezcla desde un lateral viendo a una cantante pasar de cuñas');
swap('Lleva ensayos de voz y teclas donde ambos escuchan una imagen estéreo sólida', 'Cubre ensayos de voz y teclas donde ambos escuchan una imagen estéreo sólida');
swap('sincroniza receptores bodypack ilimitados por infrarrojos', 'sincroniza petacas receptoras ilimitadas por infrarrojos');
swap('Cada músico tiene focus mode, EQ y limitador en el belt pack, así que nadie toca la mesa',
  'Cada músico tiene modo focus, EQ y limitador en la petaca, así que nadie toca la mesa');
swap('El alcance oficial es comedido: 164 pies con línea de vista (la mitad', 'El alcance oficial es comedido: 50 m (164 pies) con línea de vista (la mitad');
swap('>EW IEM G4 vs PSM300</a>', '>Sennheiser EW IEM G4 vs Shure PSM300: duelo</a>');
swap('>IE 900 vs SE846</a>', '>Sennheiser IE 900 vs Shure SE846 Gen 2</a>');
swap('>Mejores Auriculares de estudio</a>', '>Mejores auriculares de estudio: guía completa</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
