// Segunda pasada: sube opacidad del gris (tolera CRLF y espacios).
const fs = require('fs');

function ruleReplace(s, selector, to, label) {
  const esc = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re = new RegExp('(' + esc + '\\s*\\{[^}]*?rgba\\(\\s*255\\s*,\\s*255\\s*,\\s*255\\s*,\\s*)0?\\.\\d+(\\s*\\))');
  if (!re.test(s)) { console.log('NO: ' + label); return s; }
  console.log('OK: ' + label);
  return s.replace(re, '$1' + to + '$2');
}

let css = fs.readFileSync('css/style.css', 'utf8');
css = ruleReplace(css, '.guide-product-card-img--cutout', '0.45', 'css card img base');
css = ruleReplace(css, '.guide-product-card .guide-product-card-img--cutout', '0.45', 'css card img');
css = ruleReplace(css, '.guide-product-card--cutout', '0.06', 'css card');
css = ruleReplace(css, '.guide-section-img.guide-section-img--cutout', '0.45', 'css thumb');
css = ruleReplace(css, '.guide-detail .guide-detail-img.guide-detail-img--cutout', '0.45', 'css hero');
fs.writeFileSync('css/style.css', css, 'utf8');

let b = fs.readFileSync('build-guides.js', 'utf8');
const before = b;
b = b.replace('#lightbox img[src*="/img/cut/"],#lightbox img[src*="/img/guides/"]{background:rgba(255,255,255,.26)',
  '#lightbox img[src*="/img/cut/"],#lightbox img[src*="/img/guides/"]{background:rgba(255,255,255,.45)');
console.log(b === before ? 'NO: inline lightbox' : 'OK: inline lightbox');
fs.writeFileSync('build-guides.js', b, 'utf8');
