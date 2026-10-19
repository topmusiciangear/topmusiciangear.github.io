const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));
const p = products.find(x => x.title === 'RØDE RØDECaster Pro II');

p.desc = 'Standalone console: your mic, music and alerts are processed in the hardware itself. Four combo inputs, dual USB-C, eight SMART pads.';
p.desc_es = 'Consola autónoma: procesa el micro, la música y las alertas en el propio hardware. Cuatro entradas combo, doble USB-C y ocho pads SMART.';

const ok = (s) => s.length <= 145 && s.trim().endsWith('.');
console.log('EN (' + p.desc.length + ') ok: ' + ok(p.desc));
console.log('  ' + p.desc);
console.log('ES (' + p.desc_es.length + ') ok: ' + ok(p.desc_es));
console.log('  ' + p.desc_es);

fs.writeFileSync(B + 'data/products.json', JSON.stringify(products, null, 2), 'utf8');
