// Sube la opacidad del gris de las fotos (menos transparente).
const fs = require('fs');

function rep(s, from, to, label) {
  const n = s.split(from).length - 1;
  if (!n) { console.log('NO ENCONTRADO: ' + label); return s; }
  console.log(label + ': ' + n);
  return s.split(from).join(to);
}

let css = fs.readFileSync('css/style.css', 'utf8');
css = rep(css, '/* Tarjeta con la foto recortada (WebP transparente): gris translúcido en vez de blanco */\n.guide-product-card-img--cutout {\n  background: rgba(255, 255, 255, 0.28);\n}',
  '/* Tarjeta con la foto recortada (WebP transparente): gris translúcido en vez de blanco */\n.guide-product-card-img--cutout {\n  background: rgba(255, 255, 255, 0.45);\n}', 'css card img base');
css = rep(css, '.guide-product-card .guide-product-card-img--cutout {\n  background: rgba(255, 255, 255, 0.26);\n}',
  '.guide-product-card .guide-product-card-img--cutout {\n  background: rgba(255, 255, 255, 0.45);\n}', 'css card img');
css = rep(css, '.guide-product-card--cutout {\n  background: rgba(255, 255, 255, 0.035);\n}',
  '.guide-product-card--cutout {\n  background: rgba(255, 255, 255, 0.06);\n}', 'css card');
css = rep(css, '  background: rgba(255, 255, 255, 0.26) !important;', '  background: rgba(255, 255, 255, 0.45) !important;', 'css lightbox');
css = rep(css, '.guide-section-img.guide-section-img--cutout {\n  background: rgba(255, 255, 255, 0.28);',
  '.guide-section-img.guide-section-img--cutout {\n  background: rgba(255, 255, 255, 0.45);', 'css thumb');
css = rep(css, '.guide-detail .guide-detail-img.guide-detail-img--cutout {\n  background: rgba(255, 255, 255, 0.28);\n}',
  '.guide-detail .guide-detail-img.guide-detail-img--cutout {\n  background: rgba(255, 255, 255, 0.45);\n}', 'css hero');
fs.writeFileSync('css/style.css', css, 'utf8');

let b = fs.readFileSync('build-guides.js', 'utf8');
b = rep(b, 'guide-detail .guide-detail-img.guide-detail-img--cutout{background:rgba(255,255,255,.28)',
  'guide-detail .guide-detail-img.guide-detail-img--cutout{background:rgba(255,255,255,.45)', 'inline hero');
b = rep(b, 'guide-product-card-img--cutout{background:rgba(255,255,255,.26)}',
  'guide-product-card-img--cutout{background:rgba(255,255,255,.45)}', 'inline card img');
b = rep(b, '.guide-product-card .guide-product-card-img--cutout{background:rgba(255,255,255,.26)}',
  '.guide-product-card .guide-product-card-img--cutout{background:rgba(255,255,255,.45)}', 'inline card img 2');
b = rep(b, '.guide-product-card--cutout{background:rgba(255,255,255,.035)}',
  '.guide-product-card--cutout{background:rgba(255,255,255,.06)}', 'inline card');
b = rep(b, '{background:rgba(255,255,255,.26) !important;border-radius:14px !important',
  '{background:rgba(255,255,255,.45) !important;border-radius:14px !important', 'inline lightbox');
b = rep(b, 'guide-section-img.guide-section-img--cutout{background:rgba(255,255,255,.28)',
  'guide-section-img.guide-section-img--cutout{background:rgba(255,255,255,.45)', 'inline thumb');
fs.writeFileSync('build-guides.js', b, 'utf8');
console.log('OK');
