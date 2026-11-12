// Extrae contexto de cada hit [JSON-ES] con palabra EN (del reporte) — línea previa + siguiente
const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const lines = fs.readFileSync(B + 'temp/deep_es_audit_report.txt', 'utf8').split(/\r?\n/);
let cap = false;
const out = [];
for (let i = 0; i < lines.length; i++) {
  const L = lines[i];
  if (L.startsWith('===== EN ')) cap = true;
  else if (L.startsWith('===== ')) cap = false;
  if (!cap) continue;
  if (L.startsWith('[JSON-ES]')) {
    out.push(L.trim());
    out.push('  ' + (lines[i + 1] || '').trim());
    out.push('  ' + (lines[i + 2] || '').trim());
    out.push('');
  }
}
fs.writeFileSync(B + 'temp/json_es_en_ctx.txt', out.join('\n'), 'utf8');
console.log('blocks: ' + out.filter(x => x.startsWith('[JSON-ES]')).length);
