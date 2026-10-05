const fs = require('fs');
const t = fs.readFileSync('C:/Users/Daniel/.local/share/opencode/tool-output/tool_10bd81206001fsKVzep18JjpRQ', 'utf8');
const a = t.indexOf('[{');
console.log('arrayStart:', a);
console.log('sep1:', JSON.stringify(t.slice(a + 1900, a + 2100)));
const b = t.indexOf('},{"g":');
console.log('firstSep:', b);
const b2 = t.indexOf('}, {"g":');
console.log('spacedSep:', b2);