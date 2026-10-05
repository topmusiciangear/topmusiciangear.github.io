const fs = require('fs');
const f = 'C:/Users/Daniel/.local/share/opencode/tool-output/tool_10bd81206001fsKVzep18JjpRQ';
const t = fs.readFileSync(f, 'utf8');
const a = t.indexOf('[{');
const s = t.slice(a, a + 2600).replace(/\r?\n/g, ' ');
console.log(JSON.stringify(s.slice(1700, 2000)));