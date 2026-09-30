// Muestra el contexto de cada coincidencia. PS-safe (sustituye al Select-String
// cuando la linea es larguisima y PS la trunca).
// Uso: node temp/show_context.js <archivo> <needle> [radio]
const fs = require('fs');
const file = process.argv[2];
const needle = process.argv[3];
const radius = Number(process.argv[4] || 420);
const src = fs.readFileSync(file, 'utf8');
let n = 0, i = 0;
while ((i = src.indexOf(needle, i)) !== -1) {
  n++;
  const from = Math.max(0, i - radius), to = Math.min(src.length, i + needle.length + radius);
  console.log('\n=== #' + n + ' offset ' + i + ' ===');
  console.log(src.slice(from, to).replace(/\s+/g, ' '));
  i += needle.length;
  if (n >= 6) { console.log('\n(mas de 6 coincidencias, Cortando)'); break; }
}
console.log('\ntotal coincidencias de "' + needle + '" en ' + file + ': ' + (n >= 6 ? '6+' : n));
