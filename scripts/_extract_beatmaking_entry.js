var fs = require('fs');

function strip(s) { return s.replace(/<[^>]+>/g, '').trim(); }
function g(re, str) { var m = str.match(re); return m ? m[1].trim() : ''; }

var html = fs.readFileSync('guides/beat-making.html', 'utf8');
var htmlEs = fs.readFileSync('guides/beat-making_es.html', 'utf8');

var intro = g(/<div class="guide-detail-intro">([\s\S]*?)<\/div>/, html);
var introEs = g(/<div class="guide-detail-intro">([\s\S]*?)<\/div>/, htmlEs);

// Extract sections
var blocks = html.split('<div class="guide-section">');
blocks.shift();
var blocksEs = htmlEs.split('<div class="guide-section">');
blocksEs.shift();

var sections = [];
blocks.forEach(function(b) {
  var h = b.match(/<h2 class="guide-section-heading">([\s\S]*?)<\/h2>/);
  var c = b.match(/<div class="guide-section-content">([\s\S]*?)<\/div>\s*<div class="guide-products/);
  if (h && c) sections.push({ heading: strip(h[1]), content: c[1].trim() });
});
var sectionsEs = [];
blocksEs.forEach(function(b) {
  var h = b.match(/<h2 class="guide-section-heading">([\s\S]*?)<\/h2>/);
  var c = b.match(/<div class="guide-section-content">([\s\S]*?)<\/div>\s*<div class="guide-products/);
  if (h && c) sectionsEs.push({ heading: strip(h[1]), content: c[1].trim() });
});

// Extract FAQ
function extractFAQ(html) {
  var faqs = [];
  var parts = html.split('<div class="guide-faq-item">');
  parts.shift();
  parts.forEach(function(p) {
    var q = g(/<button class="guide-faq-question"[^>]*>([^<]+)</, p);
    var a = g(/<div class="guide-faq-answer-inner">([\s\S]*?)<\/div>/, p);
    if (q) faqs.push({ q: strip(q), a: a });
  });
  return faqs;
}
var faqs = extractFAQ(html);
var faqsEs = extractFAQ(htmlEs);

// Extract verdict
var vh = strip(g(/<div class="guide-verdict-header">([^<]+)<\/div>/, html));
var vhEs = strip(g(/<div class="guide-verdict-header">([^<]+)<\/div>/, htmlEs));
var vt = strip(g(/<div class="verdict-text">([\s\S]*?)<\/div>/, html));
var vtEs = strip(g(/<div class="verdict-text">([\s\S]*?)<\/div>/, htmlEs));

// Extract product section heading pattern to determine which sections have products
// Section 0 = intro (no products), 1-6 = product sections
var productSections = [];
for (var i = 1; i <= 6; i++) {
  productSections.push(i);
}

// Get conclusion from HTML
var conclusionMatch = html.match(/<div class="guide-section"[^>]*>([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>\s*<!-- \/guide-section -->([\s\S]*?)<div class="guide-faq"/);
var conclusion = '';
if (conclusionMatch) {
  conclusion = strip(conclusionMatch[0]);
}

// Output the guide structure
console.log('=== BEAT-MAKING GUIDE ENTRY ===');
console.log('');
console.log('id: "beat-making"');
console.log('title: "Best Desktop Beat-Making Studio: From Idea to Track (2026)"');
console.log('title_es: "Mejor Estudio de Beat-Making: De la Idea a la Pista (2026)"');
console.log('category: "production"');
console.log('badge: "premium"');
console.log('image: "https://r2.gear4music.com/media/34/341901/1200/preview.jpg"');
console.log('');
console.log('intro:');
console.log(JSON.stringify(intro));
console.log('');
console.log('intro_es:');
console.log(JSON.stringify(introEs));
console.log('');

sections.forEach(function(s, i) {
  var se = sectionsEs[i] || { heading: '', content: '' };
  console.log('Section ' + i + ' heading: ' + JSON.stringify(s.heading));
  console.log('Section ' + i + ' heading_es: ' + JSON.stringify(se.heading));
  console.log('Section ' + i + ' content length: ' + s.content.length);
  console.log('Section ' + i + ' content_es length: ' + se.content.length);
  console.log('');
});

console.log('FAQs: ' + faqs.length + ' EN, ' + faqsEs.length + ' ES');
faqs.forEach(function(f, i) {
  var fe = faqsEs[i] || { q: '', a: '' };
  console.log('FAQ ' + (i+1) + ' EN Q: ' + f.q.substring(0, 80));
  console.log('FAQ ' + (i+1) + ' ES Q: ' + fe.q.substring(0, 80));
});

console.log('');
console.log('Verdict header EN: ' + vh);
console.log('Verdict header ES: ' + vhEs);
console.log('Verdict text EN: ' + vt.substring(0, 100));
console.log('Verdict text ES: ' + vtEs.substring(0, 100));
