const fs = require('fs');
const g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const guide = g.find(x => x.id === 'best-plugins');

const pidByHeading = {
  'FabFilter Pro-Q 4': 62,
  'FabFilter Pro-C 3': 63,
  'Soundtoys 5.5 Bundle': 32,
  'UAD Ultimate 14': 121
};

guide.sections.forEach(s => {
  const key = Object.keys(pidByHeading).find(k => (s.heading || '').includes(k));
  if (!key) return;
  const pid = pidByHeading[key];
  s.products = [pid];
  // Remove any manually injected img div (all used the wrong pluginboutique URL)
  if (s.content) s.content = s.content.replace(/^<div class="guide-section-imgs">[\s\S]*?<\/div><\/div>/, '');
  if (s.content_es) s.content_es = s.content_es.replace(/^<div class="guide-section-imgs">[\s\S]*?<\/div><\/div>/, '');
  console.log('Fixed section:', s.heading, '-> products [' + pid + '], manual img removed');
});

fs.writeFileSync('data/guides.json', JSON.stringify(g, null, 2) + '\n');
console.log('Done.');
