const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const p = B + 'js/app.min.js';
let s = fs.readFileSync(p, 'utf8');
const helper = 'var GUIDE_PINNED_FIRST=["starter-studio"],GUIDE_CATEGORY_ORDER=["microphones","guitars","basses","strings","keyboards","interfaces","in_ear_monitors","monitors","headphones","drum-machine","plugins","tres","accessories","amps","pedals","live_sound","mixers","daw","streaming","production"];function guideSortRank(e){const a=GUIDE_PINNED_FIRST.indexOf(e.id);if(a>-1)return-1000+a;const t=GUIDE_CATEGORY_ORDER.indexOf(e.category);return t>-1?t:999}function sortGuidesSessionOrder(e){return e.map((a,t)=>({g:a,i:t,r:guideSortRank(a)})).sort((a,t)=>a.r-t.r||a.i-t.i).map(a=>a.g)}';
if (s.includes('function sortGuidesSessionOrder')) {
  console.log('min ya parcheado');
} else {
  const anchor = 'function getFilteredGuides()';
  if (!s.includes(anchor)) { console.log('NO ENCONTRADO getFilteredGuides en min'); process.exit(1); }
  s = s.replace(anchor, helper + anchor);
  const i = s.indexOf(anchor);
  const j = s.indexOf('return e}', i);
  if (j < 0) { console.log('NO ENCONTRADO return e}'); process.exit(1); }
  s = s.slice(0, j) + 'return sortGuidesSessionOrder(e)}' + s.slice(j + 'return e}'.length);
  fs.writeFileSync(p, s, 'utf8');
  console.log('app.min.js parcheado');
}
new Function(fs.readFileSync(B + 'js/app.js', 'utf8').replace(/^\s*const translations|^\s*const languageNames/gm, ''));
console.log('app.js OK');
new Function(fs.readFileSync(p, 'utf8'));
console.log('app.min.js OK');