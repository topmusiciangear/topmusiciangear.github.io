const fs = require('fs');
const g = JSON.parse(fs.readFileSync('data/guides.json','utf8'));
const hubIds = ['best-electric-guitar','beginner-guitar','beginner-bass-guitars','best-interface','portable-interfaces','streaming-interfaces','best-monitors','best-headphones','open-headphones','best-drum-machine','best-samplers-drum-computers','best-plugins','guitar-bass-amps','guitar-pedals','live-sound-pa','best-digital-mixers','daw-guide','mics-for-creators','best-mic-for-podcasting','best-keyboard'];

let totalFixed = 0;

hubIds.forEach(id => {
  const hub = g.find(x => x.id === id);
  
  // Fix conclusion links
  ['conclusion', 'conclusion_es'].forEach(field => {
    if (!hub[field]) return;
    const regex = /<a\s+href="\/guides\/[^"]+">/g;
    let match;
    while ((match = regex.exec(hub[field])) !== null) {
      if (!match[0].includes('guide-link-btn')) {
        hub[field] = hub[field].replace(match[0], match[0].replace('<a href=', '<a class="guide-link-btn" href='));
        totalFixed++;
        console.log(id, field, ': fixed conclusion link');
      }
    }
  });
  
  // Fix intro links
  ['intro', 'intro_es'].forEach(field => {
    if (!hub[field]) return;
    const regex = /<a\s+href="\/guides\/[^"]+">/g;
    let match;
    while ((match = regex.exec(hub[field])) !== null) {
      if (!match[0].includes('guide-link-btn')) {
        hub[field] = hub[field].replace(match[0], match[0].replace('<a href=', '<a class="guide-link-btn" href='));
        totalFixed++;
        console.log(id, field, ': fixed intro link');
      }
    }
  });
});

fs.writeFileSync('data/guides.json', JSON.stringify(g,null,2),'utf8');
console.log('Total fixed:', totalFixed);
