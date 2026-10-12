var fs = require('fs');
var p = 'data/guides.json';
var d = JSON.parse(fs.readFileSync(p, 'utf8'));

// budget-interfaces
var b = d.find(function(x){ return x.id === 'budget-interfaces'; });
console.log('budget-interfaces BEFORE:');
console.log('  tag: ' + b.titleTag);
console.log('  tag_es: ' + b.titleTag_es);
b.titleTag = 'Best Budget Audio Interfaces Under $300 (Pros, Cons & Buying Guide 2026)';
b.titleTag_es = 'Mejores interfaces de audio por menos de $300 (pros, contras y guía de compra 2026)';
console.log('budget-interfaces AFTER:');
console.log('  tag: ' + b.titleTag);
console.log('  tag_es: ' + b.titleTag_es);

// best-monitors-for-small-rooms
var m = d.find(function(x){ return x.id === 'best-monitors-for-small-rooms'; });
console.log('best-monitors-for-small-rooms BEFORE:');
console.log('  tag: ' + m.titleTag);
console.log('  tag_es: ' + m.titleTag_es);
m.titleTag = 'Best Studio Monitors for Small Rooms (Pros, Cons & Buying Guide 2026)';
m.titleTag_es = 'Mejores monitores de estudio para salas pequeñas (pros, contras y guía de compra 2026)';
console.log('best-monitors-for-small-rooms AFTER:');
console.log('  tag: ' + m.titleTag);
console.log('  tag_es: ' + m.titleTag_es);

fs.writeFileSync(p, JSON.stringify(d, null, 2));
console.log('Done');