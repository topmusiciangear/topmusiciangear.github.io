var fs = require('fs');
var g = JSON.parse(fs.readFileSync('data/guides.json','utf8'));

// 1. Check for truncated text (ends mid-sentence without punctuation)
var truncated = 0;
var truncList = [];
g.forEach(guide => {
  guide.sections.forEach((s, i) => {
    ['content', 'content_es'].forEach(f => {
      if (!s[f]) return;
      var text = s[f].replace(/<[^>]*>/g, '').trim();
      var lastChar = text.slice(-1);
      if (text.length > 50 && !lastChar.match(/[.!?:;")]/)) {
        truncList.push(guide.id + ' sec' + i + ' ' + f + ': ...' + text.slice(-60));
        truncated++;
      }
    });
  });
});

console.log('=== TEXTOS CORTADOS ===');
truncList.forEach(t => console.log(t));
console.log('Total truncados: ' + truncated);

// 2. Check for separator patterns in HTML output
console.log();
console.log('=== SEPARADORES EN HTML ===');

// Look at a few generated HTML files for separator patterns
var htmlFiles = ['guides/usb-mics.html', 'guides/best-headphones.html', 'guides/starter-studio.html'];
htmlFiles.forEach(file => {
  if (!fs.existsSync(file)) return;
  var html = fs.readFileSync(file, 'utf8');
  
  // Find separator patterns between product cards
  var sepMatch = html.match(/(<hr[^>]*>|<div class="separator"|<br\s*\/?>|──|---|★|─{3,})/g);
  if (sepMatch) {
    console.log(file + ': ' + sepMatch.length + ' separators found');
    // Show first 3 unique
    var unique = [...new Set(sepMatch)];
    unique.slice(0, 5).forEach(s => console.log('  ' + s));
  }
});

// 3. Check for "..." or "..." in content
console.log();
console.log('=== PUNTOS SUSPENSIVOS ===');
var dotsCount = 0;
g.forEach(guide => {
  guide.sections.forEach((s, i) => {
    ['content', 'content_es'].forEach(f => {
      if (!s[f]) return;
      if (s[f].includes('...')) {
        dotsCount++;
        if (dotsCount <= 5) {
          var text = s[f].replace(/<[^>]*>/g, '');
          var idx = text.indexOf('...');
          console.log(guide.id + ' sec' + i + ' ' + f + ': ...' + text.substring(Math.max(0,idx-30), idx+30) + '...');
        }
      }
    });
  });
});
console.log('Total with ...: ' + dotsCount);
