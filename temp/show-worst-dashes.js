var fs = require('fs');
var g = JSON.parse(fs.readFileSync('data/guides.json','utf8'));

// Show the worst offenders (4+ dashes)
var worst = [];
g.forEach(guide => {
  ['intro', 'conclusion', 'intro_es', 'conclusion_es'].forEach(f => {
    if (!guide[f]) return;
    var count = (guide[f].match(/ — /g) || []).length;
    if (count >= 4) worst.push({id: guide.id, loc: f, count: count});
  });
  guide.sections.forEach((s, i) => {
    ['content', 'content_es'].forEach(f => {
      if (!s[f]) return;
      var count = (s[f].match(/ — /g) || []).length;
      if (count >= 4) worst.push({id: guide.id, loc: 'sec' + i + ' ' + f, count: count});
    });
  });
});

worst.sort((a,b) => b.count - a.count);
console.log('=== WORST OFFENDERS (4+ dashes) ===');
worst.slice(0, 15).forEach(w => {
  console.log(w.id + ' ' + w.loc + ': ' + w.count + ' dashes');
  // Show the actual em-dash locations
  var guide = g.find(x => x.id === w.id);
  var text;
  if (w.loc.startsWith('sec')) {
    var secIdx = parseInt(w.loc.match(/sec(\d+)/)[1]);
    var field = w.loc.includes('content_es') ? 'content_es' : 'content';
    text = guide.sections[secIdx][field].replace(/<[^>]*>/g, '');
  } else {
    text = guide[w.loc].replace(/<[^>]*>/g, '');
  }
  // Find all em-dash positions
  var idx = 0;
  var positions = [];
  while ((idx = text.indexOf(' — ', idx)) !== -1) {
    positions.push(idx);
    idx += 3;
  }
  // Show context around each dash
  positions.forEach((pos, i) => {
    var start = Math.max(0, pos - 20);
    var end = Math.min(text.length, pos + 30);
    console.log('  Dash ' + (i+1) + ': ...' + text.substring(start, end) + '...');
  });
  console.log();
});
