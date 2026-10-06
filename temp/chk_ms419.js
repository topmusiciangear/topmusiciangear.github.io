const fs = require('fs');
const h = fs.readFileSync('guides/best-digital-pianos_es.html', 'utf8');
const t = h.indexOf('Roland FP-10 Piano Digital');
const i = h.indexOf('musicstore', t);
console.log(h.slice(i - 200, i + 500).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').slice(0, 400));
