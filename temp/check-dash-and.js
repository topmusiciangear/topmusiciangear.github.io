var fs = require('fs');
var g = JSON.parse(fs.readFileSync('data/guides.json','utf8'));

// Search for ALL " — and " patterns
var found = 0;
g.forEach(guide => {
  ['intro', 'conclusion', 'intro_es', 'conclusion_es'].forEach(f => {
    if (guide[f] && guide[f].includes(' — and ')) {
      found++;
      var idx = guide[f].indexOf(' — and ');
      console.log(guide.id + ' ' + f + ': ...' + guide[f].substring(Math.max(0,idx-40), idx+50) + '...');
    }
  });
  guide.sections.forEach((s, i) => {
    ['content', 'content_es'].forEach(f => {
      if (s[f] && s[f].includes(' — and ')) {
        found++;
        var idx = s[f].indexOf(' — and ');
        console.log(guide.id + ' sec' + i + ' ' + f + ': ...' + s[f].substring(Math.max(0,idx-40), idx+50) + '...');
      }
    });
  });
});

console.log();
console.log('Total " — and " remaining: ' + found);

// Also check for " — the " which is another common pattern
var dashThe = 0;
g.forEach(guide => {
  ['intro', 'conclusion', 'intro_es', 'conclusion_es'].forEach(f => {
    if (guide[f]) dashThe += (guide[f].match(/ — the /g) || []).length;
  });
  guide.sections.forEach(s => {
    ['content', 'content_es'].forEach(f => {
      if (s[f]) dashThe += (s[f].match(/ — the /g) || []).length;
    });
  });
});
console.log('Total " — the " remaining: ' + dashThe);

// Count ALL remaining em-dashes
var totalDash = 0;
g.forEach(guide => {
  ['intro', 'conclusion', 'intro_es', 'conclusion_es'].forEach(f => {
    if (guide[f]) totalDash += (guide[f].match(/ — /g) || []).length;
  });
  guide.sections.forEach(s => {
    ['content', 'content_es'].forEach(f => {
      if (s[f]) totalDash += (s[f].match(/ — /g) || []).length;
    });
  });
});
console.log('Total em-dashes remaining: ' + totalDash);
