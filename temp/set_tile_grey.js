// Fondo de la foto en las cards: gris 28 % (#5a5a5a) solido.
const fs = require('fs');

const GREY = '#5a5a5a';

function ruleSet(s, selector, prop, value, label) {
  const esc = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re = new RegExp('(' + esc + '\\s*\\{[^}]*?)' + prop + '\\s*:\\s*[^;}]+', '');
  if (!re.test(s)) { console.log('NO: ' + label); return s; }
  console.log('OK: ' + label);
  return s.replace(re, '$1' + prop + ': ' + value);
}

let css = fs.readFileSync('css/style.css', 'utf8');
css = ruleSet(css, '.guide-product-card-img--cutout', 'background', GREY, 'css card img base');
css = ruleSet(css, '.guide-product-card .guide-product-card-img--cutout', 'background', GREY, 'css card img');
css = ruleSet(css, '.guide-section-img.guide-section-img--cutout', 'background', GREY, 'css thumb');
css = ruleSet(css, '.guide-detail .guide-detail-img.guide-detail-img--cutout', 'background', GREY, 'css hero');
fs.writeFileSync('css/style.css', css, 'utf8');

// lightbox (bloque especial, con !important)
let css2 = fs.readFileSync('css/style.css', 'utf8');
const before = css2;
css2 = css2.replace(/(#lightbox img\[src\*="\/img\/cut\/"\],\s*\n#lightbox img\[src\*="\/img\/guides\/"\] \{\s*\n\s*background: )rgba\([^)]+\)( !important;)/, '$1' + GREY + '$2');
console.log(css2 === before ? 'NO: css lightbox' : 'OK: css lightbox');
fs.writeFileSync('css/style.css', css2, 'utf8');

let b = fs.readFileSync('build-guides.js', 'utf8');
const pairs = [
  ['guide-product-card-img--cutout{background:rgba(255,255,255,.45)}', 'guide-product-card-img--cutout{background:' + GREY + '}'],
  ['.guide-product-card .guide-product-card-img--cutout{background:rgba(255,255,255,.45)}', '.guide-product-card .guide-product-card-img--cutout{background:' + GREY + '}'],
  ['guide-section-img.guide-section-img--cutout{background:rgba(255,255,255,.45)', 'guide-section-img.guide-section-img--cutout{background:' + GREY],
  ['guide-detail .guide-detail-img.guide-detail-img--cutout{background:rgba(255,255,255,.45)', 'guide-detail .guide-detail-img.guide-detail-img--cutout{background:' + GREY],
  ['{background:rgba(255,255,255,.45) !important;border-radius:14px !important', '{background:' + GREY + ' !important;border-radius:14px !important'],
];
for (const [from, to] of pairs) {
  const n = b.split(from).length - 1;
  console.log((n ? 'OK' : 'NO') + ': inline ' + from.slice(0, 60) + ' (' + n + ')');
  b = b.split(from).join(to);
}
fs.writeFileSync('build-guides.js', b, 'utf8');
