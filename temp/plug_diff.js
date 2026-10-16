const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
let raw = fs.readFileSync(B + 'temp/guides_head.json', 'utf16le');
if (raw.charCodeAt(0) === 0xFEFF) raw = raw.slice(1);
const head = JSON.parse(raw);
const cur = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));
function leaves(o, path, acc) {
  if (typeof o === 'string') acc.push([path, o]);
  else if (Array.isArray(o)) o.forEach((v, i) => leaves(v, path + '[' + i + ']', acc));
  else if (o && typeof o === 'object') Object.entries(o).forEach(([k, v]) => leaves(v, path + '.' + k, acc));
  return acc;
}
['best-interface', 'budget-interfaces', 'scarlett-vs-volt', 'streaming-interfaces', 'starter-studio'].forEach(id => {
  const ha = [], ca = [];
  leaves(head.find(x => x.id === id), '', ha);
  leaves(cur.find(x => x.id === id), '', ca);
  const hm = {};
  ha.forEach(([p, v]) => { hm[p] = v; });
  ca.forEach(([p, v]) => {
    if (hm[p] !== undefined && hm[p] !== v) {
      const a = hm[p], b = v;
      let i = 0;
      while (i < Math.min(a.length, b.length) && a[i] === b[i]) i++;
      let j = 0;
      while (j < Math.min(a.length, b.length) - i && a[a.length - 1 - j] === b[b.length - 1 - j]) j++;
      console.log('### ' + id + ' ' + p);
      console.log('  ANTES: ...' + a.slice(Math.max(0, i - 40), i + 60));
      console.log('  AHORA: ...' + b.slice(Math.max(0, i - 40), i + 60));
    }
  });
});
console.log('diff listo');
