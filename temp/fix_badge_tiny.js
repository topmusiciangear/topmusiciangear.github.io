const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const f = B + 'build-guides.js';
let s = fs.readFileSync(f, 'utf8');

const pos = s.indexOf('function scoreBadge(p)');
if (pos >= 0) {
  const endBraceIdx = s.indexOf('\n}', pos) + 1;

  // 48px total, stroke 5px -> outer ring exactly at 48px border, number 14px
  const newFn = `function scoreBadge(p) {
  if (p.score === undefined || p.score === null) return '';
  const score = Number(p.score).toFixed(1);
  const size = 48;
  const strokeWidth = 5;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = score / 10;
  const offset = circumference * (1 - progress);
  const aria = 'Nuestra nota: ' + score + ' de 10';
  return '<div class="guide-product-card-score-container" role="img" aria-label="' + aria + '" style="position:absolute;top:6px;left:6px;z-index:3;width:48px;height:48px;border-radius:50%;background:rgba(10,20,44,.85);backdrop-filter:blur(6px);border:1px solid rgba(255,255,255,.1);box-shadow:0 2px 6px rgba(0,15,50,.2);display:flex;align-items:center;justify-content:center;">' +
    '<div style="text-align:center;line-height:1.1;position:relative;z-index:1;display:flex;flex-direction:column;align-items:center;justify-content:center;width:100%;height:100%;">' +
      '<div style="font-size:13px;font-weight:800;color:#fff;line-height:1;">' + score + '</div>' +
      '<div style="font-size:5.5px;font-weight:700;letter-spacing:.06em;color:#9AC0FA;text-transform:uppercase;">NOTA</div>' +
    '</div>' +
    '<svg width="48" height="48" viewBox="0 0 48 48" style="transform:rotate(-90deg);position:absolute;top:0;left:0;" aria-hidden="true">' +
      '<circle class="guide-product-card-score-circle-bg" cx="24" cy="24" r="' + radius + '" fill="none" stroke="rgba(255,255,255,.08)" stroke-width="' + strokeWidth + '"/>' +
      '<circle class="guide-product-card-score-circle-progress" cx="24" cy="24" r="' + radius + '" fill="none" stroke="#40A4FF" stroke-width="' + strokeWidth + '" stroke-linecap="round" stroke-dasharray="' + circumference + '" stroke-dashoffset="' + offset + '" style="transition:stroke-dashoffset 600ms ease-out;"/>' +
    '</svg>' +
  '</div>';
}`;

  const endBraceIdx = s.indexOf('\n}', pos) + 1;
  s = s.slice(0, pos) + newFn + s.slice(endBraceIdx + 1);
  console.log('scoreBadge updated: 48px, stroke 5px (borde exacto), number 13px');
}

fs.writeFileSync(f, s, 'utf8');
console.log('build-guides.js actualizado');