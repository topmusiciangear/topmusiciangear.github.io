const fs = require('fs');

// ---- 1. patch js/app.js ----
let app = fs.readFileSync('js/app.js', 'utf8');
const oldApp = '      if (pt.indexOf(n) === 0 || n.indexOf(pt) === 0 || (pte && (pte.indexOf(n) === 0 || n.indexOf(pte) === 0))) {';
const newApp = '      if (n === pt || (pte && n === pte)) {';
if (!app.includes(oldApp)) throw new Error('app.js pattern not found');
app = app.split(oldApp).join(newApp);
fs.writeFileSync('js/app.js', app);
console.log('js/app.js patched');

// ---- 2. patch js/app.min.js (identical logic, minified) ----
let min = fs.readFileSync('js/app.min.js', 'utf8');
const oldMin = 'if(0===s.indexOf(o)||0===o.indexOf(s)||(c&&(0===c.indexOf(o)||0===o.indexOf(c))))';
const newMin = 'if(o===s||(c&&o===c))';
if (!min.includes(oldMin)) throw new Error('app.min.js pattern not found');
min = min.split(oldMin).join(newMin);
fs.writeFileSync('js/app.min.js', min);
new Function(min);
console.log('js/app.min.js patched + syntax OK');

// ---- 3. link the 9 genuinely-covered products by id ----
const g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const adds = {
  'tracking-headphones': [57],
  'best-digital-mixers': [138, 147, 148, 332, 335],
  'best-condenser-mics': [196, 297],
  'usb-mics': [518]
};
Object.keys(adds).forEach(gid => {
  const guide = g.find(x => x.id === gid);
  if (!guide) throw new Error('guide not found: ' + gid);
  if (!guide.featuredProducts) guide.featuredProducts = [];
  adds[gid].forEach(pid => {
    if (guide.featuredProducts.indexOf(pid) === -1) guide.featuredProducts.push(pid);
  });
  console.log(gid + ' featuredProducts: ' + JSON.stringify(guide.featuredProducts));
});
fs.writeFileSync('data/guides.json', JSON.stringify(g, null, 2) + '\n');
console.log('Done.');
