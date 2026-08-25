const fs = require('fs');
const g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
let fixed = 0;
const fields = ['intro','conclusion','conclusion_es'];
g.forEach(h => {
  fields.forEach(f => {
    if (h[f]) {
      const before = h[f];
      h[f] = h[f].replace(/<a\s+href="\/guides\/([^"]+)"[^>]*>/g, (m, slug) => {
        if (m.includes('guide-link-btn')) return m;
        const textMatch = m.match(/>([^<]*)<\//);
        const text = textMatch ? textMatch[1] : slug;
        return `<a href="/guides/${slug}" class="guide-link-btn">`;
      });
      if (h[f] !== before) fixed++;
    }
  });
  h.sections.forEach(s => {
    ['content','content_es'].forEach(f => {
      if (s[f]) {
        const before = s[f];
        s[f] = s[f].replace(/<a\s+href="\/guides\/([^"]+)"[^>]*>/g, (m, slug) => {
          if (m.includes('guide-link-btn')) return m;
          return `<a href="/guides/${slug}" class="guide-link-btn">`;
        });
        if (s[f] !== before) fixed++;
      }
    });
  });
});
fs.writeFileSync('data/guides.json', JSON.stringify(g, null, 2));
console.log('Fixed fields:', fixed);
