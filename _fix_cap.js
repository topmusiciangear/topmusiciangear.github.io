const fs = require('fs');
const g = JSON.parse(fs.readFileSync('data/guides.json','utf8'));
const hubIds = ['best-electric-guitar','beginner-guitar','beginner-bass-guitars','best-interface','portable-interfaces','streaming-interfaces','best-monitors','best-headphones','open-headphones','best-drum-machine','best-samplers-drum-computers','best-plugins','guitar-bass-amps','guitar-pedals','live-sound-pa','best-digital-mixers','daw-guide','mics-for-creators','best-mic-for-podcasting','best-keyboard'];

let totalFixed = 0;

hubIds.forEach(id => {
  const hub = g.find(x => x.id === id);
  hub.sections.forEach((s,i) => {
    if (!s.content_es) return;
    // Find guide-link-btn links where text after </a> starts with lowercase
    // Pattern: >lowercase after _es.html">
    const regex = /(<a\s+class="guide-link-btn"\s+href="[^"]+_es\.html">)([a-z])/g;
    let match;
    while ((match = regex.exec(s.content_es)) !== null) {
      const old = match[0];
      const fixed = match[1] + match[2].toUpperCase();
      s.content_es = s.content_es.replace(old, fixed);
      totalFixed++;
      console.log(id, 'section', i, ': capitalized');
    }
  });
});

fs.writeFileSync('data/guides.json', JSON.stringify(g,null,2),'utf8');
console.log('Total capitalized:', totalFixed);
