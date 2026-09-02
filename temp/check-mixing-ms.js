var fs = require('fs');

// Check ALL guides that contain product 383 (smart:EQ 4)
var guides = [
  'mixing-plugins', 'mixing-plugins_es',
  'ai-tools-plugins', 'ai-tools-plugins_es',
  'best-plugins', 'best-plugins_es',
  'fx-plugins', 'fx-plugins_es'
];

guides.forEach(function(g) {
  var file = 'guides/' + g + '.html';
  try {
    var h = fs.readFileSync(file, 'utf8');
    var hasProduct = h.indexOf('smart-EQ-4') >= 0 || h.indexOf('smartEQ') >= 0 || h.indexOf('SmartEQ') >= 0;
    if (!hasProduct) { console.log(g + ': product not found'); return; }
    
    // Find ALL musicstore links
    var re = /href="([^"]*musicstore[^"]*)"/g;
    var m;
    var total = 0, withAff = 0, missing = [];
    while (m = re.exec(h)) {
      total++;
      if (m[1].indexOf('awin1.com') >= 0) withAff++;
      else missing.push(m[1].substring(0, 120));
    }
    console.log(g + ': MusicStore ' + withAff + '/' + total + ' with Awin');
    if (missing.length > 0) missing.forEach(function(u) { console.log('  MISSING: ' + u); });
  } catch(e) { console.log(g + ': file not found'); }
});

// Also check js/shop-buttons.js for Music Store URLs
var sb = fs.readFileSync('js/shop-buttons.js', 'utf8');
var re3 = /musicstore[^}]*url[^}]*/g;
var msIdx = sb.indexOf('musicstore');
if (msIdx >= 0) {
  // Find all musicstore URLs in shop-buttons.js
  var re4 = /"https:\/\/www\.musicstore\.com[^"]+"/g;
  var m4;
  var sbTotal = 0, sbWithAff = 0, sbMissing = [];
  while (m4 = re4.exec(sb)) {
    sbTotal++;
    if (m4[0].indexOf('awin1.com') >= 0) sbWithAff++;
    else sbMissing.push(m4[0].substring(0, 120));
  }
  console.log('\nshop-buttons.js: MusicStore ' + sbWithAff + '/' + sbTotal + ' with Awin');
  if (sbMissing.length > 0) {
    console.log('MISSING in shop-buttons.js:');
    sbMissing.slice(0, 10).forEach(function(u) { console.log('  ' + u); });
  }
}
