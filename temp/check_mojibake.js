// Comprobar si build-guides.js quedo con doble codificacion (mojibake)
const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const buf = fs.readFileSync(BASE + 'build-guides.js');

console.log('BOM: ' + (buf[0] === 0xEF && buf[1] === 0xBB && buf[2] === 0xBF ? 'SI' : 'no'));
const s = buf.toString('utf8');

const mojibake = (s.match(/[ÂÃ][\u0080-\u00BF]|â‚¬|Â£|Â°/g) || []);
console.log('mojibake encontrado: ' + mojibake.length);
if (mojibake.length) {
  const idx = s.search(/â‚¬|Â£|Â°|Â /);
  console.log('primer caso: ...' + s.slice(Math.max(0, idx - 90), idx + 90) + '...');
}
console.log('euros legitimos: ' + (s.match(/€/g) || []).length);
console.log('libras legitimas: ' + (s.match(/£/g) || []).length);
console.log('bytes UTF-8 de euro (E2 82 AC): ' + (s.match(/€/g) || []).length);

// comparar con git
const { execSync } = require('child_process');
try {
  const antes = execSync('git show HEAD:build-guides.js', { cwd: BASE, encoding: 'utf8', maxBuffer: 6e7 });
  console.log('\ngit HEAD: euros=' + (antes.match(/€/g) || []).length + ' libras=' + (antes.match(/£/g) || []).length + ' mojibake=' + (antes.match(/â‚¬|Â£|Â°/g) || []).length);
} catch (e) { console.log('git no disponible'); }
