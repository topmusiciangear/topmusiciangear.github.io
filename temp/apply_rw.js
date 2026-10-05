const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
const G = require(DIR + 'data/guides.json');
const batches = ['rw_a', 'rw_b', 'rw_c', 'rw_d', 'rw_e', 'rw_f'].map(f => require(DIR + 'temp/' + f + '.js'));
let ok = 0; const miss = [];
function countIn(obj, needle) {
  let n = 0;
  const walk = o => {
    if (typeof o === 'string') { let i = -1; while ((i = o.indexOf(needle, i + 1)) !== -1) n++; }
    else if (o && typeof o === 'object') Object.values(o).forEach(walk);
  };
  walk(obj);
  return n;
}
function replaceIn(obj, needle, repl) {
  const walk = o => {
    if (Array.isArray(o)) { for (let i = 0; i < o.length; i++) { if (typeof o[i] === 'string') o[i] = o[i].split(needle).join(repl); else walk(o[i]); } }
    else if (o && typeof o === 'object') { for (const k of Object.keys(o)) { if (typeof o[k] === 'string') o[k] = o[k].split(needle).join(repl); else walk(o[k]); } }
  };
  walk(obj);
}
for (const batch of batches) {
  for (const e of batch) {
    const g = G.find(x => x.id === e.g);
    if (!g) { miss.push('NOGUIDE ' + e.g); continue; }
    const n = countIn(g, e.old);
    if (n === 1) { replaceIn(g, e.old, e.new); ok++; }
    else miss.push(e.g + ' x' + n + ': ' + e.old.slice(0, 80));
  }
}
fs.writeFileSync(DIR + 'data/guides.json', JSON.stringify(G, null, 2));
console.log('applied=' + ok + ' miss=' + miss.length);
miss.forEach(m => console.log('MISS ' + m));