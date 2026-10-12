var fs = require('fs');
var p = 'data/guides.json';
var d = JSON.parse(fs.readFileSync(p, 'utf8'));

var h = d.find(function(x){ return x.id === 'budget-headphones'; });
console.log('budget-headphones BEFORE:');
console.log('  tag: ' + h.titleTag);
console.log('  tag_es: ' + h.titleTag_es);
h.titleTag = 'Best Cheap Studio Headphones Under $150 (Pros, Cons & Buying Guide 2026)';
h.titleTag_es = 'Mejores auriculares de estudio por menos de $150 (pros, contras y guía de compra 2026)';
console.log('budget-headphones AFTER:');
console.log('  tag: ' + h.titleTag);
console.log('  tag_es: ' + h.titleTag_es);

fs.writeFileSync(p, JSON.stringify(d, null, 2));
console.log('Done');