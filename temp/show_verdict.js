const fs = require('fs');
const files = process.argv.slice(2);
for (const f of files) {
  const h = fs.readFileSync(f, 'utf8');
  const i = h.lastIndexOf('verdict-text');
  console.log('===== ' + f + ' =====');
  if (i < 0) { console.log('no verdict-text found'); continue; }
  console.log(h.slice(i - 60, i + 1200).replace(/\n/g, ' '));
  console.log();
}
