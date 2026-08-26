const fs = require('fs');
const c = fs.readFileSync('build-guides.js', 'utf8');
const m = c.match(/TEST_SHOP_BTN\s*=\s*\{([\s\S]*?)\n\};/);
if (!m) { console.log('NOT FOUND'); process.exit(1); }
const block = m[1];
const lines = block.split('\n');
const outside = [];
let curId = null;
lines.forEach(l => {
  const idMatch = l.match(/^\s+(\d+):/);
  if (idMatch) curId = idMatch[1];
  // Check for store key outside prices{} — pattern: `} , storename:` or `}\n  storename:`
  const closeBrace = l.match(/\}\s*,\s*(musicstore|gear4music|reverb|amazon|zzounds|andertons)\s*:/);
  if (closeBrace && curId) {
    outside.push('ID ' + curId + ': ' + closeBrace[1] + ' outside prices');
  }
});
console.log('Outside prices remaining:', outside.length);
outside.forEach(x => console.log(x));

// Also check for Reverb entries that have NO reverb price
const re = /\b(\d+):\s*\{([^}]*)\}/g;
let match;
const noReverb = [];
const allEntries = [];
while ((match = re.exec(block)) !== null) {
  const id = match[1];
  const body = match[2];
  if (!body.includes('reverb') && !body.includes('na:') && !body.includes('oos:')) {
    // Check if this entry has any store prices at all
    const hasPrices = /prices\s*:/.test(body) || /amazon|zzounds|andertons|gear4music|musicstore|pluginboutique/.test(body);
    if (hasPrices) noReverb.push(id);
  }
}
console.log('\nIDs without reverb price:', noReverb.length);
console.log(noReverb.join(', '));
