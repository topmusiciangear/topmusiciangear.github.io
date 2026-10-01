const fs = require('fs');
const b = fs.readFileSync('build-guides.js', 'utf8');
const P = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
[194, 197, 253, 195, 196, 276, 279, 284, 287, 291, 292].forEach(id => {
  const p = P.find(x => x.id === id);
  const start = b.indexOf('\n  ' + id + ': {');
  if (start < 0) { console.log(' ' + id + ' ' + p.title + ': SIN ENTRADA'); return; }
  let depth = 0, end = -1;
  for (let i = b.indexOf('{', start); i < b.length; i++) {
    if (b[i] === '{') depth++;
    else if (b[i] === '}') { depth--; if (depth === 0) { end = i; break; } }
  }
  const block = b.slice(start, end);
  const pm = block.match(/prices:\s*\{([\s\S]*?)\}/);
  const oos = block.match(/oos:\s*\[([\s\S]*?)\]/);
  const urls = block.match(/urls:\s*\{([\s\S]*?)\}/);
  console.log(' ' + id + ' ' + p.title);
  console.log('    prices: ' + (pm ? pm[1].replace(/\s+/g, ' ').trim().slice(0, 200) : 'VACIO'));
  if (oos) console.log('    oos: ' + oos[1].replace(/\s+/g, ' ').trim());
  if (urls) console.log('    urls: ' + urls[1].replace(/\s+/g, ' ').trim().slice(0, 160));
});
