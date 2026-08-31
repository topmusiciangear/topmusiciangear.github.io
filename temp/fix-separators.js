var fs = require('fs');
var g = JSON.parse(fs.readFileSync('data/guides.json','utf8'));
var fixed = 0;

// 1. Fix links without space before them (text ends directly before <a)
g.forEach(guide => {
  guide.sections.forEach((s, i) => {
    ['content', 'content_es'].forEach(f => {
      if (!s[f]) return;
      // Add space before guide-link-btn if missing
      var before = s[f];
      s[f] = s[f].replace(/([a-zA-ZáéíóúñüÁÉÍÓÚÑÜ.)])<(a class="guide-link-btn)/g, '$1 <$2');
      if (s[f] !== before) {
        guide.sections[i][f] = s[f];
        fixed++;
      }
    });
  });
});

// 2. Fix links pegados (</a><a) — add space between them
g.forEach(guide => {
  guide.sections.forEach((s, i) => {
    ['content', 'content_es'].forEach(f => {
      if (!s[f]) return;
      var before = s[f];
      s[f] = s[f].replace(/<\/a><a/g, '</a> <a');
      if (s[f] !== before) {
        guide.sections[i][f] = s[f];
        fixed++;
      }
    });
  });
});

// 3. Reduce em-dash frequency — replace " — " with ", " where it's just a list or simple conjunction
// Keep em-dashes for: parenthetical asides, emphasis, abrupt shifts
// Remove em-dashes for: simple "and", lists, or where comma works fine

var dashRemoved = 0;
g.forEach(guide => {
  ['intro', 'conclusion', 'intro_es', 'conclusion_es'].forEach(f => {
    if (!guide[f]) return;
    var before = guide[f];

    // Pattern: "X — and Y" → "X, and Y"
    guide[f] = guide[f].replace(/ — and /g, ', and ');
    // Pattern: "X — or Y" → "X, or Y"
    guide[f] = guide[f].replace(/ — or /g, ', or ');
    // Pattern: "X — but Y" → "X, but Y"
    guide[f] = guide[f].replace(/ — but /g, ', but ');
    // Pattern: "X — so Y" → "X, so Y"
    guide[f] = guide[f].replace(/ — so /g, ', so ');
    // Pattern: "X — which Y" → "X, which Y"
    guide[f] = guide[f].replace(/ — which /g, ', which ');
    // Pattern: "X — that Y" → "X, that Y" (only if short)
    guide[f] = guide[f].replace(/ — that /g, ', that ');
    // Pattern: "X — it's Y" → "X. It's Y"
    guide[f] = guide[f].replace(/ — it's /g, '. It\'s ');
    guide[f] = guide[f].replace(/ — they're /g, '. They\'re ');
    guide[f] = guide[f].replace(/ — there's /g, '. There\'s ');
    // Pattern: "X — this Y" → "X. This Y"
    guide[f] = guide[f].replace(/ — this /g, '. This ');
    // Pattern: "X — the Y" where X is long (>40 chars) → period
    if (guide[f].length > 40) {
      guide[f] = guide[f].replace(/ — the ([a-z])/g, '. The $1');
    }

    if (guide[f] !== before) dashRemoved++;
  });

  guide.sections.forEach((s, i) => {
    ['content', 'content_es'].forEach(f => {
      if (!s[f]) return;
      var before = s[f];

      // Same patterns for sections
      s[f] = s[f].replace(/ — and /g, ', and ');
      s[f] = s[f].replace(/ — or /g, ', or ');
      s[f] = s[f].replace(/ — but /g, ', but ');
      s[f] = s[f].replace(/ — so /g, ', so ');
      s[f] = s[f].replace(/ — which /g, ', which ');
      s[f] = s[f].replace(/ — that /g, ', that ');
      s[f] = s[f].replace(/ — it's /g, '. It\'s ');
      s[f] = s[f].replace(/ — they're /g, '. They\'re ');
      s[f] = s[f].replace(/ — there's /g, '. There\'s ');
      s[f] = s[f].replace(/ — this /g, '. This ');
      s[f] = s[f].replace(/ — the ([a-z])/g, '. The $1');

      if (s[f] !== before) {
        guide.sections[i][f] = s[f];
        dashRemoved++;
      }
    });
  });
});

fs.writeFileSync('data/guides.json', JSON.stringify(g, null, 2), 'utf8');
console.log('Link spacing fixes: ' + fixed);
console.log('Em-dash reductions: ' + dashRemoved);

// Count remaining em-dashes
var remaining = 0;
g.forEach(guide => {
  ['intro', 'conclusion', 'intro_es', 'conclusion_es'].forEach(f => {
    if (guide[f]) remaining += (guide[f].match(/ — /g) || []).length;
  });
  guide.sections.forEach(s => {
    ['content', 'content_es'].forEach(f => {
      if (s[f]) remaining += (s[f].match(/ — /g) || []).length;
    });
  });
});
console.log('Remaining em-dashes: ' + remaining);
