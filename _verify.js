var fs = require('fs');
var c = fs.readFileSync('index.html', 'utf8');

// Check crawl section
var idx = c.indexOf('<div class="crawl-guides">');
var end = c.indexOf('</div>', idx);
var crawl = c.slice(idx, end + 6);
var lines = crawl.split('\n');
var bad = 0;
lines.forEach(function(l) {
  if (l.includes('?') && l.includes('hreflang="es"')) {
    console.log('BAD:', l.trim());
    bad++;
  }
});
console.log('Bad Spanish crawl links:', bad);

// Check for any remaining "?" in the file that are near "es" context
var qidx = 0;
var suspect = 0;
while ((qidx = c.indexOf('?', qidx)) !== -1) {
  var before = c.slice(Math.max(0, qidx - 40), qidx);
  if (before.includes('lang-show-es') || before.includes('cookie-lang-es') || before.includes('hreflang="es"')) {
    console.log('SUSPICIOUS ? at', qidx, 'context:', JSON.stringify(c.slice(qidx - 10, qidx + 15)));
    suspect++;
  }
  qidx++;
}
console.log('Total suspicious ? in ES context:', suspect);

// Check for price patterns - any numbers that look broken
var dollarPrices = c.match(/\$\d*[a-z,.\s]*\d/g);
if (dollarPrices) {
  dollarPrices.forEach(function(p) {
    console.log('Price found:', p);
  });
}

// Check OG meta
var ogIdx = c.indexOf('og:title');
if (ogIdx > 0) {
  console.log('og:title:', c.slice(ogIdx, ogIdx + 80));
}

// Check the Telegrams
var telIdx = c.indexOf('Únete');
if (telIdx > 0) {
  console.log('Telegram ES:', c.slice(telIdx, telIdx + 50));
}
