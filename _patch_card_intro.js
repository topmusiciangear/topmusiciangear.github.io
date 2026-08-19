const fs = require('fs');
const p = 'js/app.min.js';
let j = fs.readFileSync(p, 'utf8');

const oldAssign = 'n="es"===currentLang&&a.intro_es?a.intro_es:a.intro';
if (!j.includes(oldAssign)) {
  console.log('assign pattern NOT found, searching...');
  const i = j.indexOf('guide-card-intro');
  console.log(JSON.stringify(j.substring(i - 400, i)));
  throw new Error('card intro assign not found');
}
j = j.replace(oldAssign, 'n=getCardIntro(a)');

const fn = `function getCardIntro(e){const t="es"===currentLang&&e.intro_es?e.intro_es:e.intro;let r=t.replace(/<table[\\s\\S]*?<\\/table>/g," ").replace(/<[^>]*>/g," ").replace(/&nbsp;/g," ").replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/\\s+/g," ").trim();return r.length>140?r.substring(0,140)+"…":r}`;

const anchor = 'function renderGuideGrid(';
const ai = j.indexOf(anchor);
if (ai < 0) throw new Error('renderGuideGrid not found');
j = j.slice(0, ai) + fn + '\n' + j.slice(ai);

fs.writeFileSync(p, j, 'utf8');
console.log('app.min.js card intro patch applied');