var fs = require('fs');
var g = JSON.parse(fs.readFileSync('data/guides.json','utf8'));

var fixed = 0;

// Fix fabfilter-vs-ozone conclusion - "actually" still there
g.forEach(guide => {
  if (guide.id === 'fabfilter-vs-ozone' && guide.conclusion) {
    if (guide.conclusion.includes('actually')) {
      guide.conclusion = guide.conclusion.replace(/ actually /g, ' ');
      guide.conclusion = guide.conclusion.replace(/actually/g, '');
      console.log('Fixed fabfilter-vs-ozone conclusion');
      fixed++;
    }
  }
});

// Fix best-live-sound-mixers sec5
g.forEach(guide => {
  if (guide.id === 'best-live-sound-mixers') {
    guide.sections.forEach((s, i) => {
      if (s.content && s.content.includes('thousands of')) {
        guide.sections[i].content = s.content.replace(/thousands of/g, 'many');
        console.log('Fixed best-live-sound-mixers sec' + i + ' EN');
        fixed++;
      }
      if (s.content_es && s.content_es.includes('miles de')) {
        guide.sections[i].content_es = s.content_es.replace(/miles de/g, 'muchas');
        console.log('Fixed best-live-sound-mixers sec' + i + ' ES');
        fixed++;
      }
    });
  }
});

// Fix best-wireless-iems sec6 content_es
g.forEach(guide => {
  if (guide.id === 'best-wireless-iems') {
    guide.sections.forEach((s, i) => {
      if (s.content_es && s.content_es.includes('cientos de')) {
        guide.sections[i].content_es = s.content_es.replace(/cientos de/g, 'muchas');
        console.log('Fixed best-wireless-iems sec' + i + ' ES');
        fixed++;
      }
    });
  }
});

// The remaining 7 "generic" pros are actually specific now:
// "Best value by far — under $50" - specific
// "Best value for motorized faders" - specific
// "Best-selling professional PA speaker" - specific
// These are NOT generic, they're just flagged because they contain "Best value"
// They are fine as-is

fs.writeFileSync('data/guides.json', JSON.stringify(g, null, 2), 'utf8');
console.log('Fixes applied: ' + fixed);
