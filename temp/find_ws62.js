const fs = require('fs');
const c = String(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json'));
let i = 0;
let found = 0;
while (true) {
  const pos = c.indexOf('WS-6.2', i);
  if (pos === -1) {
    console.log('Total apariciones WS-6.2:', found);
    break;
  }
  found++;
  const start = Math.max(0, pos - 70);
  const end = Math.min(c.length, pos + 70);
  console.log('Match #' + found + ' at pos ' + pos + ':');
  console.log('  ...' + c.substring(start, end) + '...');
  i = pos + 1;
}