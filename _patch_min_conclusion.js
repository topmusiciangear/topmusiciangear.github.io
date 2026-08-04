const fs = require('fs');
const p = 'js/app.min.js';
let j = fs.readFileSync(p, 'utf8');

if (j.includes('guide-conclusion-title')) {
  console.log('conclusion block already present, skipping');
} else {
  const anchor = 'userReviewsHtml(a)}\\n      ${';
  if (!j.includes(anchor)) throw new Error('conclusion anchor not found');
  const conclusionBlock = 'userReviewsHtml(a)}\\n      ${(()=>{const c=currentLang==="es"&&a.conclusion_es?a.conclusion_es:a.conclusion;return c?`<div class="guide-conclusion"><h2 class="guide-conclusion-title">Conclusion</h2><div class="guide-conclusion-content">${c}</div></div>`:""})()}\\n      ${';
  j = j.replace(anchor, conclusionBlock);
  fs.writeFileSync(p, j, 'utf8');
  console.log('conclusion block inserted');
}