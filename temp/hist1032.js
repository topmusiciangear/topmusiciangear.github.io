const { execSync } = require('child_process');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const old = execSync('git show d031ccb1a8:data/products.json', { cwd: B, maxBuffer: 50 * 1024 * 1024 }).toString();
const products = JSON.parse(old);
const x = products.find(y => y.id === 1032);
console.log('1032 en d031ccb1a8: ' + JSON.stringify(x, null, 1));
// y el TEST de entonces
const bgOld = execSync('git show d031ccb1a8:build-guides.js', { cwd: B, maxBuffer: 50 * 1024 * 1024 }).toString();
const i = bgOld.indexOf('1032:');
console.log('TEST 1032 entonces: ' + bgOld.slice(i, i + 200));
