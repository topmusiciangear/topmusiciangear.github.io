const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));

const map = {
  'mixing-plugins': {
    'SSL Mastering Bundle: The Console Glue That Defines Commercial Sound': [1037],
    'NUGEN Audio ISL 2st: The True-Peak Limiter for Broadcast and Streaming': [1038]
  },
  'vocal-plugins': {
    'RePitch 2 + VocAlign Pro Bundle: The Complete Vocal Production Powerhouse': [1039]
  }
};

Object.entries(map).forEach(([gid, sections]) => {
  const gd = guides.find(g => g.id === gid);
  Object.entries(sections).forEach(([heading, pids]) => {
    const s = gd.sections.find(s => s.heading === heading);
    if (s) { s.products = pids; console.log(gid + ' -> section "' + heading.substring(0,40) + '..." products=' + JSON.stringify(pids)); }
    else console.log('NOT FOUND: ' + heading);
  });
});

fs.writeFileSync(B + 'data/guides.json', JSON.stringify(guides, null, 2), 'utf8');
console.log('Done');
