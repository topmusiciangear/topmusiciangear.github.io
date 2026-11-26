const fs = require('fs');
const guides = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));

['best-digital-mixers', 'best-electric-guitar'].forEach(function(id) {
  const g = guides.find(x => x.id === id);
  console.log('=== ' + id + ' ===');
  g.sections.forEach(function(s, si) {
    if (!s.content) return;
    const text = s.content;
    const linkRegex = /<a class="guide-link-btn" href="([^"]*?)">([^<]+)<\/a>/g;
    const matches = [];
    let m;
    while ((m = linkRegex.exec(text)) !== null) {
      matches.push({ url: m[1], title: m[2] });
    }
    // Find duplicates
    const urlCounts = {};
    matches.forEach(l => { urlCounts[l.url] = (urlCounts[l.url] || 0) + 1; });
    Object.keys(urlCounts).forEach(url => {
      if (urlCounts[url] > 1) {
        console.log('  Section ' + si + ': DUPLICATE ' + url + ' (' + urlCounts[url] + ' times)');
        matches.filter(l => l.url === url).forEach(l => console.log('    - ' + l.title));
      }
    });
  });
});