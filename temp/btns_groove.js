const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/build-guides.js';
let src = fs.readFileSync(F, 'utf8');
const entries = {
  615: '  615: { prices: { andertons: "£289.00" } },',
  616: null, // Gen1: no 5-store verified price -> remove entry (auto fallback rows)
  617: '  617: { prices: { andertons: "£177.00" } },',
  618: '  618: { prices: { andertons: "£342.00" } },',
  619: '  619: { prices: { andertons: "£1,299.00" } },',
  620: '  620: { prices: { andertons: "£749.00" } },',
  621: '  621: { prices: { amazon: "$299.99" } },',
  622: '  622: { prices: { andertons: "£249.00" } },',
  623: '  623: { prices: { amazon: "$239.00" } },',
  624: '  624: { prices: { andertons: "£119.00" } },',
  625: '  625: { prices: { andertons: "£659.00" } },'
};
for (const [id, line] of Object.entries(entries)) {
  const re = new RegExp('^  ' + id + ':.*$', 'm');
  if (!re.test(src)) { console.log(id, 'NOT FOUND'); continue; }
  src = line === null ? src.replace(re, '') : src.replace(re, line);
}
// append 621-625 after 620 line (they don't exist yet)
let anchor = src.match(/^  620:.*$/m);
if (anchor) {
  const add = ['621', '622', '623', '624', '625'].map(id => entries[id]).join('\n');
  src = src.replace(anchor[0], anchor[0] + '\n' + add);
}
fs.writeFileSync(F, src);
console.log('TEST_SHOP_BTN patched');
// verify parse
const m = src.match(/const TEST_SHOP_BTN\s*=\s*\{([\s\S]*?)\n *\};/);
const map = Function('return {' + m[1] + '\n}')();
[615, 617, 618, 619, 620, 621, 622, 623, 624, 625].forEach(id => console.log(id, JSON.stringify(map[id])));
console.log('616 removed:', map[616] === undefined);
