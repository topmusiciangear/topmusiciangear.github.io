const fs = require('fs');
const block = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8');
const braceOpen = block.indexOf('"productTable": {');
let bi = braceOpen + '"productTable": '.length, bd = 1, binStr = false, besc = false;
for (; bi < block.length; bi++) {
  const ch = block[bi];
  if (binStr) { if (besc) besc = false; else if (ch === '\\') besc = true; else if (ch === '"') binStr = false; }
  else if (ch === '"') binStr = true;
  else if (ch === '{') bd++;
  else if (ch === '}') { bd--; if (bd === 0) break; }
}
console.log('braceOpen:', braceOpen, 'close at:', bi, 'bd:', bd);
const ptRegion = block.slice(braceOpen, bi + 1);
console.log('ptRegion len:', ptRegion.length, 'starts:', JSON.stringify(ptRegion.slice(0, 40)), 'ends:', JSON.stringify(ptRegion.slice(-40)));
try { JSON.parse(ptRegion.slice(ptRegion.indexOf('{'))); console.log('JSON OK'); }
catch (e) { console.log('JSON ERR:', e.message); console.log(JSON.stringify(ptRegion.slice(17500, 17620))); }
