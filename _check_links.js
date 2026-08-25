const fs = require('fs');
const g = JSON.parse(fs.readFileSync('data/guides.json','utf8'));

['beginner-bass-guitars','portable-interfaces','guitar-pedals'].forEach(id => {
  const guide = g.find(x => x.id === id);
  console.log('=== ' + id + ' ===');
  guide.sections.forEach((s,i) => {
    if (!s.content) return;
    // Find all <a href links that DON'T have guide-link-btn
    const re = /<a href="([^"]+)"[^>]*>([^<]+)<\/a>/g;
    let m;
    while ((m = re.exec(s.content)) !== null) {
      if (!s.content.substring(m.index - 30, m.index).includes('guide-link-btn')) {
        console.log('  section ' + i + ': ' + m[0].substring(0, 150));
      }
    }
  });
});
