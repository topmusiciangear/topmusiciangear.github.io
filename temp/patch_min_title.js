const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';

// app.min.js: replicar el wrap de la fila titulo+resena
let m = fs.readFileSync(B + 'js/app.min.js', 'utf8');
const idx = m.indexOf('guide-product-card-body');
if (idx < 0) { console.log('app.min.js: no encontrado'); process.exit(1); }
const frag = m.slice(idx, idx + 260);
console.log('min antes: ' + JSON.stringify(frag));
const oldM = '<div class="guide-product-card-body">${e(()=>0)}';
// patron real: <div class="guide-product-card-body">...ratingLine...<div class="guide-product-card-title">${title}</div>
const re = /<div class="guide-product-card-body">(\s*)([^]*?)<div class="guide-product-card-title">\$\{[a-z]\}<\/div>/;
const mm = m.match(re);
if (!mm) { console.log('regex no casa'); process.exit(1); }
const neu = '<div class="guide-product-card-body">' + mm[1] + '<div class="guide-product-card-title-row">' + mm[1] + '  <div class="guide-product-card-title">${TITLE}</div>' + mm[1] + '  ' + mm[2].trim() + mm[1] + '</div>';
m = m.replace(re, function (all, sp, mid) {
  const titleVar = (mid.match(/\$\{([a-z]+)\}/) || [])[1] || 't';
  return '<div class="guide-product-card-body">' + sp + '<div class="guide-product-card-title-row">' + sp +
    '<div class="guide-product-card-title">${' + titleVar + '}</div>' + sp + mid.trim() + sp + '</div>';
});
fs.writeFileSync(B + 'js/app.min.js', m, 'utf8');
new Function(m);
console.log('app.min.js actualizado, sintaxis OK');
console.log('contexto: ' + JSON.stringify(m.slice(m.indexOf('guide-product-card-body'), m.indexOf('guide-product-card-body') + 300)));