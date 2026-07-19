var fs = require('fs');
var g = require('./data/guides.json');

function truncateToSentence(str, maxLen) {
  if (!str || str.length <= maxLen) return str;
  var cut = str.slice(0, maxLen);
  // find last sentence end within range
  var last = -1;
  for (var i = 0; i < cut.length; i++) {
    if (cut[i] === '.' || cut[i] === '!' || cut[i] === '?') {
      last = i;
    }
  }
  if (last > maxLen * 0.5) return str.slice(0, last + 1);
  // extend to next sentence end
  var rest = str.slice(maxLen);
  for (var j = 0; j < rest.length; j++) {
    if (rest[j] === '.' || rest[j] === '!' || rest[j] === '?') {
      return str.slice(0, maxLen + j + 1);
    }
  }
  return str;
}

g.forEach(function(guide) {
  if (guide.intro) guide.intro = truncateToSentence(guide.intro, 200);
  if (guide.intro_es) guide.intro_es = truncateToSentence(guide.intro_es, 200);
});

fs.writeFileSync('data/guides.json', JSON.stringify(g, null, 2), 'utf8');
console.log('done');
