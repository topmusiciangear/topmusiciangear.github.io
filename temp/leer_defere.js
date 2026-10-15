const fs = require('fs');
const src = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/temp/defere-aff.js', 'utf8');
console.log(src.slice(0, 3000));
