const fs = require('fs');
const c = fs.readFileSync('build-guides.js', 'utf8');
const m = c.match(/const TEST_SHOP_BTN\s*=\s*\{([\s\S]*?)\n\};/);
const prods = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));

const entries = {};
const re = /(\d+):\s*\{/g;
let x;
const lines = m[1].split('\n');
for (let i = 0; i < lines.length; i++) {
  const idMatch = lines[i].match(/^\s*(\d+):\s*\{/);
  if (!idMatch) continue;
  const id = +idMatch[1];
  let block = lines[i];
  while (i + 1 < lines.length && !lines[i + 1].match(/^\s*\d+:\s*\{/) && !lines[i + 1].match(/^\};/)) {
    i++;
    block += '\n' + lines[i];
  }
  const prices = {};
  const pm = block.match(/prices:\s*\{([\s\S]*?)\}/);
  if (pm) {
    const kvs = pm[1].matchAll(/['"](\w+)['"]\s*:\s*['"][^'"]*['"]/g);
    for (const k of kvs) prices[k[1]] = true;
  }
  const oosM = block.match(/oos:\s*\[([^\]]*)\]/);
  const oos = oosM ? oosM[1].replace(/['"\s]/g, '').split(',').filter(Boolean) : [];
  const naM = block.match(/na:\s*\[([^\]]*)\]/);
  const na = naM ? naM[1].replace(/['"\s]/g, '').split(',').filter(Boolean) : [];
  entries[id] = { prices, oos, na };
}

const missingG4M = [];
const missingMS = [];
for (const p of prods) {
  if (!entries[p.id]) continue;
  const e = entries[p.id];
  if (!e.prices.gear4music && !e.oos.includes('gear4music') && !e.na.includes('gear4music')) {
    missingG4M.push(p.id + ' ' + p.title);
  }
  if (!e.prices.musicstore && !e.oos.includes('musicstore') && !e.na.includes('musicstore')) {
    missingMS.push(p.id + ' ' + p.title);
  }
}
console.log('Missing G4M (' + missingG4M.length + '):');
missingG4M.forEach(x => console.log('  ' + x));
console.log('Missing MS (' + missingMS.length + '):');
missingMS.forEach(x => console.log('  ' + x));
