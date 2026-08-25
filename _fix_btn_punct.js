const fs = require('fs');
const g = JSON.parse(fs.readFileSync('data/guides.json','utf8'));
const hubIds = ['best-electric-guitar','beginner-guitar','beginner-bass-guitars','best-interface','portable-interfaces','streaming-interfaces','best-monitors','best-headphones','open-headphones','best-drum-machine','best-samplers-drum-computers','best-plugins','guitar-bass-amps','guitar-pedals','live-sound-pa','best-digital-mixers','daw-guide','mics-for-creators','best-mic-for-podcasting'];

let totalFixed = 0;
hubIds.forEach(id => {
  const hub = g.find(x => x.id === id);
  hub.sections.forEach((s,i) => {
    if (!s.content) return;
    let original = s.content;
    let fixed = s.content.replace(/(<\/a>)\s*[.,]\s*(<a\s+class="guide-link-btn")/g, '$1 $2');
    fixed = fixed.replace(/(<\/a>)\.?\s*(<a\s+class="guide-link-btn")/g, '$1 $2');
    if (fixed !== original) {
      s.content = fixed;
      totalFixed++;
      console.log(id, 'section', i, ': fixed');
    }
  });
});
fs.writeFileSync('data/guides.json', JSON.stringify(g,null,2),'utf8');
console.log('Total fixed:', totalFixed);
