const fs = require('fs');
const g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));

g.forEach(h => {
  h.sections.forEach((s, si) => {
    if (s.links) {
      s.links.forEach((l, li) => {
        if (l.href && l.href.includes('/' + h.id + '.html')) {
          console.log(`${h.id} sec${si} links[${li}]: "${l.text}" → ${l.href}`);
        }
      });
    }
    // Check all string fields for self-links
    Object.keys(s).forEach(key => {
      if (typeof s[key] === 'string') {
        const re = new RegExp('href="[^"]*' + h.id + '\\.html[^"]*"', 'gi');
        const matches = s[key].match(re);
        if (matches) {
          console.log(`${h.id} sec${si} ${key}: ${matches.join(', ')}`);
        }
      }
    });
  });
});
