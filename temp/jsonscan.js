const fs = require('fs');
const lines = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8').split('\n');
// try parsing growing prefixes to find first break (binary search on guide boundaries is expensive;
// instead, scan each line for illegal raw control chars inside strings)
let bad = 0;
lines.forEach((ln, i) => {
  // raw tab or newline can't appear (split). Check for lone unescaped quotes is hard line-wise.
  // Instead: try JSON.parse of cumulative chunks at guide boundaries
});
const raw = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8');
// find object starts: look for '"id":' positions and test-parse progressively is too slow.
// Faster: use a strict scanner that tracks string state and reports the first unterminated/mismatched quote.
let inStr = false, esc = false, line = 1, col = 0, strStart = null;
for (let i = 0; i < raw.length; i++) {
  const c = raw[i];
  col++;
  if (c === '\n') { line++; col = 0; if (inStr) { console.log('NEWLINE inside string started line', strStart[0], 'col', strStart[1], 'ends line', line); break; } continue; }
  if (inStr) {
    if (esc) esc = false;
    else if (c === '\\') esc = true;
    else if (c === '"') inStr = false;
  } else {
    if (c === '"') { inStr = true; strStart = [line, col]; }
    else if (c === "'") { console.log('SINGLE QUOTE outside string at', line + ':' + col); break; }
  }
}
console.log('scan done, inStr at end:', inStr);