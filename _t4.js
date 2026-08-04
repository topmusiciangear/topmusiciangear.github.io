const fs = require('fs');
const j = fs.readFileSync('js/app.min.js', 'utf8');
const i = j.indexOf('const items=rv.map(r=>');
console.log(JSON.stringify(j.substring(i, i + 700)));