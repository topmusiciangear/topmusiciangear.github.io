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
  const aria = \`Nuestra nota: \${score} de 10\`;
  return \`<div class="guide-product-card-score-container" role="img" aria-label="\${aria}" style="position:absolute;top:12px;left:12px;z-index:3;width:72px;height:72px;border-radius:50%;background:rgba(10,20,44,.8);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.25);box-shadow:0 4px 14px rgba(0,20,60,.35);display:flex;align-items:center;justify-content:center;">
    <svg width="72" height="72" viewBox="0 0 72 72" style="transform:rotate(-90deg);">
      <circle class="guide-product-card-score-circle-bg" cx="36" cy="36" r="31" fill="none" stroke="rgba(255,255,255,.18)" stroke-width="5"/>
      <circle class="guide-product-card-score-circle-progress" cx="36" cy="36" r="31" fill="none" stroke="#40A4FF" stroke-width="5" stroke-linecap="round" stroke-dasharray="\${circumference}" stroke-dashoffset="\${offset}" style="transition:stroke-dashoffset 600ms ease-out;"/>
    </svg>
    <div style="text-align:center;line-height:1.1;">
      <div style="font-size:26px;font-weight:700;color:#fff;">\${score}</div>
      <div style="font-size:9px;font-weight:700;letter-spacing:.15em;color:#AACDFA;">NOTA</div>
    </div>
  </div>\`;
}

`;

// Insert before productCard
const insertPos = s.indexOf('function productCard(p, lang)');
if (insertPos >= 0) {
  s = s.slice(0, insertPos) + scoreBadgeFn + s.slice(insertPos);
  console.log('scoreBadge function inserted');
} else {
  console.log('ERROR: productCard not found');
  process.exit(1);
}

// Now update productCard to include scoreBadge
const oldCard = '    <div class="guide-product-card-img"><img src="${(p.img||"").startsWith(\'http\') ? p.img : \'../\' + p.img}" alt="${title}" loading="lazy" class="lb-img" style="cursor:zoom-in"><button type="button" class="guide-product-card-share" aria-label="Share" title="Share" onclick="event.stopPropagation();shareProduct(this)"><svg data-fa="share-nodes" class="icon fa-solid fa-share-nodes" viewBox="0 0 448 512" width="1em" height="1em" fill="currentColor"><path d="M352 224c53 0 96-43 96-96s-43-96-96-96s-96 43-96 96c0 4 .2 8 .7 11.9l-94.1 47C145.4 170.2 121.9 160 96 160c-53 0-96 43-96 96s43 96 96 96c25.9 0 49.4-10.2 66.6-26.9l94.1 47c-.5 3.9-.7 7.8-.7 11.9c0 53 43 96 96 96s96-43 96-96s-43-96-96-96c-25.9 0-49.4 10.2-66.6 26.9l94.1 47c-.5 3.9-.7 7.8-.7 11.9s-.2-8-.7-11.9l94.1-47C302.6 213.8 326.1 224 352 224z"/></svg></button></div>';

const newCard = '    <div class="guide-product-card-img"><img src="${(p.img||"").startsWith(\'http\') ? p.img : \'../\' + p.img}" alt="${title}" loading="lazy" class="lb-img" style="cursor:zoom-in"><button type="button" class="guide-product-card-share" aria-label="Share" title="Share" onclick="event.stopPropagation();shareProduct(this)"><svg data-fa="share-nodes" class="icon fa-solid fa-share-nodes" viewBox="0 0 448 512" width="1em" height="1em" fill="currentColor"><path d="M352 224c53 0 96-43 96-96s-43-96-96-96s-96 43-96 96c0 4 .2 8 .7 11.9l-94.1 47C145.4 170.2 121.9 160 96 160c-53 0-96 43-96 96s43 96 96 96c25.9 0 49.4-10.2 66.6-26.9l94.1 47c-.5 3.9-.7 7.8-.7 11.9c0 53 43 96 96 96s96-43 96-96s-43-96-96-96c-25.9 0-49.4 10.2-66.6 26.9l94.1 47c-.5 3.9-.7 7.8-.7 11.9s-.2-8-.7-11.9l94.1-47C302.6 213.8 326.1 224 352 224z"/></svg></button>${scoreBadge(p)}</div>';

if (s.indexOf(oldCard) >= 0) {
  s = s.replace(oldCard, newCard);
  console.log('productCard updated with scoreBadge');
} else {
  console.log('ERROR: oldCard pattern not found');
  process.exit(1);
}

fs.writeFileSync(f, s, 'utf8');
console.log('build-guides.js actualizado');