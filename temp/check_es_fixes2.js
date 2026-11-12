const fs = require('fs');
const t = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8');

// Buscar el texto actual (ya corregido) en EN
const idx = t.indexOf("Both share Elektron's legendary sequencer");
console.log('EN text fixed:', idx >= 0 ? t.slice(idx, idx + 80) : 'NOT FOUND');

// Buscar en ES - buscar '64 pasos' o '128 pasos' en el contexto de drum machine
const idx2 = t.indexOf('64 pasos');
console.log('ES 64 pasos:', idx2 >= 0 ? t.slice(idx2 - 80, idx2 + 80) : 'NOT FOUND');

const idx3 = t.indexOf('128 pasos');
console.log('ES 128 pasos:', idx3 >= 0 ? t.slice(idx3 - 80, idx3 + 80) : 'NOT FOUND');

// Buscar 'parameter locks' en ES
const idx4 = t.indexOf('parameter locks');
let count = 0;
while (idx4 >= 0) {
  const ctx = t.slice(Math.max(0, idx4 - 100), idx4 + 100);
  if (ctx.includes('_es') || ctx.includes('es":')) {
    console.log('ES parameter locks context:', ctx);
    count++;
  }
  break;
}
console.log('ES parameter locks contexts:', count);
