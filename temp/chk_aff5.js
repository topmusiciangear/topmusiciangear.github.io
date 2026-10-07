const fs = require('fs');
const t = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/guides/best-reverb-delay.html', 'utf8');
const i = t.indexOf('data-store="zzounds"');
console.log(JSON.stringify(t.slice(i, i + 600)));
