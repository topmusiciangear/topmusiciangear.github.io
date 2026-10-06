const fs = require('fs');

const ENTRIES = [
  '  565: { prices: { amazon: "$1,319.99", zzounds: "$1,319.99", gear4music: "£799.00", andertons: "£839.00", musicstore: "€989.00" } },',
  '  566: { prices: {}, na: ["zzounds", "andertons", "musicstore", "gear4music"] },',
  '  567: { prices: { amazon: "$1,749.99", zzounds: "$1,749.99", gear4music: "£1,175.00", andertons: "£1,175.00" }, na: ["musicstore"] },',
  '  568: { prices: { amazon: "$1,499.00" }, oos: ["zzounds"], na: ["andertons", "musicstore", "gear4music"] },',
  '  569: { prices: { amazon: "$3,099.99", gear4music: "£2,146.00", andertons: "£2,146.00", musicstore: "€2,095.00" }, na: ["zzounds"] },',
  '  570: { prices: { amazon: "$3,299.99", gear4music: "£1,469.00", andertons: "£1,513.00" }, na: ["zzounds", "musicstore"] },',
  '  571: { prices: { zzounds: "$729.99", gear4music: "€505.00", andertons: "£399.00", musicstore: "€499.00" } },',
  '  572: { prices: { amazon: "$499.99", andertons: "£399.00", gear4music: "£355.00", musicstore: "€398.00" }, oos: ["zzounds"] },'
];

const file = 'build-guides.js';
let src = fs.readFileSync(file, 'utf8');
const h = src.indexOf('const TEST_SHOP_BTN = {');
if (h < 0) throw new Error('TEST_SHOP_BTN block not found');
const e = src.indexOf('\n};', h);
if (e < 0) throw new Error('TEST_SHOP_BTN block end not found');

const block = src.slice(h, e);
const already = ENTRIES.some(en => {
  const id = en.match(/^\s*(\d+):/)[1];
  return new RegExp('^\\s*' + id + ': \\{', 'm').test(block);
});
if (already) throw new Error('Entries already present - aborting to avoid duplicates');

src = src.slice(0, e) + '\n' + ENTRIES.join('\n') + src.slice(e);
fs.writeFileSync(file, src);

// verify parse
const h2 = src.indexOf('const TEST_SHOP_BTN = {');
const e2 = src.indexOf('\n};', h2);
const MAP = eval('(' + src.slice(h2 + 'const TEST_SHOP_BTN ='.length, e2 + 2) + ')');
console.log('entries now:', Object.keys(MAP).length);
[565,566,567,568,569,570,571,572].forEach(id => console.log(id, JSON.stringify(MAP[id])));
