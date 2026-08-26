const fs = require('fs');
const products = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
const c = fs.readFileSync('build-guides.js', 'utf8');
const m = c.match(/TEST_SHOP_BTN\s*=\s*\{([\s\S]*?)\n\};/);
const block = m[1];

// IDs without reverb
const noReverb = [10, 39, 59, 92, 249, 251, 253, 254, 261, 264, 265, 268, 277, 278, 279, 280, 281, 284, 286, 287, 289, 290, 309, 114, 115, 132, 162, 163, 165, 166, 240, 292, 326, 331, 344, 347, 348, 349, 350, 355, 371, 372, 260, 364, 365, 366, 370];

const hasReverbUrl = [];
const noReverbUrl = [];

noReverb.forEach(id => {
  const p = products.find(x => x.id === id);
  if (!p) { noReverbUrl.push(id + ' (no product)'); return; }
  if (p.stores && p.stores.reverb) hasReverbUrl.push(id + ': ' + p.title);
  else noReverbUrl.push(id + ': ' + p.title);
});

console.log('=== IDs WITHOUT reverb price BUT HAVE reverb URL (' + hasReverbUrl.length + ') ===');
hasReverbUrl.forEach(x => console.log(x));
console.log('\n=== IDs WITHOUT reverb price AND NO reverb URL (' + noReverbUrl.length + ') ===');
noReverbUrl.forEach(x => console.log(x));
