const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
const en = fs.readFileSync(DIR + 'guides/budget-headphones.html', 'utf8');
const es = fs.readFileSync(DIR + 'guides/budget-headphones_es.html', 'utf8');
const checks = [
  ['K240 zzounds $99 EN', en.includes('data-price=\'$99\'') || en.includes('$99</')],
  ['K240 MS EU75 EN', en.includes('75</') && en.includes('K240')],
  ['HD560S G4M 99 EN', en.includes('99</')],
  ['K240 zzounds $99 ES', es.includes('$99</')],
];
let bad = 0;
checks.forEach(c => { console.log((c[1] ? 'ok ' : 'FAIL ') + c[0]); if (!c[1]) bad++; });
// direct: find K240 buy block and print its price spans
['K240 Studio', 'HD 560S'].forEach(() => {});
const i = en.indexOf('AKG K240 Studio');
const seg = en.slice(i, i + 9000);
const prices = seg.match(/shop-price' data-price='[^']*'>(?:<span[^>]*>[^<]*<\/span>)?\s*[^<]*/g) || [];
console.log('K240 block prices:', JSON.stringify(prices.slice(0, 6)));
process.exit(bad ? 1 : 0);
