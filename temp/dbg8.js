const fs = require('fs');
const t = fs.readFileSync('C:/Users/Daniel/.local/share/opencode/tool-output/tool_10bf9f88f0018kwfx7CujU4Ily', 'utf8');
const a = t.indexOf('[{');
const e = t.indexOf('},{"g":', a);
const e0 = t.slice(a, e + 1);
// extract each top-level string value by brace-aware scan and test individually
const vals = {};
const re = /"(heading|heading_es|content|content_es|g)"\s*:\s*"/g;
let m;
while ((m = re.exec(e0)) !== null) {
  const start = m.index + m[0].length;
  // find closing unescaped quote
  let i = start, esc = false, end = -1;
  for (; i < e0.length; i++) {
    const c = e0[i];
    if (esc) { esc = false; continue; }
    if (c === '\\') { esc = true; continue; }
    if (c === '"') { end = i; break; }
  }
  vals[m[1]] = e0.slice(start, end);
}
Object.entries(vals).forEach(([k, v]) => {
  try { JSON.parse('"' + v.replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"'); console.log(k + ': length ' + v.length + ' re-parseable'); }
  catch (err) { console.log(k + ': REPARSE FAIL ' + err.message); }
});
// show suspicious backslash usages in each value
Object.entries(vals).forEach(([k, v]) => {
  const bs = [...v.matchAll(/\\(.)/g)].map(x => x[0] + x[1]);
  const odd = bs.filter(x => !/^\\["\\/bfnrtu]$/.test(x));
  if (odd.length) console.log(k + ' BAD ESCAPES: ' + JSON.stringify(odd.slice(0, 5)));
});