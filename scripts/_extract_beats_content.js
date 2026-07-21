var fs = require('fs');
var html = fs.readFileSync('guides/beat-making.html', 'utf8');
var htmlEs = fs.readFileSync('guides/beat-making_es.html', 'utf8');

function extractSection(html, idx) {
  var sections = html.match(/<div class="guide-section">([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>/g);
  if (sections) return sections[idx] || '';
  return '';
}

// Extract sections
var sections = html.match(/<div class="guide-section">([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>/g);
console.log('Number of sections: ' + (sections ? sections.length : 0));
sections.forEach(function(s, i) {
  var h = s.match(/<h2 class="guide-section-heading">([^<]+)<\/h2>/);
  var heading = h ? h[1] : 'N/A';
  console.log('Section ' + i + ' heading: ' + heading);
  
  var content = s.match(/<div class="guide-section-content">([\s\S]*?)<\/div>\s*<div class="guide-products/g);
  if (!content) content = s.match(/<div class="guide-section-content">([\s\S]*?)<\/div>/);
  if (content) console.log('  Content length: ' + content[1].length);
  else console.log('  Content: NOT FOUND');
  console.log('');
});

// Also get intro
var intro = html.match(/<div class="guide-detail-intro">([\s\S]*?)<\/div>/);
if (intro) console.log('Intro: ' + intro[1].replace(/<[^>]+>/g, '').trim().substring(0, 100));

var introEs = htmlEs.match(/<div class="guide-detail-intro">([\s\S]*?)<\/div>/);
if (introEs) console.log('Intro ES: ' + introEs[1].replace(/<[^>]+>/g, '').trim().substring(0, 100));

// Verdict
var vh = html.match(/<div class="guide-verdict-header">([^<]+)<\/div>/);
if (vh) console.log('Verdict header: ' + vh[1]);

var vt = html.match(/<div class="verdict-text">([\s\S]*?)<\/div>/);
if (vt) console.log('Verdict text: ' + vt[1].replace(/<[^>]+>/g, '').trim().substring(0, 100));

// FAQ
var faqQs = html.match(/<button class="guide-faq-question"[^>]*>([^<]+)<span class="guide-faq-icon">[^<]+<\/span><\/button>/g);
if (faqQs) {
  console.log('\nFAQ Questions:');
  faqQs.forEach(function(q) {
    var m = q.match(/<button class="guide-faq-question"[^>]*>([^<]+)<span/);
    if (m) console.log('  - ' + m[1]);
  });
}
