const fs = require('fs');
const f = 'C:/Users/Daniel/.local/share/opencode/tool-output/tool_10bd81206001fsKVzep18JjpRQ';
const t = fs.readFileSync(f, 'utf8');
const a = t.indexOf('[{');
const b = t.lastIndexOf('}]');
const s = t.slice(a, b + 2).replace(/\r?\n/g, ' ').replace(/(\d)"(?=[a-zA-Z ])/g, '$1-inch');
const parts = s.slice(1, -1).split('},{"g":').map((p, i) => (i === 0 ? p : '{"g":' + p));
let ok = 0; const bad = [];
const out = [];
parts.forEach((p, i) => {
  try { out.push(JSON.parse(p)); ok++; }
  catch (e) { bad.push(i + ': ' + e.message + ' :: ' + p.slice(0, 120)); }
});
console.log('parsed: ' + ok + ' failed: ' + bad.length);
bad.slice(0, 5).forEach(x => console.log(x));
fs.writeFileSync('C:/Users/Daniel/projects/topmusiciangear/temp/batch1.json', JSON.stringify(out));