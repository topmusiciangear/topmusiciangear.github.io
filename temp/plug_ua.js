const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
let raw = fs.readFileSync(B + 'temp/guides_head.json', 'utf16le');
if (raw.charCodeAt(0) === 0xFEFF) raw = raw.slice(1);
const head = JSON.parse(raw);
const cur = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));
['best-interface', 'budget-interfaces', 'scarlett-vs-volt', 'streaming-interfaces'].forEach(id => {
  const h = JSON.stringify(head.find(x => x.id === id));
  const c = JSON.stringify(cur.find(x => x.id === id));
  const count = (s, p) => s.split(p).length - 1;
  console.log(id + ' | HEAD UA 1176: ' + count(h, 'UA 1176') + ' -> CUR UA 1176: ' + count(c, 'UA 1176') +
    ' | HEAD Universal Audio 1176: ' + count(h, 'Universal Audio 1176') + ' -> CUR: ' + count(c, 'Universal Audio 1176'));
});
