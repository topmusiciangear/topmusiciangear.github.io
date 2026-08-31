var fs = require('fs');
var g = JSON.parse(fs.readFileSync('data/guides.json','utf8'));

// Find all " — WORD " patterns to see what's left
var patterns = {};
g.forEach(guide => {
  ['intro', 'conclusion', 'intro_es', 'conclusion_es'].forEach(f => {
    if (!guide[f]) return;
    var matches = guide[f].match(/ — [a-záéíóúñü]+ /g);
    if (matches) {
      matches.forEach(m => {
        m = m.trim();
        patterns[m] = (patterns[m] || 0) + 1;
      });
    }
  });
  guide.sections.forEach(s => {
    ['content', 'content_es'].forEach(f => {
      if (!s[f]) return;
      var matches = s[f].match(/ — [a-záéíóúñü]+ /g);
      if (matches) {
        matches.forEach(m => {
          m = m.trim();
          patterns[m] = (patterns[m] || 0) + 1;
        });
      }
    });
  });
});

console.log('=== " — WORD " PATTERNS ===');
Object.keys(patterns).sort((a,b) => patterns[b] - patterns[a]).forEach(p => {
  console.log(p + ': ' + patterns[p]);
});
