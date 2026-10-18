const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const f = B + 'build-guides.js';
let s = fs.readFileSync(f, 'utf8');

// Find scoreBadge function and fix the inner HTML order: text div FIRST, then SVG
const pos = s.indexOf('function scoreBadge(p)');
if (pos >= 0) {
  const endPos = s.indexOf('}', pos) + 1;
  const fn = s.slice(pos, endPos);
  
  // The current function has SVG first, then text div. Swap them.
  const fixedFn = fn.replace(
    '<svg width="72" height="72" viewBox="0 0 72 72" style="transform:rotate(-90deg);">',
    '<div style="text-align:center;line-height:1.1;position:relative;z-index:1;"><div style="font-size:26px;font-weight:700;color:#fff;">${score}</div><div style="font-size:9px;font-weight:700;letter-spacing:.15em;color:#AACDFA;">NOTA</div></div><svg width="72" height="72" viewBox="0 0 72 72" style="transform:rotate(-90deg);" aria-hidden="true">'
  ).replace(
    '</svg><div style="text-align:center;line-height:1.1;">',
    '</svg>'
  ).replace(
    '<div style="font-size:26px;font-weight:700;color:#fff;">${score}</div><div style="font-size:9px;font-weight:700;letter-spacing:.15em;color:#AACDFA;">NOTA</div></div></svg>',
    '</svg>'
  );
  
  if (fn !== fixedFn) {
    s = s.slice(0, pos) + fixedFn + s.slice(pos + (endPos - pos));
    console.log('scoreBadge function fixed: text first, SVG with aria-hidden');
  } else {
    console.log('No change needed');
  }
}

fs.writeFileSync(f, s, 'utf8');
console.log('build-guides.js actualizado');