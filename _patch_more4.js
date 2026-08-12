const fs = require('fs');
const p = 'js/app.min.js';
let s = fs.readFileSync(p, 'utf8');

const old1 = 'function renderGuideGrid(){currentGuideId=null;const e=document.getElementById("backToGuidesBtn");e&&(e.style.display="");const a=document.getElementById("guideGrid")';
const new1 = 'function renderGuideGrid(){currentGuideId=null;const a=document.getElementById("guideGrid")';
if (!s.includes(old1)) { console.error('OLD1 NOT FOUND'); process.exit(1); }
s = s.replace(old1, new1);

const old2 = 'document.getElementById("guideMoreWrap")&&(document.getElementById("guideMoreWrap").style.display="none")';
const new2 = 'document.getElementById("guideMoreWrap")&&(document.getElementById("guideMoreWrap").style.display="none"),document.getElementById("backToGuidesBtn")&&(document.getElementById("backToGuidesBtn").style.display="none")';
if (!s.includes(old2)) { console.error('OLD2 NOT FOUND'); process.exit(1); }
s = s.replace(old2, new2);

const old3 = 'document.getElementById("guideMoreWrap")&&(document.getElementById("guideMoreWrap").style.display="none")';
// after the first replacement, the no-results branch now has the new2 text; the final else branch still uses old3 pattern once.
const new3 = 'document.getElementById("guideMoreWrap")&&(document.getElementById("guideMoreWrap").style.display="none");const q=document.getElementById("backToGuidesBtn");q&&(q.style.display="all"===currentCategory&&h.length<=guideVisibleCount?"":"none")';
if (!s.includes(old3)) { console.error('OLD3 NOT FOUND'); process.exit(1); }
s = s.replace(old3, new3);

fs.writeFileSync(p, s);
console.log('patched OK');
let i = s.indexOf('function renderGuideGrid');
console.log(s.slice(i, i + 400));
