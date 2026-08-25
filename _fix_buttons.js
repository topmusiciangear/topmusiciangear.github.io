const fs = require('fs');
const g = JSON.parse(fs.readFileSync('data/guides.json','utf8'));
let capFix = 0;
let punctFix = 0;

g.forEach(hub => {
  // Fix sections
  hub.sections.forEach(s => {
    ['content','content_es'].forEach(f => {
      if (!s[f]) return;
      // Capitalize first letter after guide-link-btn
      s[f] = s[f].replace(/(guide-link-btn[^>]*>)([a-z])/g, (m, tag, letter) => {
        capFix++;
        return tag + letter.toUpperCase();
      });
      // Remove commas/periods before </a>
      s[f] = s[f].replace(/[,\.]\s*<\/a>/g, (m) => {
        punctFix++;
        return '</a>';
      });
    });
  });
  // Fix intro, conclusion
  ['intro','intro_es','conclusion','conclusion_es'].forEach(f => {
    if (!hub[f]) return;
    hub[f] = hub[f].replace(/(guide-link-btn[^>]*>)([a-z])/g, (m, tag, letter) => {
      capFix++;
      return tag + letter.toUpperCase();
    });
    hub[f] = hub[f].replace(/[,\.]\s*<\/a>/g, (m) => {
      punctFix++;
      return '</a>';
    });
  });
});

fs.writeFileSync('data/guides.json', JSON.stringify(g,null,2),'utf8');
console.log('Capital fixes:', capFix, '| Punctuation fixes:', punctFix);
