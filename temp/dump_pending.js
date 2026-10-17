const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));
const miss = products.filter(p => p.desc && !(p.desc_es || '').trim());
const out = miss.map(p => '### ' + p.id + ' | ' + p.title + '\n' + p.desc);
fs.writeFileSync(B + 'temp/pending_es.txt', out.join('\n\n'), 'utf8');
console.log('escritas ' + miss.length + ' descripciones en temp/pending_es.txt');
console.log('caracteres totales: ' + out.join('').length);