var fs = require('fs');
var g = JSON.parse(fs.readFileSync('data/guides.json','utf8'));

var emDash = 0, linkNoSpace = 0, linkPegado = 0;
g.forEach(guide => {
  guide.sections.forEach((s, i) => {
    ['content', 'content_es'].forEach(f => {
      if (!s[f]) return;
      emDash += (s[f].match(/ — /g) || []).length;
      if (/[a-zA-Z]<a class=/.test(s[f])) linkNoSpace++;
      linkPegado += (s[f].match(/<\/a><a/g) || []).length;
    });
  });
});

console.log('Em-dashes remaining: ' + emDash);
console.log('Links without space: ' + linkNoSpace);
console.log('Links pegados: ' + linkPegado);
