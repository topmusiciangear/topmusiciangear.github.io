const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const f = B + 'build-guides.js';
let s = fs.readFileSync(f, 'utf8');

const pos = s.indexOf('function scoreBadge(p)');
if (pos >= 0) {
  const endBrace = s.indexOf('\n}', pos) + 1;
  const fn = s.slice(pos, endBrace);

  // New badge: 56px, stroke 8px, number inside ring
  const newFn = `function scoreBadge(p) {
  if (p.score === undefined || p.score === null) return '';
  const score = Number(p.score).toFixed(1);
  const size = 56;
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = score / 10;
  const offset = circumference * (1 - progress);
  const aria = 'Nuestra nota: ' + score + ' de 10';
  return '<div class="guide-product-card-score-container" role="img" aria-label="' + aria + '" style="position:absolute;top:10px;left:10px;z-index:3;width:56px;height:56px;border-radius:50%;background:rgba(10,20,44,.85);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,.2);box-shadow:0 3px 10px rgba(0,15,50,.3);display:flex;align-items:center;justify-content:center;">' +
    '<div style="text-align:center;line-height:1.1;position:relative;z-index:1;display:flex;flex-direction:column;align-items:center;justify-content:center;width:100%;height:100%;">' +
      '<div style="font-size:19px;font-weight:800;color:#fff;line-height:1;">' + score + '</div>' +
      '<div style="font-size:7px;font-weight:700;letter-spacing:.1em;color:#9AC0FA;text-transform:uppercase;">NOTA</div>' +
    '</div>' +
    '<svg width="56" height="56" viewBox="0 0 56 56" style="transform:rotate(-90deg);position:absolute;top:0;left:0;" aria-hidden="true">' +
      '<circle class="guide-product-card-score-circle-bg" cx="28" cy="28" r="' + radius + '" fill="none" stroke="rgba(255,255,255,.12)" stroke-width="' + strokeWidth + '"/>' +
      '<circle class="guide-product-card-score-circle-progress" cx="28" cy="28" r="' + radius + '" fill="none" stroke="#40A4FF" stroke-width="' + strokeWidth + '" stroke-linecap="round" stroke-dasharray="' + circumference + '" stroke-dashoffset="' + offset + '" style="transition:stroke-dashoffset 600ms ease-out;"/>' +
    '</svg>' +
  '</div>';
}`;

  const endBrace = s.indexOf('\n}', pos) + 1;
  s = s.slice(0, pos) + newFn + s.slice(endBrace + 1);
  console.log('scoreBadge updated: 56px, stroke 8px, number inside');
}

fs.writeFileSync(f, s, 'utf8');
console.log('build-guides.js actualizado');