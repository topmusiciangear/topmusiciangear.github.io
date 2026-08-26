const fs = require('fs');
const src = fs.readFileSync('./build-guides.js', 'utf8');

// Check existing entries
const ids = [304,120,238,92,132,165,166,220,349,347,348,350,354,8,113,114,115];
ids.forEach(id => {
  const pattern = new RegExp('^\\s*' + id + ':', 'm');
  const match = src.match(pattern);
  if (!match) { console.log(id + ': NOT FOUND'); return; }
  const idx = match.index;
  const lineStart = src.lastIndexOf('\n', idx) + 1;
  let braceCount = 0;
  let i = idx;
  let started = false;
  while (i < src.length) {
    if (src[i] === '{') { braceCount++; started = true; }
    if (src[i] === '}') { braceCount--; if (started && braceCount === 0) break; }
    i++;
  }
  const entry = src.substring(lineStart, i + 1).trim();
  const hasAmazon = entry.includes('amazon');
  const hasMs = entry.includes('musicstore');
  console.log(`${id}: amazon=${hasAmazon} ms=${hasMs} | ${entry.substring(0, 180)}`);
});
