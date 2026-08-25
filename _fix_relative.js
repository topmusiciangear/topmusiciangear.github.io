const fs = require('fs');
const g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
g.forEach(h => {
  const checkField = (t, f) => {
    if (!t) return t;
    return t.replace(/href="budget-interfaces\.html"/g, 'href="/guides/budget-interfaces.html" class="guide-link-btn"')
            .replace(/href="budget-interfaces_es\.html"/g, 'href="/guides/budget-interfaces_es.html" class="guide-link-btn"');
  };
  ['intro','conclusion','conclusion_es'].forEach(f => {
    if (h[f]) h[f] = checkField(h[f], f);
  });
  h.sections.forEach(s => {
    ['content','content_es'].forEach(f => {
      if (s[f]) s[f] = checkField(s[f], f);
    });
  });
});
fs.writeFileSync('data/guides.json', JSON.stringify(g, null, 2));
console.log('Fixed relative links');
