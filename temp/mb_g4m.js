const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/build-guides.js';
let s = fs.readFileSync(F, 'utf8');
const line628 = '  628: { prices: { andertons: "\\u00a3928.00", gear4music: "\\u00a3928.00", musicstore: "\\u20ac989.00" } },';
if (!/^  628:.*$/m.test(s)) throw new Error('628 missing');
s = s.replace(/^  628:.*$/m, line628);
fs.writeFileSync(F, s);
const m = s.match(/const TEST_SHOP_BTN\s*=\s*\{([\s\S]*?)\n *\};/);
console.log('628:', JSON.stringify(Function('return {' + m[1] + '\n}')()[628]));
