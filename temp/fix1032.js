const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));
const p120 = products.find(x => x.id === 120);
const p1032 = products.find(x => x.id === 1032);
// copiar las 6 tiendas de 120, conservando la PB limpia de 1032
p1032.stores = { ...p120.stores, pluginboutique: p1032.stores.pluginboutique };
fs.writeFileSync(B + 'data/products.json', JSON.stringify(products, null, 2), 'utf8');
console.log('1032 stores: ' + Object.keys(p1032.stores).join(','));

let bg = fs.readFileSync(B + 'build-guides.js', 'utf8');
const oldE = '1032: {prices:{pluginboutique:"€99.83"},pbCur:{us:"$99.00",uk:"£78.79"}},\n';
const newE = '1032: {prices:{pluginboutique:"€99.83",zzounds:"$99.00",gear4music:"£74.99",amazon:"$119.00",musicstore:"€83.20",andertons:"£79.00"},pbCur:{us:"$99.00",uk:"£78.79"}},\n';
if (!bg.includes(oldE)) { console.log('ENTRADA 1032 NO ENCONTRADA'); process.exit(1); }
bg = bg.split(oldE).join(newE);
fs.writeFileSync(B + 'build-guides.js', bg, 'utf8');
try { new Function(bg); console.log('TEST 1032 6 tiendas OK'); }
catch (e) { console.log('SYNTAX ERROR: ' + e.message); process.exit(1); }
