var fs = require('fs');
var g = JSON.parse(fs.readFileSync('data/guides.json','utf8'));

// Problematic patterns: em-dash where comma/period would be better
var issues = [];

g.forEach(guide => {
  ['intro', 'conclusion', 'intro_es', 'conclusion_es'].forEach(f => {
    if (!guide[f]) return;
    findIssues(guide.id, f, guide[f], issues);
  });
  guide.sections.forEach((s, i) => {
    ['content', 'content_es'].forEach(f => {
      if (!s[f]) return;
      findIssues(guide.id, 'sec' + i + ' ' + f, s[f], issues);
    });
  });
});

function findIssues(guideId, location, text, issues) {
  var plain = text.replace(/<[^>]*>/g, '');

  // Pattern 1: "X — and Y" (should be ", and Y")
  var m1 = plain.match(/[^,]{15,} — and /g);
  if (m1) m1.forEach(m => issues.push({guide: guideId, loc: location, pattern: '— and', sample: m.trim().substring(0, 80)}));

  // Pattern 2: "X — or Y" (should be ", or Y")
  var m2 = plain.match(/[^,]{15,} — or /g);
  if (m2) m2.forEach(m => issues.push({guide: guideId, loc: location, pattern: '— or', sample: m.trim().substring(0, 80)}));

  // Pattern 3: "X — but Y" where X is short (<30 chars) - should be ", but Y"
  var m3 = plain.match(/.{10,30} — but /g);
  if (m3) m3.forEach(m => issues.push({guide: guideId, loc: location, pattern: '— but (short)', sample: m.trim().substring(0, 80)}));

  // Pattern 4: "X — so Y" where X is short - should be ", so Y"
  var m4 = plain.match(/.{10,30} — so /g);
  if (m4) m4.forEach(m => issues.push({guide: guideId, loc: location, pattern: '— so (short)', sample: m.trim().substring(0, 80)}));

  // Pattern 5: "X — which Y" where X is short - should be ", which Y"
  var m5 = plain.match(/.{10,40} — which /g);
  if (m5) m5.forEach(m => issues.push({guide: guideId, loc: location, pattern: '— which', sample: m.trim().substring(0, 80)}));

  // Pattern 6: "X — that Y" where X is short - should be ", that Y"
  var m6 = plain.match(/.{10,30} — that /g);
  if (m6) m6.forEach(m => issues.push({guide: guideId, loc: location, pattern: '— that', sample: m.trim().substring(0, 80)}));

  // Pattern 7: "X — it's/they're/there's Y" - should be ". It's/They're/There's Y"
  var m7 = plain.match(/.{10,} — (it's|they're|there's) /g);
  if (m7) m7.forEach(m => issues.push({guide: guideId, loc: location, pattern: '— it/they/there', sample: m.trim().substring(0, 80)}));

  // Pattern 8: "X — this Y" where X is short - should be ". This Y"
  var m8 = plain.match(/.{10,30} — this /g);
  if (m8) m8.forEach(m => issues.push({guide: guideId, loc: location, pattern: '— this', sample: m.trim().substring(0, 80)}));

  // Pattern 9: "X — the Y" where X is VERY short (<25 chars) - usually wrong
  var m9 = plain.match(/.{5,25} — the [a-z]/g);
  if (m9) m9.forEach(m => issues.push({guide: guideId, loc: location, pattern: '— the (short)', sample: m.trim().substring(0, 80)}));

  // Pattern 10: Double em-dash in same sentence (overuse)
  var dashCount = (plain.match(/ — /g) || []).length;
  if (dashCount >= 3) {
    issues.push({guide: guideId, loc: location, pattern: '3+ dashes', sample: dashCount + ' em-dashes in one section'});
  }

  // Pattern 11: Em-dash right after a comma "X, — Y" (wrong)
  if (plain.includes(', —')) {
    issues.push({guide: guideId, loc: location, pattern: ', —', sample: 'comma before em-dash'});
  }

  // Pattern 12: Em-dash right before a comma "X —, Y" (wrong)
  if (plain.includes(' —,')) {
    issues.push({guide: guideId, loc: location, pattern: '—,', sample: 'em-dash before comma'});
  }

  // Pattern 13: Em-dash with period before it "X. — Y" (usually wrong)
  if (plain.includes('. —')) {
    issues.push({guide: guideId, loc: location, pattern: '. —', sample: 'period before em-dash'});
  }
}

console.log('=== ISSUES FOUND: ' + issues.length + ' ===');
console.log();

// Group by pattern
var byPattern = {};
issues.forEach(i => {
  if (!byPattern[i.pattern]) byPattern[i.pattern] = [];
  byPattern[i.pattern].push(i);
});

Object.keys(byPattern).sort((a,b) => byPattern[b].length - byPattern[a].length).forEach(p => {
  console.log('--- ' + p + ' (' + byPattern[p].length + ') ---');
  byPattern[p].slice(0, 5).forEach(i => {
    console.log('  ' + i.guide + ' ' + i.loc);
    console.log('    ' + i.sample);
  });
  if (byPattern[p].length > 5) console.log('  ... +' + (byPattern[p].length - 5) + ' more');
  console.log();
});
