const fs = require('fs');
const t = fs.readFileSync('C:/Users/Daniel/.local/share/opencode/tool-output/tool_10bf9f88f0018kwfx7CujU4Ily', 'utf8');
const a = t.indexOf('[{');
const e = t.indexOf('},{"g":', a);
const e0 = t.slice(a, e + 1);
// find all occurrences of ',"products"' and 'content_es' joints
['"content":"', '"content_es":"', '"products":', '"heading":"', '"heading_es":"', '"sec":{', '"g":"'].forEach(p => {
  let i = -1; const hits = [];
  while ((i = e0.indexOf(p, i + 1)) !== -1) hits.push(i);
  console.log(JSON.stringify(p) + ' at: ' + hits.join(','));
});