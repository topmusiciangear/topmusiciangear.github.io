var fs = require('fs');
var NEW_ZZ = 'https://www.zzounds.com/item--KRKRP5G5NA?siid=343049';

// 1. products.json via parse/stringify
var pj = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
var p = pj.find(function (x) { return x.id === 633; });
if (!p) { console.log('PRODUCT 633 NOT FOUND'); process.exit(1); }
p.stores.zzounds = NEW_ZZ;
fs.writeFileSync('data/products.json', JSON.stringify(pj, null, 2));
console.log('products.json 633 zzounds -> ' + NEW_ZZ);

// 2. build-guides.js TEST_SHOP_BTN replace (CRLF-safe: read raw, replace exact substring)
var bg = fs.readFileSync('build-guides.js', 'utf8');
var OLD_ZZ = 'https://www.zzounds.com/a--925521/item--KRKRP5G5NA';
if (bg.indexOf(OLD_ZZ) < 0) { console.log('OLD ZZ URL NOT FOUND in build-guides.js'); process.exit(1); }
bg = bg.split(OLD_ZZ).join(NEW_ZZ);
fs.writeFileSync('build-guides.js', bg);
console.log('build-guides.js TEST_SHOP_BTN 633 zzounds updated');
