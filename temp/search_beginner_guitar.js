const fs = require('fs');
const t = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8');

// Buscar 'per euro' en el contexto de Jet JS-300
let searchFrom = 0;
console.log('per euro contexts:');
while (true) {
  const i = t.indexOf('per euro', searchFrom);
  if (i < 0) break;
  const ctx = t.slice(Math.max(0, i - 100), i + 60);
  console.log('  ' + ctx);
  searchFrom = i + 8;
}

// Buscar 'Clip-on tuners'
const idx2 = t.indexOf('Clip-on tuners');
console.log('\nClip-on tuners context:', idx2 >= 0 ? t.slice(idx2 - 40, idx2 + 80) : 'NOT FOUND');

// Buscar '24.75'
const idx3 = t.indexOf('24.75');
console.log('\n24.75 context:', idx3 >= 0 ? t.slice(idx3 - 40, idx3 + 80) : 'NOT FOUND');

// Buscar 'A -300 guitar' o similar
const idx4 = t.indexOf('A -300');
console.log('\nA -300 context:', idx4 >= 0 ? t.slice(idx4 - 40, idx4 + 80) : 'NOT FOUND');

// Buscar 'A $200'
const idx5 = t.indexOf('A $200');
console.log('\nA $200 context:', idx5 >= 0 ? t.slice(idx5 - 40, idx5 + 80) : 'NOT FOUND');
