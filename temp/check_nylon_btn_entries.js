const fs = require('fs');
const src = fs.readFileSync('build-guides.js', 'utf8');
const start = src.indexOf('const TEST_SHOP_BTN');
const block = src.slice(start, src.indexOf('\n};', start) + 3);
const ids = [459, 553, 1058, 1059, 1060, 1061, 1062, 1063, 1064, 1065];
for (const id of ids) {
  const re = new RegExp('\\n\\s*' + id + ':\\s*\\{');
  const m = block.match(re);
  if (!m) { console.log(id, 'MISSING'); continue; }
  const i = m.index;
  // capture the entry line
  const line = block.slice(i, block.indexOf('\n', i + 1));
  console.log(id, '=>', line.trim().slice(0, 400));
}
