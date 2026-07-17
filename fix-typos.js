const fs = require('fs');
const guides = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));

let fixes = 0;
guides.forEach(g => {
  if (!g.featuredSnippet) return;
  Object.keys(g.featuredSnippet).forEach(k => {
    if (/^faq_a\d+_(en|es)$/.test(k)) {
      let val = g.featuredSnippet[k];
      let orig = val;
      val = val.replace(/\bca\b/g, 'can');
      val = val.replace(/\btha\b/g, 'than');
      if (val !== orig) {
        g.featuredSnippet[k] = val;
        fixes++;
        console.log(g.id + ' ' + k + ': "' + orig.substring(0,60) + '" -> "' + val.substring(0,60) + '"');
      }
    }
  });
});

fs.writeFileSync('data/guides.json', JSON.stringify(guides, null, 2), 'utf8');
console.log('\nTotal fixes: ' + fixes);
