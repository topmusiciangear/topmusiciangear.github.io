var fs = require('fs');
var g = JSON.parse(fs.readFileSync('data/guides.json','utf8'));

// Find ALL " — and " patterns
var fixed = 0;
var samples = [];

g.forEach(guide => {
  ['intro', 'conclusion', 'intro_es', 'conclusion_es'].forEach(f => {
    if (!guide[f]) return;
    var before = guide[f];
    // " — and " → ", and "
    guide[f] = guide[f].replace(/ — and /g, ', and ');
    if (guide[f] !== before) {
      fixed++;
      samples.push(guide.id + ' ' + f);
    }
  });

  guide.sections.forEach((s, i) => {
    ['content', 'content_es'].forEach(f => {
      if (!s[f]) return;
      var before = s[f];
      s[f] = s[f].replace(/ — and /g, ', and ');
      if (s[f] !== before) {
        guide.sections[i][f] = s[f];
        fixed++;
        samples.push(guide.id + ' sec' + i + ' ' + f);
      }
    });
  });
});

console.log('Fixed " — and ": ' + fixed);
console.log('Locations:');
samples.forEach(s => console.log('  ' + s));

fs.writeFileSync('data/guides.json', JSON.stringify(g, null, 2), 'utf8');
