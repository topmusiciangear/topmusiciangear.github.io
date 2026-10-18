const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const f = B + 'build-guides.js';
let s = fs.readFileSync(f, 'utf8');

const scoreBadgeFn = `
function scoreBadge(p) {
  if (p.score === undefined || p.score === null) return '';
  const score = Number(p.score).toFixed(1);
  const circumference = 2 * Math.PI * 31;
  const progress = score / 10;
  const offset = circumference * (1 - progress);
  const aria = 'Nuestra nota: ' + score + ' de 10';
  return '<div class="guide-product-card-score-container" role="img" aria-label="' + aria + '" style="position:absolute;top:12px;left:12px;z-index:3;width:72px;height:72px;border-radius:50%;background:rgba(10,20,44,.8);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.25);box-shadow:0 4px 14px rgba(0,20,60,.35);display:flex;align-items:center;justify-content:center;">' +
    '<svg width="72" height="72" viewBox="0 0 72 72" style="transform:rotate(-90deg);">' +
      '<circle class="guide-product-card-score-circle-bg" cx="36" cy="36" r="31" fill="none" stroke="rgba(255,255,255,.18)" stroke-width="5"/>' +
      '<circle class="guide-product-card-score-circle-progress" cx="36" cy="36" r="31" fill="none" stroke="#40A4FF" stroke-width="5" stroke-linecap="round" stroke-dasharray="' + circumference + '" stroke-dashoffset="' + offset + '" style="transition:stroke-dashoffset 600ms ease-out;"/>' +
    '</svg>' +
    '<div style="text-align:center;line-height:1.1;">' +
      '<div style="font-size:26px;font-weight:700;color:#fff;">' + score + '</div>' +
      '<div style="font-size:9px;font-weight:700;letter-spacing:.15em;color:#AACDFA;">NOTA</div>' +
    '</div>' +
  '</div>';
}

`;

const insertPos = s.indexOf('function productCard(p, lang)');
if (insertPos >= 0) {
  s = s.slice(0, insertPos) + scoreBadgeFn + s.slice(insertPos);
  console.log('scoreBadge function inserted');
} else {
  console.log('ERROR: productCard not found');
  process.exit(1);
}

fs.writeFileSync(f, s, 'utf8');
console.log('build-guides.js actualizado con scoreBadge');