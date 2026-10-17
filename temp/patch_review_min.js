const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const p = B + 'js/app.min.js';
let m = fs.readFileSync(p, 'utf8');
const idx = m.indexOf('guide-review-write-btn');
if (idx < 0) { console.log('no encontrado'); process.exit(1); }
const btnRe = /<button class="guide-review-write-btn" onclick="openReviewModal\(\$\{[a-z]\.id\}\)">\$\{[a-z]\}<\/button>/;
if (!btnRe.test(m)) { console.log('regex no casa'); console.log(JSON.stringify(m.slice(idx - 120, idx + 90))); process.exit(1); }
m = m.replace(btnRe, '');
fs.writeFileSync(p, m, 'utf8');
new Function(fs.readFileSync(p, 'utf8'));
new Function(fs.readFileSync(B + 'js/app.js', 'utf8'));
console.log('app.min.js: boton eliminado, sintaxis OK');
console.log('quedan guide-review-write-btn -> app.js: ' + fs.readFileSync(B + 'js/app.js', 'utf8').includes('guide-review-write-btn') + ' | app.min.js: ' + fs.readFileSync(p, 'utf8').includes('guide-review-write-btn') + ' | build-guides.js: ' + fs.readFileSync(B + 'build-guides.js', 'utf8').includes('guide-review-write-btn'));