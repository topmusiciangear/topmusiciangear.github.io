var fs = require('fs');
var guides = fs.readdirSync('guides').filter(function(f) { return f.endsWith('.html') && !f.endsWith('_es.html'); });
var missingLinks = [];
guides.forEach(function(f) {
  var h = fs.readFileSync('guides/' + f, 'utf8');
  // Check for guide-related-list
  if (h.indexOf('guide-related-list') === -1) {
    missingLinks.push(f);
  }
});
console.log('Guides missing related links:', missingLinks.length);
if (missingLinks.length) console.log(missingLinks.join(', '));