var fs = require('fs');
var g = JSON.parse(fs.readFileSync('data/guides.json','utf8'));

// Show some examples of where em-dashes were replaced
var samples = [];
var count = 0;
g.forEach(guide => {
  guide.sections.forEach((s, i) => {
    ['content', 'content_es'].forEach(f => {
      if (!s[f] || count >= 8) return;
      // Find sentences with commas that might have been em-dash replacements
      var text = s[f].replace(/<[^>]*>/g, '');
      // Look for ", and " patterns that might be awkward
      var matches = text.match(/[^,]{20,}, and [a-z]/g);
      if (matches && matches.length > 0) {
        matches.forEach(m => {
          if (count < 8) {
            samples.push(guide.id + ' sec' + i + ': ...' + m.substring(0, 80) + '...');
            count++;
          }
        });
      }
    });
  });
});

console.log('=== EXAMPLES OF POTENTIALLY AWKWARD COMMA REPLACEMENTS ===');
samples.forEach(s => console.log(s));

// Show some good em-dash uses that remain
console.log();
console.log('=== EM-DASHES THAT REMAIN (good uses) ===');
var dashSamples = [];
var dashCount = 0;
g.forEach(guide => {
  guide.sections.forEach((s, i) => {
    ['content', 'content_es'].forEach(f => {
      if (!s[f] || dashCount >= 6) return;
      var text = s[f].replace(/<[^>]*>/g, '');
      if (text.includes(' — ')) {
        var idx = text.indexOf(' — ');
        var ctx = text.substring(Math.max(0, idx - 50), idx + 60);
        if (!dashSamples.includes(ctx)) {
          dashSamples.push(ctx);
          dashCount++;
        }
      }
    });
  });
});
dashSamples.forEach(s => console.log(s));

// Show link spacing examples
console.log();
console.log('=== LINK SPACING FIXED ===');
var linkSamples = [];
var linkCount = 0;
g.forEach(guide => {
  guide.sections.forEach((s, i) => {
    ['content', 'content_es'].forEach(f => {
      if (!s[f] || linkCount >= 3) return;
      if (s[f].includes('guide-link-btn') && s[f].includes(' > <a')) {
        var idx = s[f].indexOf(' > <a');
        linkSamples.push(guide.id + ' sec' + i + ': ...' + s[f].substring(Math.max(0, idx - 30), idx + 50) + '...');
        linkCount++;
      }
    });
  });
});
linkSamples.forEach(s => console.log(s));
