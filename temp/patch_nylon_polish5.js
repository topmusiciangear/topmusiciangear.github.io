const fs = require('fs');
const FILE = 'data/guides.json';
let raw = fs.readFileSync(FILE, 'utf8');
function sub(oldText, newText, label, expected) {
  const c = raw.split(oldText).length - 1;
  if (c !== expected) throw new Error(`[${label}] expected ${expected}, got ${c}`);
  raw = raw.split(oldText).join(newText);
  console.log(`  ${label}: ${c}`);
}
sub('Mejor electro-clásica lista para escenario.', 'Mejor electroclásica lista para escenario.', 'verdict7 ES', 1);
sub('Ibanez GA35TCE: mejor electro-clásica de cuerpo fino para el escenario', 'Ibanez GA35TCE: mejor electroclásica de cuerpo fino para escenario', 'heading7 ES', 2);
sub('Mejor pack económico para estudiantes nuevos.', 'Mejor pack económico para estudiantes que empiezan.', 'verdict2 ES', 1);
fs.writeFileSync(FILE, raw, 'utf8');
const g = JSON.parse(fs.readFileSync(FILE, 'utf8')).find(x => x.id === 'best-nylon-guitars-for-beginners');
console.log('leftover electro-clásica:', (JSON.stringify(g).match(/electro-cl/g) || []).length);
console.log('OK');
