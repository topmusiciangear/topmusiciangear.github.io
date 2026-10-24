const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
let raw = fs.readFileSync(B + 'data/guides.json', 'utf8');
const a1 = raw.indexOf('"id": "best-monitors-for-small-rooms"');
const a2 = raw.indexOf('"id": "best-multi-effects-pedals"');
const blockStart = raw.lastIndexOf('\n', a1) + 1;
const blockEnd = raw.lastIndexOf('\n', a2) + 1;
let block = raw.slice(blockStart, blockEnd);

function extractArray(blk, anchor) {
  const idx = blk.indexOf(anchor);
  const arrStart = idx + anchor.length;
  let i = arrStart, depth = 1, inStr = false, esc = false;
  for (; i < blk.length; i++) {
    const ch = blk[i];
    if (inStr) { if (esc) esc = false; else if (ch === '\\') esc = true; else if (ch === '"') inStr = false; }
    else if (ch === '"') inStr = true;
    else if (ch === '[') depth++;
    else if (ch === ']') { depth--; if (depth === 0) break; }
  }
  const inner = blk.slice(arrStart, i);
  const elems = [];
  let d = 0, s = false, e2 = false, start = -1;
  for (let j = 0; j < inner.length; j++) {
    const ch = inner[j];
    if (s) { if (e2) e2 = false; else if (ch === '\\') e2 = true; else if (ch === '"') s = false; }
    else if (ch === '"') s = true;
    else if (ch === '{') { if (d === 0) start = j; d++; }
    else if (ch === '}') { d--; if (d === 0 && start !== -1) { elems.push(inner.slice(start, j + 1)); start = -1; } }
  }
  return { arrStart, arrEnd: i, inner, elems };
}

const { elems, inner } = extractArray(block, '"sections": [');
console.log('num sections:', elems.length);
elems.forEach((e, k) => {
  const o = JSON.parse(e);
  console.log(k, '→ products:', JSON.stringify(o.products), '| heading:', (o.heading || '').slice(0, 50));
});
// verificar duplicidad de elementos crudos
const seen = {};
elems.forEach((e, k) => { if (seen[e]) console.log('DUPLICATE elem at', k, '== first at', seen[e]); seen[e] = k; });
