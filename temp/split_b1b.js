const fs = require('fs');
const f = 'C:/Users/Daniel/.local/share/opencode/tool-output/tool_10bf9f88f0018kwfx7CujU4Ily';
const t = fs.readFileSync(f, 'utf8');
const a = t.indexOf('[{');
const b = t.lastIndexOf('}]');
const s = t.slice(a, b + 2).replace(/[\u0000-\u001F]/g, ' ');
const objs = [];
let depth = 0, inStr = false, esc = false, start = -1;
for (let i = 0; i < s.length; i++) {
  const c = s[i];
  if (inStr) {
    if (esc) esc = false;
    else if (c === '\\') esc = true;
    else if (c === '"') inStr = false;
  } else if (c === '"') { inStr = true; }
  else if (c === '[' || c === '{') {
    if (c === '{' && depth === 1) start = i;
    depth++;
  } else if (c === ']' || c === '}') {
    depth--;
    if (c === '}' && depth === 1 && start !== -1) { objs.push(s.slice(start, i + 1)); start = -1; }
  }
}
console.log('objects found: ' + objs.length);
let ok = 0; const bad = [];
const out = [];
objs.forEach((o, i) => {
  try { out.push(JSON.parse(o)); ok++; }
  catch (e) { bad.push(i + ':' + e.message.slice(0, 80)); }
});
console.log('parsed: ' + ok + ' failed: ' + bad.length);
bad.slice(0, 6).forEach(x => console.log(x));
if (out.length) fs.writeFileSync('C:/Users/Daniel/projects/topmusiciangear/temp/batch1b.json', JSON.stringify(out));