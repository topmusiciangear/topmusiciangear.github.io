const fs = require('fs');
const src = fs.readFileSync('build-guides.js', 'utf8');
const start = src.indexOf('const TEST_SHOP_BTN');
const block = src.slice(start, src.indexOf('\n};', start) + 3);
for (const id of [459, 553, 1058, 1059, 1060, 1061, 1062, 1063, 1064, 1065]) {
  const m = block.match(new RegExp('\\n\\s*' + id + ':\\s*\\{'));
  if (!m) { console.log(id, 'MISSING'); continue; }
  const line = block.slice(m.index, block.indexOf('\n', m.index + 1));
  console.log('\n' + id + ':' + line.replace(/^\s*\d+:\s*/, ''));
}
