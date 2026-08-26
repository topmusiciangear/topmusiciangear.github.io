const fs = require('fs');
const c = fs.readFileSync('build-guides.js', 'utf8');
const products = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
const m = c.match(/TEST_SHOP_BTN\s*=\s*\{([\s\S]*?)\n\};/);
const block = m[1];

// Find all entries with gear4music in oos
const regex = /\b(\d+):\s*\{([^}]+)\}/g;
let match;
const g4mOOS = [];
while ((match = regex.exec(block)) !== null) {
  const id = parseInt(match[1]);
  const body = match[2];
  if (body.includes("oos:") && body.includes("'gear4music'")) {
    const p = products.find(x => x.id === id);
    const hasG4MUrl = p && p.stores && p.stores.gear4music;
    g4mOOS.push({ 
      id, 
      title: p ? p.title : '?', 
      hasG4MUrl: !!hasG4MUrl,
      g4mUrl: hasG4MUrl ? 'YES' : 'NO'
    });
  }
}

console.log('Products with G4M in oos array: ' + g4mOOS.length);
console.log('---');
g4mOOS.forEach(x => console.log(`ID ${x.id}: ${x.title} (has G4M URL: ${x.g4mUrl})`));
