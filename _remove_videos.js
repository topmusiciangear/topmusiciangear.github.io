const fs = require('fs');
const g = JSON.parse(fs.readFileSync('data/guides.json','utf8'));
let removed = 0;
const regex = /<div class="guide-video-thumb[^"]*"[^>]*>[\s\S]*?<\/div>/g;
const regex2 = /<div class="guide-video-placeholder"[^>]*><\/div>/g;
g.forEach(h => {
  if(h.sections) h.sections.forEach(s => {
    if(s.content && s.content.includes('guide-video')){
      const before = s.content.length;
      s.content = s.content.replace(regex, '');
      s.content = s.content.replace(regex2, '');
      if(s.content.length !== before) removed++;
    }
    if(s.content_es && s.content_es.includes('guide-video')){
      const before = s.content_es.length;
      s.content_es = s.content_es.replace(regex, '');
      s.content_es = s.content_es.replace(regex2, '');
      if(s.content_es.length !== before) removed++;
    }
  });
});
fs.writeFileSync('data/guides.json', JSON.stringify(g,null,2));
console.log('Videos removed from', removed, 'sections');

// Verify
const g2 = JSON.parse(fs.readFileSync('data/guides.json','utf8'));
let remaining = 0;
g2.forEach(h => {
  if(h.sections) h.sections.forEach(s => {
    if(s.content && s.content.includes('guide-video')) remaining++;
    if(s.content_es && s.content_es.includes('guide-video')) remaining++;
  });
});
console.log('Remaining video refs:', remaining);
