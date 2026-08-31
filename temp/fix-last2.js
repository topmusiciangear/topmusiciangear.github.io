var fs = require('fs');
var g = JSON.parse(fs.readFileSync('data/guides.json','utf8'));

// Fix fabfilter-vs-ozone conclusion
g.forEach(guide => {
  if (guide.id === 'fabfilter-vs-ozone' && guide.conclusion) {
    guide.conclusion = guide.conclusion.replace(/actually/g, '');
    console.log('Fixed fabfilter-vs-ozone conclusion');
  }
  
  // Fix best-live-sound-mixers sec5
  guide.sections.forEach((s, i) => {
    if (s.content && s.content.includes('thousands of')) {
      guide.sections[i].content = s.content.replace(/thousands of/g, 'many');
      console.log('Fixed ' + guide.id + ' sec' + i);
    }
  });
});

fs.writeFileSync('data/guides.json', JSON.stringify(g, null, 2), 'utf8');
console.log('Done');
