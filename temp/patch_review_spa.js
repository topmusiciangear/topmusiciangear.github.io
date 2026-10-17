const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';

// ---------- js/app.js ----------
let a = fs.readFileSync(B + 'js/app.js', 'utf8');
const oldA = "  const btnLabel = isEs ? 'Escribe una rese\u00f1a' : 'Write a review';\n  return `<div class=\"guide-product-card-rating-row\">${ratingHtml}<button class=\"guide-review-write-btn\" onclick=\"openReviewModal(${p.id})\">${btnLabel}</button></div>`;";
const newA = '  return `<div class="guide-product-card-rating-row">${ratingHtml}</div>`;';
const nA = a.split(oldA).length - 1;
console.log('app.js ocurrencias: ' + nA);
if (nA !== 1) { console.log('ABORTADO app.js'); process.exit(1); }
a = a.replace(oldA, newA);
fs.writeFileSync(B + 'js/app.js', a, 'utf8');
console.log('app.js: boton de cabecera eliminado');

// ---------- js/app.min.js ----------
let m = fs.readFileSync(B + 'js/app.min.js', 'utf8');
const oldM = '}</button></div>`}';
const idx = m.indexOf('guide-review-write-btn');
console.log('app.min.js idx: ' + idx);
if (idx < 0) { console.log('ABORTADO app.min.js'); process.exit(1); }
const oldMfull = m.slice(idx - 220, idx + 60);
console.log('contexto: ' + JSON.stringify(oldMfull));
// el boton va de <button class="guide-review-write-btn" onclick="openReviewModal(${e.id})">${i}</button> hasta </button></div>`}
const btnRe = /<button class="guide-review-write-btn" onclick="openReviewModal\(\$\{[a-z]\.id\}\)">\$\{[a-z]\}<\/button>/;
const m2 = m.replace(btnRe, '');
if (m2 === m) { console.log('ABORTADO: regex no elimino nada'); process.exit(1); }
fs.writeFileSync(B + 'js/app.min.js', m2, 'utf8');
console.log('app.min.js: boton de cabecera eliminado');

// ---------- sintaxis ----------
new Function(fs.readFileSync(B + 'js/app.js', 'utf8'));
console.log('app.js sintaxis OK');
new Function(fs.readFileSync(B + 'js/app.min.js', 'utf8'));
console.log('app.min.js sintaxis OK');
console.log('quedan guide-review-write-btn: app.js=' + fs.readFileSync(B + 'js/app.js', 'utf8').includes('guide-review-write-btn') + ' app.min.js=' + fs.readFileSync(B + 'js/app.min.js', 'utf8').includes('guide-review-write-btn') + ' build-guides.js=' + fs.readFileSync(B + 'build-guides.js', 'utf8').includes('guide-review-write-btn'));