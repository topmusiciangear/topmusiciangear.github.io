// Fix Lynx column title to TB3 per user recommendation
const fs = require('fs');
const G = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const g = G.find(x => x.id === 'premium-interfaces');

const idx = g.productTable.columns.findIndex(c => c.title.includes('Lynx Aurora'));
if (idx > -1) {
  g.productTable.columns[idx] = { title: 'Lynx Aurora-n 16 TB3', title_es: 'Lynx Aurora-n 16 TB3' };
}

fs.writeFileSync('data/guides.json', JSON.stringify(G, null, 2));
console.log('premium-interfaces Lynx title updated:', g.productTable.columns.map(c => c.title).join(', '));