const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const f = B + 'build-guides.js';
let s = fs.readFileSync(f, 'utf8');

// ============================================================
// BADGE: diseño exacto del usuario (viewBox 0 0 100 100, r=41, sw=6, pathLength=100, escala 5-10)
// ============================================================
const pos = s.indexOf('function scoreBadge(p)');
if (pos < 0) { console.log('ERROR: scoreBadge no encontrado'); process.exit(1); }
const endIdx = s.indexOf('\n}', pos) + 1;

const newFn = `function scoreBadge(p) {
  if (p.score === undefined || p.score === null) return '';
  var score = Number(p.score).toFixed(1);
  var pct = (Number(p.score) - 5) / 5 * 100;
  if (pct < 0) pct = 0;
  if (pct > 100) pct = 100;
  var aria = 'Nuestra nota: ' + score + ' sobre 10 (escala de 5 a 10)';
  return '<div style="position:absolute;top:12px;left:12px;z-index:3;width:var(--badge-size);height:var(--badge-size);border-radius:50%;background:rgba(10,20,44,.88);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.25);box-shadow:0 4px 14px rgba(0,20,60,.35);display:flex;align-items:center;justify-content:center;" role="img" aria-label="' + aria + '">' +
    '<svg width="100%" height="100%" viewBox="0 0 100 100" style="position:absolute;top:0;left:0;transform:rotate(-90deg);" aria-hidden="true">' +
      '<circle cx="50" cy="50" r="41" fill="none" stroke="rgba(255,255,255,.18)" stroke-width="6" pathLength="100" stroke-dasharray="100" stroke-dashoffset="100"/>' +
      '<circle cx="50" cy="50" r="41" fill="none" stroke="#40A4FF" stroke-width="6" stroke-linecap="round" pathLength="100" stroke-dasharray="' + pct + ' 100" stroke-dashoffset="0" style="transition:stroke-dashoffset 600ms ease-out;"/>' +
    '</svg>' +
    '<div style="position:relative;z-index:1;text-align:center;line-height:1.05;">' +
      '<div style="color:#fff;font-weight:800;font-size:calc(var(--badge-size)*0.34);letter-spacing:-.01em;">' + score + '</div>' +
      '<div style="color:#AACDFA;font-weight:800;font-size:calc(var(--badge-size)*0.11);letter-spacing:.12em;text-transform:uppercase;margin-top:.06em;">Nota</div>' +
    '</div>' +
  '</div>';
}`;

s = s.slice(0, pos) + newFn + s.slice(endIdx + 1);
console.log('scoreBadge reemplazado con diseño exacto del usuario');

// ============================================================
// SHARE BUTTON: mismo tamaño que badge, borde derecho
// ============================================================
// Buscar el botón share en productCard y reemplazar
const shareOld = 'width:28px;height:28px;display:inline-flex;align-items:center;justify-content:center;background:rgba(0,0,0,.55)';
const shareNew = 'width:var(--badge-size);height:var(--badge-size);display:inline-flex;align-items:center;justify-content:center;background:rgba(10,20,44,.88)';

// Dentro de productCard, el share tiene top:8px;right:8px -> top:12px;right:12px
const sharePos = s.indexOf('<button type="button" class="guide-product-card-share"');
if (sharePos >= 0) {
  const btnEnd = s.indexOf('</button>', sharePos);
  const btnHtml = s.slice(sharePos, btnEnd);
  // Cambiar posición: top:8px -> top:12px, right:8px -> right:12px
  var fixedBtn = btnHtml.replace('top:8px;right:8px', 'top:12px;right:12px');
  // Cambiar tamaño del contenedor
  fixedBtn = fixedBtn.replace('width:28px;height:28px', 'width:var(--badge-size);height:var(--badge-size)');
  // Cambiar fondo
  fixedBtn = fixedBtn.replace('background:rgba(0,0,0,.55)', 'background:rgba(10,20,44,.88);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.25);box-shadow:0 4px 14px rgba(0,20,60,.35)');
  // Cambiar icono: width 1em -> 45% del badge
  fixedBtn = fixedBtn.replace('width="1em" height="1em"', 'width="45%" height="45%"');
  s = s.slice(0, sharePos) + fixedBtn + s.slice(btnEnd);
  console.log('Share button: mismo tamaño que badge, top/right 12px, icono 45%');
}

fs.writeFileSync(f, s, 'utf8');
console.log('build-guides.js actualizado: badge + share button');