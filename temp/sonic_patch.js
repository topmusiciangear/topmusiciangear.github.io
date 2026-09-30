const fs = require('fs');
const f = 'data/products.json';
const raw = fs.readFileSync(f, 'utf8');
const data = JSON.parse(raw);
const p = data.find(x => x.id === 462);
if (!p) throw new Error('id 462 no encontrado');
if (!/Squier-Sonic-Stratocaster-HT-H-MN-Sonic-Blue\/art-GIT0064626-000/.test(JSON.stringify(p))) {
  p.stores.musicstore = 'https://www.musicstore.com/en_OE/EUR/Squier-Sonic-Stratocaster-HT-H-MN-Sonic-Blue/art-GIT0064626-000';
  p.excludeStores = (p.excludeStores || []).filter(s => s !== 'musicstore');
  const nl = /\n$/.test(raw);
  fs.writeFileSync(f, JSON.stringify(data, null, 2) + (nl ? '\n' : ''), 'utf8');
  console.log('products.json 462: MS anadido, excludeStores ->', JSON.stringify(p.excludeStores));
} else console.log('ya aplicado');
