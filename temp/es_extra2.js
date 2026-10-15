const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const g = JSON.parse(fs.readFileSync(BASE + 'data/guides.json', 'utf8'));
const guia = g.find(x => x.id === 'starter-studio');
const json = JSON.stringify(guia, null, 1);

console.log('guia encontrada: ' + !!guia + ' | longitud JSON: ' + json.length);
console.log('claves: ' + Object.keys(guia).join(', '));

const B = ['wish', 'necessary', 'serves', 'ocho pulgadas', '250 ohmios', 'rochester',
  'ohms', 'amplificador', 'amplifier', 'traducción', 'siete pulgadas', 'seven-inch', 'por translate'];

B.forEach(b => {
  const n = (json.match(new RegExp(b.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi')) || []).length;
  console.log('\n=== "' + b + '" -> ' + n + ' ===');
  if (!n) return;
  let i = -1, c = 0;
  while (c < 4) {
    i = json.toLowerCase().indexOf(b.toLowerCase(), i + 1);
    if (i < 0) break;
    console.log('   ...' + json.slice(Math.max(0, i - 120), i + 160).replace(/\s+/g, ' ') + '...');
    c++;
  }
});
