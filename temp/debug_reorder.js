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

function reorderArray(blk, anchor, orderedElems) {
  const { arrStart, arrEnd, elems, prefix, sep, suffix } = extractArray(blk, anchor);
  const newInner = prefix + orderedElems.join(sep) + suffix;
  return blk.slice(0, arrStart) + newInner + blk.slice(arrEnd);
}

// probando secciones
const { elems } = extractArray(block, '"sections": [');
const T = [305, 302, 117, 303, 308, 633, 372, 306, 307, 684, 116, 371, 632];
const parsed = elems.map(e => JSON.parse(e));
const byId = {};
parsed.slice(1, 14).forEach((s, k) => { byId[s.products[0]] = elems[k + 1]; });
const missing = T.filter(id => !byId[id]);
console.log('missing:', missing);
const ordered = [elems[0]].concat(T.map(id => byId[id])).concat([elems[14]]);
console.log('ordered ids:', ordered.map(e => JSON.parse(e).products[0]).join(','));

// inspeccionar las posiciones dentro de inner
const aa = extractArray(block, '"sections": [');
const inner = aa.inner;
console.log('inner len:', inner.length);
console.log('first elem starts at:', inner.indexOf(elems[0]));
console.log('sep raw slice after elem0:', JSON.stringify(inner.slice(inner.indexOf(elems[0]) + elems[0].length, inner.indexOf(elems[0]) + elems[0].length + 30)));
// aplicar
const blk2 = reorderArray(block, '"sections": [', ordered);
try { JSON.parse(blk2); console.log('JSON OK'); }
catch (e) {
  const m = e.message.match(/position (\d+) \(line (\d+) column (\d+)\)/);
  const pos = m ? +m[1] : 0;
  console.log('ERROR pos:', pos);
  console.log(JSON.stringify(blk2.slice(pos - 300, pos + 300)));
}
