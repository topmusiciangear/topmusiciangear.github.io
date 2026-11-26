const fs = require('fs');
const guides = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));

let totalFixed = 0;

function removeDuplicateUrls(text) {
  const linkRegex = /<a class="guide-link-btn" href="([^"]+)">([^<]+)<\/a>/g;
  const matches = [];
  let m;
  while ((m = linkRegex.exec(text)) !== null) {
    matches.push({ full: m[0], url: m[1], title: m[2], idx: m.index });
  }
  
  const seenUrls = new Set();
  const toRemove = [];
  matches.forEach(match => {
    if (seenUrls.has(match.url)) {
      toRemove.push(match);
    } else {
      seenUrls.add(match.url);
    }
  });
  
  // Remove from the end to preserve indices
  toRemove.sort((a, b) => b.idx - a.idx);
  let result = text;
  toRemove.forEach(match => {
    result = result.substring(0, match.idx) + result.substring(match.idx + match.full.length);
  });
  
  return { text: result, removed: toRemove.length };
}

['best-digital-mixers', 'best-electric-guitar'].forEach(function(id) {
  const g = guides.find(x => x.id === id);
  if (!g) return;
  g.sections.forEach(function(s, si) {
    ['content', 'content_es'].forEach(function(field) {
      if (!s[field]) return;
      const result = removeDuplicateUrls(s[field]);
      if (result.removed > 0) {
        s[field] = result.text;
        totalFixed += result.removed;
        console.log('Fixed: ' + id + ' ' + field + ' section ' + si + ' - removed ' + result.removed + ' duplicate(s)');
      }
    });
  });
});

fs.writeFileSync('data/guides.json', JSON.stringify(guides, null, 2), 'utf8');
console.log('\nTotal fixes:', totalFixed);