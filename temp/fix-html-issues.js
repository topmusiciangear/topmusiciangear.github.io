var fs = require('fs');
var g = JSON.parse(fs.readFileSync('data/guides.json','utf8'));

var fixed = 0;

// Fix unclosed <p> tags - add </p> at end of section content where missing
g.forEach((guide, gi) => {
  guide.sections.forEach((s, si) => {
    ['content', 'content_es'].forEach(f => {
      if (!s[f]) return;
      var text = s[f];
      var pOpen = (text.match(/<p>/g)||[]).length;
      var pClose = (text.match(/<\/p>/g)||[]).length;
      if (pOpen > pClose) {
        var missing = pOpen - pClose;
        for(var i = 0; i < missing; i++) {
          text += '</p>';
        }
        g[gi].sections[si][f] = text;
        fixed++;
      }
    });
  });
});

// Fix duplicate words
function fixDup(text, word) {
  var re = new RegExp('\\b(' + word + ')\\s+\\1\\b', 'gi');
  return text.replace(re, '$1');
}

g.forEach((guide, gi) => {
  ['intro','conclusion','intro_es','conclusion_es'].forEach(f => {
    if(!guide[f]) return;
    var orig = guide[f];
    guide[f] = fixDup(guide[f], 'value');
    guide[f] = fixDup(guide[f], 'the');
    if(guide[f] !== orig) fixed++;
  });
  guide.sections.forEach((s, si) => {
    ['content','content_es'].forEach(f => {
      if(!s[f]) return;
      var orig = s[f];
      g[gi].sections[si][f] = fixDup(s[f], 'value');
      g[gi].sections[si][f] = fixDup(g[gi].sections[si][f], 'the');
      if(g[gi].sections[si][f] !== orig) fixed++;
    });
  });
});

// Fix "s S" duplicate pattern
g.forEach((guide, gi) => {
  ['intro','conclusion','intro_es','conclusion_es'].forEach(f => {
    if(!guide[f]) return;
    if(guide[f].includes('s S')) {
      g[gi][f] = guide[f].replace(/s S/g, 's');
      fixed++;
    }
  });
  guide.sections.forEach((s, si) => {
    ['content','content_es'].forEach(f => {
      if(!s[f]) return;
      if(s[f].includes('s S')) {
        g[gi].sections[si][f] = s[f].replace(/s S/g, 's');
        fixed++;
      }
    });
  });
});

fs.writeFileSync('data/guides.json', JSON.stringify(g, null, 2), 'utf8');
console.log('Fixes applied: ' + fixed);
