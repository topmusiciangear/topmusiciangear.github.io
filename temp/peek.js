const fs = require('fs');
const s = fs.readFileSync(process.argv[2], 'utf8');
const needle = process.argv[3];
const i = s.indexOf(needle);
if (i < 0) { console.log('no encontrado'); process.exit(0); }
const chunk = s.slice(Math.max(0, i - 3000), i + 200);
const tags = chunk.match(/<(img|div)[^>]*>/g) || [];
console.log(tags.join('\n'));
