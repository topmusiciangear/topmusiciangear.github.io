const fs = require('fs');
const f = 'C:/Users/Daniel/projects/topmusiciangear/temp/eg_bm_reviews.js';
let s = fs.readFileSync(f, 'utf8');
const bad = ['<Block>', '_action', 'esananemen', 'quesequently', 'jangly', 'El)', 'sequently', 'unAction'];
bad.forEach(w => { if (s.includes(w)) console.log('ENCONTRADO: ' + w + ' x' + (s.split(w).length - 1)); });
console.log('fin deteccion');