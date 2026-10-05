const fs = require('fs');
const f = 'C:/Users/Daniel/.local/share/opencode/tool-output/tool_10bf9f88f0018kwfx7CujU4Ily';
const t = fs.readFileSync(f, 'utf8');
const a = t.indexOf('[{');
const b = t.lastIndexOf('}]');
const s = t.slice(a, b + 2).replace(/\r?\n/g, ' ');
try {
  const arr = JSON.parse(s);
  console.log('batch1b entries: ' + arr.length);
  fs.writeFileSync('C:/Users/Daniel/projects/topmusiciangear/temp/batch1b.json', JSON.stringify(arr));
} catch (e) { console.log('PARSE-FAIL: ' + e.message); }