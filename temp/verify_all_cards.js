const fs = require('fs');
const path = require('path');
const B = 'C:/Users/Daniel/projects/topmusiciangear/guides/';
const files = fs.readdirSync(B).filter(f => f.endsWith('.html'));
let cards = 0, toggles = 0, pagesWithToggle = [];
files.forEach(f => {
  const h = fs.readFileSync(B + f, 'utf8');
  const t = (h.match(/class="guide-product-card-desc-toggle"/g) || []).length;
  cards += (h.match(/class="guide-product-card-desc"/g) || []).length;
  toggles += t;
  if (t > 0) pagesWithToggle.push(f + ' (' + t + ')');
});
console.log('paginas revisadas: ' + files.length);
console.log('cards con descripcion: ' + cards);
console.log('botones + restantes: ' + toggles);
if (pagesWithToggle.length) { console.log('PAGINAS CON BOTON +:'); pagesWithToggle.slice(0, 20).forEach(x => console.log('  ' + x)); }

// CSS: line-clamp 3 presente en el minificado y en el fuente
const cssMin = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/css/style.min.css', 'utf8');
const css = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/css/style.css', 'utf8');
const m = cssMin.match(/\.guide-product-card-desc\{[^}]*\}/);
console.log('\ncss fuente: ' + (css.match(/\.guide-product-card-desc \{[^}]*\}/) || [])[0].replace(/\s+/g, ' '));
console.log('css min:    ' + (m ? m[0] : 'NO ENCONTRADO'));
console.log('queda .desc-toggle en css: ' + css.includes('guide-product-card-desc-toggle'));
console.log('line-clamp 3: ' + /-webkit-line-clamp:3/.test(cssMin));