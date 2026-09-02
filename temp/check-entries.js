const fs = require('fs');

// Check a few TEST_SHOP_BTN entries and match them to products
const bg = fs.readFileSync('build-guides.js', 'utf8');
const match = bg.match(/TEST_SHOP_BTN\s*=\s*{([\s\S]*?)\n\};/);
const block = match[1];

// Parse all entries
const entries = {};
const lines = block.split('\n');
for (const line of lines) {
  const m = line.match(/^\s*(\d+):\s*\{(.+)\}/);
  if (m) {
    const id = parseInt(m[1]);
    entries[id] = m[2];
  }
}

// Check entries around ID 33
for (let i = 30; i <= 40; i++) {
  if (entries[i]) {
    const msMatch = entries[i].match(/musicstore:"€([\d,.]+)"/);
    const ms = msMatch ? msMatch[1] : 'none';
    console.log('ID:' + i + ' | musicstore: €' + ms);
  }
}

// Check entries around ID 50
console.log('\nAround ID 50:');
for (let i = 48; i <= 55; i++) {
  if (entries[i]) {
    const msMatch = entries[i].match(/musicstore:"€([\d,.]+)"/);
    const ms = msMatch ? msMatch[1] : 'none';
    const zzMatch = entries[i].match(/zzounds:"\$([\d,.]+)"/);
    const zz = zzMatch ? zzMatch[1] : 'none';
    console.log('ID:' + i + ' | musicstore: €' + ms + ' | zzounds: $' + zz);
  }
}
