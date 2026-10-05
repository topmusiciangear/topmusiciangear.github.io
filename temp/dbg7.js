const fs = require('fs');
const t = fs.readFileSync('C:/Users/Daniel/.local/share/opencode/tool-output/tool_10bf9f88f0018kwfx7CujU4Ily', 'utf8');
const a = t.indexOf('[{');
const e = t.indexOf('},{"g":', a);
const e0 = t.slice(a, e + 1);
try {
  const o = JSON.parse(e0);
  console.log('ENTRY0 OK g=' + o.g);
} catch (err) {
  console.log('ENTRY0 FAIL: ' + err.message);
  // find first structural anomaly: walk strings
  let inStr = false, esc = false, line = 0;
  for (let i = 0; i < e0.length; i++) {
    const c = e0[i];
    if (c === '\n') line++;
    if (inStr) {
      if (esc) esc = false;
      else if (c === '\\') esc = true;
      else if (c === '"') inStr = false;
    } else if (c === '"') { inStr = true; }
  }
  console.log('ends in-string:', inStr);
}