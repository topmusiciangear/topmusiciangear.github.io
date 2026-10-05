const fs = require('fs');
const t = fs.readFileSync('C:/Users/Daniel/.local/share/opencode/tool-output/tool_10bd81206001fsKVzep18JjpRQ', 'utf8');
const a = t.indexOf('[{');
const b = t.indexOf('},{"g":');
const e0 = t.slice(a, b + 1).replace(/\r?\n/g, ' ');
console.log('tail:', JSON.stringify(e0.slice(-160)));
try { JSON.parse(e0); console.log('ENTRY0 OK'); }
catch (e) { console.log('ENTRY0 FAIL: ' + e.message); }