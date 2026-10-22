const fs = require('fs');
const pre = JSON.parse(fs.readFileSync('temp/products_pretrim.json', 'utf8'));
const cur = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));

// Restore original descs from pretrim
for (const p of pre) {
  const curP = cur.find(c => c.id === p.id);
  if (curP) {
    curP.desc = p.desc;
    curP.desc_es = p.desc_es;
  }
}

// Re-apply HD490 product 24 title/stores/price (keep original desc)
const cur24 = cur.find(p => p.id === 24);
cur24.title = 'Sennheiser HD 490 Pro';
cur24.title_es = 'Sennheiser HD 490 Pro';
cur24.price = 399;
cur24.stores = {
  amazon: 'https://www.amazon.co.uk/dp/B0CP6C4J5W',
  zzounds: 'https://www.zzounds.com/item--SENHD490PRO',
  gear4music: 'https://www.gear4music.com/us/en/Recording-and-Computers/Sennheiser-HD-490-Pro-Open-Back-Headphones/65EU',
  musicstore: 'https://www.musicstore.com/en_OE/EUR/Sennheiser-HD-490-Pro/art-REC0016604-000',
  andertons: 'https://www.andertons.co.uk/sennheiser-hd-490-pro-headphones'
};

fs.writeFileSync('data/products.json', JSON.stringify(cur, null, 2));
console.log('done');
const lens = cur.map(p => (p.desc||'').length);
console.log('max desc len:', Math.max(...lens), 'avg:', Math.round(lens.reduce((a,b)=>a+b,0)/lens.length));
