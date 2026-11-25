const fs = require('fs');
const guides = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const products = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));

// Manual fixes for products that exist but with different names
const manualFixes = {
  'Yamaha C40 Classical (Nylon) Guitar': 'Yamaha C40II Classical (Nylon) Guitar',
  'Casio PX-S1100': 'Casio Privia PX-S1100 Digital Piano',
  'Yamaha YDP-146': 'Yamaha Arius YDP-146 Digital Piano',
  'Yamaha YDP-166': 'Yamaha Arius YDP-166',
  'Yamaha CLP-835': 'Yamaha Clavinova CLP-835',
  'Akai MPC Key 37 Gen 2': 'Akai Professional MPC Key 37 Gen 2',
};

let fixed = 0;
guides.forEach(g => {
  if (!g.productTable || !g.productTable.columns) return;
  g.productTable.columns.forEach(col => {
    if (manualFixes[col.title]) {
      const newTitle = manualFixes[col.title];
      const product = products.find(p => p.title === newTitle);
      if (product) {
        col.title = newTitle;
        if (col.title_es) col.title_es = product.title_es || newTitle;
        fixed++;
        console.log('Fixed: ' + g.id + ' | ' + Object.keys(manualFixes).find(k => manualFixes[k] === newTitle) + ' → ' + newTitle);
      }
    }
  });
});

fs.writeFileSync('data/guides.json', JSON.stringify(guides, null, 2), 'utf8');
console.log('\nTotal fixed:', fixed);