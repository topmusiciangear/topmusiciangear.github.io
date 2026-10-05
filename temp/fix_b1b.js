const fs = require('fs');
const f = 'C:/Users/Daniel/.local/share/opencode/tool-output/tool_10bf9f88f0018kwfx7CujU4Ily';
const t = fs.readFileSync(f, 'utf8');
const a = t.indexOf('[{');
const b = t.lastIndexOf('}]');
// NOTE: file content is backslash-escaped (\" for quotes). inch marks appear as digit+\" .
let s = t.slice(a, b + 2);
s = s.replace(/(\d)\\"(?=[ ]*[a-zA-Záéíóúñ])/g, '$1-inch'); // 12\" speaker -> 12-inch speaker
s = s.replace(/\\"/g, '"'); // unescape wrapper
s = s.replace(/[\u0000-\u001F]/g, ' ');
try {
  const arr = JSON.parse(s);
  console.log('OK entries: ' + arr.length);
  fs.writeFileSync('C:/Users/Daniel/projects/topmusiciangear/temp/batch1b.json', JSON.stringify(arr));
} catch (e) { console.log('FAIL: ' + e.message); }