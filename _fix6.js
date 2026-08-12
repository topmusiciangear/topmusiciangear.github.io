const fs = require('fs');
const p = 'js/app.min.js';
let s = fs.readFileSync(p, 'utf8');

const bad = ':a.innerHTML=`,document.getElementById("backToGuidesBtn")&&(document.getElementById("backToGuidesBtn").style.display="none"),document.getElementById("guideMoreWrap")&&(document.getElementById("guideMoreWrap").style.display="none")`,`<div class="no-results"><h3>';
const good = ':(document.getElementById("backToGuidesBtn").style.display="none",document.getElementById("guideMoreWrap").style.display="none",a.innerHTML=`<div class="no-results"><h3>';
if (!s.includes(bad)) { console.error('BAD NOT FOUND'); process.exit(1); }
s = s.replace(bad, good);

const badEnd = '${t("noGuidesDesc")}</p></div>`}';
const goodEnd = '${t("noGuidesDesc")}</p></div>`)`}';
if (!s.includes(badEnd)) { console.error('BADEND NOT FOUND'); process.exit(1); }
s = s.replace(badEnd, goodEnd);

fs.writeFileSync(p, s);
console.log('no-results branch fixed OK');