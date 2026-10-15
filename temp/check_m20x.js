const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const arr = JSON.parse(fs.readFileSync(BASE+'data/products.json','utf8'));
const list = Array.isArray(arr)?arr:arr.products;
const guides = JSON.parse(fs.readFileSync(BASE+'data/guides.json','utf8'));

console.log('=== M20x / M-series en catalogo ===');
list.filter(p=>/M20x|M40x|M50x|Audio-Technica ATH-M/i.test(p.title))
  .forEach(p=>console.log('  id ' + String(p.id).padEnd(5) + p.title.padEnd(38) + '$' + String(p.price).padEnd(6) + Object.keys(p.stores||{}).join(', ')));

console.log('\n=== en que guias aparece el M40x (para copiar formato) ===');
guides.filter(g=>JSON.stringify(g).indexOf('M40x')>-1).forEach(g=>console.log('  ' + g.id));

// esquema exacto del M50x como plantilla
const m50x = list.find(x=>/M50x/.test(x.title));
console.log('\n=== PLANTILLA: ' + m50x.title + ' (id ' + m50x.id + ') ===');
console.log(JSON.stringify(m50x, null, 2));