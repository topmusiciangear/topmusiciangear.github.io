const fs = require('fs');
const p = 'js/app.min.js';
let s = fs.readFileSync(p, 'utf8');
const old = 'function loadMoreGuides(){guideVisibleCount+=guidePageSize,renderGuideGrid();const e=document.getElementById("guideMoreWrap");e&&e.scrollIntoView({block:"nearest",behavior:"smooth"})}';
const neu = 'function loadMoreGuides(){const t=document.getElementById("guideMoreWrap"),e=t?t.getBoundingClientRect().top:null,n=window.pageYOffset||document.documentElement.scrollTop;guideVisibleCount+=guidePageSize,renderGuideGrid();if(t&&null!==e){const o=t.getBoundingClientRect().top;window.scrollTo(0,n+(o-e))}}';
if (!s.includes(old)) { console.error('OLD NOT FOUND'); process.exit(1); }
s = s.replace(old, neu);
fs.writeFileSync(p, s);
console.log('patched OK');
console.log(s.slice(s.indexOf('function loadMoreGuides'), s.indexOf('function loadMoreGuides') + 320));
