const fs = require('fs');
const P = require('C:/Users/Daniel/projects/topmusiciangear/data/products.json');
let out = '';
[20, 431, 432, 434, 436, 230, 197, 277, 59, 60, 105, 493, 109, 295, 72, 296, 330, 113, 114, 465, 466, 484, 495, 496, 334, 157, 158, 497, 502].forEach(id => {
  const p = P.find(x => x.id === id);
  out += '### ' + id + ' ' + (p ? p.title : '?') + '\nEN: ' + (p ? (p.desc || '') : '') + '\nES: ' + (p ? (p.desc_es || '') : '') + '\n\n';
});
fs.writeFileSync('C:/Users/Daniel/projects/topmusiciangear/temp/specs38.txt', out);