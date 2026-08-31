var fs = require('fs');
var g = JSON.parse(fs.readFileSync('data/guides.json','utf8'));
var fixed = 0;

// fabfilter-vs-ozone: "Actually Work" in related links
g.forEach(guide => {
  if (guide.id === 'fabfilter-vs-ozone') {
    if (guide.conclusion && guide.conclusion.includes('Actually Work')) {
      guide.conclusion = guide.conclusion.replace('Actually Work', 'Work Well');
      console.log('Fixed fabfilter-vs-ozone link title');
      fixed++;
    }
  }
});

// best-live-sound-mixers sec5: "Thousands of" / "Miles de"
g.forEach(guide => {
  if (guide.id === 'best-live-sound-mixers') {
    guide.sections.forEach((s, i) => {
      if (i === 5) {
        if (s.content && s.content.includes('Thousands of')) {
          guide.sections[i].content = s.content.replace('Thousands of', 'Many');
          console.log('Fixed best-live-sound-mixers sec5 EN');
          fixed++;
        }
        if (s.content_es && s.content_es.includes('Miles de')) {
          guide.sections[i].content_es = s.content_es.replace('Miles de', 'Muchas');
          console.log('Fixed best-live-sound-mixers sec5 ES');
          fixed++;
        }
      }
    });
  }
});

// best-wireless-iems sec6: "cientos de"
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

fs.writeFileSync('data/guides.json', JSON.stringify(g, null, 2), 'utf8');
console.log('Fixes applied: ' + fixed);
