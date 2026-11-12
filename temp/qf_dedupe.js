// Dedupe QF_ES_MAP: elimina la SEGUNDA ocurrencia de claves duplicadas (la primera es la curada).
// Reporta si alguna dup tiene valores distintos (no debería).
const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const p = B + 'build-guides.js';
const bg = fs.readFileSync(p, 'utf8');
const lines = bg.split('\n');
const start = lines.findIndex(l => l.replace(/\r$/, '').startsWith('var QF_ES_MAP'));
let end = -1;
for (let i = start; i < lines.length; i++) {
  if (lines[i].replace(/\r$/, '') === '};') { end = i; break; }
}
const seen = new Map();
const remove = [];
let diffs = 0;
for (let i = start + 1; i < end; i++) {
  const m = lines[i].replace(/\r$/, '').match(/^  '(.+)': '(.*)',?$/);
  if (!m) continue;
  const key = m[1];
  if (seen.has(key)) {
    const first = seen.get(key);
    if (first.val !== m[2]) {
      diffs++;
      console.log('VALORES DISTINTOS «' + key + '»');
      console.log('   L' + first.line + ': ' + first.val);
      console.log('   L' + (i + 1) + ': ' + m[2]);
    }
    remove.push(i);
  } else {
    seen.set(key, { val: m[2], line: i + 1 });
  }
}
console.log('claves: ' + seen.size + ' | duplicados a eliminar: ' + remove.length + ' | valores distintos: ' + diffs);
const out = lines.filter((l, i) => !remove.includes(i)).join('\n');
fs.writeFileSync(p, out, 'utf8');
console.log('✓ eliminadas ' + remove.length + ' líneas duplicadas');
