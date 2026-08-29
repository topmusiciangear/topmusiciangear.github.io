const fs=require('fs');
const products=JSON.parse(fs.readFileSync('data/products.json','utf8'));
const p=products.find(x=>x.title && x.title.includes('StudioLive 32SC'));
console.log('32SC found, id:', p&&p.id, '| cat:', p&&p.category);
console.log('stores:', JSON.stringify(p&&p.stores||{},null,1));
console.log('oos:', p&&p.oos);
// check TEST_SHOP_BTN entry
const src=fs.readFileSync('build-guides.js','utf8');
const re=new RegExp('\\b'+p.id+': \\{ prices: \\{[^}]*\\}');
const m=src.match(re);
console.log('TEST_SHOP_BTN entry:', m?m[0]:'MISSING');
