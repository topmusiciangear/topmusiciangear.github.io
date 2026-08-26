const fs = require('fs');
const src = fs.readFileSync('./build-guides.js', 'utf8');
const ids = [366,304,120,238,92,370,132,165,166,220,260,349,347,348,350,354,365,8,364,113,114,115];
ids.forEach(id => {
  const idx = src.indexOf("'" + id + "'");
  if (idx === -1) { console.log(id + ': NOT FOUND'); return; }
  const lineStart = src.lastIndexOf('\n', idx) + 1;
  const lineEnd = src.indexOf('\n', idx);
  const line = src.substring(lineStart, Math.min(lineEnd, lineStart + 300));
  console.log(id + ': ' + line.trim().substring(0, 250));
});
