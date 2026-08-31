var fs = require('fs');
var g = JSON.parse(fs.readFileSync('data/guides.json','utf8'));
var fixed = 0;

// Fix " — y " → ", y " (Spanish "and" after dash)
g.forEach(guide => {
  guide.sections.forEach((s, i) => {
    ['content_es', 'intro_es', 'conclusion_es'].forEach(f => {
      var target = f.startsWith('conclusion') ? guide : s;
      var key = f.startsWith('conclusion') ? f : null;
      var text = key ? guide[key] : s[f.replace('_es','') + (f.includes('_es') ? '_es' : '')] || s[f];
      if (!text) return;
      if (text.includes(' — y ')) {
        var before = text;
        text = text.replace(/ — y /g, ', y ');
        if (key) { guide[key] = text; }
        else { s[f] = text; }
        fixed++;
      }
    });
  });
});

// Also fix in intro_es and conclusion_es
g.forEach(guide => {
  ['intro_es', 'conclusion_es'].forEach(f => {
    if (guide[f] && guide[f].includes(' — y ')) {
      guide[f] = guide[f].replace(/ — y /g, ', y ');
      fixed++;
    }
  });
});

// Fix " — para " → ", para " where it's in a list context
g.forEach(guide => {
  guide.sections.forEach((s, i) => {
    ['content_es'].forEach(f => {
      if (s[f] && s[f].includes(' — para ')) {
        // Only replace if it's in a list (after a comma or in a series)
        var before = s[f];
        s[f] = s[f].replace(/ — para /g, ', para ');
        if (s[f] !== before) {
          guide.sections[i][f] = s[f];
          fixed++;
        }
      }
    });
  });
});

// Fix " — sin " → ", sin " where it's in a list
g.forEach(guide => {
  guide.sections.forEach((s, i) => {
    ['content_es'].forEach(f => {
      if (s[f] && s[f].includes(' — sin ')) {
        var before = s[f];
        s[f] = s[f].replace(/ — sin /g, ', sin ');
        if (s[f] !== before) {
          guide.sections[i][f] = s[f];
          fixed++;
        }
      }
    });
  });
});

// Fix " — debería " → ". Debería " (should be new sentence)
g.forEach(guide => {
  guide.sections.forEach((s, i) => {
    ['content', 'content_es'].forEach(f => {
      if (s[f] && s[f].includes(' — debería ')) {
        var before = s[f];
        s[f] = s[f].replace(/ — debería /g, '. Debería ');
        if (s[f] !== before) {
          guide.sections[i][f] = s[f];
          fixed++;
        }
      }
    });
  });
});

// Fix " — debería " in EN too
g.forEach(guide => {
  guide.sections.forEach((s, i) => {
    ['content'].forEach(f => {
      if (s[f] && s[f].includes(' — it should ')) {
        var before = s[f];
        s[f] = s[f].replace(/ — it should /g, '. It should ');
        if (s[f] !== before) {
          guide.sections[i][f] = s[f];
          fixed++;
        }
      }
    });
  });
});

// Fix " — then " → ". Then " (new sentence)
g.forEach(guide => {
  guide.sections.forEach((s, i) => {
    ['content', 'content_es'].forEach(f => {
      if (s[f] && s[f].includes(' — then ')) {
        var before = s[f];
        s[f] = s[f].replace(/ — then /g, '. Then ');
        if (s[f] !== before) {
          guide.sections[i][f] = s[f];
          fixed++;
        }
      }
    });
  });
});

fs.writeFileSync('data/guides.json', JSON.stringify(g, null, 2), 'utf8');
console.log('Fixes applied: ' + fixed);
