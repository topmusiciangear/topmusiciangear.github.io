// Extrae contexto ±150 chars de cada metáfora en los JSON/fuentes para redactar reemplazos naturales
const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const METAPHORS = ['caballo de batalla', 'caballos de batalla', 'todo terreno', 'todo-terreno',
  'todoterreno', 'todoterrenos', 'grial', 'navaja suiza', 'trabajo pesado',
  'arma secreta', 'gabinete', 'gabinetes', 'punto dulce', 'estándar de oro', 'estandar de oro',
  'game-changer', 'gamechanger', 'techo de graves', 'dios del muestreo'];
const FILES = ['data/guides.json', 'data/products.json', 'data/deals.json', 'data/manual-deals.json'];
const out = [];
for (const f of FILES) {
  const p = B + f;
  if (!fs.existsSync(p)) continue;
  const t = fs.readFileSync(p, 'utf8');
  for (const m of METAPHORS) {
    let idx = 0;
    const needle = m.toLowerCase();
    const low = t.toLowerCase();
    while ((idx = low.indexOf(needle, idx)) >= 0) {
      const a = Math.max(0, idx - 150), b = Math.min(t.length, idx + needle.length + 150);
      out.push('### ' + f + ' @' + idx + ' «' + m + '»\n' + t.slice(a, b).replace(/\s+/g, ' ') + '\n');
      idx += needle.length;
    }
  }
}
fs.writeFileSync(B + 'temp/metaphor_contexts.txt', out.join('\n'), 'utf8');
console.log('total: ' + out.length + ' -> temp/metaphor_contexts.txt');
