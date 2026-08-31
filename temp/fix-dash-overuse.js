var fs = require('fs');
var g = JSON.parse(fs.readFileSync('data/guides.json','utf8'));
var fixed = 0;

// Fix the " —," error (em-dash before comma)
g.forEach(guide => {
  guide.sections.forEach((s, i) => {
    ['content', 'content_es'].forEach(f => {
      if (s[f] && s[f].includes(' —,')) {
        guide.sections[i][f] = s[f].replace(/ —,/g, ',');
        console.log('Fixed " —," in ' + guide.id + ' sec' + i);
        fixed++;
      }
    });
  });
});

// For sections with 3+ em-dashes, replace the LEAST important ones
// Strategy: keep dashes that introduce new clauses, replace dashes in lists
g.forEach(guide => {
  ['intro', 'conclusion', 'intro_es', 'conclusion_es'].forEach(f => {
    if (!guide[f]) return;
    var before = guide[f];
    var count = (guide[f].match(/ — /g) || []).length;
    if (count >= 3) {
      // Replace " — each " with ", each "
      guide[f] = guide[f].replace(/ — each /g, ', each ');
      // Replace " — both " with ", both "
      guide[f] = guide[f].replace(/ — both /g, ', both ');
      // Replace " — just " with ", just "
      guide[f] = guide[f].replace(/ — just /g, ', just ');
      // Replace " — also " with ", also "
      guide[f] = guide[f].replace(/ — also /g, ', also ');
      // Replace " — even " with ", even "
      guide[f] = guide[f].replace(/ — even /g, ', even ');
      // Replace " — still " with ", still "
      guide[f] = guide[f].replace(/ — still /g, ', still ');
      // Replace " — already " with ", already "
      guide[f] = guide[f].replace(/ — already /g, ', already ');
      // Replace " — instead " with ". Instead "
      guide[f] = guide[f].replace(/ — instead /g, '. Instead ');
      // Replace " — however " with ". However "
      guide[f] = guide[f].replace(/ — however /g, '. However ');
      // Replace " — meanwhile " with ". Meanwhile "
      guide[f] = guide[f].replace(/ — meanwhile /g, '. Meanwhile ');
      if (guide[f] !== before) fixed++;
    }
  });

  guide.sections.forEach((s, i) => {
    ['content', 'content_es'].forEach(f => {
      if (!s[f]) return;
      var before = s[f];
      var count = (s[f].match(/ — /g) || []).length;
      if (count >= 3) {
        s[f] = s[f].replace(/ — each /g, ', each ');
        s[f] = s[f].replace(/ — both /g, ', both ');
        s[f] = s[f].replace(/ — just /g, ', just ');
        s[f] = s[f].replace(/ — also /g, ', also ');
        s[f] = s[f].replace(/ — even /g, ', even ');
        s[f] = s[f].replace(/ — still /g, ', still ');
        s[f] = s[f].replace(/ — already /g, ', already ');
        s[f] = s[f].replace(/ — instead /g, '. Instead ');
        s[f] = s[f].replace(/ — however /g, '. However ');
        s[f] = s[f].replace(/ — meanwhile /g, '. Meanwhile ');
        if (s[f] !== before) {
          guide.sections[i][f] = s[f];
          fixed++;
        }
      }
    });
  });
});

fs.writeFileSync('data/guides.json', JSON.stringify(g, null, 2), 'utf8');
console.log('Total fixes: ' + fixed);

// Verify remaining
var remaining = 0;
g.forEach(guide => {
  ['intro', 'conclusion', 'intro_es', 'conclusion_es'].forEach(f => {
    if (guide[f]) {
      var c = (guide[f].match(/ — /g) || []).length;
      if (c >= 3) remaining++;
    }
  });
  guide.sections.forEach(s => {
    ['content', 'content_es'].forEach(f => {
      if (s[f]) {
        var c = (s[f].match(/ — /g) || []).length;
        if (c >= 3) remaining++;
      }
    });
  });
});
console.log('Sections still with 3+ dashes: ' + remaining);
