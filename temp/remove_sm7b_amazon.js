const fs = require('fs');
const p = 'build-guides.js';
const raw = fs.readFileSync(p, 'utf8');
const eol = raw.includes('\r\n') ? '\r\n' : '\n';
let lines = raw.split(/\r?\n/);
const BAD = 'https://www.amazon.com/dp/B0002E4Z8M';

let removed = 0;
for (let i = lines.length - 1; i >= 0; i--) {
  if (lines[i].indexOf(BAD) === -1) continue;
  const line = lines[i];
  const hasComma = /,\s*$/.test(line);
  if (!hasComma) {
    // strip the comma left dangling on the previous property line
    let j = i - 1;
    while (j >= 0 && !/\S/.test(lines[j])) j--;
    lines[j] = lines[j].replace(/,\s*$/, '');
  }
  lines.splice(i, 1);
  removed++;
}
fs.writeFileSync(p, lines.join(eol));
console.log('removed amazon SM7B urls:', removed);
