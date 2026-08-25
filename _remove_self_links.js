const fs = require('fs');
const g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));

let removed = 0;
g.forEach(h => {
  h.sections.forEach((s, si) => {
    ['content', 'content_es'].forEach(field => {
      if (!s[field]) return;
      // Remove <a ... href="/guides/HUB_ID.html" ...>...</a> buttons
      const re = new RegExp('<a[^>]*href="/guides/' + h.id + '\\.html"[^>]*>[^<]*</a>', 'gi');
      const matches = s[field].match(re);
      if (matches) {
        matches.forEach(m => {
          console.log(`${h.id} sec${si} ${field}: removing "${m.substring(0, 80)}..."`);
          removed++;
        });
        s[field] = s[field].replace(re, '');
        // Clean up any double spaces left behind
        s[field] = s[field].replace(/  +/g, ' ');
      }
    });
  });
});

fs.writeFileSync('data/guides.json', JSON.stringify(g, null, 2));
console.log(`\nTotal self-link buttons removed: ${removed}`);
