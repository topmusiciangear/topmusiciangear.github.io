const fs = require('fs');
const g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));

let count = 0;
g.forEach(h => {
  h.sections.forEach((s, si) => {
    ['textEN', 'textES'].forEach(f => {
      const text = s[f] || '';
      // Find all href="..." links
      const re = /href="([^"]*)"/gi;
      let m;
      while ((m = re.exec(text)) !== null) {
        const href = m[1];
        // Check if it links to the same hub
        if (href.includes('/' + h.id + '.html') || href === h.id + '.html' || href === '/' + h.id + '.html') {
          console.log(`${h.id} sec${si} ${f}: ${m[0]}`);
          count++;
        }
      }
    });
    // Also check links array
    if (s.links) {
      s.links.forEach(l => {
        if (l.href && (l.href.includes('/' + h.id + '.html') || l.href === h.id + '.html')) {
          console.log(`${h.id} sec${si} links[]: ${l.text} → ${l.href}`);
          count++;
        }
      });
    }
  });
});
console.log(`\nTotal self-links found: ${count}`);
