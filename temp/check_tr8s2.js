const fs = require('fs');
const src = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/build-guides.js', 'utf8');
const m = src.match(/(\d+): \{\s*prices: \{\s*amazon: "\$749\.99"/);
console.log('matched id:', m ? m[1] : 'none');
