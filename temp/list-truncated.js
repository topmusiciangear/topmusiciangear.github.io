var fs = require('fs');
var g = JSON.parse(fs.readFileSync('data/guides.json','utf8'));

// Find all truncated sections
var truncated = [];
g.forEach((guide,gi)=>{
  guide.sections.forEach((s,j)=>{
    if(s.content_es && s.content_es.length > 50) {
      var last = s.content_es.trim().slice(-1);
      var endsClean = /[.!?'")\]>]/.test(last);
      if(!endsClean) {
        truncated.push({gi: gi, si: j, id: guide.id, enLen: s.content.length, esLen: s.content_es.length});
      }
    }
  });
});

// Group by guide
var byGuide = {};
truncated.forEach(t=>{
  if(!byGuide[t.id]) byGuide[t.id] = [];
  byGuide[t.id].push(t.si);
});

console.log('Total truncated: '+truncated.length);
console.log('Guides affected: '+Object.keys(byGuide).length);
console.log('\nGuides with truncated sections:');
Object.entries(byGuide).forEach(([id, sections])=>{
  console.log('  '+id+': sections '+sections.join(', '));
});
