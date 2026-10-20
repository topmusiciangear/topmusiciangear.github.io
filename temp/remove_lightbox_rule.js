// Quita la regla de lightbox gris/redondeada (solo existia para los recortes).
const fs = require('fs');

const from = '#lightbox img[src*="/img/cut/"],#lightbox img[src*="/img/guides/"]{background:#5a5a5a!important;border-radius:14px!important;border:1px solid #2a2a2a}';
let s = fs.readFileSync('build-guides.js', 'utf8');
const n = s.split(from).length - 1;
s = s.split(from).join('');
fs.writeFileSync('build-guides.js', s, 'utf8');
console.log('lightbox inline eliminada:', n);

let css = fs.readFileSync('css/style.css', 'utf8');
const block = `/* Lightbox: fondo gris translúcido y esquinas redondeadas como las cards */
#lightbox img[src*="/img/cut/"],
#lightbox img[src*="/img/guides/"] {
  background: #5a5a5a !important;
  border-radius: 14px !important;
  border: 1px solid #2a2a2a;
}

`;
const m = css.split(block).length - 1;
css = css.split(block).join('');
fs.writeFileSync('css/style.css', css, 'utf8');
console.log('lightbox css eliminada:', m);
