var fs = require('fs');
var file = 'data/guides.json';
var guides = JSON.parse(fs.readFileSync(file, 'utf8'));

var count = 0;
function cleanField(text) {
  if (!text) return text;
  var before = text.length;
  // Remove "You may also like:" and "Puede que también te guste:" before buttons
  text = text.replace(/<p>You may also like:\s*/gi, '<p>');
  text = text.replace(/<p>Puede que también te guste:\s*/gi, '<p>');
  text = text.replace(/You may also like:\s*/gi, '');
  text = text.replace(/Puede que también te guste:\s*/gi, '');
  // Remove standalone "You may also like" paragraph text
  text = text.replace(/<p>You may also like<\/p>/gi, '');
  text = text.replace(/<p>Puede que también te guste<\/p>/gi, '');
  if (text.length !== before) count++;
  return text;
}

guides.forEach(function(g) {
  if (g.sections) {
    g.sections.forEach(function(s) {
      ['content','content_es','conclusion','conclusion_es'].forEach(function(f) {
        s[f] = cleanField(s[f]);
      });
    });
  }
  ['conclusion','conclusion_es'].forEach(function(f) {
    g[f] = cleanField(g[f]);
  });
});

fs.writeFileSync(file, JSON.stringify(guides, null, 2), 'utf8');
console.log('Fixed ' + count + ' fields');
