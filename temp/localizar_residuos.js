const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
const s = g.find(x => x.id === 'starter-studio');

const BUSCA = ['6110', 'circuitry', 'Doppler', 'DIN', 'Ten centimetres', 'Diez centímetros', 'explosivas', 'depurar'];

console.log('=== LOCALIZACION DE RESIDUOS ===\n');
BUSCA.forEach(k => {
  let n = 0;
  console.log('--- "' + k + '" ---');
  s.sections.forEach((sec, i) => {
    ['heading', 'heading_es', 'content', 'content_es'].forEach(f => {
      const v = sec[f] || '';
      if (!v.includes(k)) return;
      [...v.matchAll(new RegExp('.{0,110}' + k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '.{0,110}', 'g'))].forEach(m => {
        n++;
        console.log('  [sec ' + i + '.' + f + ']');
        console.log('     ...' + m[0].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() + '...');
      });
    });
  });
  if (!n) console.log('  (ninguno)');
});
