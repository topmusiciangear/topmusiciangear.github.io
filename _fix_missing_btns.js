const fs = require('fs');
const g = JSON.parse(fs.readFileSync('data/guides.json','utf8'));

const fixes = {
  'open-headphones': { 2: [[/(<a href="\/guides\/[^"]+">[^<]+<\/a>)/g, function(m) { return m.includes('guide-link-btn') ? m : m.replace(/<a href/, '<a class="guide-link-btn" href'); }]] },
  'best-plugins': { 1: [[/(<a href="\/guides\/[^"]+">[^<]+<\/a>)/g, function(m) { return m.includes('guide-link-btn') ? m : m.replace(/<a href/, '<a class="guide-link-btn" href'); }]] },
  'guitar-bass-amps': { 1: [[/(<a href="\/guides\/[^"]+">[^<]+<\/a>)/g, function(m) { return m.includes('guide-link-btn') ? m : m.replace(/<a href/, '<a class="guide-link-btn" href'); }]] },
  'live-sound-pa': { 1: [[/(<a href="\/guides\/[^"]+">[^<]+<\/a>)/g, function(m) { return m.includes('guide-link-btn') ? m : m.replace(/<a href/, '<a class="guide-link-btn" href'); }]] },
  'best-digital-mixers': { 1: [[/(<a href="\/guides\/[^"]+">[^<]+<\/a>)/g, function(m) { return m.includes('guide-link-btn') ? m : m.replace(/<a href/, '<a class="guide-link-btn" href'); }]] },
  'best-keyboard': { 0: [[/(<a href="\/guides\/[^"]+">[^<]+<\/a>)/g, function(m) { return m.includes('guide-link-btn') ? m : m.replace(/<a href/, '<a class="guide-link-btn" href'); }]],
                     1: [[/(<a href="\/guides\/[^"]+">[^<]+<\/a>)/g, function(m) { return m.includes('guide-link-btn') ? m : m.replace(/<a href/, '<a class="guide-link-btn" href'); }]],
                     2: [[/(<a href="\/guides\/[^"]+">[^<]+<\/a>)/g, function(m) { return m.includes('guide-link-btn') ? m : m.replace(/<a href/, '<a class="guide-link-btn" href'); }]] }
};

let fixed = 0;
Object.entries(fixes).forEach(([id, sections]) => {
  const guide = g.find(x => x.id === id);
  Object.entries(sections).forEach(([idx, regexes]) => {
    let content = guide.sections[parseInt(idx)].content;
    regexes.forEach(([regex, replacer]) => {
      content = content.replace(regex, replacer);
    });
    guide.sections[parseInt(idx)].content = content;
    fixed++;
    console.log('FIXED:', id, 'section', idx);
  });
});

fs.writeFileSync('data/guides.json', JSON.stringify(g,null,2),'utf8');
console.log('Total fixed:', fixed);
