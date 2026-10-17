const fs = require('fs');
const guides = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
const g = guides.find(x => x.id === 'best-guitar-plugins');
const s = g.sections[0];
console.log('heading: ' + s.heading);
console.log('products: ' + s.products.join(','));
console.log('pros: ' + JSON.stringify(s.pros, null, 1));
console.log('cons: ' + JSON.stringify(s.cons, null, 1));
console.log('\n--- content EN ---\n' + s.content);
console.log('\n--- content_es ---\n' + s.content_es);
console.log('\n--- como se ve un link de PB en el corpus ---');
let n = 0;
guides.forEach(x => {
  const st = JSON.stringify(x);
  const re = /https:\/\/www\.pluginboutique\.com\/product\/[^"\\ ]+/g;
  let m; while ((m = re.exec(st)) !== null && n < 5) { console.log(x.id + ': ' + m[0]); n++; }
});