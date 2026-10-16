const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));
const p = products.find(x => x.id === 1025);
p.stores.andertons = 'https://www.andertons.co.uk/izotope-rx-12-standard/';
fs.writeFileSync(B + 'data/products.json', JSON.stringify(products, null, 2), 'utf8');
let bg = fs.readFileSync(B + 'build-guides.js', 'utf8');
const oldE = '1025: {prices:{pluginboutique:"€402.35"},pbCur:{us:"$399.00",uk:"£317.56"}},\n';
const newE = '1025: {prices:{pluginboutique:"€402.35",andertons:"£389.00"},pbCur:{us:"$399.00",uk:"£317.56"}},\n';
if (!bg.includes(oldE)) { console.log('ENTRADA 1025 NO ENCONTRADA'); process.exit(1); }
bg = bg.split(oldE).join(newE);
fs.writeFileSync(B + 'build-guides.js', bg, 'utf8');
new Function(bg);
console.log('1025 Andertons £389 OK');
