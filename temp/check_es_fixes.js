const fs = require('fs');
const t = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8');

// Buscar el texto actual (ya corregido) en EN
const idx = t.indexOf("Both share Elektron's legendary sequencer");
console.log('EN text fixed:', idx >= 0 ? t.slice(idx, idx + 80) : 'NOT FOUND');

// Buscar en ES - buscar 'legendary sequencer' en ES
const idx2 = t.indexOf('secuenciador legendario');
console.log('ES secuenciador legendario:', idx2 >= 0 ? t.slice(idx2 - 50, idx2 + 80) : 'NOT FOUND');

// Buscar 'digital overdrive' en ES
const idx3 = t.indexOf('overdrive digital');
console.log('ES overdrive digital:', idx3 >= 0 ? t.slice(idx3 - 50, idx3 + 80) : 'NOT FOUND');

// Buscar 'overdrive' en ES en el contexto de drum machine
let searchFrom = 0;
let found = 0;
while (true) {
  const idx4 = t.indexOf('overdrive', searchFrom);
  if (idx4 < 0) break;
  const ctx = t.slice(Math.max(0, idx4 - 80), idx4 + 80);
  if (ctx.includes('_es') || ctx.includes('es":')) {
    console.log('ES overdrive context:', ctx);
    found++;
  }
  searchFrom = idx4 + 10;
}
console.log('ES overdrive contexts found:', found);
