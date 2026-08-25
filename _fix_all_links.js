const fs = require('fs');
const g = JSON.parse(fs.readFileSync('data/guides.json','utf8'));
const hubIds = ['best-electric-guitar','beginner-guitar','beginner-bass-guitars','best-interface','portable-interfaces','streaming-interfaces','best-monitors','best-headphones','open-headphones','best-drum-machine','best-samplers-drum-computers','best-plugins','guitar-bass-amps','guitar-pedals','live-sound-pa','best-digital-mixers','daw-guide','mics-for-creators','best-mic-for-podcasting','best-keyboard'];

let totalFixed = 0;

hubIds.forEach(id => {
  const guide = g.find(x => x.id === id);
  
  guide.sections.forEach((s, i) => {
    ['content', 'content_es'].forEach(field => {
      if (!s[field]) return;
      let text = s[field];
      
      // Find all <a href="/guides/..."> links without guide-link-btn
      const regex = /<a\s+href="\/guides\/[^"]+">/g;
      let match;
      let fixed = 0;
      
      while ((match = regex.exec(text)) !== null) {
        const link = match[0];
        if (!link.includes('guide-link-btn')) {
          const fixedLink = link.replace('<a href=', '<a class="guide-link-btn" href=');
          text = text.substring(0, match.index) + fixedLink + text.substring(match.index + link.length);
          fixed++;
          totalFixed++;
        }
      }
      
      if (fixed > 0) {
        s[field] = text;
        console.log(id, 'section', i, field, ': fixed', fixed, 'links');
      }
    });
  });
});

fs.writeFileSync('data/guides.json', JSON.stringify(g,null,2),'utf8');
console.log('Total links fixed:', totalFixed);
