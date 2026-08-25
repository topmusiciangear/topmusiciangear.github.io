const fs = require('fs');
const g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
let total = 0;
g.forEach(h => {
  const fix = (t) => {
    if (!t) return t;
    return t.replace(/<a\s+href="([^"]+)"((?!class=)[^>]*)>/g, (m, url, rest) => {
      if (m.includes('guide-link-btn')) return m;
      return `<a href="${url}"${rest} class="guide-link-btn">`;
    });
  };
  ['intro','conclusion','conclusion_es'].forEach(f => {
    const before = h[f];
    if (h[f]) h[f] = fix(h[f]);
    if (h[f] !== before) total++;
  });
  h.sections.forEach(s => {
    ['content','content_es'].forEach(f => {
      const before = s[f];
      if (s[f]) s[f] = fix(s[f]);
      if (s[f] !== before) total++;
    });
  });
});
fs.writeFileSync('data/guides.json', JSON.stringify(g, null, 2));
console.log('Fixed:', total);
