const fs = require('fs');
const s = fs.readFileSync('js/shop-buttons.js', 'utf8');
for (const id of ['351', '367', '368', '369']) {
  const i = s.indexOf(':' + id + ':');
  const j = s.indexOf('"' + id + '"');
  console.log(id, 'colon@', i, 'quoted@', j);
  if (i >= 0) console.log('   ', s.slice(i, i + 130).replace(/\n/g, ' '));
}
const d = fs.readFileSync('temp/_dump_incoherent.js', 'utf8');
console.log('DUMP SRC (first 300):', d.slice(0, 300));