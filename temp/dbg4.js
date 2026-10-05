const fs = require('fs');
const t = fs.readFileSync('C:/Users/Daniel/.local/share/opencode/tool-output/tool_10bf9f88f0018kwfx7CujU4Ily', 'utf8');
const a = t.indexOf('[{');
const e = t.slice(a, a + 2100);
let n = 0;
for (const c of e) { if (c === '"') n++; }
console.log('raw quote count:', n, 'odd:', n % 2 === 1);
// find standalone bare quotes: quote NOT preceded by [{,: and NOT followed by [:,}]
const bad = [];
for (let i = 0; i < e.length; i++) {
  if (e[i] !== '"') continue;
  const prev = e[i - 1] || '';
  const next = e[i + 1] || '';
  const structural = /[{,:[]/.test(prev) || /[:,}\]]/.test(next) || prev === '\\';
  if (!structural) bad.push(i + ':[' + e.slice(Math.max(0, i - 25), i + 25).replace(/\n/g, ' ') + ']');
  if (bad.length > 10) break;
}
console.log('non-structural quotes: ' + bad.length);
bad.forEach(b => console.log(b));