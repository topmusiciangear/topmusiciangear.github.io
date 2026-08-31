var fs = require('fs');
var g = JSON.parse(fs.readFileSync('data/guides.json','utf8'));

// Find all separator patterns
var emDash = 0, enDash = 0, doubleDash = 0, tripleDash = 0, star = 0;
var emDashSamples = [];

g.forEach(guide => {
  guide.sections.forEach((s, i) => {
    ['content', 'content_es'].forEach(f => {
      if (!s[f]) return;
      var text = s[f].replace(/<[^>]*>/g, '');

      // Count em-dashes (—)
      var emMatches = text.match(/ — /g);
      if (emMatches) {
        emDash += emMatches.length;
        if (emDashSamples.length < 10) {
          var idx = text.indexOf(' — ');
          emDashSamples.push(guide.id + ' sec' + i + ': ...' + text.substring(Math.max(0, idx - 40), idx + 50) + '...');
        }
      }

      // Count en-dashes (–)
      var enMatches = text.match(/ – /g);
      if (enMatches) enDash += enMatches.length;

      // Count double dashes (--)
      if (text.includes(' -- ')) doubleDash++;

      // Count triple dashes (---)
      if (text.includes(' --- ')) tripleDash++;

      // Count star separators (★)
      if (s[f].includes('★')) star++;
    });
  });
});

console.log('=== SEPARADORES ENCONTADOS ===');
console.log('Em-dash ( — ): ' + emDash);
console.log('En-dash ( – ): ' + enDash);
console.log('Double dash (--): ' + doubleDash);
console.log('Triple dash (---): ' + tripleDash);
console.log('Star (★): ' + star);

console.log();
console.log('=== MUESTRAS DE EM-DASH ===');
emDashSamples.forEach(s => console.log(s));

// Also check for guide-link-btn without spacing before it
var linkNoSpace = 0;
var linkSamples = [];
g.forEach(guide => {
  guide.sections.forEach((s, i) => {
    ['content', 'content_es'].forEach(f => {
      if (!s[f]) return;
      // Check if text ends with a letter directly before <a class="guide-link-btn"
      var match = s[f].match(/[a-zA-ZáéíóúñüÁÉÍÓÚÑÜ]<(a class="guide-link-btn)/g);
      if (match) {
        linkNoSpace += match.length;
        if (linkSamples.length < 5) {
          var idx = s[f].indexOf(match[0]);
          linkSamples.push(guide.id + ' sec' + i + ': ...' + s[f].substring(Math.max(0, idx - 30), idx + 40) + '...');
        }
      }
    });
  });
});

console.log();
console.log('=== LINKS SIN ESPACIO ANTES ===');
console.log('Total: ' + linkNoSpace);
linkSamples.forEach(s => console.log(s));

// Check for double spaces or missing spaces between links
var doubleLink = 0;
g.forEach(guide => {
  guide.sections.forEach((s, i) => {
    ['content', 'content_es'].forEach(f => {
      if (!s[f]) return;
      // Check for </a><a (no space between links)
      var matches = s[f].match(/<\/a><a/g);
      if (matches) doubleLink += matches.length;
    });
  });
});

console.log();
console.log('Links pegados (</a><a): ' + doubleLink);
